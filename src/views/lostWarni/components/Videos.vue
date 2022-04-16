<template>
  <div id="videos">
    <video class="bgvid" 
          style="width: 310px;height: 190px; margin-left: 5px"
          :src="path"
          ref="videos"
          @click="playVideo()" />  
    <span class="j_1"></span>
    <span class="j_2"></span>
    <span class="j_3"></span>
    <span class="j_4"></span>
  </div>
</template>

<script>
import bus from "common/js/Bus.js";

export default {
  name: "Videos",
  data() {
    return {
      path: "",
    }
  },
  mounted() {
    var that = this;
    bus.$on("lostVideo", function(path) {
      that.path = path
    })
  },
  methods: {
    playVideo() {
      if (this.$refs.videos.paused) {
        this.$refs.videos.play();
      } else {
        this.$refs.videos.pause();
      } 
    },    
  }
}
</script>

<style scoped>
/* 左侧  */
#videos {
  position: absolute;
  bottom: 11%;
  left: 10px;
  width: 320px;
  height: 200px;
  border: #1a3f72 solid 2px;
  background: rgba(11, 23, 63, 0.3);
  box-sizing: border-box;
}
</style>