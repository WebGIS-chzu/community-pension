<template>
  <div id="consumeMessage">
    <div class="homeConsume">家庭消费记录</div>
    <vue-seamless-scroll
      :data="infos"
      class="seamless-warp"
      :class-option="defaultOption"
    >
      <ul class="ul-scoll">
        <li v-for="(item, index) in infos" :key="index" class="list">
          <div class="user_list">
            <div class="list_text">
              <span class="name">{{ item.name }}</span>
              <span class="date">时间: {{ item.date }}</span>
              <br />
              <br />
              <span class="position">门牌号：{{ item.position }}</span>
                <el-divider class="tableHeaderDivider"></el-divider>
                <span class="tdHeader">消费类型</span>
                <el-divider
                  class="verticalDivider"
                  direction="vertical"
                ></el-divider>
                <span class="tdcost">水费</span>
                <span class="tdcost">电费</span>
                <span class="tdcost">气费</span>
                <el-divider class="tableDivider"></el-divider>
                <span class="tdmid">消费/¥</span>
                <el-divider
                  class="verticalDivider"
                  direction="vertical"
                ></el-divider>
                <span class="tdnumber">{{ item.water }}</span>
                <span class="tdnumber">{{ item.electric }}</span>
                <span class="tdnumber">{{ item.gas }}</span>
                <el-divider class="tableDivider"></el-divider>
                <span class="tdHeader">正常范围</span>
                <el-divider
                  class="verticalDivider"
                  direction="vertical"
                ></el-divider>
                <span class="tdrange">{{ item.WaterNormalRange }}</span>
                <span class="tdrange">{{ item.ElectricalNormalRange }}</span>
                <span class="tdrange">{{ item.GassNormalRange }}</span>
                <el-divider class="tableDivider"></el-divider>
              </div>
            </div>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import { getWpgRecord } from "network/timemonit";

export default {
  name: "ConsumeMessage",
  data() {
    return {
      step: 0.3,
      infos: [],
      OrderDataLine: [],
    };
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

  methods: {
    getWpgRecord() {
      var that = this;
      getWpgRecord().then((res) => {
        console.log("家庭消费", res);
        if (res) {
          that.infos=[]
          for (let i = 0; i < res.data.result.length; i++) {
            that.infos.push({
              "name": res.data.result[i].name,
              "position": res.data.result[i].address,
              "date": res.data.result[i].date,
              "water": res.data.result[i].waterrate,
              "WaterNormalRange": res.data.result[i].waterType,
              "electric": res.data.result[i].powerrate,
              "ElectricalNormalRange": res.data.result[i].powerType,
              "gas": res.data.result[i].gascost,
              "GassNormalRange": res.data.result[i].gasType,
            })
          }
        }
        // that.waterAbnormalNum = res.data.result[0].value;
        // that.powerAbnormalNum = res.data.result[1].value;
        // that.gassAbnormalNum = res.data.result[2].value;
      });
    },
  },

  created() {
    this.getWpgRecord();
  }
};
</script>

<style scoped>
#consumeMessage {
  position: absolute;
  width: 20%;
  height: 100%;
  top: 0%;
  right: 0%;
  /* margin: 0 4%; */
  /* color: rgba(132, 223, 230, 0.924); */
  background: rgba(11, 23, 63, 0.3);
  /* background-color: rgba(255, 255, 255, 0.2); */
  z-index: 10;
}
.homeConsume {
  position: relative;
  text-align: center;
  font-size: 20px;
  margin: 2%;
  padding: 5%;
  background: rgba(11, 23, 63, 0.3);
  /* background-color: rgba(255, 255, 255, 0.2); */
}
.seamless-warp {
  width: 100%;
  height: 80%;
  overflow: hidden;
}
.user_list {
  font-size: 12px;
  margin: 2%;
  padding: 5% 10% 5% 10%;
  background: rgba(11, 23, 63, 0.3);
  /* background-color: rgba(255, 255, 255, 0.2); */
}
.name,
.position {
  margin: 5%;
}
.date {
  margin-left: 30%;
}
.tableHeaderDivider {
  height: 3px;
  margin: 5% 0 0 0;
}
.tableDivider {
  height: 1px;
  margin: 0;
}
.verticalDivider {
  margin: 0;
  width: 1px;
  height: 40px;
}
.tdHeader {
  margin: 10px;
}
.tdmid{
  margin: 16.3px;
}
.tdcost{
  margin: 15.4px 20px;
}
.tdnumber{
  margin: 11.9px 23px;
}
.tdrange{
  margin: 9.49px 13px;
}

.user_list {
  padding-left: 5%;
  padding-right: 5%;
}
</style>