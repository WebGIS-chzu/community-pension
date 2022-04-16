<template>
  <div id="unususal">
    <div class="leftMain_top">
      <div class="leftMain_topIn">
        <ul>
          <li>
            <div class="liIn">
              <h3 @click="abnormol('血压异常')" :style="{'color': type=='血压异常' ? 'rgb(55,210,212)':'#ffffff'}">血压异常</h3>
              <animate-number from="0" :to="this.bloodPressure" class="blueshu" :key="this.bloodPressure"/>
              <span class="border_bg_leftTop"></span>
              <span class="border_bg_rightTop"></span>
              <span class="border_bg_leftBottom"></span>
              <span class="border_bg_rightBottom"></span>
            </div>
          </li>
          <li>
            <div class="liIn">
              <h3  @click="abnormol('体温异常')" :style="{'color': type=='体温异常' ? 'rgb(253,108,136)':'#ffffff'}">体温异常</h3>
              <animate-number from="0" :to="this.temperature" class="pinkshu" :key="this.temperature"/>
              <span class="border_bg_leftTop"></span>
              <span class="border_bg_rightTop"></span>
              <span class="border_bg_leftBottom"></span>
              <span class="border_bg_rightBottom"></span>
            </div>
          </li>
          <li>
            <div class="liIn">
              <h3 @click="abnormol('心率异常')" :style="{'color': type=='心率异常' ? 'rgb(246,209,14)':'#ffffff'}">心率异常</h3>
              <animate-number from="0" :to="this.heartRate" class="yellowshu" :key="this.heartRate"/>
              <span class="border_bg_leftTop"></span>
              <span class="border_bg_rightTop"></span>
              <span class="border_bg_leftBottom"></span>
              <span class="border_bg_rightBottom"></span>
            </div>
          </li>
          <li>
            <div class="liIn">
              <h3 @click="abnormol('倾斜异常')" :style="{'color': type=='倾斜异常' ? 'rgb(253,145,51)':'#ffffff'}">倾斜异常</h3>
              <animate-number from="0" :to="this.lean" class="orangeshu" :key="this.lean"/>
              <span class="border_bg_leftTop"></span>
              <span class="border_bg_rightTop"></span>
              <span class="border_bg_leftBottom"></span>
              <span class="border_bg_rightBottom"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "common/js/Bus.js";

import { getBraceletAbnormalTypeNumber } from "network/timemonit";

export default {
  name: "Unususal",
  data() {
    return {
      data: "",
      bloodPressure: 0,
      temperature: 0,
      heartRate: 0,
      lean: 0,
      type: '血压异常',
    };
  },
  methods: {
    abnormol(e) {
      this.type = e;
      var list = [e, true];
      bus.$emit("abnormal", list);
    },
    // 手环异常人数
    getBraceletAbnormalTypeNumber() {
      getBraceletAbnormalTypeNumber().then((res) => {
        this.bloodPressure = parseInt(res.data.result[2].value);
        this.temperature = parseInt(res.data.result[0].value);
        this.heartRate = parseInt(res.data.result[1].value);
        this.lean = parseInt(res.data.result[3].value);
        // console.log(res);
      });
    },
  },
  created() {
    this.getBraceletAbnormalTypeNumber();
  },
};
</script>

<style scoped>
#unususal {
  z-index: 10;
}

#unususal #lists {
  position: absolute;
  left: 5px;
  top: 10px;
  width: 200px;
  height: 500px;
  z-index: 10;
}

#unususal #lists li {
  background-color: rgba(18, 18, 18, 0.4);
  height: 100px;
  margin: 20px 0;
  position: relative;
}

#unususal #lists li .list {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 100%;
}

#unususal #lists li .word {
  position: absolute;
  top: 20px;
  text-align: center;
  width: 100%;
  font-size: 18px;
  color: #fff;
}

#unususal #lists li .number {
  position: absolute;
  top: 45px;
  text-align: center;
  height: 55px;
  line-height: 55px;
  width: 100%;
  font-size: 28px;
  color: #fff;
}

#unususal #lists li .word:hover {
  color: rgba(43, 197, 202, 0.9);
}




/* 上方四块 */
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

/* 在四块上悬浮变色 */
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
.leftMain_top ul li .liIn .yellowshu {
  font-size: 28px;
  color: rgb(246,209,14);
  font-family: dig;
  margin-bottom: 0.02rem;
}
.leftMain_top ul li .liIn .orangeshu {
  font-size: 28px;
  color: rgb(253,145,51);
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
  background: rgb(39,65,99) url(./public/img/title_left_bg.png) no-repeat;
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