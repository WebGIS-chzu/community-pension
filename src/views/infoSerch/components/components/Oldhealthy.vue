<template>
  <div id="oldhealthy">
    <div id="myChart9" style="width: 100%; height: 100%; z-index: 100"></div>
  </div>
</template>

<script>
import bus from 'common/js/Bus.js'

import { getElderlyInformationByUserid } from "network/query";

export default {
  name: "Oldhealthy",
  data() {
    return {
      nbody: [],
      sbody: [],
    };
  },
  mounted() {
    var that = this;
    bus.$on("id", function(value) {
      if (value[1] == "老人") {
        that.getElderlyInformationByUserid(value[0]);
      }
    })
  },

  methods: {
    oldhealthy() {
      // 基于准备好的dom，初始化echarts实例
      let myChart9 = this.$echarts.init(document.getElementById("myChart9"));
      var that = this;
      // 指定图表的配置项和数据
      let option = {
        color: [ '#56A3F1', '#FF917C'],
        grid: {
            // 控制图的大小
            top: 70,
            x: 29,
            y: 0,
            x2: 10,
            y2: 16,
          },
        legend: {
          data: ['标准健康', '当前健康'],
          x: "37%",
          y: "22%",
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 7,
          orient: "vertical",
          textStyle: {
            fontSize: 11,
            color: "#07bffb",
          },
        },
        radar: {
          indicator: [
            { text: '血压', max: 150 },
            { text: '心率', max: 150 },
            { text: '睡眠', max: 24 },
            { text: '体温', max: 50 },
          ],
          center: ['50%', '55%'],
          radius: 75,
          axisName: {
            color: '#07bffb',
            backgroundColor: 'rgba(3, 28, 67, 0.7)',
            borderRadius: 3,
            padding: [3, 5]
          },
          textStyle: {
              fontSize: 11,
              color: "#07bffb",
            },
          // startAngle: 50,
          // splitNumber: 4,
          // shape: 'circle',
          axisName: {
            formatter: '【{value}】',
            color: '#428BD4',
          },
          nameGap: 13,
        },
        series: [
          {
            type: 'radar',
            emphasis: {
              lineStyle: {
                width: 4
              }
            },
            data: [
            {
              value: that.sbody,
              name: '标准健康',
              lineStyle: {
                type: 'dashed'
              },
              label: {
                show: true,
                formatter: function (params) {
                  return params.value;
                }
              }
            },
            {
              value: that.nbody,
              name: '当前健康',
              areaStyle: {
                color: this.$echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                    {
                      color: 'rgba(255, 145, 124, 0.1)',
                      offset: 0
                    },
                    {
                      color: 'rgba(255, 145, 124, 0.9)',
                      offset: 1
                    }
                  ])
              }
            }
            ]
          },       
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart9.setOption(option);
    },
    getElderlyInformationByUserid(id) {
      var that = this
      getElderlyInformationByUserid({"userid": id}).then(res => {
        if (res) {
          that.nbody = []
          that.sbody = []
          for (var i = 0; i < res.data.result[0].braceletInformationList[0].value.length; i++) {
            that.nbody.push(parseInt(res.data.result[0].braceletInformationList[0].value[i].value))
          }
          for (var i = 0; i < res.data.result[0].braceletInformationList[1].value.length; i++) {
            that.sbody.push(parseInt(res.data.result[0].braceletInformationList[1].value[i].value))
          }
          console.log("that.nbody", that.nbody)
          console.log("that.sbody", that.sbody)
          that.oldhealthy()
        }
      })
    }
  },
};
</script>

<style scoped>
#oldhealthy {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 12%;
  left: 3%;
}
</style>