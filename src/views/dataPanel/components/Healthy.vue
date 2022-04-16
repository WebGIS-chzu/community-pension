<template>
  <div id="healthy">
    <div
      id="myChart4"
      style="width: 100%; height: 130%; z-index: 100; bottom: 7%; right: 10%"
    ></div>
  </div>
</template>

<script>
import { getAbnormalHealth } from "network/datapanel";

export default {
  name: "Healthy",
  data(){
    return {
      thisWeekHealthydata: [],
      lastWeekHealthydata: [],
    }
  },
  created() {
    this.getAbnormalHealth();
  },
  mounted() {
    this.evaluate();
  },
  methods: {
    getAbnormalHealth() {
      var that = this;
      getAbnormalHealth().then((res) => {
        // console.log("res", res);
        that.thisWeekHealthydata = res.data.result[0].value;
        that.lastWeekHealthydata = res.data.result[1].value;
        that.evaluate();
      });
    },
    evaluate() {
      // 基于准备好的dom，初始化echarts实例
      let myChart4 = this.$echarts.init(document.getElementById("myChart4"));
      var that = this;
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            color: "rgba(255, 255, 255, 0.9)",
          },
          backgroundColor: "rgba(3, 28, 67, 0.7)",
        },
        grid: {
          //控制图的大小
          top: 50,
          x: 45,
          y: 70,
          x2: 60,
          y2: 80,
        },
        legend: {
          data: ["上周", "本周"],
          textStyle: {
            color: "#07bffb",
          },
          x: "57%",
          y: "10%",
        },
        xAxis: {
          type: "category",
          name: "异常情况",
          axisLabel: {
            interval: 0,
          },
          orient: "vertical",
          nameTextStyle: {
            color: "#07bffb",
            fontSize: 10,

            // 设置水平坐标轴文字块的内边距
            // padding: [12, 0, 0, 0],
          },
          textStyle: {
            color: "#07bffb",
            fontSize: 10,
          },
          //不显示背景网格线
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
            symbol: ["none", "none"],
            lineStyle: {
              color: "#07bffb",
            },
          },
          boundaryGap: true,
          data: ["体温", "血压", "心率", "倾斜", "姿态", "情绪"],
        },
        yAxis: {
          type: "value",
          name: "人数",
          splitLine: { show: false },
          nameTextStyle: {
            color: "#07bffb",
            // 设置水平坐标轴文字块的内边距
            padding: [12, 0, 0, 0],
          },
          axisLine: {
            show: true,
            symbol: ["none", "none"],
            lineStyle: {
              color: "#07bffb",
            },
          },
          axisLabel: {
            formatter: "{value} ",
            labelStyle: {
              color: "#07bffb",
            },
          },
        },
        series: [
          {
            name: "上周",
            type: "line",
            lineStyle: {
              color: "#24feb4",
            },
            data: that.lastWeekHealthydata,
            axisLine: {
              show: true,
              symbol: ["none", "none"],
            },
            symbol: "circle", //设定为实心点
            symbolSize: 6, //设定实心点的大小
            hoverAnimation: false,
            animation: false,
            itemStyle: {
              color: "#02a6b5",
              normal: {
                color: "#02a6b5",
              },
              borderColor: "#02a6b5",
            },
            splitLine: {
              show: false,
            },
            markPoint: {
              symbolSize: 30,
              textStyle: {
                color: "#07bffb",
              },
              label: {
                borderColor: "inherit",
              },
            },
          },
          {
            name: "本周",
            type: "line",
            lineStyle: {
              color: "#fcc80d",
            },
            data: that.thisWeekHealthydata,
            symbol: "circle", //设定为实心点
            symbolSize: 6, //设定实心点的大小
            hoverAnimation: false,
            animation: false,
            itemStyle: {
              color: "#fcc80d",
              normal: {
                color: "#ff6316",
              },
              borderColor: "#24feb4",
            },
            markLine: {
              lineStyle: {
                color: "#ff6316",
              },
              data: [
                [
                  {
                    symbol: "none",
                    x: "60%",
                    yAxis: "max",
                  },
                  {
                    symbol: "circle",
                    label: {
                      position: "start",
                      formatter: "Max",
                    },
                    type: "max",
                    name: "最高点",
                  },
                ],
                [
                  {
                    symbol: "none",
                    x: "80%",
                    yAxis: "min",
                  },
                  {
                    symbol: "circle",
                    label: {
                      position: "start",
                      formatter: "Min",
                    },
                    type: "min",
                    name: "最低点",
                  },
                ],
              ],
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart4.setOption(option);
    },
  },
};
</script>

<style scoped>
#healthy {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 4%;
  padding: 0px 0px 0px 20px;
}
</style>