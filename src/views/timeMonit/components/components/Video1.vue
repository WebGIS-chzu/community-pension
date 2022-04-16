<template>
    <!-- 视频 -->
    <div id="video1">
       <video class="bgvid" 
              style="width: 400px;height: 190px"
              :src="path"
              ref="video"
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
  name: "Video1",
  data() {
    return {
      path: "",
    }
  },
  mounted() {
    var that = this;
    // 当点击异常时，清空视频
    bus.$on("unsual", function(e) {
      that.path = ""
    })
    // 当点击另一个人时，清空视频
    bus.$on("mood", function(list) {
      that.path = ""
    })
    // 获取视频
    bus.$on("moodVideo", function(path) {
      that.path = path
    })
  },
  methods: {
    playVideo() {
      if (this.$refs.video.paused) {
        this.$refs.video.play();
      } else {
        this.$refs.video.pause();
      } 
    },    
  }
}
</script>

<style scoped>
#video1 {
  position: absolute;
  bottom: 18%;
  right: 20px;
  width: 400px;
  height: 200px;
  border: #1a3f72 solid 2px;
  background: rgba(11, 23, 63, 0.3);
  box-sizing: border-box;
}
/* 角标 */
.j_1 {
  width: 23px;
  height: 23px;
  position: absolute;
  top: -2px;
  left: -2px;
  border-left: 3px solid #00f7ff;
  border-top: 3px solid #00f7ff;
}
.j_2 {
  width: 23px;
  height: 23px;
  position: absolute;
  top: -2px;
  right: -2px;
  border-right: 3px solid #00f7ff;
  border-top: 3px solid #00f7ff;
}
.j_3 {
  width: 23px;
  height: 23px;
  position: absolute;
  bottom: -2px;
  left: -2px;
  border-left: 3px solid #00f7ff;
  border-bottom: 3px solid #00f7ff;
}
.j_4 {
  width: 23px;
  height: 23px;
  position: absolute;
  bottom: -2px;
  right: -2px;
  border-right: 3px solid #00f7ff;
  border-bottom: 3px solid #00f7ff;
}
</style>