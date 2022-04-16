<template>
  <div class="page-one">
    <div class="root-wrap">
      <!-- 左侧 -->
      <div class="main clearfix">
        <div class="aside-left fl">
          <div class="keys left-top">
            <div class="trend">
              <!-- <h3>用户分类</h3> -->
              <div class="yqlist">
                <ul class="clearfix">
                  <li>
                    <div class="yq">{{ selfCareNumber }}</div>
                    <p>自理老人</p>
                  </li>
                  <li>
                    <div class="yq">{{ SemiSelfCareNumber }}</div>
                    <p>半自理老人</p>
                  </li>
                  <li>
                    <div class="yq">{{ DisabilityNumber }}</div>
                    <p>失能老人</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="pie clearfix">
            <div class="pie1 fl">
              <h3 style="padding-top: 0">上周服务结构</h3>
              <div id="pie1">
                <service />
              </div>
            </div>
            <div class="pie2 fl">
              <h3 style="padding-top: 0">上周医疗服务</h3>
              <div id="leida">
                <medical />
              </div>
            </div>
          </div>
          <div class="publish">
            <h3>护工评价排名</h3>
            <div id="bar" style="width: 100%; height: 100%; margin-top: 20px">
              <evaluation />
            </div>
          </div>
        </div>

        <!-- 中间地图 -->
        <div class="middle-map fl">
          <div class="map-wrap">
            <span class="title-map">南京市-清荷园社区</span>
            <div id="map" style="width: 100%; height: 100%; z-index: -1">
              <arc-map />
            </div>
            <!-- 图例 -->
            <div id="legend" class="state-legend">
              <h4>图例</h4>
              <div><span id="monitor"></span>监控设备</div>
              <br />
              <div><span id="grass"></span>绿地资源</div>
              <br />
              <div><span id="tree"></span>树木资源</div>
              <br />
              <div><span style="background-color: #c0c4cc"></span>无人居住</div>
              <br />
              <div><span style="background-color: #B5DDEF"></span>用户住房</div>
              <br />
              <div><span style="background-color: #F2A6A6"></span>异常住房</div>
              <br />
              <div><span style="background-color: #ffffbf"></span>感兴趣区</div>
              <br />
              <div><span style="border: solid 3px #9cea10"></span>养老社区边界</div>
              <br />
              <div><span style="border: solid 3px #FFFF00"></span>周边小区边界</div>
              <br />
            </div>
          </div>
        </div>

        <!-- 右侧 -->
        <div class="aside-right fr">
          <div class="trend">
            <div
              id="trendBar1"
              style="width: 100%; height: 100%; margin-left: 15px"
            >
              <!-- 图层选择器 -->
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
                >全选</el-checkbox
              >
              <el-checkbox-group
                v-model="checkList"
                @change="handleCheckedOptionsChange"
              >
                <el-checkbox
                  v-for="check in checks"
                  :label="check"
                  :key="check"
                  border
                  size="mini"
                  >{{ check }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
          </div>
          <div class="area-rank">
            <h3>健康指数异常人数</h3>
            <div class="con" style="width: 100%; height: 80%">
              <healthy />
            </div>
          </div>
          <div class="pie clearfix">
            <div class="pie1 fl">
              <h3>老人年龄组统计</h3>
              <div id="pie1" style="width: 100%; height: 80%">
                <agegroup />
              </div>
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
import MapBox from "./components/MapBox";
import ArcMap from "./components/ArcMap";
import Evaluation from "./components/Evaluation";
import Service from "./components/Service";
import Medical from "./components/Medical";
import Healthy from "./components/Healthy";
import Agegroup from "./components/Agegroup";
import bus from "common/js/Bus.js";

import { getUserInformationState } from "network/datapanel";

const cityOptions = [
  "社区养老楼栋",
  "监控设备",
  "社区养老范围",
  "城市绿地",
  "周边小区楼栋",
  "感兴趣区",
  "周边小区范围",
  "异常住户"
];
export default {
  name: "DataPanel",
  data() {
    return {
      checkAll: false,
      checkList: ["社区养老楼栋", "社区养老范围", "周边小区楼栋", "异常住户"],
      checks: cityOptions,
      isIndeterminate: true,

      selfCareNumber: "",
      SemiSelfCareNumber: "",
      DisabilityNumber: "",
    };
  },
  components: {
    MapBox,
    ArcMap,
    Evaluation,
    Service,
    Medical,
    Healthy,
    Agegroup,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    // 图层选择器
    handleCheckAllChange(val) {
      this.checkList = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedOptionsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checks.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.checks.length;
        console.log(value)
      bus.$emit('layerOptions', value);
    },

    // 【接口调用】2.在methods写具体的函数怎么写
    getUserInformationState() {
      getUserInformationState().then((res) => {
        this.selfCareNumber = res.data.result[0].value;
        this.SemiSelfCareNumber = res.data.result[1].value;
        this.DisabilityNumber = res.data.result[2].value;
        // console.log(res);
      });
    },
  },
  // 【接口调用】1.在created写函数的名称
  created() {
    this.getUserInformationState();
  },
};
</script>

<style scoped>
@import "./public/style/DataPanel.css";
</style>
