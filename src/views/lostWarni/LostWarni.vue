<template>
  <div id="page-three">
    <div id="map"></div>
    <others/>
  </div>
</template>

<script>
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import 'mapbox-gl/dist/mapbox-gl.css' 
import Others from "./components/Others"
import bus from 'common/js/Bus.js'
import * as turf from '@turf/turf'

export default {
  name: "LostWarni",
  data() {
    return {
      map: "",
      line: [],
      start: [],  //起点
      end: [],   //终点
      description: "", //老人信息
    };
  },
  components: {
    Others,
  },
  created() {
    // 如果要支持阿拉伯语，加添加RTL支持
  },
  beforeDestroy() {
    bus.$off("lostlist")
  },
  mounted() {
    var that = this;
    // 获取老人身份信息
    bus.$on("info", function(info) {
      that.getInfo(info)
    })
    // 获取老人路线
    bus.$on("lostlist", function(list) {
      that.removeLayer(1)
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
        center: [118.792199, 32.050678],
        zoom: 5,
	      // style: {
        //   //目前地图的版本用8
        //   "version": 8,
        //   //数据源，可以设置多个数据源
        //   "sources": {
        //     "mapsource": {
        //       //数据源类型是 raster
        //       "type": "raster", 
        //       //切片的地址：arcgis server 只有发布了切片才能这样进行访问，具体参照arcgis server的wmts发布
              
        //       // WMTS/tile/1.0.0/MyM/default/default028mm/{z}/{y}/{x}.png
        //       "tiles":   ['https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}'],
        //         //切片的尺寸，一般都是256
        //       "tileSize": 256,
			  //     } 
		    //   },
        //   //加载数据源里的图层
        //   "layers": [{
        //       "id": "mapsource",
        //       "type": "raster",
        //         //数据源选择source中的id
        //       "source": "mapsource",
        //       //设置图层的可缩放级别
        //       "minzoom": 0,
        //       "maxzoom": 18
        //   }]
				// }
      });
      that.map.addControl(
        new MapboxLanguage({
          defaultLanguage: "zh-Hans", // 修改语言为中文
        })
      );
      // that.map.on("load", function() {
      //   if (that.line.length != 0){
      //     getPosition(road)
      //   }
      // })
      that.map.on("load", function() {
        that.map.loadImage('http://1.15.241.95:9000/otherpicture/start.png', function(error, image) {
          if (error) throw error;
          that.map.addImage('start', image)
        })
        that.map.loadImage('http://1.15.241.95:9000/otherpicture/end.png', function(error, image) {
          if (error) throw error;
          that.map.addImage('end', image)
        }) 
        that.map.loadImage("http://1.15.241.95:9000/otherpicture/monitor.png", function(error, image) {
          if (error) throw error;
          that.map.addImage("monitor", image, { width:50});
        })     
      })
      // 添加图层（地区边界）
      // this.map.on('load', function() {
      //   that.map.addLayer({
      //     'id': 'maine',
      //     'type': 'fill',
      //     'source': {
      //       'type': 'geojson',
      //       'data': {
      //         'type': 'Feature',
      //         'geometry': {
      //           'type': 'Polygon',
      //           'coordinates': data.features[0].geometry.coordinates[0],
      //         }
      //       }
      //     },
      //     'layout': {},
      //     'paint': {
      //       'fill-color': '#088',
      //       'fill-opacity': 0.8,
      //     }
      //   })
      // })
    },
    removeLayer(e) {
      var that = this;
      if (that.map.getSource('start') !== undefined){
        if (e == 1){
          that.map.removeLayer('trace') // 清除路线
          that.map.removeSource('trace')
          that.map.removeLayer('maine') // 清除缓冲区
          that.map.removeSource('maine')          
          that.map.removeLayer('start') // 清除起点
          that.map.removeSource('start')
          that.map.removeLayer('end') // 清除终点
          that.map.removeSource('end')
          if (that.map.getSource('monitor') !== undefined) {
            that.map.removeLayer('monitor') // 清除终点
            that.map.removeSource('monitor')
          }
        }
      }
    },
    getPosition(list) {
      var that = this;
      var postions = list[0].features[0].geometry.coordinates
      var sex = list[2].sex
      var path = list[1]
      if (sex == "女") {
        path = [path[0], path[1], path[2]]
      }else {
        path = [path[0], path[1], path[2]]
      }
      that.start = postions[0]
      that.end = postions[postions.length - 1]
      var datas = postions[0]
      const point1 = turf.point(datas)
      const buffgeojson1 = turf.buffer(point1, 0.1, {
        units: 'kilometers'
      })
      const buffgeojson2 = turf.buffer(point1, 0.5, {
        units: 'kilometers'
      })
      // console.log("buffgeojson1", buffgeojson1)
      // console.log("buffgeojson2", buffgeojson2)
      var bbox = turf.bbox(buffgeojson2)
      var lines = turf.randomLineString(25, {bbox})
      // console.log("111datas", datas)
      // console.log("222bbox", bbox)
      // console.log("lines", lines)
      const x = (bbox[2] - bbox[0]) * Math.random() + bbox[0]
      const y = (bbox[3] - bbox[1]) * Math.random() + bbox[1]
      const point2 = turf.point([x, y])
      if (turf.booleanPointInPolygon(point2, buffgeojson1) == true) {
        // data.push([x, y])
      }
      // console.log("data", data)
      // 添加缓冲区
      that.map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [buffgeojson1.geometry.coordinates[0]],
            }
          }
        },
        'layout': {},
        'paint': {
          'fill-color': '#088',
          'fill-opacity': 0.8,
        }
      })
      
      // 添加起点数据
      // that.start = datas
      that.map.addSource("start", {
        type: 'geojson',
        data: {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": that.start
            }
          }]
        }
      })
      that.map.addLayer({
        'id': 'start',
        'type': 'symbol',
        'source': 'start',
        "layout": {
          "icon-image": "start",
          "icon-size": 0.04
        }
      })
      // that.end = lines.features[24].geometry.coordinates[9]
      // 添加终点数据
      that.map.addSource("end", {
        type: 'geojson',
        data: {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": that.end
            }
          }]
        }
      })
      that.map.addLayer({
        'id': 'end',
        'type': 'symbol',
        'source': 'end',
        "layout": {
          "icon-image": "end",
          "icon-size": 0.04
        }
      })
      // 添加起点的弹窗
      var popup = new that.$mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
      // 移除起点的弹窗
      that.map.on('mouseenter', 'start', function(e) {
        // Change the cursor style as a UI indicator.
        that.map.getCanvas().style.cursor = 'pointer';
        var coordinates = that.start.slice();
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
      // 添加终点的弹窗
      that.map.on('mouseleave', 'start', function() {
        that.map.getCanvas().style.cursor = '';
        popup.remove();
      });
      // 移除终点的弹窗
      that.map.on('mouseenter', 'end', function(e) {
        // Change the cursor style as a UI indicator.
        that.map.getCanvas().style.cursor = 'pointer';
        var coordinates = that.end.slice();
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
      
      that.map.on('mouseleave', 'end', function() {
        that.map.getCanvas().style.cursor = '';
        popup.remove();
      });
      // var postions = lines.features[24].geometry.coordinates
      // console.log("postions", postions)
      let data = list[0].features[0]
      // save full coordinate list for later
      var coordinates = data.geometry.coordinates;
      
      // start by showing just the first coordinate
      data.geometry.coordinates = [coordinates[0]];
      
      // add it to the map
      that.map.addSource('trace', { type: 'geojson', data: data });
      that.map.addLayer({
        "id": "trace",
        "type": "line",
        "source": "trace",
        "paint": {
          "line-color": "yellow",
          "line-opacity": 0.75,
          "line-width": 5
        }
      });
      
      // setup the viewport
      that.map.jumpTo({ 'center': coordinates[0], 'zoom': 17 });
      that.map.setPitch(30);
      
      // on a regular basis, add more coordinates from the saved list and update the map
      var i = 0;
      var timer = window.setInterval(function() {
      if (i < coordinates.length) {
          data.geometry.coordinates.push(coordinates[i]);
          that.map.getSource('trace').setData(data);
          that.map.panTo(coordinates[i]);
          i++;
        } else {
          window.clearInterval(timer);
        }
      }, 300);

      var monitor = turf.point(that.end);
      var buffered = turf.buffer(monitor, 0.04, {units: 'miles'});
      var bbox = turf.bbox(buffered)
      // console.log("bbox", bbox)
      var monitors = turf.randomPoint(3, {bbox})
      // 添加监控摄像头
      // console.log("monitors", monitors)
      that.map.addSource("monitor", {
        "type": 'geojson',
        "data": monitors,
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
        bus.$emit("lostVideo", path[i])
      })
    },
    getInfo(info) {
      var that = this
      if (info) {
        that.description = "<strong>用户信息</strong><br/><p>姓名:" 
          + info.name + "<br/>性别：" + info.sex + "<br/>年龄：" 
          + info.age + "<br/>家庭地址：" + info.homeAddress + "<br/>走失时间："
          + info.lostTime + "<br/>紧急联系人：" + info.emergencyContact
      }
    }
  }, 
}
</script>

<style scoped>
#page-three {
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
