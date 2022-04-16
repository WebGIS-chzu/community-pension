<template>
  <div id="router">
    <div class="navbar">
      <el-menu
        router
        :default-active="this.$route.path"
        class="el-menu"
        mode=" vertical"
        active-text-color="#f4e925">
        <el-menu-item
          class="el-menu-item"
          v-for="(item, index) in $router.options.routes[0].children[1].children[1].children"
          :index="'/timeMonit/' + item.path"
          :class="$route.path == item.path ? 'is-active' : ''">
          <template slot="title">
            <el-tooltip class="item" effect="dark" :content="item.name" placement="right-end">
              <i :class="item.meta.icon" class="imgz"></i>
            </el-tooltip>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Router",
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style scoped>
#router {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
}
.navbar {
  position: absolute;
  width: 40px;
  height: calc(100%);
  background-color: rgba(255, 255, 255, 0);
  top: 0;
  left: 0;
  z-index: 99;
}
.el-menu {
  position: absolute;
  width: 40px;
  height: calc(100%);
  background-color:rgba(255, 255, 255, 0);
  top: 0;
  left: 0;
  color: white;
  z-index: 99;
  border-right: 0px;
  margin-top: 200px;
  /* 照片拉伸 */
  object-fit:cover;
}
.el-menu-item {
  color: white;
  font-size: 18px;
  /* 照片拉伸 */
  object-fit:cover;
}
.content {
  position: absolute;
  width: calc(100%);
  height: calc(100%);
  top: 0;
  left: 0px;
  z-index: 0;
}
.el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0);
}
.imgz {
  color: #fff;
  font-size: 30px;
}
</style>