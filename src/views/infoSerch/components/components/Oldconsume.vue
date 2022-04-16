<template>
  <div id="oldconsume">
    <div id="myChart10" style="width: 350px; height: 210px; z-index: 10"></div>
  </div>
</template>

<script>
import bus from 'common/js/Bus.js'

import { getElderlyInformationByUserid } from "network/query";

export default {
  name: "Oldconsume",
  data() {
    return {
      nconsumption: [],
      sconsumption: [],
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
    oldconsume() {
      // 基于准备好的dom，初始化echarts实例
      let myChart10 = this.$echarts.init(document.getElementById("myChart10"));
      var that = this;
      // 指定图表的配置项和数据
      let option = {
        color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
        legend: {
          data: ['标准消费', '当前消费'],
          x: "2%",
          y: "0%",
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 7,
          orient: "vertical",
          textStyle: {
            fontSize: 11,
            color: "#07bffb",
          },
        },
        grid: {
          top: 10,
          x: 70,
          y: 90,
          x2: 100,
          y2: 120,
        },
        radar: {
          indicator: [
            { text: '水费' },
            { text: '电费' },
            { text: '燃气费' },
          ],
          // 中心位置
          // center: ['15%', '30%'],
          // 大小
          radius: 80,
          // 起始角度
          startAngle: 50,
          // 背景圆环个数
          splitNumber: 4,
          // 背景形状
          shape: 'circle',
          // 【水电费】
          axisName: {
            formatter: '【{value}】',
            color: '#428BD4',
            // fontSize:14
          },
          splitArea: {
            areaStyle: {
              color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          },
          // 背景三条线
          axisLine: {
            lineStyle: {
              color: 'rgba(211, 253, 250, 0.8)'
            }
          },
          // 背景圆环边线
          splitLine: {
            lineStyle: {
              color: 'rgba(211, 253, 250, 0.8)'
            }
          }
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
              value: that.sconsumption,
              name: '标准消费',
              lineStyle: {
                normal:{
                type: 'dashed'
                }
              },
              label: {
                show: true,
                formatter: function (params) {
                  return params.value;
                }
              }
            },
            {
              value: that.nconsumption,
              name: '当前消费',
              areaStyle: {
                color: 'rgba(255, 228, 52, 0.6)'
              },
              label: {
                show: true,
                formatter: function (params) {
                  return params.value;
                }
              }
            }
          ]
        },
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart10.setOption(option);
    },
    getElderlyInformationByUserid(id) {
      var that = this
      getElderlyInformationByUserid({"userid": id}).then(res => {
        if (res) {
          that.nconsumption = []
          that.sconsumption = []
          for (var i = 0; i < res.data.result[0].wpgCostList[0].value.length; i++) {
            that.nconsumption.push(res.data.result[0].wpgCostList[0].value[i].value)
          }
          for (var i = 0; i < res.data.result[0].wpgCostList[1].value.length; i++) {
            that.sconsumption.push(res.data.result[0].wpgCostList[1].value[i].value)
          }
          that.oldconsume();
        }
      })
    }
  },
};
</script>

<style scoped>
#oldconsume {
  /* position: absolute; */
  /* width: 100%;
  height: 100%; */
  margin: 0;
}
</style>