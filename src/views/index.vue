<template>
  <div class="bg">
    <header style="top:-4px">
      <!-- 标题 -->
      <div class="gifImg">
        <span class="month-tip">城市社区智慧养老服务与管理系统</span>
      </div>
      <!-- 导航栏 -->
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-demo fl"
        mode="horizontal"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#f4e925"
      >
        <el-menu-item
          class="el-menu-item"
          v-for="(item, index) in $router.options.routes[0].children[1].children"
          :index="item.redirect || item.path"
          :class="$route.path == (item.redirect || item.path) ? 'is-active' : ''"
        >
        <!-- 导航栏的路径==配置路由的路径时，处于选中状态 -->
          <template slot="title">
            <div>
              {{ item.name }}
            </div>
          </template>
        </el-menu-item>
        </el-menu>

        <el-menu
        router
        :default-active="$route.path"
        class="el-menu-demo fr"
        mode="horizontal"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#f4e925"
      >
        <el-menu-item
          class="el-menu-item"
          v-for="(item, index) in $router.options.routes[0].children[2].children"
          :index="item.path"
          :class="$route.path == (item.redirect || item.path) ? 'is-active' : ''"
        >
          <div>
            <!-- <i class="el-icon-message"></i> -->
            {{ item.name }}
          </div>
        </el-menu-item>
      </el-menu>
    </header>

    <!-- 中间主体 -->
    <el-main class="el-main">
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  watch: {
    $route() {
      let i = this.$route.path;
    },
  },
};
</script>

<style scoped>
.bg {
  background: url("../common/img/bg.png") no-repeat;
  background-size: 100%;
}
.el-main {
  padding: 0 !important;
}
.el-menu-demo {
  padding: 30px 0px 0px 0px;
}
.el-menu-item {
  /* 点击出来的下划线进行隐藏 */
  border-bottom: none !important;
  /* 导航栏的间距等样式 */
  padding: 0 0px !important;
  /* 修改高度 */
  height: 30px !important;
  line-height: 30px !important;
}
/* 整体的下划线进行隐藏 */
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}
/* 点击出来的下划线动效残留进行隐藏 */
.el-menu--horizontal > .el-menu-item {
  border-bottom: none;
}
/* 点击以后的背景色进行隐藏 */
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: rgba(0, 0, 0, 0) !important;
}

/* 四角标 */
 .el-menu-demo .el-menu-item {
  display: inline-block;
  position: relative;
  margin: 0px 25px 0 ;
}
 .el-menu-demo .el-menu-item div {
  display: block;
  font-size: 18px;
  /* color: #fff; */
  line-height: 30px;
  padding: 0 10px;
}
.el-menu-demo .el-menu-item:before,
.el-menu-demo .el-menu-item:after {
  position: absolute;
  width: 10px;
  height: 5px;
  opacity: 0.8;
  content: '';
  border-top: 2px solid #02a6b5;
  top: -1px;
  border-radius: 2px;
}
.el-menu-demo .el-menu-item:before,
.el-menu-demo .el-menu-item div:before {
  border-left: 2px solid #02a6b5;
  left: -1px;
}
.el-menu-demo .el-menu-item:after,
.el-menu-demo .el-menu-item div:after {
  border-right: 2px solid #02a6b5;
  right: -1px;
}
.el-menu-demo .el-menu-item div {
  position: relative;
}
.el-menu-demo .el-menu-item div:before,
.el-menu-demo .el-menu-item div:after {
  position: absolute;
  width: 10px;
  height: 5px;
  opacity: 0.8;
  content: '';
  border-bottom: 2px solid #02a6b5;
  bottom: -1px;
  border-radius: 2px;
}
 .el-menu-demo .el-menu-item div:hover {
  color: #f4e925;
}
.el-menu-demo .el-menu-item div:hover:before,
.el-menu-demo .el-menu-item div:hover:after,
.el-menu-demo .el-menu-item:hover:before,
.el-menu-demo .el-menu-item:hover:after {
  border-color: #f4e925;
  opacity: 1;
}
</style>
