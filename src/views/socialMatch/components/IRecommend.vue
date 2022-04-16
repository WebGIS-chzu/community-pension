<template>
  <div id="i-recommend">
    <i-map />
    <div class="left">
      <div class="left-color">
        <div class="similarity">
          <div class="block">
            <span class="time">时间阶段</span>
            <el-checkbox-group v-model="values.checkedTimes" :min="0" :max="1">
              <el-checkbox
                v-for="vtime in vtimes"
                :label="vtime"
                :key="vtime"
                >{{ vtime }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
          <div class="block">
            <span class="space">设置空间半径</span>
            <el-slider
              v-model="values.value1"
              :show-tooltip="false"
              :max="2000"
            />
            <span class="value">{{ values.value1 }}m</span>
          </div>
          <div class="block" style="margin-bottom: 20px">
            <span class="place">途径地点相似度</span>
            <el-slider v-model="values.value2" :show-tooltip="false" />
            <span class="value">{{ values.value2 }}%</span>
          </div>
          <div>
            <el-button class="searchBtn" @click="sendValue(values)"
              >查找</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="left-bottom">
      <img class="userPortrait" :src="userform.headportrait" alt="用户头像" />
      <div class="darkDialog infoform">
        <el-form ref="form" :model="userform" size="mini" label-width="60px">
          <el-form-item label="姓名">
            <el-input
              v-model="userform.name"
              style="width: 100px"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input
              v-model="userform.gender"
              style="width: 100px"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input
              v-model="userform.age"
              style="width: 100px"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="right">
      <div class="right-color darkDialog">
        <div class="right-people" v-for="item in searchiform">
          <img class="searchPortrait" :src="item.headportrait" alt="用户头像" />
          <div class="leftinfoform">
            <el-form ref="form" :model="item" size="mini" label-width="60px">
              <el-form-item label="姓名">
                <el-input
                  v-model="item.name"
                  style="width: 70px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-input
                  v-model="item.sex"
                  style="width: 70px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input
                  v-model="item.age"
                  style="width: 70px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="匹配度">
                <el-input
                  v-model="item.match"
                  style="width: 70px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <el-radio class="peopleRadio" v-model="radio" :label="item.label">{{
            ""
          }}</el-radio>
        </div>
        <div class="right-button">
          <el-button @click="ShowEchartsIR">匹配度分析</el-button>
          <el-button @click="Comment()">推荐</el-button>
        </div>
      </div>
    </div>
    <div class="chart" :class="{ isactive: this.show }">
      <i-recommend-chart />
    </div>
  </div>
</template>

<script>
import IMap from "./IMap";
import bus from "common/js/Bus.js";

import IRecommendChart from "./IRecommendChart.vue";

import {
  getElderlyLocation,
  getUserInformationByUserId,
} from "network/socialgraph";
// import { getRecommendElderlyByCondition } from "network/irecommend";

