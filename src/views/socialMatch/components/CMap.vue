<template>
  <div id="c-map">
    <div id="map" />
  </div>
</template>

<script>
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import 'mapbox-gl/dist/mapbox-gl.css' 
import bus from 'common/js/Bus.js'
import axios from "axios"

var popup
export default {
  name: "CMap",
  data() {
    return {
      map: "",
      places: [
        {
          name: "68生活广场",
          local: "http://1.15.241.95:9000/location/68%E7%94%9F%E6%B4%BB%E5%B9%BF%E5%9C%BA.json",
        },
        {
          name: "清荷北园活动中心",
          local: "http://1.15.241.95:9000/location/清荷北园活动中心.json",
        },
        {
          name: "其他",
          local: "http://1.15.241.95:9000/location/其他.json"
        }
      ],
      position: [],
    }
  },
  mounted() {
    var that = this;
    bus.$on("activename", function(value) {
      that.removePopup();
      that.removeLayer(1)
      that.showPlace(value)
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
        center: [118.71070057153702, 31.975768645278496],
        zoom: 16,
      });
      that.map.addControl(
        new MapboxLanguage({
          defaultLanguage: "zh-Hans", // 修改语言为中文
        })
      );
      that.map.on("load", function() {
        that.map.loadImage('http://1.15.241.95:9000/otherpicture/定位.png', function(error, image) {
          if (error) throw error;
          that.map.addImage('place', image,  { width:50})
        }) 
      })
    },
    removeLayer(e) {
      var that = this;
      if (e == 1){
        if (that.map.getSource("place") !== undefined) {
          that.map.removeLayer('place')
          that.map.removeSource('place')
        }
      }
    },
    async showPlace(value) {
      var that = this;
      if (value) {
        if (value.location == "68生活广场") {
          await axios.get(that.places[0].local).then(res => {
            that.position = res.data.features
          }).catch(err => {
            console.log(err);
          });
        }else if (value.location == "清荷北园活动中心") {
          await axios.get(that.places[1].local).then(res => {
            that.position = res.data.features
          }).catch(err => {
            console.log(err);
          });
        }else {
          await axios.get(that.places[2].local).then(res => {
            that.position = res.data.features
          }).catch(err => {
            console.log(err);
          });
        }
      };
      if (that.position.length) {
        that.map.addSource("place", {
          "type": 'geojson',
          "data": {
            "type": "FeatureCollection",
            "features":that.position,
          },
        });
        that.map.addLayer({
          "id": "place",
          'type': 'symbol',
          'source': "place",
          "layout": {
            "icon-image": 'place',
            "icon-size": 0.16
          }
        });
        that.map.flyTo({
          center: [that.position[0].geometry.coordinates[0], 
            that.position[0].geometry.coordinates[1] + 0.0008]
        });
      popup = new that.$mapboxgl.Popup({
        anchor: 'bottom',
        closeButton: false,
        closeOnClick: false
      });
      // 添加活动地点信息弹窗
      that.map.on('mouseenter', 'place', function(e) {
        // Change the cursor style as a UI indicator.
        that.map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = "<strong>活动信息</strong><br/>活动名称: " + value.activityName 
          + "<br/>活动时间：" + value.date + "<br/>活动类型：" + value.label
          + "<br/>活动地点：" + value.location +  "<br/>活动状态：" + value.state 
        
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
      that.map.on('mouseleave', 'place', function() {
        that.map.getCanvas().style.cursor = '';
        popup.remove();
      })
      }
    },
    //移除弹窗
  	removePopup(){
  	  //移除地图弹窗
      if (popup) {
        popup.remove();
      }
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
  z-index: 10;
}
</style>