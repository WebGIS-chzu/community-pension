<template>
  <div id="page-two">
    <div id="map"/>
    <unususal />
    <bracelet/>
    <unusual-legend />
  </div>
</template>

<script>
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import 'mapbox-gl/dist/mapbox-gl.css';
import pressure from "./public/js/pressure.json";
import bus from "common/js/Bus.js";
import axios from 'axios'

// 引入异常值组件
import Unususal from "./components/Unusual";
// 引入手环组件
import Bracelet from "./components/Bracelet";
// 引入图例
import UnusualLegend from "./components/UnusualLegend"

// 从后台获取位置坐标信息
import { getAbnormalUserByAbnormal } from "network/timemonit";

export default {
  name: "TimeMonit",
  data() {
    return {
      map: "",
      data: "",
      info: "",
    };
  },
  components: {
    Unususal,
    Bracelet,
    UnusualLegend,
  },
  mounted() {
    var that = this
    that.getAbnormalUserByAbnormal("血压异常")
    bus.$on("abnormal", function(list) {
      that.removeLayer(1)
      // that.abnormal(list[0])
      that.getAbnormalUserByAbnormal(list[0])
    });
    // 地图定位
    bus.$on ("info", function(info) {
      that.getInfo(info)
    })
    this.initmap();
  },
  // beforeRouteLeave(to, from, next) {   
  //   if (to.name == "社交匹配") {
  //     to.query.temp = "this.one";
  //     console.log("/socialMatch") 
  //   }
  //   console.log("to", to)
  //   next(vm => {
  // // 通过 `vm` 访问组件实例
  //   })   
  // },
  methods: {
    initmap() {
      var that = this
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoibGVhcm5lcjciLCJhIjoiY2t4MXRxYmY1MWlocjMwbXQxZHlvcTIzbyJ9.jyM9kf6SpL0Q1keyMbxxBQ";
      that.map = new this.$mapboxgl.Map({
        container: "map",
        style: 'mapbox://styles/learner7/ckxafrrrt163215lcdqcdvh3s',
        center: [118.71073007583618, 31.975882407365976],
        zoom: 17,
        pitch: 45,
      });
      that.map.addControl(
        new MapboxLanguage({
          defaultLanguage: "zh-Hans", // 修改语言为中文
        })
      );
    },
    removeLayer(e) {
      var that = this;
      if (that.map.getSource('unususal') !== undefined){
        if (e == 1){
          that.map.removeLayer('clusters') // 清除聚合图
          that.map.removeLayer('cluster-count')
          that.map.removeLayer('unclustered-point')
          that.map.removeSource('unususal')
          // that.map.removeLayer('maine') // 清除缓冲区
          // that.map.removeSource('maine')          
          // that.map.removeLayer('start') // 清除起点
          // that.map.removeSource('start')
          // that.map.removeLayer('end') // 清除终点
          // that.map.removeSource('end')
        }
      }
    },
    abnormal(e) {
      var that = this;
      var color = ""
      if (e == "血压异常"){
        color = 'rgb(55,210,212)'
      }else if (e == "体温异常"){
        color = 'rgb(253,108,136)'
      }else if (e == "心率异常"){
        color = 'rgb(246,209,14)'
      }else if (e == "倾斜异常"){
        color = 'rgb(253,145,51)'
      }
      // this.initmap()
      // that.map.on('load', function() {
      // Add a geojson point source.
      // Heatmap layers also work with a vector tile source.
      // 加载数据源
      that.map.addSource('unususal', {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features":that.data
        },
        "cluster": true,
        "clusterMaxZoom": 50, // Max zoom to cluster points on
        "clusterRadius": 50 // Radius of each cluster when clustering points (defaults to 50)
      });
    
      // 加载图层
      that.map.addLayer({
        id: "clusters",
        type: "circle",
        source: "unususal",
        filter: ["has", "point_count"],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          "circle-color": [
            "step",
            ["get", "point_count"],
            color,
            100,
            color,
            750,
            color
            ],
            "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40
          ]
        }
      });
      
      that.map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "unususal",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12
        }
      });
        
      that.map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "unususal",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": color,
          "circle-radius": 4,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff"
        }
      });

      // console.log("333333", that.data)
      // that.map.addLayer({
      //   "id": "earthquakes-heat",
      //   "type": "heatmap",  //类型为热力图
      //   "source": "unususal",
      //   // "maxzoom": 9,
      //   "paint": {
      //     // Increase the heatmap weight based on frequency and property magnitude
      //     "heatmap-weight": [
      //     "interpolate",
      //     ["linear"],
      //     ["get", "tel"],
      //     0, 0,
      //     100, 1
      //     ],
      //     // Increase the heatmap color weight weight by zoom level
      //     // heatmap-intensity is a multiplier on top of heatmap-weight
      //     "heatmap-intensity": [
      //       "interpolate",
      //       ["linear"],
      //       ["zoom"],
      //       0, 5,
      //       9, 5.1,
      //       10, 5.2,
      //       11, 5.5,
      //       12, 6,
      //       13, 6.5
      //     ],
      //     // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      //     // Begin color ramp at 0-stop with a 0-transparancy color
      //     // to create a blur-like effect.
      //     "heatmap-color": [
      //       "interpolate",
      //       ["linear"],
      //       ["heatmap-density"],
      //       0, "rgba(33,102,172,0)",
      //       0.2, "rgb(103,169,207)",
      //       0.4, "rgb(209,229,240)",
      //       0.6, "rgb(253,219,199)",
      //       0.8, "rgb(239,138,98)",
      //       1, "rgb(178,24,43)"
      //     ],
      //     // Adjust the heatmap radius by zoom level
      //     "heatmap-radius": [
      //       "interpolate",
      //       ["linear"],
      //       ["zoom"],
      //       0, 2,
      //       9, 10,
      //       10, 12,
      //       11, 14,
      //       12, 16,
      //       13, 18,
      //       14, 20
      //     ],
      //     // Transition from heatmap to circle layer by zoom level
      //     'heatmap-opacity': 0.8
      //   }
      // });
    // })
    },
    getInfo(info) {
      var that = this
      this.data = ""
      that.map.flyTo({
        center: info[1],
      })
    },
    getAbnormalUserByAbnormal(type) {
      var that = this;
      that.data = []
      getAbnormalUserByAbnormal({"abnormalName": type}).then(async res => {
        // console.log("异常", res)
        if (res) {
          if (res.data.code == 200) {
            var allData = []
            var allData = res.data.result
            for (var i = 0; i < allData.length; i++ ) {
              if (allData[i].location) {   // 判断点坐标是否存在，数据不完全，之后可以删除这个判断条件
                await axios.get('http://' + allData[i].location).then(res1 => {
                  that.data.push(res1.data.features[0])
                })
              }
            }
            that.abnormal(type)
          }
        }
      })
    }
  },    
};
</script>

<style scoped>
#page-two {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
}

#map {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>