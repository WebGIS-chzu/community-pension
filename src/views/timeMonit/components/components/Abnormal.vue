<template>
  <div id="abnormal">
    <div class="leftMain_top">
      <div class="leftMain_topIn">
        <ul>
          <li>
            <div class="liIn">
              <h3 @click="abnormol('姿态异常')" :style="{'color': type=='姿态异常' ? ' rgb(55,210,212)':'#ffffff'}">姿态异常</h3>
              <animate-number from="0" :to="this.posture" class="blueshu" :key="this.posture"/>
              <span class="border_bg_leftTop"></span>
              <span class="border_bg_rightTop"></span>
              <span class="border_bg_leftBottom"></span>
              <span class="border_bg_rightBottom"></span>
            </div>
          </li>
          <li>
            <div class="liIn">
              <h3 @click="abnormol('情绪异常')" :style="{'color': type=='情绪异常' ? 'rgb(253,108,136)':'#ffffff'}">情绪异常</h3>
              <animate-number from="0" :to="this.emotion" class="pinkshu" :key="this.emotion"/>
              <span><i class="el-icon-tickets"  @click="dialogVisible = true"/></span>
              <span class="border_bg_leftTop"></span>
              <span class="border_bg_rightTop"></span>
              <span class="border_bg_leftBottom"></span>
              <span class="border_bg_rightBottom"></span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 弹框 -->
      <div class="popup">
        <el-dialog
          title="情绪异常人员"
          :visible.sync="dialogVisible"
          :modal-append-to-body='false'
          width="37%"
          center
          class="darkDialog darkTable"
          >
          <el-table 
            :data="abnormalData"
            height="270"
            ref="filterTable">
            <el-table-column width="100" prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column width="100" prop="gender" label="性别" align="center"></el-table-column>
            <el-table-column width="100" prop="emotion" label="当前情绪" align="center"></el-table-column>
            <el-table-column width="100" prop="address" label="查看监控" align="center">
              <template slot-scope="scope">
                <i class="el-icon-location-outline" @click="sendPosition(scope)" style="font-size: 20px;"/>
              </template>
            </el-table-column>
            <el-table-column align="center"
              label="是否选择心理慰藉"
              width="110">
              <template slot-scope="scope">
                <el-button type="text" style="border:0px;width:40px">是</el-button>
                <el-button type="text" style="border:0px;width:40px">否</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getMonitorAbnormalTypeNumber, getMonitorAbnormalUserInformation } from "network/timemonit";
import bus from "common/js/Bus.js";
import axios from 'axios';


export default {
  name: "Abnormal",
  data() {
    return {
      posture:0,
      emotion:0,
      dialogVisible: false,
      abnormalData: [],
      type: '姿态异常',
    };
  },
  methods: {
    // 监控异常人数
    getMonitorAbnormalTypeNumber() {
      getMonitorAbnormalTypeNumber().then((res) => {
        this.posture = parseInt(res.data.result[0].value);
        this.emotion = parseInt(res.data.result[1].value);
        // console.log(res);
      });
    },
    getMonitorAbnormalUserInformation() {
      getMonitorAbnormalUserInformation({"abnormalName": "情绪异常"}).then((res) => {
        if (res) {
          console.log('res', res)
          this.abnormalData = res.data.result
        }
      })
    },
    // normol(e) {
    //   // bus.$emit("try1", e)
    //   // console.log(e)
    //   this.one = e
    //   this.$router.push("/socialMatch")
    //   // this.$router.push({name:"社交匹配", params:{a:e}})
    // },
    abnormol(e) {
      this.type = e;
      bus.$emit("unsual", e)
    },
    async sendPosition(params) {
      this.dialogVisible =  false
      var position = []
      var path = [require("./public/img/1.mp4"), require("./public/img/2.mp4"), 
        require("./public/img/3.mp4")]
      for (var i = 0 ; i < this.abnormalData.length; i++) {
        if (this.abnormalData[i].name == params.row.name) {
          var info = this.abnormalData[i]
          if (this.abnormalData[i].location) {   // 判断点坐标是否存在，数据不完全，之后可以删除这个判断条件
            await axios.get('http://' + this.abnormalData[i].location).then(res => {
              position = res.data.features[0].geometry.coordinates
              console.log(position)
            })
          }
        }
      }
      var list = [position, info, path, false]
      bus.$emit("mood", list)
    }
  },
  created() {
    this.getMonitorAbnormalTypeNumber();
    // 获取情绪异常用户具体信息
    this.getMonitorAbnormalUserInformation()
  },
};
</script>

<style scoped>
#abnormal {
  z-index: 10;
}
.el-icon-location-outline:hover {
  color: red;
}

/* 异常按钮 */
.leftMain_top {
  position: absolute;
  left: 5px;
  top: 10px;
  /* 照片拉伸 */
  object-fit:cover;
}
.leftMain_top ul {
  display: flex;
  align-items: left;
  display: -webkit-flex;
  margin: 10px 40px;
}
.leftMain_top ul li {
  margin-right: 40px;
  width: 120px;
}

/* 在异常按钮上悬浮变色 */
.leftMain_top ul li .liIn h3:hover {
  color: #f4e925;
}

.leftMain_top ul li:last-child {
  padding: 0;
}
.leftMain_top ul li .liIn {
  border: 0.8px solid rgba(14, 253, 255, 0.5);
  width: 100%;
  min-height: 80px;
  position: relative;
  padding: 10px 8px;
  color: #f4e925;
}
.leftMain_top ul li .liIn h3 {
  font-size: 18px;
  color: #fff;
  margin-bottom: 0.05rem;
}

/* 数字颜色 */
.leftMain_top ul li .liIn .blueshu {
  font-size: 28px;
  color: rgb(55,210,212);
  font-family: dig;
  margin-bottom: 0.02rem;
}
.leftMain_top ul li .liIn .pinkshu {
  font-size: 28px;
  color: rgb(253,108,136);
  font-family: dig;
  margin-bottom: 0.02rem;
}

.border_bg_leftTop {
  position: absolute;
  left: -1.6px;
  top: -9px;
  width: 74px;
  height: 9px;
  display: block;
  background: rgb(39, 65, 99) url(./public/img/title_left_bg.png) no-repeat;
  background-size: cover;
}
.border_bg_rightBottom {
  position: absolute;
  right: -2px;
  bottom: -2px;
  width: 16px;
  height: 16px;
  display: block;
  background: url(./public/img/title_right_bg.png) no-repeat;
  background-size: cover;
}
</style>