<template>
  <div id="social-graph">
    <div class="left">
      <ul class="left-color">
        <li class="find">
          <span class="title">人员查询</span>
          <ul>
            <!-- 搜索框 -->
            <li class="activitySearch">
              <el-input
                placeholder="请输入所查询老人的ID"
                v-model="activityid"
                class="searchingInput"
                size="small"
                style="width: 280px"
              >
              <el-button
                slot="append"
                icon="el-icon-search"
                size="small"
                @click="showOld(activityid)"
              ></el-button>
              </el-input>
            </li>
            <li class="isShow">
              <el-radio-group v-model="radio">
                <el-radio :label="1">显示社交关系</el-radio>
                <el-radio :label="2">隐藏社交关系</el-radio>             
              </el-radio-group>
            </li>
            <li class="relationship">
              <relationship v-show="radio==1"/>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <s-map />
  </div>
</template>

<script>
import bus from 'common/js/Bus.js'

import Relationship from "./Relationship"
import SMap from "./SMap"

export default {
  name: "SocialGraph",
  data() {
    return {
      radio: 1,
      activityid: "",
    }
  },
  components: {
    Relationship,
    SMap,
  },
  mounted() {},
  methods: {
    showOld(activityid) {
      bus.$emit("activityid", activityid)
    }
  },
}
</script>

<style scoped>
#social-graph {
  position: absolute;
  width: 100%;
  height: 100%;
}
/* 设置左侧的样式 */
.left {
  position: absolute;
  bottom: 13%;
  width: 23%;
  height: 62%;
  background: rgba(18, 22, 64, 0.5) !important;
  z-index: 10;
}
.left-color {
  width: 100%;
  height: 100%;
  /* opacity: 0.9; */
  background: url("../public/img/invalid.png") no-repeat;
  background-size: 100% 100%;
}
/* 标题行的设置 */
.find .title {
  position: absolute;
  top: 1%;
  left: 10%;
  font-size: 18px;
}
/* 输入框样式 */
.activitySearch {
  position: relative;
  top: 26px;
  left: 20px;
}
::v-deep .activitySearch .el-input__inner {
  background-color: transparent;
  border-color: rgb(15, 248, 255);
  color: #fff;
}
/* 搜索按钮样式 */
.activitySearch .el-button:focus,
.activitySearch .el-button:hover {
  color: #fff;
  background-color: rgba(14, 252, 255, 0.3);
}
.activitySearch .el-button--small {
  color: #0efcff;
  background-color: rgb(58, 104, 168);
  border-color: #0efcff;
}
/* 单选按钮样式 */
.isShow, .relationship {
  position: relative;
  top: 30px;
  left: 20px;
}
.el-radio {
  color: #fff;
}
</style>