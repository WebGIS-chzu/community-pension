<template>
  <div id="info-search">
    <searchingbox />
    <searchResult v-show="show" />
    <search-legend />
    <div id="map"></div>
  </div>
</template>

<script>
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import 'mapbox-gl/dist/mapbox-gl.css' 
import bus from 'common/js/Bus.js'

import Searchingbox from "./components/Searchingbox";
import SearchResult from "./components/SearchResult.vue";
import SearchLegend from './components/SearchLegend.vue';

// 获取老人位置信息
import { queryElderlyByCondition } from "network/query";

export default {
  name: "ServeMana",
  components: {
    Searchingbox,
    SearchResult,
    SearchLegend,
  },
  data() {
    return {
      map: "",
      positions: [],
      show: false,
      character: "老人",
      sendOld: {
        "name": "",
        "idCardNumber": "",
        "address": "",
        "heartRateMin": "",
        "heartRateMax": "",
        "bloodPressureMin": "",
        "bloodPressureMax": "",
      },
    }
  },
  mounted() {
    var that = this;
    that.removeLayer(1)
    that.queryElderlyByCondition(that.sendOld);
    // 获取角色信息
    bus.$on("character", function(character) {
      that.character = character
    })
    // 隐藏个人信息模块
    bus.$on("showinfo", function(value) {
      that.show = value
    });
    // 显示老人个人信息模块
    bus.$on('oldSearch', function(value) {
      that.show = value
    });
    // 显示护工个人信息模块
    bus.$on("workerSearch", function(value) {
      that.show = value
    });
    // 获取护工位置
    bus.$on("queryworker", function(worker) {
      that.removeLayer(1)
      that.showPositions(worker)
    })

    // 获取老人位置
    bus.$on("queryold", function(old) {
      that.removeLayer(1)
      that.showPositions(old)
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
        center: [118.71128261089324, 31.97797105423076],
        zoom: 16,
      });
      that.map.addControl(
        new MapboxLanguage({
          defaultLanguage: "zh-Hans", // 修改语言为中文
        })
      );
      that.map.on("load", function() {
        that.map.loadImage('http://1.15.241.95:9000/otherpicture/护工图标.png', function(error, image) {
          if (error) throw error;
          that.map.addImage('medical', image,  { width:50})
        })   
        that.map.loadImage('http://1.15.241.95:9000/otherpicture/老人图标.png', function(error, image) {
          if (error) throw error;
          that.map.addImage('old', image,  { width:50})
        })   
      })
    },
    async showPositions(datatype) {
      var that = this;
      that.positions = []
      if (datatype) {
        for (var i = 0; i < datatype.length; i++) {
          await axios.get('http://' + datatype[i].value).then(res => {
            res.data.features[0].properties.description = datatype[i].name
            that.positions.push(res.data.features[0])
          }).catch(err => {
            console.log(err);
          });
        }
        var imageName = ""
        if (that.character == "老人") {
          imageName = "old"
        }else if (that.character == "护工") {
          imageName = "medical"
        }
        console.log(that.positions[0].geometry.coordinates)
        that.map.flyTo({
          center: that.positions[0].geometry.coordinates,
          zoom: 17,
          // bearing: 0,
          
          // These options control the flight curve, making it move
          // slowly and zoom out almost completely before starting
          // to pan.
          speed: 0.2, 
        })
        console.log("imageName", imageName)
        // console.log(that.positions)
        that.map.addSource("position", {
          "type": 'geojson',
          "data": {
            "type": "FeatureCollection",
            "features":that.positions
          },
        });
        that.map.addLayer({
          "id": "position",
          'type': 'symbol',
          'source': "position",
          "layout": {
            "icon-image": imageName,
            "icon-size": 0.05
          }
        });

        that.map.on('click', 'position', function (e) {
          that.show = true
          var id = e.features[0].properties.description;
          // 传用户id和角色
          var value = [id, that.character]
          bus.$emit("id", value)
        })        
      }
    },
    removeLayer(e) {
      var that = this;
      console.log("查询图标加载中")
      if ( e == 1 ) {
        if (that.map.getSource) {
          if (that.map.getSource('position') !== undefined){
            that.map.removeLayer('position') 
            that.map.removeSource('position')
          }
        }
      }
    },
    // 获取老人位置
    queryElderlyByCondition(sendOld) {
      var that = this;
      queryElderlyByCondition(sendOld).then(res => {
        if (res) {
          that.showPositions(res.data.result)
        }
      })
    }
  }
};
</script>

<style>
#info-search {
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