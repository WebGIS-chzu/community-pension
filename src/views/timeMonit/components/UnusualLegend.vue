<template>
  <div id="unusual-legend"> 
    <div class="legend">
      <h4>图例</h4>
      <div>
        <span class="dot" :style="{'color': this.color}">●</span>
        <span class="type">{{type}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "common/js/Bus.js";

export default {
  name: "UnusualLegend",
  data() {
    return {
      type: "血压异常",
      color: "rgb(55,210,212)"
    }
  },
  mounted() {
    var that = this;
    bus.$on("abnormal", function(list) {
      that.type = list[0]
      if (list[0] == "血压异常") {
        that.color = "rgb(55,210,212)"
      }else if (list[0] == "体温异常") {
        that.color = "rgb(253,108,136)"
      }else if (list[0] == "心率异常") {
        that.color = "rgb(246,209,14)"
      }else if (list[0] == "倾斜异常") {
        that.color = "rgb(253,145,51)"
      }
    })
  },
  methods: {
  },
}
</script>

<style scoped>
/* 图例 */
#unusual-legend {
  position: absolute;
  bottom: 15%;
  right: 25%;
  height: 13%;
  width: 12%;
  background: url("./public/img/zp.png") no-repeat;
  background-size: 100% 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  line-height: 18px;
}
.legend {
  /* border: 1px solid #222; */
  position: relative;
  width: 100%;
  height: 100%;
  left: 0;
  background: url("./public/img/gz.png") rgba(0,0,0,0.2);
  border-radius: 5px;
  padding: 10px;
}

.legend h4 {
  color: #73fdff;
  font-size: 14pt;
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
}
.legend div {
  float: right;
  color: #fff;
  font-size: 14pt;
  line-height: 30px;
  margin-right: 20px;
  margin-top: 10px;
}
.legend div span {
  vertical-align: middle;
  display: inline-block;
}
.legend div .dot {
  font-size: 60px;
  margin-right: 10px;
}
.legend div .type {
  align-self: center;
  /* margin-bottom: 20px; */
}
</style>