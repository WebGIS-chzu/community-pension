<template>
  <div id="social-match">
    <!-- 左上 -->
    <div class="background">
      <el-radio-group
        v-model="radio1"
        size="small"
        id="socialFunction"
        @change="show(radio1)"
      >
        <el-radio-button label="社交图谱"></el-radio-button>
        <el-radio-button label="智能推荐"></el-radio-button>
        <el-radio-button label="社区活动"></el-radio-button>
      </el-radio-group>
      <!-- <h2 style="z-index: 10000"> {{ one }} </h2> -->
    </div>
    <div class="page">
      <component :is="this.comp"></component>
    </div>
  </div>
</template>

<script>
import SocialGraph from "./components/SocialGraph";
import IRecommend from "./components/IRecommend";
import Community from "./components/Community";
import bus from "common/js/Bus.js";

export default {
  name: "SocialMatch",
  data() {
    return {
      radio1: "社交图谱",
      comp: "SocialGraph",
      try: "",
    };
  },
  components: {
    SocialGraph,
    IRecommend,
    Community,
  },
  mounted() {
    var that = this;
    // console.log("11111")
    // that.one = this.$route.params.a
  
    // if (this.$route.query.temp) {
    //   this.one = this.$route.query.temp;
    //   console.log("that.one", that.one)
    // }
  },
  methods: {
    show(radio1) {
      // console.log(this.comp)
      if (radio1 == "社交图谱"){
        this.comp = "SocialGraph"
      }else if (radio1 == "智能推荐"){
        this.comp = "IRecommend"
      }else if (radio1 == "社区活动"){
        this.comp = "Community"
      }
    }
  },
};
</script>

<style scoped>
#social-match {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("~common/img/bg.png") no-repeat;
  background-size: 100%;
}

/* 左上 */
.background {
  position: relative;
  margin-top: 0;
  width: 25%;
  height: 24%;
  background: url("~common/img/tip-bg.png") no-repeat;
  background-size: 100% 100%;
  z-index: 10;
}
.background .el-radio-group {
  position: absolute;
  top: 40%;
  left: 33%;
}
::v-deep .el-radio-button--small .el-radio-button__inner{
  padding: 9px;
}
/* 左下以及右侧 */
.page {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>