export default {
  name: "IRecommend",
  components: {
    IRecommendChart,
    IMap,
  },
  data() {
    return {
      values: {
        value1: 400,
        value2: 20,
        checkedTimes: ["本日"],
      },
      value3: [13, 20],
      tableData: [],
      vtimes: ["本年", "本月", "本周", "本日"],
      userform: {
        name: "",
        gender: "",
        age: "",
        headportrait: "",
      },
      searchiform: [
        {
          name: "",
          sex: "",
          age: "",
          match: "",
          label: "1",
          headportrait: "",
        },
        {
          name: "",
          sex: "",
          age: "",
          match: "",
          label: "2",
          headportrait: "",
        },
        {
          name: "",
          sex: "",
          age: "",
          match: "",
          label: "3",
          headportrait: "",
        },
      ],
      matchform: [],
      radio: 1,
      show: true,
    };
  },
  mounted() {
    this.Condition();
  },
  created() {
    alert("请先选择地图用户，并设置推荐参数！");
  },

  methods: {
    ShowEchartsIR() {
      this.show = !this.show;
      bus.$emit("IsShowIRChart", "ture");
    },
    Condition() {
      var that = this;
      // 左下角用户
      bus.$on("condition", function (value) {
        // console.log("1111111111", value);
        if (value.data.code == 200) {
          console.log("chenggong");
          that.userform = value.data.result[0].simplelyInfor;
          // 右边匹配用户
          that.searchiform = [];
          that.matchform = [];
          for (var i = 1; i < 4; i++) {
            that.searchiform.push({
              name: value.data.result[i].simplelyInfor.name,
              sex: value.data.result[i].simplelyInfor.gender,
              age: value.data.result[i].simplelyInfor.age,
              match: value.data.result[i].recommendResemble[3].value,
              label: i,
              headportrait: value.data.result[i].simplelyInfor.headportrait,
            });
            that.matchform.push({
              name: value.data.result[i].simplelyInfor.name,
              timeDegree: value.data.result[i].recommendResemble[0].value,
              spatialDegree: value.data.result[i].recommendResemble[1].value,
              hobbyDegree: value.data.result[i].recommendResemble[2].value,
              matchDegree: value.data.result[i].recommendResemble[3].value,
            });
          }
          bus.$emit("MatchingDegree", that.matchform);
        } else {
          alert("查找失败！请更改参数或更换用户！");
        }
      });
      // });
    },
    sendValue(value) {
      alert("结果正在加载中");
      console.log("value", value);
      bus.$emit("sendValue", value);
    },
    Comment() {
      alert("已推荐");
    },
  },
};
</script>

<style scoped>
#i-recommend {
  position: absolute;
  width: 100%;
  height: 100%;
}
/* 设置左侧的样式 */
.left {
  position: absolute;
  top: 25%;
  width: 23%;
  height: 32%;
  background: rgba(18, 22, 64, 0.5) !important;
  z-index: 10;
}

.left-color {
  width: 100%;
  height: 100%;
  /* opacity: 0.9; */
  background: url("../public/img/invalid-name.png") no-repeat;
  background-size: 100% 100%;
}
/* 相似度的设置 */
/* 设置标题行的样式 */
.similarity .ptitle {
  position: absolute;
  top: 4%;
  left: 3%;
  width: 50%;
  height: 4%;
  background: url("../public/img/title_con.png") no-repeat;
  background-size: 100% 100%;
  z-index: 100;
}
.similarity .title {
  position: absolute;
  top: 2%;
  left: 26%;
  font-size: 18px;
}
/* 设置相似度统一样式 */
.block {
  position: relative;
  top: 0px;
  left: 12px;
  margin-bottom: 10px;
  width: 100%;
  height: 10%;
}
.time,
.space,
.place {
  font-size: 14px;
  width: 30%;
  position: relative;
  top: 20px;
}
.el-checkbox-group {
  position: relative;
  float: right;
  width: 80%;
  top: 28px;
}
.el-checkbox {
  margin: 2%;
}
/* 设置滑块以及后面值样式 */
::v-deep .el-slider__runway {
  width: 50%;
  height: 2px;
  margin: 3px 6px 0px 6px;
  background-color: #e4e7ed;
  border-radius: 2px;
  left: 100px;
}
::v-deep .el-slider__bar {
  height: 2px;
  background-color: #409eff;
  border-top-left-radius: 2px;
}
::v-deep .el-slider__button {
  display: none !important;
}
.value {
  position: relative;
  font-size: 10px;
  float: right;
  top: -10px;
  right: 26px;
}
.searchBtn {
  background-color: transparent;
  color: #fff;
  border-color: darkgrey;
  position: relative;
  left: 35%;
}
.left-bottom {
  position: absolute;
  bottom: 13%;
  width: 23%;
  height: 28%;
  z-index: 10;
  /* background: url("../public/img/invalid.png") no-repeat;
  background-size: 100% 100%; */
}
.right {
  position: absolute;
  right: 0%;
  top: 0%;
  bottom: 13%;
  width: 23%;
  background: rgba(18, 22, 64, 0.5) !important;
  z-index: 10;
}
.right-color {
  width: 100%;
  height: 100%;
  background: url("../public/img/invalid.png") no-repeat;
  background-size: 100% 100%;
}
.right-people {
  position: relative;
  width: 360px;
  height: 180px;
  padding: 8% 5% 0% 5%;
}
/* .right-center {
  position: absolute;
  right: 0;
  top: 27%;
}
.right-bottom {
  position: absolute;
  right: 0%;
  top: 53%;
} */
.right-button {
  position: absolute;
  right: 20%;
  bottom: 5%;
}

