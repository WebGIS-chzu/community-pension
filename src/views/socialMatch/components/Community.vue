<template>
  <div id="Community">
    <div class="root-wrap">
      <!-- 左上 -->
      <div class="main clearfix">
        <div class="aside-left fl">
          <!-- 左中 地图 -->
          <div class="pie clearfix">
            <c-map />
          </div>

          <!-- 左下 -->
          <div class="publish">
            <h3>活动内容</h3>
            <div id="bar">
              <el-form
                :label-position="'left'"
                label-width="80px"
                :model="formActivities"
                size="mini"
              >
                <el-form-item label="名称">
                  <el-input
                    placeholder="例：象棋之王"
                    v-model="formActivities.activityName"
                    style="z-index: 10"
                  ></el-input>
                </el-form-item>
                <el-form-item label="地点">
                  <el-input
                    placeholder="例：棋牌室"
                    v-model="formActivities.location"
                    style="z-index: 10"
                  ></el-input>
                </el-form-item>
                <el-form-item label="时间">
                  <el-input
                    placeholder="例：2021-3-7 9:00~2021-3-7 11:00"
                    v-model="formActivities.date"
                    style="z-index: 10"
                  ></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                  <el-input
                    placeholder="例：林峰"
                    v-model="formActivities.director"
                    style="z-index: 10"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-select
                    v-model="formActivities.label"
                    placeholder="活动类型"
                    class="type"
                  >
                    <el-option
                      v-for="item in activetype"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  <el-button @click="onSubmit">发布活动</el-button>
                  <!--  size="small"不起作用 -->
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <!-- 中间 -->
        <div class="middle-map fl">
          <div class="map-wrap">
            <!-- 搜索框 -->
            <div class="activitySearch">
              <p class="serchLabel">活动名称</p>
              <el-input
                placeholder="请输入活动名称"
                v-model="activitynameSearch"
                class="searchingInput"
                size="small"
                style="width: 600px"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  size="small"
                ></el-button>
              </el-input>
            </div>
            <!-- 表格 -->
            <!-- :span-method="arraySpanMethod" -->
            <div class="activitiesTabel">
              <el-table
                :data="ActivetableDataLine"
                :show-header="true"
                :row-class-name="tableRowClassName"
                style="width: 90%; margin-left: 5%; z-index: 100"
              >
                <el-table-column
                  prop="activityName"
                  label="活动名称"
                  align="center"
                  width="100px"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="location"
                  label="活动地点"
                  align="center"
                  width="110px"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  width="60px"
                  prop="address"
                  label="定位"
                  align="center"
                >
                  <template slot-scope="scope">
                    <i
                      class="el-icon-location-outline"
                      @click="sendPosition(scope)"
                      style="font-size: 20px"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="时间"
                  align="center"
                  width="180px"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="state"
                  label="标签"
                  align="center"
                  width="80px"
                >
                  <template slot-scope="scope">
                    <!-- 报名中，已结束，活动中 -->
                    <el-tag
                      :style="{
                        'background-color':
                          scope.row.state == '已结束'
                            ? 'rgba(248, 85, 85, 1)'
                            : 'rgba(0,206,209,1)',
                      }"
                      >{{ scope.row.state }}</el-tag
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  prop="director"
                  label="负责人"
                  align="center"
                  width="80px"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="participants"
                  label="参与人员"
                  align="center"
                  width="auto"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
              </el-table>
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              style="margin-left: 30%"
              page-size:10
              @current-change="current_change"
              :total="totalDataNum"
            >
            </el-pagination>
          </div>
        </div>

        <!-- 右侧 -->
        <div class="aside-right fl">
          <!-- 右上 -->
          <div class="public-opinion right-top">
            <h3 style="padding-left: 20px">本周活动统计</h3>
            <div class="clearfix" style="width: 330px; height: 320px">
              <useractivity />
            </div>
          </div>
          <!-- 右下 -->
          <div class="logistics clearfix">
            <h3 style="padding-left: 20px">异常活跃用户</h3>
            <div class="con">
              <!-- <div class="con-in"></div> -->
              <el-table
                :data="abnormalActivityData"
                style="z-index: 10"
                :default-sort="{ prop: 'date', order: 'descending' }"
                :header-cell-style="{ background: '#0efcff4d', color: '#fff' }"
                class="abnormalActivity activeSituation"
              >
                <el-table-column prop="name" label="姓名" align="center">
                </el-table-column>
                <el-table-column
                  prop="activityNumber"
                  label="本周次数"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="averageNumber"
                  label="平均次数"
                  align="center"
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>

      <div class="main-bottom">
        <span class="line1"></span>
        <span class="line2"></span>
        <span class="line3"></span>
      </div>
    </div>
  </div>
