<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true,
    }
  },
  mounted() {
    // //此方法刷新页面时也会执行
    // window.addEventListener('beforeunload',()=>{
    //   // localStorage.removeItem("user");
    //   // window.localStorage.removeItem("user")
    //   // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    //   var storage = window.localStorage;
    //   storage.clear()
    // })
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function() {
         this.isRouterAlive = true
      })
    }

  },
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
