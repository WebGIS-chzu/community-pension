<template>
  <div id="worker">
    <div class="worker-bgc">
      <div class="worker-situation">
        <div class="woHeader">
          <span>
            <p class="p-1">{{type}}护工情况</p>
            <!-- <p class="p-2">Worker situation</p> -->
          </span>
          <span>\03</span>
        </div>
        <div class="woContent">
          <span class="data">
            <font class="font total"><animate-number from="0" :to="online" :key="online" /></font>
            <span class="data-title">人</span>
            <div class="data-title">护工在线数</div>
          </span>
          <span class="data">
            <font class="font work"><animate-number from="0" :to="serving" :key="serving" /></font>
            <span class="data-title">人</span>
            <div class="data-title">正在服务中</div>
          </span>        
        </div>
      </div>
      <div class="worker-evaluation">
        <div class="evHeader">
          <span>
            <p class="p-1">{{type}}护工评价分析</p>
            <!-- <p class="p-2">Worker evaluation</p> -->
          </span>
          <span>\04</span>
        </div>
        <div class="evContent">
          <div class="echarts">
            <WorkerEvaluation />
          </div>
          <div class="world-cloud">
            <WorldCloud />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WorkerNumber } from "network/serve"
import bus from "common/js/Bus.js";

import WorkerEvaluation from "./WorkerEvaluation";
import WorldCloud from "./WorldCloud";

export default {
  name: "Worker",
  data() {
    return {
      type: "",
      online: 0,
      serving: 0,
    }
  },
  components: {
    WorkerEvaluation,
    WorldCloud,
  },
  created() {
    this.WorkerNumber();
  },
  mounted() {
    var that = this;
    bus.$on("servetype", function(type) {
      that.type = type;
      that.WorkerNumber(type)
    })
  },
  methods: {
    WorkerNumber(type) {
      var that = this;
      WorkerNumber({"serviceType": type}).then((res) => {
        that.online = res.data.result[0].value
        that.serving = res.data.result[1].value
      })
    },
  },
}
</script>

<style scoped>
/*设置特殊字体*/
@font-face {
  font-family: 'font01';/*这里填写字体名*/
  src: url('../public/font/hooge0555.woff.ttf');
}

#worker {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 100%;
  width: 25%;
  background: url("../img/bor_1_3_1.png") no-repeat;
  background-size: 100% 85%;
  content: "";
}
#worker .worker-bgc {
  width: 100%;
  height: 85%;
  opacity: 0.9;
  background: rgba(18, 22, 64, 0.5);
}
/* 护工情况标题行 */
.woHeader {
	padding-top: 18px;
	overflow: hidden;
}
.woHeader span:first-child {
	float: left;
	margin-left: 29px;
	margin-top: 2px;
}
.woHeader span:first-child .p-1 {
	font-size: 20px;
	color: #fff;
}
.woHeader span:first-child .p-2 {
	font-size: 14px;
	color: #66dffb;
}
.woHeader span:last-child {
 	float: right;
 	font-size: 30px;
 	color: #7bb9ff;
  margin-right: 32px;
  margin-top: 2px;
}
/* 护工情况内容 */
.woContent {
	width: 100%;
	height: 90px;
	padding: .03rem .5rem .2rem .5rem;
	box-sizing: border-box;
	display: flex;
	justify-content : center;
}
.woContent .data {
	width: 190px;
	height: 100%;
  text-align: center;
  position: relative;
}
.font {
  font-size: 40px;
  font-weight: 650;
  font-family: font01;
}
.total {
  color: #daa94f;
}
.work {
  color: #47EBEA;
}
.data-title {
  font-size: 16px;
}
/* ****护工评价分析**** */
#worker .worker-evaluation:before {
  position: absolute;
  z-index: 2;
  top: 20%;
  right: 3px;
  width: 100%;
  height: 100%;
  background: url("../img/bor1_4.png") no-repeat;
  background-size: 100% 66%;
  content: "";
}
/* 护工评价标题行 */
.worker-evaluation .evHeader {
	padding-top: 40px;
	overflow: hidden;
}
.evHeader span:first-child {
	float: left;
	margin-left: 29px;
	margin-top: 2px;
}
.evHeader span:first-child .p-1 {
	font-size: 20px;
	color: #fff;
}
.evHeader span:first-child .p-2 {
	font-size: 14px;
	color: #66dffb;
}
.evHeader span:last-child {
 	float: right;
 	font-size: 30px;
 	color: #7bb9ff;
  margin-right: 32px;
  margin-top: 2px;
}
/* 护工评价内容 */
.worker-evaluation .evContent {
  position: absolute;
  height: 100%;
  width: 100%;
	padding: .03rem .5rem .2rem .5rem;
}
.evContent .echarts {
  width: 100%;
  height: 25%;
}
.evContent .world-cloud {
  width: 100%;
  height: 25%;
}
</style>