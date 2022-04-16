<template>
  <div id="searchlegend"> 
    <div class="oldlegend legend" v-show="show">
      <h4>图例</h4>
      <div>
        <span class="portraitspan"><img class="portrait" src="http://1.15.241.95:9000/otherpicture/老人图标.png"></span>
        <span class="type">老人</span>
      </div>
    </div>
    <div class="workerlegend legend" v-show="!show">
      <h4>图例</h4>
      <div>
        <span class="portraitspan"><img class="portrait" src="http://1.15.241.95:9000/otherpicture/护工图标.png"></span>
        <span class="type">护工</span>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "common/js/Bus.js";

export default {
  name: "SearchLegend",
  data() {
    return {
      show: true,
      color: "rgb(55,210,212)"
    }
  },
  mounted() {
    var that=this;
    bus.$on("character", function(value) {
      if (value == "老人") {
        that.show = true;
      }else if (value == "护工") {
        that.show = false;
      }
    })
  },
  methods: {
  },
}
</script>

<style scoped>
/* 图例 */
#searchlegend {
  position: absolute;
  bottom: 45%;
  right: 1%;
  height: 13%;
  width: 12%;
  background: url("~common/img/zp.png") no-repeat;
  background-size: 100% 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  line-height: 18px;
  z-index: 10;
}
.legend {
  /* border: 1px solid #222; */
  position: relative;
  width: 100%;
  height: 100%;
  left: 0;
  background: url("~common/img/gz.png") rgba(0,0,0,0.2);
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
  margin-right: 50px;
  margin-top: 10px;
}
.legend div span {
  vertical-align: middle;
  display: inline-block;
}
.legend div .portraitspan {
  font-size: 60px;
  margin-right: 10px;
}
.legend div .portraitspan .portrait{
  width: 20px;
  margin-bottom: 8px;
}
.legend div .type {
  align-self: center;
  /* margin-bottom: 20px; */
}
</style>