</template>

<script>
import bus from 'common/js/Bus.js'

import Useractivity from "./Useractivity";
import CMap from "./CMap";

import {
  getAbnormalInformation,
  getActivityInformation,
  addActivity,
} from "network/community";

export default {
  name: "Community",

  components: {
    Useractivity,
    CMap,
  },

  // 引用vue reload方法
  inject: ["reload"],

  data() {
    return {
      radio1: "社交图谱",
      formActivities: {
        activityName: "",
        location: "",
        date: "",
        director: "",
        label: "",
      },
      activetype: [
        {
          value: "体育竞技",
          label: "体育竞技",
        },
        {
          value: "社会公益",
          label: "社会公益",
        },
        {
          value: "文化娱乐",
          label: "文化娱乐",
        },
        {
          value: "主题教育",
          label: "主题教育",
        },
      ],
      activitynameSearch: "",
      ActivetableDataLine: [],
      abnormalActivityData: [],
      OnePagenum: 10, //每页数据条数
      totalDataNum: 50, //默认数据总数
      currentPage: 1, //默认开始页面
    };
  },

  created() {
    this.getAbnormalInformation();
    this.getActivityInformation();
  },

  methods: {
    current_change(currentPage) {
      this.currentPage = currentPage;
      console.log("currentPage", this.currentPage);
      this.getActivityInformation();
    },

    onSubmit() {
      var that = this;
      that.addActivity();
      alert("发布成功");
      that.$forceUpdate();
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "stripeRow";
      } else return "";
    },
    getAbnormalInformation() {
      var that = this;
      getAbnormalInformation().then((res) => {
        // that.abnormalActivityData = res.data.result;
        console.log(res);
        that.abnormalActivityData = [];
        for (var i = 0; i < res.data.result.length; i++) {
          if (res.data.result[i].activityNumber) {
            if (
              res.data.result[i].activityNumber !=
              res.data.result[i].averageNumber
            ) {
              that.abnormalActivityData.push({
                name: res.data.result[i].name,
                activityNumber: res.data.result[i].activityNumber,
                averageNumber: res.data.result[i].averageNumber,
              });
            }
          }
        }
      });
    },
    getActivityInformation() {
      var that = this;
      getActivityInformation({
        page: that.currentPage,
        number: that.OnePagenum,
      }).then((res) => {
        // console.log("活动表格", res);
        // that.ActivetableDataLine = res.data.result;
        that.ActivetableDataLine = [];
        if (res) {
          for (var i = 0; i < res.data.result.length; i++) {
            that.ActivetableDataLine.push({
              activityId: res.data.result[i].activityId,
              activityName: res.data.result[i].activityName,
              date: res.data.result[i].date,
              director: res.data.result[i].director,
              label: res.data.result[i].label,
              location: res.data.result[i].location,
              participants: res.data.result[i].participants,
              state: res.data.result[i].state,
            });
            // console.log("state", that.ActivetableDataLine[0].state);
          }
          // 局部刷新（没起作用）
          that.$forceUpdate();
        }
        // window.location.reload(true);
        //在方法中调用
        // that.reload()
        // bus.$emit('community', "社区活动");
        // self.location.reload();
        // $("#content_table").load(location.href+"#a");
        // window.location.reload(true);
      });
    },
    addActivity() {
      var that = this;
      // that.data = []
      addActivity({
        activityName: that.formActivities.activityName,
        label: that.formActivities.label,
        location: that.formActivities.location,
        date: that.formActivities.date,
        director: that.formActivities.director,
      }).then((res) => {
        if (res) {
          console.log("发布信息", res);
        }
      });
    },

    sendPosition(scope) {
      bus.$emit("activename", scope.row)
    }
  },
};
</script>

