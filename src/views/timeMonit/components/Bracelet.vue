<template>
  <div id="bracelet">
    <div class="top">
      <vue-seamless-scroll
        :data="infos"
        class="seamless-warp"
        :class-option="defaultOption"
      >
        <ul class="ul-scoll">
          <li v-for="(item, index) in infos" :key="index" class="list">
            <div class="user_list">
              <!-- 背景框 -->
              <img src="~common/img/main_middle.png" />
              <!-- 头像 -->
              <img class="liImgLeft" :src="item.headurl" />
              <div class="list_text">
                <span>{{ item.name }}</span>
                <span style="margin-left:30px">用户ID: {{ item.userid }}</span>
                <br>
                <div  v-if="type=='血压'" style="font-weight: 550">
                  <span :style="{'color': color}">{{ type }}: {{ item.bloodpressure }}</span>
                  <span style="margin-left:30px"> 参考值: {{ item.bloodpressureRange }}</span>
                </div>
                <div  v-if="type=='体温'" style="font-weight: 550">
                  <span :style="{'color': color}">{{ type }}: {{ item.temperature }}</span>
                  <span style="margin-left:30px"> 参考值: {{ item.temperatureRange }}</span>
                </div>
                <div  v-if="type=='心率'" style="font-weight: 550">
                  <span :style="{'color': color}">{{ type }}: {{ item.heartrate }}</span>
                  <span style="margin-left:30px"> 参考值: {{ item.heartrateRange }}</span>
                </div>              
                <div  v-if="type=='倾斜'" style="font-weight: 550">
                  <span :style="{'color': color}">{{ type }}: {{ item.tilt }}</span>
                  <span style="margin-left:30px"> 参考值: {{ item.tiltRange }}</span>
                </div>
                <span>时间: {{ item.date }}</span>
              </div>
            </div>
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
    <div @click="btnRoll" class="bottom">{{ message }}</div>
  </div>
</template>

<script>
import bus from "common/js/Bus.js";
import vueSeamlessScroll from "vue-seamless-scroll";

import { getAbnormalUserByAbnormal } from "network/timemonit";

export default {
  name: "Bracelet",
  data() {
    return {
      unususal: false,
      message: "暂停滚动",
      i: 0,
      infos: [],
      step: 0.2,
      type: "血压",
      color: "rgb(55,210,212)",
    };
  },
  components: {
    vueSeamlessScroll,
  },
  created() {
  },
  mounted() {
    var that = this;
    that.getAbnormalUserByAbnormal("血压异常");
    // 从Unusual页面取值
    bus.$on("abnormal", async function (msg) {
      that.Info(msg[0]);
      await that.getAbnormalUserByAbnormal(msg[0]);
      that.unususal = msg[1];
    });
  },
  methods: {
    btnRoll() {
      if (this.message == "开始滚动") {
        this.message = "暂停滚动";
        this.step = 0.2;
      } else {
        this.message = "开始滚动";
        this.step = 0;
      }
    },
    sendInfo(item) {
      var position = [118.78740906715393, 32.049938868299904];
      var info = [item, position];
      bus.$emit("info", info);
    },
    // 手环滚动条
    getAbnormalUserByAbnormal(e) {
      getAbnormalUserByAbnormal({"abnormalName": e}).then((res) => {
        // console.log("res", res)
        if (res) {
          this.infos = res.data.result;
        }
      });
    },
    Info(type) {
      if (type == "血压异常") {
        this.color = "rgb(55,210,212)";
      }else if (type == "体温异常") {
        this.color = "rgb(253,108,136)";       
      }else if (type == "心率异常") {
        this.color = "rgb(246,209,14)";
      }else if (type == "倾斜异常") {
        this.color = "rgb(253,145,51)";
      }
      this.type = type.slice(0, 2);
    }
  },
  // 监听属性 类似于data概念
  computed: {
    defaultOption() {
      return {
        step: this.step, // 数值越大速度滚动越快
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
#bracelet {
  z-index: 10;
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 300px;
  height: calc(100% - 5px);
  background-color: rgba(18, 18, 18, 0.3);
}

/* 手表内容 */
.top {
  height: 82%;
}

/* 滚动设置 */
.seamless-warp {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 20px;
}

.list {
  /* border: 0.3px dashed rgba(255, 255, 255, 0.8);
  background-color: rgba(18, 18, 18, 0.6); */
  margin-bottom: 10px;
}

/* 按钮 */
.bottom {
  height: 18%;
  border-top: 1px solid #fff;
  text-align: center;
  font-size: 20px;
  padding-top: 15px;
}

/* 右侧滚动样式 */
.user_list {
  position: relative;
  /* float: left; */
  width: 100%;
  height: 95px;
  background: rgba(11, 76, 151, 0.1);
  margin-left: 1.875%;
  box-shadow: 1px 2px 10px 1px rgba(14, 252, 255, 0.53),
    inset 5px 4px 100px 1px rgba(14, 252, 255, 0.34);
}
.user_list .liImgLeft {
  position: absolute;
  top: 12%;
  left: 3%;
  width: 60px;
  height: 70px;
  /* 照片拉伸 */
  object-fit:cover;
}

.user_list img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.user_list:nth-child(1) {
  margin-left: 0;
}
.list_text span {
  font-size: 14px;
  color: #fff;
  text-indent: 0.8vw;
  position: relative;
  left: 85px;
  top: 5px;
  padding-top: 0.5vw;
}

/* .user_list span {
  display: inline-block;
  width: 100%;
  font-size: 1.4vw;
  font-weight: bold;
  color: white;
  text-align: center;
  letter-spacing: 0.2vw;
  margin-top: -0.5vw;
} */
</style>