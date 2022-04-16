<template>
  <div id="arc-map">
    <div id="SceneView" />
  </div>
</template>
 
<script>
import { loadModules } from "esri-loader";
import bus from "common/js/Bus.js";

export default {
  name: "ArcMap",
  data() {
    return {};
  },
  created() {},
  mounted() {
    var that = this;
    this.createView();
  },
  methods: {
    //创建视图
    createView() {
      let options = {
        url: "https://js.arcgis.com/4.22",
        css: "https://js.arcgis.com/4.22/esri/themes/light/main.css",
      };

      loadModules(
        [
          "esri/config",
          "esri/Map",
          "esri/views/SceneView",
          "esri/layers/SceneLayer",
          "esri/layers/FeatureLayer",
        ],
        options
      ).then(([esriConfig, Map, SceneView, SceneLayer, FeatureLayer]) => {
        esriConfig.apiKey =
          "AAPK458a1b007a1b4e63ac21d1dbc483dc1fS2ras1d1CVenmFAofJEHkDpuq_kxN8KI05mDWzuROQ912J6NSF3ncJPVLP1V0J92";
        const map = new Map({
          basemap: "arcgis-streets-night", //街道(夜)
        });
        const view = new SceneView({
          container: "SceneView",
          map: map,
          camera: {
            position: [118.7113125, 31.9580675, 400],
            tilt: 70,
            // heading: 50
          },
        });
        // 镂空
        const normalLayer = new SceneLayer({
          url: "https://tiles.arcgis.com/tiles/8lzUox1jNqBqUD5U/arcgis/rest/services/blue_1/SceneServer",
          title: "正常图层",
          popupTemplate: {
            title: "{Position}",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "Position",
                    label: "位置",
                  },
                  {
                    fieldName: "Water",
                    label: "水费",
                  },
                  {
                    fieldName: "Electric",
                    label: "电费",
                  },
                  {
                    fieldName: "Gas",
                    label: "气费",
                  },
                  {
                    fieldName: "Service",
                    label: "服务费",
                  },
                  {
                    fieldName: "Medical",
                    label: "医药费",
                  },
                  {
                    fieldName: "Cost",
                    label: "总费用",
                  },
                  {
                    fieldName: "Occupier",
                    label: "住户",
                  },
                  {
                    fieldName: "Sex",
                    label: "性别",
                  },
                  {
                    fieldName: "Age",
                    label: "年龄",
                  },
                  {
                    fieldName: "OccupierNum",
                    label: "住户电话",
                  },
                  {
                    fieldName: "Householder",
                    label: "户主",
                  },
                  {
                    fieldName: "HouseHolderNum",
                    label: "户主电话",
                  },
                  {
                    fieldName: "Family",
                    label: "家庭关系",
                  },
                  {
                    fieldName: "Abnormal",
                    label: "异常状态",
                  },
                ],
              },
            ],
          },
        });
        // 红色
        const abnormalLayer = new SceneLayer({
          url: "https://tiles.arcgis.com/tiles/8lzUox1jNqBqUD5U/arcgis/rest/services/abnormalLayer/SceneServer",
          title: "异常图层",
          popupTemplate: {
            title: "{Position}",
            content: [
              {
                type: "text",
                text: "异常状态：{Abnormal}",
              },
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "Position",
                    label: "位置",
                  },
                  {
                    fieldName: "Water",
                    label: "水费",
                  },
                  {
                    fieldName: "Electric",
                    label: "电费",
                  },
                  {
                    fieldName: "Gas",
                    label: "气费",
                  },
                  {
                    fieldName: "Service",
                    label: "服务费",
                  },
                  {
                    fieldName: "Medical",
                    label: "医药费",
                  },
                  {
                    fieldName: "Cost",
                    label: "总费用",
                  },
                  {
                    fieldName: "Occupier",
                    label: "住户",
                  },
                  {
                    fieldName: "Sex",
                    label: "性别",
                  },
                  {
                    fieldName: "Age",
                    label: "年龄",
                  },
                  {
                    fieldName: "OccupierNum",
                    label: "住户电话",
                  },
                  {
                    fieldName: "Householder",
                    label: "户主",
                  },
                  {
                    fieldName: "HouseHolderNum",
                    label: "户主电话",
                  },
                  {
                    fieldName: "Family",
                    label: "家庭关系",
                  },
                  {
                    fieldName: "Abnormal",
                    label: "异常状态",
                  },
                ],
              },
            ],
          },
        });
        // 没有红色
        const completelyNormalLayer = new SceneLayer({
          url: "https://tiles.arcgis.com/tiles/8lzUox1jNqBqUD5U/arcgis/rest/services/allblue/SceneServer",
          title: "完全正常图层",
          popupTemplate: {
            title: "{Position}",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "Position",
                    label: "位置",
                  },
                  {
                    fieldName: "Water",
                    label: "水费",
                  },
                  {
                    fieldName: "Electric",
                    label: "电费",
                  },
                  {
                    fieldName: "Gas",
                    label: "气费",
                  },
                  {
                    fieldName: "Service",
                    label: "服务费",
                  },
                  {
                    fieldName: "Medical",
                    label: "医药费",
                  },
                  {
                    fieldName: "Cost",
                    label: "总费用",
                  },
                  {
                    fieldName: "Occupier",
                    label: "住户",
                  },
                  {
                    fieldName: "Sex",
                    label: "性别",
                  },
                  {
                    fieldName: "Age",
                    label: "年龄",
                  },
                  {
                    fieldName: "OccupierNum",
                    label: "住户电话",
                  },
                  {
                    fieldName: "Householder",
                    label: "户主",
                  },
                  {
                    fieldName: "HouseHolderNum",
                    label: "户主电话",
                  },
                  {
                    fieldName: "Family",
                    label: "家庭关系",
                  },
                  {
                    fieldName: "Abnormal",
                    label: "异常状态",
                  },
                ],
              },
            ],
          },
        });
        const rangelayer = new FeatureLayer({
          url: "https://services6.arcgis.com/8lzUox1jNqBqUD5U/arcgis/rest/services/%E5%B0%8F%E5%8C%BA%E8%8C%83%E5%9B%B4/FeatureServer",
          title: "小区范围",
        });
        const interestedLayer = new SceneLayer({
          url: "https://tiles.arcgis.com/tiles/8lzUox1jNqBqUD5U/arcgis/rest/services/interested/SceneServer",
          title: "感兴趣图层",
          labelingInfo: {
            labelExpressionInfo: { expression: "$feature.Name" },
            symbol: {
              type: "label-3d",
              symbolLayers: [
                {
                  type: "text",
                  material: { color: [0, 0, 0] },
                  size: 12,
                },
              ],
            },
            maxScale: 0,
            minScale: 2000,
          },
        });
        const cameraLayer = new SceneLayer({
          url: "https://tiles.arcgis.com/tiles/8lzUox1jNqBqUD5U/arcgis/rest/services/%E6%91%84%E5%83%8F%E5%A4%B4%E4%BF%AE%E6%94%B9/SceneServer",
          title: "摄像头图层",
        });
        const greenlandLayer = new SceneLayer({
          url: "https://tiles.arcgis.com/tiles/8lzUox1jNqBqUD5U/arcgis/rest/services/%E7%BB%BF%E5%9C%B0/SceneServer",
          title: "绿地",
        });
        const peripheryLayer = new SceneLayer({
          url: "https://tiles.arcgis.com/tiles/8lzUox1jNqBqUD5U/arcgis/rest/services/SurroundingBlue/SceneServer",
          title: "周边建筑图层",
        });
        const otherlinelayer = new FeatureLayer({
          url: "https://services6.arcgis.com/8lzUox1jNqBqUD5U/arcgis/rest/services/Other/FeatureServer",
          title: "其他小区范围",
        });
        //添加标注
