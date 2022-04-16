<template>
  <div id="serve-type">
    <div class="serve-content">
      <div class="seHeader">
        <span>
          <p class="p-1">服务内容</p>
          <!-- <p class="p-2">Service content</p> -->
        </span>
        <span>\01</span>
      </div>
      <div class="con">
        <ul>
          <li>
            <span>
              <div class="picture">
                <a href='javascript:;' @click="Content('医疗服务')">
                  <svg-icon icon-class="medical" :style="{'color': type==='医疗服务' ? 'rgba(14,253,255,1)' : '#ffffff'}"/>
                </a>
              </div>
              <h2 :style="{'color': type==='医疗服务' ? 'rgba(14,253,255,1)' : '#ffffff'}">医疗服务</h2>
            </span>                
            <span>
              <div class="picture">
                <a href='javascript:;'  @click="Content('心理慰藉')">
                  <svg-icon icon-class="mind" style="margin-top: 10px" :style="{'color': type==='心理慰藉' ? 'rgba(14,253,255,1)' : '#ffffff'}"/>
                </a>
              </div>
              <h2 :style="{'color': type==='心理慰藉' ? 'rgba(14,253,255,1)' : '#ffffff'}">心理慰籍</h2>
            </span>                
            <span>
              <div class="picture">
                <a href='javascript:;'  @click="Content('家政服务')" >
                  <svg-icon icon-class="housekeeping" :style="{'color': type==='家政服务' ? 'rgba(14,253,255,1)' : '#ffffff'}"/>
                </a>                
              </div>
              <h2 :style="{'color': type==='家政服务' ? 'rgba(14,253,255,1)' : '#ffffff'}">家政服务</h2>
            </span>                
            <span>
              <div class="picture">
                <a href='javascript:;'  @click="Content('家庭便利')">
                  <svg-icon icon-class="deliver" :style="{'color': type==='家庭便利' ? 'rgba(14,253,255,1)' : '#ffffff'}"/>
                </a>  
              </div>
              <h2 :style="{'color': type==='家庭便利' ? 'rgba(14,253,255,1)' : '#ffffff'}">家庭便利</h2>
            </span>                
            <span>
              <div class="picture">
                <a href='javascript:;'  @click="Content('休闲娱乐')" >
                  <svg-icon icon-class="entertainment"  :style="{'color': type==='休闲娱乐' ? 'rgba(14,253,255,1)' : '#ffffff'}"/>
                </a> 
              </div>
              <h2 :style="{'color': type==='休闲娱乐' ? 'rgba(14,253,255,1)' : '#ffffff'}">休闲娱乐</h2>
            </span>
          </li>
        </ul>
      </div>       
    </div>
    <div class="serve-order">
      <div class="orHeader">
        <span>
          <p class="p-1">服务订单情况</p>
          <!-- <p class="p-2">Service orders</p> -->
        </span>
        <span>\02</span>
      </div>
      <div class="orContent">
        <div class="title">
          <ul>
            <li>
              <span class="row">时间</span>
              <span class="row">服务对象</span>
              <span class="row">服务类型</span>
              <span class="row">服务人员</span>
              <span class="row">状态</span>
            </li>
          </ul>
        </div>
        <div class="content">
        <vue-seamless-scroll 
          :data="this.orders" 
          class="warp" 
          :class-option="defaultOption"
          ref="seamlessScroll">
            <ul class="ul-scoll"> 
              <li v-for="(item, index) in this.orders" :key="index">
                <span class="row name">{{ item.time }}</span>
                <span class="row">{{ item.oldName }}</span>
                <span class="row type">{{ item.type }}</span>
                <span class="row">{{ item.workerName}}</span>
                <span class="row" :style="{'background-color': item.state==='进行中' ? 'rgba(14,253,255,1)' : 'rgba(248, 85, 85, 1)'}">{{ item.state}}</span>
              </li>
            </ul>
        </vue-seamless-scroll>
        </div>
      </div>        
    </div>       
  </div>
