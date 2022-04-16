<template>
  <div id="serve-mana">
    <div id="map" />
    <serve-type />
    <worker />
  </div>
</template>

<script>
import axios from 'axios'
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import 'mapbox-gl/dist/mapbox-gl.css';
import { ServiceOrders } from "network/serve"
import bus from "common/js/Bus.js";

import ServeType from "./components/ServeType" //左侧服务
import Worker from "./components/Worker" //右侧护工

export default {
  name: "ServeMana",
  data() {
    return {
      map: "",
      allData: [],
      medical: [],
      mind: [],
      housekeeping: [],
      deliver: [],
      entertainment: [],
      points: [],
    }
  },
  components: {
    ServeType,
    Worker,
  },
  mounted() {
    var that = this;
    that.ServiceOrders();
    bus.$on("servetype", async function(type) {
      await that.TypePoint(type);
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
        center: [118.71208190917967, 31.97719748686031],
        zoom: 17,
        // pitch: 45,
      });
      that.map.addControl(
        new MapboxLanguage({
          defaultLanguage: "zh-Hans", // 修改语言为中文
        })
      );
      that.map.on("load",function() {
        that.map.loadImage('http://1.15.241.95:9000/otherpicture/医疗服务.png', function(error, image) {
          if (error) throw error;
          that.map.addImage('medical', image,  { width:50})
        })
        that.map.loadImage('http://1.15.241.95:9000/otherpicture/心理慰藉.png', function(error, image) {
          if (error) throw error;
          that.map.addImage('mind', image, { width:50})
        }) 
        that.map.loadImage("http://1.15.241.95:9000/otherpicture/家政服务.png", function(error, image) {
          if (error) throw error;
          that.map.addImage("housekeeping", image, { width:50});
        })
        that.map.loadImage("http://1.15.241.95:9000/otherpicture/家庭.png", function(error, image) {
          if (error) throw error;
          that.map.addImage("deliver", image, {width: 100});
        })
        that.map.loadImage("http://1.15.241.95:9000/otherpicture/休闲娱乐.png", function(error, image) {
          if (error) throw error;
          that.map.addImage("entertainment", image, { width:50});
        }) 
      })
    },
    ServiceOrders() {
      var that = this;
      ServiceOrders({"serviceType": ""}).then(async(res) => {
        if (res) {
          // console.log("res", res)
          that.allData = res.data.result
          // console.log("allData", that.allData)
          await this.AllPoints()
        }
      })
    },
    async AllPoints() {
      for (var i = 0; i < this.allData.length; i++) {
        if (this.allData[i].serviceName == "医疗服务") {
          await axios.get('http://' + this.allData[i].location).then(res1 => {
            this.medical.push(res1.data.features[0])
          }).catch(err => {
            console.log(err);
          });
        }else if (this.allData[i].serviceName == "心理慰藉") {
          axios.get('http://' + this.allData[i].location).then(res1 => {
            this.mind.push(res1.data.features[0])
          }).catch(err => {
            console.log(err);
          });
        }else if (this.allData[i].serviceName == "家政服务") {
          axios.get('http://' + this.allData[i].location).then(res1 => {
            this.housekeeping.push(res1.data.features[0])
          }).catch(err => {
            console.log(err);
          });
        }else if (this.allData[i].serviceName == "家庭便利") {
          axios.get('http://' + this.allData[i].location).then(res1 => {
            this.deliver.push(res1.data.features[0])
          }).catch(err => {
            console.log(err);
          });
        }else if (this.allData[i].serviceName == "休闲娱乐") {
          axios.get('http://' + this.allData[i].location).then(res1 => {
            this.entertainment.push(res1.data.features[0])
          }).catch(err => {
            console.log(err);
          });
        }
      }
      this.removeLayer(1)
      this.AddPoints();
    },
    async TypePoint(type) {
      var that = this
      this.points = []
      for (var i = 0; i < this.allData.length; i++) {
        if (this.allData[i].serviceName == type) {
          await axios.get('http://' + this.allData[i].location).then(res2 => {
            this.points.push(res2.data.features[0])
          }).catch(err => {
            console.log(err);
          });
        }
      }
      if (type == "医疗服务") {
        type = "medical"
      }else if (type == "心理慰藉") {
        type = "mind"
      }else if (type == "家政服务") {
        type = "housekeeping"
      }else if (type == "家庭便利") {
        type = "deliver"
      }else if (type == "休闲娱乐") {
        type = "entertainment"
      }
      that.removeLayer(1)
      if (that.points.length > 0) {
        that.map.addSource(type, {
          "type": 'geojson',
          "data": {
            "type": "FeatureCollection",
            "features":that.points
          },
        });
        that.map.addLayer({
          "id": type,
          'type': 'symbol',
          'source': type,
          "layout": {
            "icon-image": type,
            "icon-size": 0.2
          }
        });
      }
    },
    removeLayer(e) {
      var that = this;
      console.log("服务图标加载中")
      if ( e == 1) {
        if (that.map.getSource('medical') !== undefined){
          that.map.removeLayer('medical') 
          that.map.removeSource('medical')
        }
        if (that.map.getSource('mind') !== undefined){
          that.map.removeLayer('mind') 
          that.map.removeSource('mind')
        }
        if (that.map.getSource('housekeeping') !== undefined){
          that.map.removeLayer('housekeeping') 
          that.map.removeSource('housekeeping')
        }
        if (that.map.getSource('deliver') !== undefined){
          that.map.removeLayer('deliver') 
          that.map.removeSource('deliver')
        }
        if (that.map.getSource('entertainment') !== undefined){
          that.map.removeLayer('entertainment') 
          that.map.removeSource('entertainment')
        }
      }
    },
    AddPoints() {
      var that = this;
      // var list = {}
      // list = {
      //   "type": "FeatureCollection",
      //   "features": that.mind,
      // }
      // console.log("list", list)
      if (that.medical.length > 0) {
        that.map.addSource("medical", {
          "type": 'geojson',
          "data": {
            "type": "FeatureCollection",
            "features":that.medical
          },
        });
        that.map.addLayer({
          "id": "medical",
          'type': 'symbol',
          'source': 'medical',
          "layout": {
            "icon-image": "medical",
            "icon-size": 0.2
          }
        });
        that.map.addSource("mind", {
          "type": 'geojson',
          "data": {
            "type": "FeatureCollection",
            "features":that.mind
          },
        });
        that.map.addLayer({
          "id": "mind",
          'type': 'symbol',
          'source': 'mind',
          "layout": {
            "icon-image": "mind",
            "icon-size": 0.2
          }
        });
        that.map.addSource("housekeeping", {
          "type": 'geojson',
          "data": {
            "type": "FeatureCollection",
            "features":that.housekeeping
          },
        });
        that.map.addLayer({
          "id": "housekeeping",
          'type': 'symbol',
          'source': 'housekeeping',
          "layout": {
            "icon-image": "housekeeping",
            "icon-size": 0.2
          }
        });
        that.map.addSource("deliver", {
          "type": 'geojson',
          "data": {
            "type": "FeatureCollection",
            "features":that.deliver
          },
        });
        that.map.addLayer({
          "id": "deliver",
          'type': 'symbol',
          'source': 'deliver',
          "layout": {
            "icon-image": "deliver",
            "icon-size": 0.2
          }
        });
        that.map.addSource("entertainment", {
          "type": 'geojson',
          "data": {
            "type": "FeatureCollection",
            "features":that.entertainment
          },
        });
        that.map.addLayer({
          "id": "entertainment",
          'type': 'symbol',
          'source': 'entertainment',
          "layout": {
            "icon-image": "entertainment",
            "icon-size": 0.2
          }
        });
      }
    }
  },
};
</script>

<style scoped>
#serve-mana {
  position: fixed;
  width: 100%;
  height: 100%;
}
#map {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>