const taglayer = new SceneLayer({
          url: "https://tiles.arcgis.com/tiles/8lzUox1jNqBqUD5U/arcgis/rest/services/tag/SceneServer",
          title: "标注",
          labelingInfo: {
            labelExpressionInfo: { expression: "$feature.name" },
            symbol: {
              type: "label-3d",
              symbolLayers: [
                {
                  font: {
                    size: 12,
                    // family: "KuHei",
                    weight: "bold",
                  },
                  //光环
                  halo: {
                    color: [255,255,204], //可选 Default Value:black
                    size: "1px", //可选 Default Value:0
                  },
                  type: "text", //固定
                  material: { color: [0,51,51] },
                },
              ],
            },
          },
        });
        //添加tree
const treeLayer = new SceneLayer({
          url: "https://services6.arcgis.com/8lzUox1jNqBqUD5U/arcgis/rest/services/tree/SceneServer",
          title: "tree",
        });


        map.add(normalLayer);
        map.add(abnormalLayer);
        map.add(rangelayer);
        map.add(interestedLayer);
        map.add(cameraLayer);
        map.add(greenlandLayer);
        map.add(peripheryLayer);
        map.add(otherlinelayer);
        map.add(completelyNormalLayer);
        map.add(taglayer);
        map.add(treeLayer);

        // 默认显示图层：
        rangelayer.visible = true;
        normalLayer.visible = true;
        abnormalLayer.visible = true;
        interestedLayer.visible = false;
        cameraLayer.visible = false;
        greenlandLayer.visible = false;
        peripheryLayer.visible = true;
        otherlinelayer.visible = false;
        completelyNormalLayer.visible = false;
        taglayer.visible = true;
        treeLayer.visible = true;

        bus.$on("layerOptions", (e) => {
          rangelayer.visible = false;
          normalLayer.visible = false;
          abnormalLayer.visible = false;
          interestedLayer.visible = false;
          cameraLayer.visible = false;
          greenlandLayer.visible = false;
          peripheryLayer.visible = false;
          otherlinelayer.visible = false;
          completelyNormalLayer.visible = false;
          treeLayer.visible = false;
          for (var i = 0; i < e.length; i++) {
            if (e[i] == "社区养老楼栋") {
              completelyNormalLayer.visible = true;
            } else if (e[i] == "监控设备") {
              cameraLayer.visible = true;
            } else if (e[i] == "社区养老范围") {
              rangelayer.visible = true;
            } else if (e[i] == "城市绿地") {
              greenlandLayer.visible = true;
              treeLayer.visible = true;
            } else if (e[i] == "周边小区楼栋") {
              peripheryLayer.visible = true;
            } else if (e[i] == "感兴趣区") {
              interestedLayer.visible = true;
            } else if (e[i] == "周边小区范围") {
              otherlinelayer.visible = true;
            } else if (e[i] == "异常住户") {
              abnormalLayer.visible = true;
              normalLayer.visible = true;
            }
          }
          // console.log(e);
        });
      });
    },
  },
};
</script>
 
<style>
#arc-map {
  position: fixed;
  width: 50%;
  height: 100%;
  left: 25%;
  z-index: 0;
}
#SceneView {
  width: 100%;
  height: 100%;
}

/* 弹出框 */
.esri-feature__main-container {
  background-color: rgba(18, 22, 64);
}
.esri-view-width-less-than-medium .esri-popup__main-container {
  background-color: rgba(18, 22, 64);
}
.esri-widget__heading.esri-popup__header-title {
  color: #fff;
}
.esri-widget__table tr {
  color: #fff;
}
.esri-feature-content div {
  color: red;
}
</style>