</template>

<script>
import { ServiceOrders } from "network/serve"
import bus from "common/js/Bus.js";

export default {
  name: "ServeType",
  data() {
    return {
      allData: [],
      orders: [],
      type: '',
    }
  },
  created() {
  },
  mounted() {
    this.ServiceOrders();
  },
  methods: {
    ServiceOrders() {
      var that = this;
      ServiceOrders({"serviceType": ""}).then((res) => {
        // console.log("serve", res.data.result)
        if (res) {
          that.allData = res.data.result
          for (var i = 0; i < this.allData.length; i++) {
            this.orders.push({
              "time": this.allData[i].date,
              "oldName": this.allData[i].userName,
              "type": this.allData[i].serviceName,
              "workerName": this.allData[i].nursingName,
              "state": this.allData[i].serviceState,
            })
          }
          this.$refs.seamlessScroll.reset();
        }
      })
    },
    Content(type) {
      bus.$emit("servetype", type)
      this.type = type
      this.orders = []
      if (this.allData.length) {
        for (var i = 0; i < this.allData.length; i++) {
          if (type == this.allData[i].serviceName) {
            this.orders.push({
              "time": this.allData[i].date,
              "oldName": this.allData[i].userName,
              "type": this.allData[i].serviceName,
              "workerName": this.allData[i].nursingName,
              "state": this.allData[i].serviceState,
            })
          }
        }
        this.$refs.seamlessScroll.reset();        
      }
      // console.log("this.orders", this.orders)
    }
  },
  // 监听属性 类似于data概念
  computed: {
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
}
</script>

<style scoped>
#serve-type {
  position: absolute;
  top: 10px;
  left: 10px;
  height: 100%;
  width: 25%;
}
/* 服务内容样式 */
#serve-type .serve-content {
  width: 100%;
  height: 22%;
}
#serve-type .serve-content {
  opacity: 0.9;
  background: rgba(18, 22, 64, 0.5);
}
#serve-type .serve-content:after {
  position: absolute;
  right: 0;
  bottom: 65%;
  width: 5%;
  min-width: 20px;
  height: 13%;
  min-height: 50px;
  background: url("../img/bor1_1_xie.png") no-repeat;
  background-size: 80% 50%;
  z-index: 50;
  content: "";
}
#serve-type .serve-content:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 22%;
  background: url("../img/bor1_5.png") no-repeat;
  background-size: 100% 100%;
  z-index: 10;
  content: "";
}
/* 服务内容标题行 */
.seHeader {
	padding-top: 18px;
	overflow: hidden;
}
.seHeader span:first-child {
	float: left;
	margin-left: 29px;
	margin-top: 8px;
}
.seHeader span:first-child .p-1 {
	font-size: 20px;
	color: #fff;
}
.seHeader span:first-child .p-2 {
	font-size: 14px;
	color: #66dffb;
}
.seHeader span:last-child {
 	float: right;
 	font-size: 30px;
 	color: #7bb9ff;
  margin-right: 32px;
  margin-top: 10px;
 }
 /* 服务内容的按钮样式 */