<style>
#bar .el-tooltip__popper,
.el-tooltip__popper.is-dark {
  background-color: rgb(20, 79, 138) !important;
  border-color: rgb(15, 248, 255) !important;
  border: 1px solid;
  color: #fff !important;
  font-weight: bold;
}
#bar .el-tooltip__popper[x-placement^="bottom"] .el-tooltip_arrow::after {
  border-bottom-color: rgb(14, 252, 255) !important;
}
</style>

<style scoped>
#Community {
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 0;
  /* background: url("~common/img/bg.png") no-repeat;
  background-size: 100%; */
}
/* 左部 */
.aside-left {
  height: 675px;
}

/* 左上 */
/* .main .aside-left .trend:before {
  background: transparent;
}
.main .aside-left .trend:after {
  background: url("~common/img/tip-bg.png") no-repeat;
  background-size: 100% 100%;
} */

/* 左中 */
.main .aside-left .pie,
.main .aside-left .pie:after {
  background: transparent;
  position: absolute;
  bottom: 42%;
  width: 100%;
  height: 32%;
}

/* 左下 */
/* .main .aside-left .publish:after {
  position: absolute;
  background: url("~common/img/bor1_6.png") no-repeat;
  background-size: 100% 100%;
  z-index: 10;
} */
.main .aside-left .publish {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40%;
  background: url("~common/img/invalid-name.png") no-repeat;
  background-size: 100% 100%;
  z-index: 0;
  content: "";
}
#bar {
  margin-top: 30px;
}
/* 右边 */
/* .aside-right {
  position: relative;
} */
.aside-right {
  position: absolute;
  top: 0;
  right: 10px;
  width: 23%;
  height: 670px;
  background: url("~common/img/bor_1_3_1.png") no-repeat;
  background-size: 100% 100%;
  content: "";
}
.aside-right h3 {
  padding-top: 6%;
  margin-left: 5%;
  font-size: 0.5625em;
}
.aside-right .public-opinion {
  width: 100%;
  height: 49%;
  margin-bottom: 2.5%;
}
.aside-right .public-opinion h3 {
  height: 13%;
}
.aside-right .public-opinion .con {
  height: 84%;
  padding: 2% 5% 3%;
}
.right-top {
  position: relative;
  background: url("~common/img/bg1_1.png") no-repeat top;
  background-size: 100% 100%;
}
.right-top .con {
  height: 42%;
  margin: 0 5%;
  font-size: 0.4375em;
  font-size: 0.4375em;
  background: #081d5d;
}
.aside-right .logistics .con {
  height: 70%;
  margin: 0 5%;
  font-size: 0.3125em;
}
.aside-right .logistics .con .con-in {
  display: none;
  height: 100%;
}
.aside-right .logistics {
  position: absolute;
  top: 49%;
  width: 100%;
  height: 50%;
  margin-bottom: 2.5%;
  background: url("~common/img/bg1_4.png") no-repeat;
  background-size: 100% 100%;
}
.aside-right .logistics:before {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("~common/img/bor1_4.png") no-repeat;
  background-size: 100% 100%;
  content: "";
}
.aside-right .logistics h3 {
  height: 22%;
}

