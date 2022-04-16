<template>
  <div id="consume">
    <!-- 消费异常弹窗 -->
    <!-- 取消表单的遮罩层 :modal-append-to-body="false" 
        取消整个页面的遮罩层 :modal='false'-->
    <el-dialog
      :title="category + '费异常人数'"
      :visible.sync="centerDialogVisible"
      width="30%"
      :modal-append-to-body="false"
      center
      class="darkDialog darkTable"
    >
      <el-table height="250" :data="abnormalData" ref="filterTable">
        <el-table-column width="120" prop="name" label="姓名"></el-table-column>
        <el-table-column width="120" prop="sex" label="性别"></el-table-column>
        <el-table-column
          width="155"
          prop="solve"
          label="解决状态"
          :filters="[
            { text: '已解决', value: 'yes' },
            { text: '未解决', value: 'no' },
          ]"
          :filter-method="filterSolve"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.solve"
              placeholder="请选择"
              @change="Changefindoption(scope.row)"
            >
              <el-option
                v-for="item in solved"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <!-- <el-table-column width="90" prop="address" label="定位">
          <template>
            <i class="el-icon-location-outline" />
          </template>
        </el-table-column> -->
      </el-table>
    </el-dialog>

    <!-- 消费异常统计图 -->
    <div class="bottom">
      <div class="tit">
        <span>消费</span>
        <p></p>
      </div>
      <div class="boxnav">
        <ul class="jcjg">
          <li>
            <h3>家庭异常</h3>
            <div class="itemCon itembg">
              <div class="infoPie">
                <ul class="clearfix">
                  <li class="color-blue" @click="consume('水')">
                    <span class="border-blue" id="indicator1" total="32">{{
                      waterAbnormalNum
                    }}</span>
                    <p>水</p>
                  </li>
                  <li class="color-yellow" @click="consume('电')">
                    <span class="border-yellow" id="indicator2" total="65">{{
                      powerAbnormalNum
                    }}</span>
                    <p>电</p>
                  </li>
                  <li class="color-green" @click="consume('气')">
                    <span class="border-green" id="indicator3" total="100">{{
                      gassAbnormalNum
                    }}</span>
                    <p>气</p>
                  </li>
                </ul>
                <div id="indicatorContainer"></div>
              </div>
            </div>
          </li>
          <li>
            <h3>近七日异常人数</h3>
            <numexception />
          </li>
          <li>
            <h3>异常情况</h3>
            <solvingstate />
          </li>
        </ul>
      </div>
    </div>
    
    <!-- 右侧滚动条 -->
    <consumeMessage />

    <!-- 设置图例样式 -->
    <div class="legend">
      <div class="legend-title">
        <span>地图图例</span>
      </div>
      <div class="legend-content">
        <div><span style="background-color: #c0c4cc"></span>无人居住</div>
        <br />
        <div><span style="background-color: #ffffbf"></span>用户住房</div>
        <br />
        <div><span style="background-color: #1eb6fe"></span>水费异常</div>
        <br />
        <div><span style="background-color: #ffd220"></span>电费异常</div>
        <br />
        <div><span style="background-color: #32ffc7"></span>气费异常</div>
        <br />
        <div><span style="border: solid 3px #9cea10"></span>小区边界</div>
        <br />
      </div>
    </div>

    <div id="consumeMap">
      <arc-map />
    </div>
  </div>
</template>

<script>
import bus from "common/js/Bus.js";
// 家庭异常的统计图
import Numexception from "./components/Numexception";
import Solvingstate from "./components/Solvingstate";
// 地图
import ArcMap from "./components/ArcMap";
// 右侧信息条
import ConsumeMessage from "./components/ConsumeMessage";

import { getConsumeAbnormalTypeNumber,getAbnormalUserInformationByType } from "network/timemonit";

export default {
  name: "Consume",
    components: {
    Numexception,
    Solvingstate,
    ArcMap,
    ConsumeMessage,
  },
  data() {
    return {
      centerDialogVisible: false,
      abnormalData: [],
      category: "",
      solved: [
        {
          value: "yes",
          label: "已解决",
        },
        {
          value: "no",
          label: "未解决",
        },
      ],
      waterAbnormalNum: "",
      powerAbnormalNum: "",
      gassAbnormalNum: "",
    };
  },

  mounted() {
    var that = this;
    bus.$on("solve", function (judge) {
      that.centerDialogVisible = judge;
    });
    that.getAbnormalUserInformationByType();
  },

  methods: {
    filterSolve(value, row) {
      return row.solve === value;
    },
    consume(param) {
      this.category = param;
      var type = param + "费异常"
      this.getAbnormalUserInformationByType(type);
      this.centerDialogVisible = true;
    },
    getConsumeAbnormalTypeNumber() {
      var that = this;
      getConsumeAbnormalTypeNumber().then((res) => {
        // console.log("水电气异常数", res);
        that.waterAbnormalNum = res.data.result[0].value;
        that.powerAbnormalNum = res.data.result[1].value;
        that.gassAbnormalNum = res.data.result[2].value;
      });
    },

    getAbnormalUserInformationByType(params) {
      var that = this;
        getAbnormalUserInformationByType({"abnormalType": params}).then((res) => {
        // console.log("res", res)
        if (res) {
          that.abnormalData=[]
          for (let i = 0; i < res.data.result.length; i++) {
          var solve=""
            if (res.data.result[i].state=="未解决"){
              solve="no"
            }
            else{
              solve="yes"
            }
            that.abnormalData.push({
              "name": res.data.result[i].name,
              "sex": res.data.result[i].gender,
              "solve": solve,
            })
          }
        }
      })
    },
  },
  
  created() {
    this.getConsumeAbnormalTypeNumber();
  }
};
</script>