#serve-type .serve-content .con {
  position: relative;
  height: 80%;
  margin: 0 0 3% 3%;
  color: #fff;
  overflow: hidden;
}
#serve-type .serve-content .con ul {
  position: absolute;
  top: 6px;
  width: 100%;
  height: 80%;
}
#serve-type .serve-content .con li {
  height: 40%;
}
#serve-type .serve-content .con li span {
  display: inline-block;
  height: 100%;
  width: 20%;
}
#serve-type .serve-content .con li span .picture {
  /* position: absolute; */
  width: 100%;
  height: 100%;
  background: url("../public/img/iconbg.png") no-repeat;
  background-size: 40px 40px;
  margin-left: 5px;
  z-index: 0;
}
#serve-type .serve-content .con li .svg-icon {
  position: absolute;
  color: #fff;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-top: 8px;
  z-index: 1000;
}
#serve-type .serve-content .con li .svg-icon:hover {
  color:#66dffb !important;
}
#serve-type .serve-content .con li h2{
  position: absolute;
  font-size: 14px;
  color: #fff;
  top: 42px;
}
#serve-type .serve-content .con li:nth-child(2) h2{
  position: absolute;
  font-size: 14px;
  color: #07bffb;
  top: 120px;
}
/* 服务订单样式 */
#serve-type .serve-order {
  width: 100%;
  height: 63%;
}
#serve-type .serve-order {
  opacity: 0.9;
  background: rgba(18, 22, 64, 0.5);
}
#serve-type .serve-order:before {
  content: "";
  position: absolute;
  top: 28%;
  right: -0%;
  z-index: 100;
  width: 15%;
  height: 7%;
  background: url("../img/bor1_2_square.png") no-repeat;
  background-size: 100%;
  z-index: 10;
}
#serve-type .serve-order:after {
  position: absolute;
  top: 25%;
  left: 0;
  width: 100%;
  height: 60%;
  background: url("../img/bor1_2.png") no-repeat;
  background-size: 100% 100%;
  content: "";
}
/* 服务内容标题行 */
.orHeader {
	padding-top: 18px;
	/* overflow: hidden; */
}
.orHeader span:first-child {
	float: left;
	margin-left: 29px;
	margin-top: 42px;
}
.orHeader span:first-child .p-1 {
	font-size: 20px;
	color: #fff;
}
.orHeader span:first-child .p-2 {
	font-size: 14px;
	color: #66dffb;
}
.orHeader span:last-child {
  float: right;
  font-size: 30px;
  color: #7bb9ff;
  margin-right: 32px;
  margin-top: 45px;
}
/* 服务订单内容 */
.orContent {
  position: relative;
  height: 90%;
  margin: 6% 0 1% 1%;
  color: #fff;
}
.orContent .title {
  height: 12%;
  width: 100%;
  color: #fff;
  font-size: 14px;
}
.title ul li {
  display: block;
  height: 30px;
  line-height: 30px;
  display: flex;
  width: 100%;
  font-size: 15px;
  color: rgba(14,253,255,1);
}
.title ul li span:nth-child(1) {
  width: 33% !important;
  float: left;
  /* text-align: center; */
  margin-left: 5px;
}
.title ul li span:nth-child(2) {
  width: 19% !important;
  margin-left: 10px;
  float: left;
}
.title ul li span:nth-child(3) {
  width: 19% !important;
  margin-left: 8px;
  float: left;
}
.title ul li span:nth-child(4) {
  width: 19% !important;
  margin-right: 13px;
  float: left;
}
.title ul li span:nth-child(5) {
  width: 10% !important;
  margin-right: 5px;
  float: left;
}
.content {
  width: 100%;
  height: 75%;
  margin-top: 50px;
  overflow: hidden;
}
.content .ul-scoll {
  list-style: none;
  padding: 0;
  margin: 0 auto;
}
.content .ul-scoll li {
  display: block;
  height: 30px;
  line-height: 30px;
  display: flex;
  margin-top: 8px;
  /* justify-content: space-between; */
  font-size: 14px;
}
.content .ul-scoll li span:nth-child(5n+1){
  font-size: 10px;
  width: 40% !important;
  float: left;
  margin-left: 5px;
}
.content .ul-scoll li span:nth-child(5n+2){
  width: 19% !important;
  margin-left: 7px;
  float: left;
}
.content .ul-scoll li span:nth-child(5n+3){
  width: 19% !important;
  margin-left: 7px;
  float: left;
}
.content .ul-scoll li span:nth-child(5n+4){
  width: 19% !important;
  margin-left: 11px;
  float: left;
}
.content .ul-scoll li span:nth-child(5n+5){
  width: 15% !important;
  margin-left: 2px;
  float: left;
  text-align: center;
  font-size: 12px;
  color: black;
  font-weight: bold;
  border-radius: 5px;
  margin-right: 5px;
}
</style>