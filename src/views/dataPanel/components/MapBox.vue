<template>
  <div id="map-box">
    <div id="map" />
  </div>
</template>

<script>
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import 'mapbox-gl/dist/mapbox-gl.css' 
import position from "../public/js/map.json"

export default {
  name: "MapBox",
  data() {
    return {
      map: "",
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      var that = this;
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoibGVhcm5lcjciLCJhIjoiY2t4MXRxYmY1MWlocjMwbXQxZHlvcTIzbyJ9.jyM9kf6SpL0Q1keyMbxxBQ";
      that.map = new this.$mapboxgl.Map({
        container: "map",
        style: 'mapbox://styles/learner7/ckxafrrrt163215lcdqcdvh3s',
        center: [118.78384172916414, 32.03601094474414],
        zoom: 15.4
      });
      that.map.addControl(
        new MapboxLanguage({
          defaultLanguage: "zh-Hans", // 修改语言为中文
        })
      );
      this.map.on("load", function() {
        // 热力点
        that.map.addSource('heatData', {
          'type': 'geojson',
          'data': position,
        })
        // 热力图
        that.map.addLayer({
          'id': 'earthquakes-heat',
          'type': 'heatmap',
          'source': 'heatData',
          // 'maxzoom': 16,
          'paint': {
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'tel'],
              0, 0,
              100, 1
            ],
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 1,
              9, 1.1,
              10, 1.2,
              11, 1.5,
              12, 2,
              13, 2.5
            ],
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(33,102,172,0)',
              0.2, 'rgb(103,169,207)',
              0.4, 'rgb(209,229,240)',
              0.7, 'rgb(253,219,199)',
              0.9, 'rgb(239,138,98)',
              1, 'rgb(178,24,43)'
            ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 2,
              9, 10,
              10, 12,
              11, 14,
              12, 16,
              13, 18,
              14, 20
            ],
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': 0.8
          }
        })
      })
      // this.map.on("load", function() {
      //   that.map.loadImage("http://1.15.241.95:9000/headsculpture/oldwoman.png", function(error, image) {
      //     if (error) throw error;
      //     that.map.addImage("old1", image, { width:50});
      //   })
      //   that.map.loadImage("http://1.15.241.95:9000/headsculpture/oldman.png", function(error, image) {
      //     if (error) throw error;
      //     that.map.addImage("old2", image);
      //   })
      //   for(var i=0; i < position.features.length; i++){
      //     position.features[i].properties.icon = "old1",
      //     position.features[i].properties.description = "<strong>用户信息</strong><br/><p>姓名: 王花<br/>年龄: 60<br/>性别：女<br/></p>"
      //   }
      //   that.map.addLayer({
      //     "id": "points",
      //     "type": "symbol",
      //     "source": {
      //       "type": "geojson",
      //       "data": position,
      //     },
      //     'layout': {
      //       "icon-image": ["get", "icon"],
      //       // "text-field": ["get", "Name"],//此属性对应图标注释,必须拥有
      //       "icon-size": 0.06,
      //     },
      //   })
      //   var popup = new that.$mapboxgl.Popup({
      //     closeButton: false,
      //     closeOnClick: false
      //   });
      //   that.map.on('mouseenter', 'points', function(e) {
      //     // Change the cursor style as a UI indicator.
      //     that.map.getCanvas().style.cursor = 'pointer';
          
      //     var coordinates = e.features[0].geometry.coordinates.slice();
      //     var description = e.features[0].properties.description;
          
      //     // Ensure that if the map is zoomed out such that multiple
      //     // copies of the feature are visible, the popup appears
      //     // over the copy being pointed to.
      //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      //     }
          
      //     // Populate the popup and set its coordinates
      //     // based on the feature found.
      //     popup.setLngLat(coordinates)
      //     .setHTML(description)
      //     .addTo(that.map);
      //   });
        
      //   that.map.on('mouseleave', 'points', function() {
      //     that.map.getCanvas().style.cursor = '';
      //     popup.remove();
      //   });
      // })
    }
  }
}
</script>

<style>
.mapboxgl-popup {
  color: black ! important;
}
</style>

<style scoped>
#map-box {
  position: fixed;
  width: 40%;
  height: 100%;
  left: 30%;
  z-index: 0;
}

#map {
  width: 100%;
  height: 100%;
}

/* .mapboxgl-popup {
  max-width: 400px ! important;
  color: black ! important;
} */
</style>