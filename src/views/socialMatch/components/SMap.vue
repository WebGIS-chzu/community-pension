<template>
  <div id="s-map">
    <div id="map" />
  </div>
</template>

<script>
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import 'mapbox-gl/dist/mapbox-gl.css' 
import bus from 'common/js/Bus.js'
import axios from "axios"

import { getElderlyLocation, getUserInformationByUserId } from "network/socialgraph" 

var popup
export default {
  name: "SMap",
  data() {
    return {
      map: "",
      locallist: [],
      description: "",
    }
  },
  mounted() {
    var that = this;
    this.getElderlyLocation();
    bus.$on("activityid", function(activityid) {
      that.removeLayer(1);
      that.removePopup();
      that.getInformationByUserId(activityid)
    });
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
        center: [118.71070057153702, 31.975768645278496],
        zoom: 16,
      });
      that.map.addControl(
        new MapboxLanguage({
          defaultLanguage: "zh-Hans", // 修改语言为中文
        })
      );
      that.map.on("load", function() {
        that.map.loadImage('http://1.15.241.95:9000/otherpicture/老人图标.png', function(error, image) {
          if (error) throw error;
          that.map.addImage('old', image,  { width:50})
        }) 
      })
    },
    getElderlyLocation(){
      var that = this;
      that.locallist = [];
      getElderlyLocation().then(async res => {
        if (res) {
          for (var i = 0; i < res.data.result.length; i++) {
            await axios.get('http://' + res.data.result[i].location).then(res1 => {
              res1.data.features[0].properties.description = res.data.result[i].userid
              that.locallist.push(res1.data.features[0])
            }).catch(err => {
              console.log(err);
            });
          }
          that.showPosition();
        }
      })
    },
    removeLayer(e) {
      var that = this;
      if (e == 1){
        if (that.map.getSource("old") !== undefined) {
          // 移除老人图片
          that.map.removeLayer('old')
          that.map.removeSource('old')
        }
      }
    },
    showPosition() {
      var that = this;
      console.log(that.locallist)
      if (this.locallist.length) {
        that.map.addSource("old", {
          "type": 'geojson',
          "data": {
            "type": "FeatureCollection",
            "features":that.locallist,
          },
        });
        that.map.addLayer({
          "id": "old",
          'type': 'symbol',
          'source': "old",
          "layout": {
            "icon-image": 'old',
            "icon-size": 0.05
          }
        });
        that.map.on('click', 'old', async function (e) {
          // 获取用户id从而得到具体用户信息
          var id = e.features[0].properties.description;
          var coordinates = e.features[0].geometry.coordinates.slice();
          bus.$emit("socialid", id)
          await getUserInformationByUserId({"userid": id}).then(function(res) {
            if(res) {
              var info = res.data.result[0]
              that.getInfo(info)
            }
          })
          var description = that.description;
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          popup = new that.$mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(that.map);
        })
        // Change the cursor to a pointer when the mouse is over the places layer.
        that.map.on('mouseenter', 'old', function () {
          that.map.getCanvas().style.cursor = 'pointer';
        });
        
        // Change it back to a pointer when it leaves.
        that.map.on('mouseleave', 'old', function () {
          that.map.getCanvas().style.cursor = '';
        });
      }
    },
    getInformationByUserId(id) {
      var that = this;
      that.locallist = []
      getUserInformationByUserId({ "userid": id}).then(async res => {
        await axios.get('http://' + res.data.result[0].location).then(res1 => {
          res1.data.features[0].properties.description = res.data.result[0].userid
          that.locallist.push(res1.data.features[0])
        }).catch(err => {
          console.log(err);
        });
        that.map.flyTo({
          center: that.locallist[0].geometry.coordinates,
        })
        that.showPosition();
      }).catch(err => {
        console.log(err)
      })
    },
    //移除弹窗
  	removePopup(){
  	  //移除地图弹窗
      if (popup) {
        popup.remove();
      }
  	},
    getInfo(info) {
      this.description = "<strong>用户信息</strong><br/><div><img src=" + info.headportrait +" style='width:60px'/></div><p>姓名:" 
        + info.name + "<br/>性别：" + info.gender + "<br/>年龄：" 
        + info.age
    },
  },
}
</script>

<style scoped>
/* #c-map {
  position: fixed;
  width: 40%;
  height: 40%;
  z-index: 0;
} */

#map {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>