<template>
  <div id="monitor">
    <div id="map" />
    <abnormal />
    <alarm v-show=" type == '姿态异常' "/>
    <video1 />
    <monitor-legend />
  </div>
</template>

<script>
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import 'mapbox-gl/dist/mapbox-gl.css';
import bus from "common/js/Bus.js";
import * as turf from '@turf/turf'
import axios from 'axios'
import pressure from "../public/js/pressure.json";
import { getMonitorAbnormalUserByAbnormal } from "network/timemonit";

import Abnormal from "./components/Abnormal" // 异常按钮以及异常处理
import Alarm from "./components/Alarm"
import Video1 from "./components/Video1"
// 引入图例
import MonitorLegend from "./MonitorLegend"

var popup
export default {
  name: "Monitor",
  data() {
    return {
      map: "",
      description: "",
      data: [],
      type: "姿态异常",
    }
  },
  components: {
    Abnormal,
    Alarm,
    Video1,
    MonitorLegend,
  },
  mounted() {
    var that = this;
    that.getMonitorAbnormalUserByAbnormal("姿态异常")
    // 获取异常类型
    bus.$on("unsual", function(e) {
      that.type = e;
      that.removeLayer(1);
      that.getMonitorAbnormalUserByAbnormal(e);
    });
    // 得到情绪异常老人的信息
    bus.$on("mood", function(list) {
      // 移除弹窗
      that.removePopup();
      that.removeLayer(1)
      // 获取老人信息
      that.getInfo(list[1])
      // 得到情绪异常老人的位置
      that.getPosition(list)
    })
    this.initmap();
  },
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
      this.map.on("load", function() {
        that.map.loadImage("http://1.15.241.95:9000/headsculpture/oldwoman.png", function(error, image) {
          if (error) throw error;
          that.map.addImage("old1", image, { width:50});
        })
        that.map.loadImage("http://1.15.241.95:9000/headsculpture/oldman.png", function(error, image) {
          if (error) throw error;
          that.map.addImage("old2", image, { width:50});
        })
        that.map.loadImage("http://1.15.241.95:9000/otherpicture/monitor.png", function(error, image) {
          if (error) throw error;
          that.map.addImage("monitor", image, { width:50});
        })        
      })
    },
    removeLayer(e) {
      var that = this;
      if (e == 1) {
        if (that.map.getSource('unususal') !== undefined){
          that.map.removeLayer('clusters') // 清除聚合图
          that.map.removeLayer('cluster-count')
          that.map.removeLayer('unclustered-point')
          that.map.removeSource('unususal')
        }
        if (that.map.getSource("old1") !== undefined) {
          // 移除老人图片
          that.map.removeLayer('old1')
          that.map.removeSource('old1')
          // 移除监控摄像头图片
          that.map.removeLayer('monitor')
          that.map.removeSource('monitor')
        }
      }
    },
    unsual(e) {
      var that = this;
      var color = ""
      if (e == "姿态异常"){
        color = 'rgb(55,210,212)'
      }else if (e == "情绪异常"){
        color = 'rgb(253,108,136)'
      }
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
    },
    getPosition(list) {
      var that = this;
      // 以图片形式添加老人位置
      var position = list[0]
      var sex = list[1].sex
      var old = ""
      var size = 0
      var path = list[2]
      console.log(list)
      if (sex == "女") {
        old = "old1"
        size = 0.05
        path = [path[0], path[1], path[2]]
      }else {
        old = "old2"
        size = 0.2
        path = [path[0], path[1], path[2]]
      }
      // 飞至该老人的位置
      that.map.flyTo({
        // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        center: position,
        zoom: 18,
        // bearing: 0,
        
        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 0.2, // make the flying slow
        // curve: 1, // change the speed at which it zooms out
      });
      that.map.addSource("old1", {
        "type": 'geojson',
        "data": {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": position
            }
          }]
        }
      })
      that.map.addLayer({
        "id": "old1",
        'type': 'symbol',
        'source': 'old1',
        "layout": {
          "icon-image": old,
          "icon-size": size
        }
      })
      
      popup = new that.$mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
      // 添加老人信息弹窗
      that.map.on('mouseenter', 'old1', function(e) {
        // Change the cursor style as a UI indicator.
        that.map.getCanvas().style.cursor = 'pointer';
        var coordinates = position.slice();
        var description = that.description;
        
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates) > 180) {
          coordinates += e.lngLat.lng > coordinates ? 360 : -360;
        }
        
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
        .setHTML(description)
        .addTo(that.map);
      });
      // 移除老人信息弹窗
      that.map.on('mouseleave', 'old1', function() {
        that.map.getCanvas().style.cursor = '';
        popup.remove();
      })
    
      var point = turf.point(position);
      var buffered = turf.buffer(point, 0.04, {units: 'miles'});
      var bbox = turf.bbox(buffered)
      // console.log("bbox", bbox)
      var points = turf.randomPoint(3, {bbox})
      // 添加监控摄像头
      console.log("points", points)
      that.map.addSource("monitor", {
        "type": 'geojson',
        "data": points,
      })
      that.map.addLayer({
        "id": "monitor",
        'type': 'symbol',
        'source': 'monitor',
        "layout": {
          "icon-image": "monitor",
          "icon-size": 0.06,
        }
      })
            
      that.map.on('click', 'monitor', function(e) {
        var i = Math.floor(Math.random()*3);  
        bus.$emit("moodVideo", path[i])
        console.log(e)
      })
    },
    getInfo(info) {
      var that = this
      // console.log("info.headurl", info.headurl)
      if (info) {
        that.description = "<strong>用户信息</strong><br/><div><img src=" + info.headurl +" style='width:60px'/></div><p>姓名:" 
          + info.name + "<br/>性别：" + info.gender + "<br/>当前心情：" 
          + info.emotion
      }
    },
    //移除弹窗
  	removePopup(){
  	  //移除地图弹窗
      if (popup) {
        popup.remove();
      }
  	},
    getMonitorAbnormalUserByAbnormal(type) {
      var that = this;
      that.data = []
      getMonitorAbnormalUserByAbnormal({"abnormalName": type}).then(async res => {
        console.log("异常", res)
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
            that.unsual(type)
          }
        }
      })
    }
  },
}
</script>

<style scoped>
#monitor {
  position: fixed;
  width: 100%;
  height: 100%;
  color: black;
}

#map {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>