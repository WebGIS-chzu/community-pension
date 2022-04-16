<template>
  <div id="alarm">
    <div class="alarm-title">
      <span>急救页面</span>
    </div>
    <div class="alarm-content">
      <ul>
        <li class="title">
          <ul>
            <li>
              <span class="row">姓名</span>
              <span class="row">性别</span>
              <span class="row">姿态</span>
              <span class="row">处理情况</span>
            </li>
          </ul>
        </li>
        <li class="content">
          <vue-seamless-scroll :data="listData" :class-option="defaultOption">
            <ul class="ul-scoll">
              <li v-for="(item, index) in listData" :key="index">
                <span class="row">{{ item.name }}</span>
                <span class="row">{{ item.sex }}</span>
                <span class="row">{{ item.gesture }}</span>
                <span class="row handle" :style="{'background-color': item.handle==='未处理' ? 'rgba(248, 85, 85, 1)' : 'rgba(14,253,255,1)'}">{{ item.handle }}</span>
              </li>
            </ul>
          </vue-seamless-scroll>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getMonitorAbnormalUserInformation } from "network/timemonit"

export default {
  name: "Alarm",
  data() {
    return {
      listData: [
        // {
        //   name: "李花",
          // sex: "女",
          // gesture: "摔倒",
          // handle: "已处理",
        // },
      ],
    };
  },
  methods: {
    getMonitorAbnormalUserInformation() {
      var that = this;
      getMonitorAbnormalUserInformation({"abnormalName": "姿态异常"}).then((res) => {
        // console.log(res)
        if (res) {
          that.listData=[]
          for (let i = 0; i < res.data.result.length; i++) {
            var handle=""
            if (res.data.result[i].state==0){
              handle="未处理"
            }
            else{
              handle="已处理"
            }
            that.listData.push({
              "name": res.data.result[i].name,
              "sex": res.data.result[i].gender,
              "gesture": res.data.result[i].posture,
              "handle": handle,
            })
          }
        }
      })
    },
  },
  mounted() {
    var that = this;
    that.getMonitorAbnormalUserInformation();
  },
  // 监听属性 类似于data概念
  computed: {
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "PingFang";
  src: url("./public/font/PingFangMedium.ttf");
}

/* 设置警报处理样式 */
#alarm {
  position: absolute;
  bottom: 18%;
  left: 80px;
  width: 25%;
  height: 40%;
  border: 1px solid #222;
  background: url("./public/img/gz.png") rgba(0, 0, 0, 0.2);
}
.alarm-title {
  width: 100%;
  height: 15%;
  background: url(./public/img/title.png) no-repeat center;
  background-size: 60%;
  text-align: center;
  display: table;
  font-size: 0.5rem;
  padding: 1px auto;
  border-bottom: 1px solid rgba(14, 253, 255, 1);
}
.alarm-title span {
  display: table-cell;
  vertical-align: middle;
  color: rgba(14, 253, 255, 1);
  font-size: 20px;
}
.alarm-content {
  text-align: center;
  width: 100%;
  height: 85%;
  font-size: 17px;
  font-family: PingFangMedium;
  padding: 5px 10px;
}
.alarm-content ul {
  width: 100%;
  height: 100%;
}
.title {
  height: 10%;
  width: 100%;
  color: rgba(14, 253, 255, 1);
  font-size: 17px;
}
.title ul li {
  display: block;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  padding: 0px 7px;
}
.content {
  width: 100%;
  height: 90%;
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
  font-size: 15px;
  margin-top: 5px;
  color: #fff;
}
.content .ul-scoll li span:nth-child(5n+1){
  width: 24% !important;
  float: left;
  margin-right: 11%;
}
.content .ul-scoll li span:nth-child(5n+2){
  width: 24% !important;
  margin-right: 10%;
  float: left;
}
.content .ul-scoll li span:nth-child(5n+3){
  width: 24% !important;
  margin-right: 14%;
  float: left;
}
.content .ul-scoll li span:nth-child(5n+4){
  width: 24% !important;
  margin-right: 3%;
  float: left;
  color: rgba(0, 0, 0, 0.972);
  border-radius: 5px;
  font-weight: 700;
  font-size: 13px;
}
</style>