/* 社区活动 */
/* 左上 */
/* 单选按钮-功能选择 */
#socialFunction {
  position: absolute;
  left: 80px;
  top: 55px;
}

/* 左下 */
/* 表单每行之间 */
.publish .el-form-item {
  margin-bottom: 2px;
  /* opacity: 0.9; */
  /* background: rgba(18, 22, 64, 0.5) !important; */
}
/* 表单输入框样式 */
::v-deep .publish .el-input__inner {
  line-height: 30px;
  width: 90%;
  background-color: transparent;
  border-color: rgb(15, 248, 255);
  color: #fff;
}
::v-deep .publish .el-form-item__content {
  line-height: 35px;
  /* 按钮 */
  z-index: 10;
}
/* 表单label */
::v-deep .publish .el-form-item__label {
  line-height: 35px;
  color: #fff;
  padding-left: 20px;
}
/* 按钮改变样式 */
.publish .el-button:focus,
.publish .el-button:hover {
  color: #fff;
  background-color: rgb(14, 252, 255, 0.3);
}
.publish .el-button--mini {
  color: #0efcff;
  background-color: transparent;
  border-color: #0efcff;
  -webkit-transform-origin-x: 0;
  transform: scale(0.9);
  -webkit-transform: scale(0.9);
}

.type {
  width: 43%;
  margin-right: 10px;
}
::v-deep .type .el-input .el-input__inner {
  height: 24px !important;
  color: rgb(15, 248, 255) !important;
}
/* 中间 */
/* label样式 */
.middle-map {
  position: absolute;
  top: 0;
  left: 23%;
  height: 100%;
  width: 53%;
}
.activitySearch .serchLabel {
  color: #fff;
  padding: 20px 20px;
  margin-left: 5%;
  font-size: 0.5625em;
  display: inline-block;
}
/* 输入框样式 */
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
/* 表格 */
::v-deep .activitiesTabel .el-table tr {
  background-color: rgb(3, 26, 59);
  color: #fff;
}
::v-deep
  .el-table--enable-row-hover
  .el-table__body
  tr:hover
  > td.el-table__cell {
  background-color: rgb(14, 252, 255, 0.5);
}
/* 表格内部线 */
::v-deep .el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: 1px solid transparent;
}
/* 表格之间线 */
.activitiesTabel .el-table--border::after,
.activitiesTabel .el-table--group::after,
.activitiesTabel .el-table::before {
  background-color: #0efcff;
}
/* 表格行高 */
::v-deep .el-table .el-table__cell {
  padding: 10px 0;
}
/* 斑马纹颜色 */
::v-deep .stripeRow {
  background: rgb(7, 49, 83) !important;
}
/* 页码 */
::v-deep .el-pagination.is-background .btn-next,
::v-deep .el-pagination.is-background .btn-prev,
::v-deep .el-pagination.is-background .el-pager li {
  background-color: transparent;
  color: #fff;
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0efcff;
  color: #fff;
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #0efcff;
}

/* 右上 */
/* 表格底部线 */
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: transparent;
}
/* 表格 */
.activeSituation {
  max-width: 90%;
  margin: 7% 5%;
  background-color: transparent;
}
::v-deep .el-table tr {
  background-color: transparent;
  color: #fff;
}

/* 右下 */
.abnormalActivity {
  position: absolute;
  top: 30px;
  left: 0px;
}
/* 表头透明色+文字颜色 */
::v-deep .el-table th.el-table__cell.is-leaf {
  background-color: transparent !important;
  color: rgba(14, 253, 255, 1) !important;
}
/* 表头边框 */
::v-deep .el-table th.el-table__cell.is-leaf {
  border-bottom: 1px solid transparent;
}
/* 表头字体放大 */
::v-deep .el-table th.el-table__cell > .cell {
  font-size: 18px;
}
/* 定位图标hover */
.el-icon-location-outline:hover {
  color: #f4e925;
}

.activitiesTabel .el-tag {
  color: #fff;
}
</style>