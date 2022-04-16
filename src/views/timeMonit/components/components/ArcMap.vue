<template>
  <div id="consume-arc-map">
    <div id="SceneView" />
  </div>
</template>
 
<script>
import { loadModules } from "esri-loader";
 
export default {
  name: "ArcMap",
  data() {
    return {};
  },
  mounted() {
    this.createView();
  },
  methods: {
    //创建视图
    createView() {
      let options = {
        url: "https://js.arcgis.com/4.22",
        css: "https://js.arcgis.com/4.22/esri/themes/light/main.css"
      };
 
      loadModules([
        "esri/config",
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/SceneLayer",
        "esri/layers/FeatureLayer"
      ], options).then(
        ([esriConfig, Map, SceneView, SceneLayer, FeatureLayer]) => {
          esriConfig.apiKey = "AAPK458a1b007a1b4e63ac21d1dbc483dc1fS2ras1d1CVenmFAofJEHkDpuq_kxN8KI05mDWzuROQ912J6NSF3ncJPVLP1V0J92";
          const map = new Map({
            basemap: "arcgis-streets-night",//街道(夜)
          });
          const view = new SceneView({
              container: "SceneView",
              map: map,
              camera: {
                  position: [118.709, 31.9636, 300],
                  tilt: 70,
                  // heading: 50
              }
          });
          //住户
          const sceneLayer1 = new SceneLayer({
              url: "https://tiles.arcgis.com/tiles/8lzUox1jNqBqUD5U/arcgis/rest/services/%E4%BD%8F%E6%88%B7%E6%A5%BC%E6%A0%8B/SceneServer"
          });
          //其他
          // const sceneLayer2 = new SceneLayer({
          //     url: "https://tiles.arcgis.com/tiles/8lzUox1jNqBqUD5U/arcgis/rest/services/%E5%85%B6%E4%BB%96/SceneServer"
          // });
          //摄像头---------修改
          const sceneLayer3 = new SceneLayer({
              url: "https://tiles.arcgis.com/tiles/8lzUox1jNqBqUD5U/arcgis/rest/services/%E6%91%84%E5%83%8F%E5%A4%B4%E4%BF%AE%E6%94%B9/SceneServer"
          });
          //异常住户
          const sceneLayer4 = new SceneLayer({
              url: "https://tiles.arcgis.com/tiles/8lzUox1jNqBqUD5U/arcgis/rest/services/%E5%BC%82%E5%B8%B8/SceneServer"
          });
          //绿地----------添加1
          const sceneLayer5 = new SceneLayer({
              url: "https://tiles.arcgis.com/tiles/8lzUox1jNqBqUD5U/arcgis/rest/services/%E7%BB%BF%E5%9C%B0/SceneServer"
          });
          //小区范围
          const featurelayer = new FeatureLayer({
              url: "https://services6.arcgis.com/8lzUox1jNqBqUD5U/arcgis/rest/services/%E5%B0%8F%E5%8C%BA%E8%8C%83%E5%9B%B4/FeatureServer"
          });
          map.add(featurelayer);
          map.add(sceneLayer1);
          // map.add(sceneLayer2);
          map.add(sceneLayer3);
          map.add(sceneLayer4);
          map.add(sceneLayer5);//添加2
          map.add(featurelayer);
          // console.info(view, 111);
        }
      );
    }
  }
};
</script>
 
<style>
#consume-arc-map {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0%;
  z-index: 0;
}
#SceneView {
  width: 100%;
  height: 100%;
}
.esri-view-height-less-than-medium .esri-popup__main-container {
  background-color: rgba(18, 22, 64);
}
</style>