/* .info-color {
  width: 100%;
  height: 100%;
  opacity: 0.9;
  background: rgba(18, 22, 64, 0.5) !important;
} */

.userPortrait {
  margin: 8% 0 5% 5%;
  height: 160px;
  width: 140px;
  object-fit: cover;
}
.searchPortrait {
  height: 160px;
  width: 140px;
  object-fit: cover;
}
.infoform {
  margin: 10% 5% 5% 0%;
  height: 80%;
  width: 50%;
  position: relative;
  float: right;
}
.leftinfoform {
  /* margin: 5% 3% 5% 0%; */
  height: 80%;
  width: 40%;
  position: relative;
  float: right;
  right: 55px;
}
.leftinfoform .el-form-item {
  margin-top: 5%;
  margin-bottom: 5%;
}
.el-form-item {
  margin-top: 18px;
}
/* 设置中间样式 */
.center {
  position: absolute;
  top: 0;
  left: 50%;
}
/* 爱好的样式设置（左下-中） */
.hobby .ptitle {
  position: absolute;
  top: 40%;
  left: 3%;
  width: 50%;
  height: 4%;
  background: url("../public/img/title_con.png") no-repeat;
  background-size: 100% 100%;
  z-index: 100;
}
.hobby .title {
  position: absolute;
  top: 38%;
  left: 26%;
  font-size: 18px;
}
.like {
  font-size: 14px;
  position: relative;
  top: 100px;
  left: 50px;
}
/* 距离排序设置 （左下-下） */
.range .ptitle {
  position: absolute;
  top: 55%;
  left: 3%;
  width: 50%;
  height: 4%;
  background: url("../public/img/title_con.png") no-repeat;
  background-size: 100% 100%;
  z-index: 100;
}
.range .title {
  position: absolute;
  top: 53%;
  left: 26%;
  font-size: 18px;
}
/* 设置表格样式 */
.table {
  position: relative;
  top: 140px;
  left: 40px;
}
/* 消除表格背景色 */
::v-deep .el-table,
.el-table__expanded-cell {
  background-color: transparent !important;
}
/* 表头设置透明色 */
::v-deep .el-table th.el-table__cell.is-leaf {
  background-color: transparent !important;
  color: rgba(14, 253, 255, 1);
}
/* 表格内容设置透明色 */
::v-deep .el-table tr {
  background-color: transparent !important;
  color: #fff;
}
::v-deep .el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: transparent !important;
}
/* 消除表格标题的下划线 */
::v-deep .el-table td.el-table__cell {
  border-bottom: 0px transparent !important;
}
/* 消除表格内部的下划线 */
::v-deep .el-table th.el-table__cell.is-leaf {
  border-bottom: 0px transparent !important;
}
/* 设置表格的宽度 */
::v-deep .el-table .cell {
  line-height: 15px;
}
/* 表头字体加粗 */
::v-deep .el-table th.el-table__cell > .cell {
  font-weight: bold !important;
}
.peopleRadio {
  position: relative;
  left: 150px;
  bottom: 80px;
}
.chart {
  position: absolute;
  top: 20%;
  left: 30%;
  width: 40%;
  height: 40%;
  background-color: rgba(11, 23, 63, 0.7);
}
.isactive {
  display: none;
}
</style>