<style scoped>
@font-face {
  font-family: "PingFang";
  src: url("./public/font/PingFangMedium.ttf");
}

#consume {
  position: absolute;
  width: 100%;
  height: 100%;
}
/* 设置弹窗样式 */
.left {
  position: absolute;
  display: flex;
  top: 100px;
  left: 10px;
  width: 130px;
  height: 30px;
  background: rgba(66, 77, 92, 0.5);
  border: 1px solid rgba(7, 118, 181, 0.5);
  box-shadow: inset 0 0 10px rgba(7, 118, 181, 0.4);
  color: aliceblue;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  padding: 10px;
}
/* 弹窗中表格 */
::v-deep .el-dialog--center .el-dialog__body {
  padding-top: 0;
}

.el-icon-location-outline:hover {
  color: red;
}
/* 设置底部水电气异常的echarts */
.bottom {
  position: relative;
  margin-top: 22%;
  margin-left: 0%;
  padding-left: 5%;
  width: 80%;
  /* background-color:rgba(21, 99, 141, 0.4); */
  /* background-color: rgba(255, 255, 255, 0.2); */
  background: rgba(11, 23, 63, 0.3);
  z-index: 10;
}
.tit {
  display: flex;
  align-items: flex-end;
}
.tit span {
  background: url(./public/img/line1.png) no-repeat bottom right;
  font-size: 20px;
  white-space: nowrap;
  padding-bottom: 10px;
  padding-right: 30px;
}
.tit p {
  background: url(./public/img/line2.png) no-repeat bottom left;
  width: 100%;
  height: 13px;
  margin-bottom: 5px;
  opacity: 0.5;
  margin-left: -10px;
}
.boxnav {
  padding: 10px 0;
}
.jcjg {
  height: calc(31vh);
  margin-left: -10px;
  margin-right: -10px;
}
.jcjg li {
  width: 33%;
  height: 100%;
  float: left;
  padding: 2px 5px;
}
.jcjg h3 {
  background: url(./public/img/tit1.png) center right no-repeat;
  margin-bottom: 10px;
  left: 20px;
  font-weight: normal;
  font-size: 15px;
  color: #2edbff;
}
/* 设置地图图例样式 */
.legend {
  position: absolute;
  bottom: 38%;
  left: 2%;
  width: 20%;
  height: 40%;
  z-index: 10;
}
.legend-title {
  width: 100%;
  height: 10%;
  background: url(./public/img/title.png) no-repeat center;
  background-size: 70%;
  color: black;
  text-align: center;
  display: table;
  font-size: 0.5rem;
}
.legend-title span {
  display: table-cell;
  vertical-align: middle;
  color: #2edbff;
}
.legend-content {
  text-align: center;
  width: 100%;
  height: 90%;
  font-size: 17px;
  font-family: PingFangMedium;
  color: #f29701;
}

/* 实时监护-消费-左下角 */

.infoPie ul li {
  float: left;
  width: 25%;
}
.infoPie ul li span {
  display: block;
  width: 68px;
  height: 68px;
  margin: 16px auto;
  border: 2px solid transparent;
  text-align: center;
  line-height: 72px;
  font-size: 24px;
  border-radius: 100%;
}
.infoPie ul li p {
  text-align: center;
  font-size: 16px;
  padding-bottom: 8px;
}
.color-yellow {
  color: #ffd220 !important;
}
.color-green {
  color: #32ffc7 !important;
}
.color-blue {
  color: #1eb6fe !important;
}
.border-yellow {
  border-color: #ffd220 !important;
}
.border-green {
  border-color: #32ffc7 !important;
}
.border-blue {
  border-color: #1eb6fe !important;
}
.border-red {
  border-color: #ff0e0d !important;
}
.bg-yellow {
  background-color: #ffd220 !important;
}
.bg-green {
  background-color: #32ffc7 !important;
}
.bg-blue {
  background-color: #1eb6fe !important;
}
.bg-red {
  background-color: #ff0e0d !important;
}

.legend-content div {
  margin-left: 12%;
  float: left;
  /* line-height: 40px;
  margin-left: 15%; */
  color: #fff;
}
.legend-content div span {
  color: #fff;
  display: inline-block;
  height: 14px;
  margin-right: 5px;
  /* padding-bottom: 10%; */
  width: 30px;
}
/* .legend-content div #grass {
  background: url('../img/grass.jpg') no-repeat;
  background-size: 100% 100%;
}
.legend-content div #monitor {
  background: url('../img/monitor.jpg') no-repeat;
  background-size: 100% 100%;
} */
.legend-content {
  font: 16px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  padding: 0px;
  position: absolute;
  z-index: 1;
  margin: 5% 20% 20%;
}

/* 地图 */
#consumeMap {
  width: 100%;
  height: 100%;
  z-index: 0;
  position: absolute;
  top: 0;
}

</style>
