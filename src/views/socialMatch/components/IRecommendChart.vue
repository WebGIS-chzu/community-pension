<template>
  <div id="i-recommend-chart">
    <div
      id="myChartIR"
      style="width: 640px; height: 300px; z-index: 10;"
    ></div>
  </div>
</template>

<script>
import bus from "common/js/Bus.js";

export default {
  name: "IRecommendChart",
  created() {},
  data() {
    return {
      ChartIsShow: false,
      MatchingDegreeData: [
      ],
    };
  },
  mounted() {
    bus.$on("IsShowIRChart", (e) => {
      this.ChartIsShow = !this.ChartIsShow;
      // console.log("this.ChartIsShow",this.ChartIsShow)
    });

    var that = this;
    bus.$on("MatchingDegree", function (value) {
      that.MatchingDegreeData = []
      that.MatchingDegreeData = value;
      console.log("MatchingDegreeData", that.MatchingDegreeData);
      if (that.MatchingDegreeData.length) {
        that.evaluate(that.MatchingDegreeData);
      }
    });
  },
  methods: {
    evaluate() {
      // 基于准备好的dom，初始化echarts实例
      var that = this;
      let myChartIR = this.$echarts.init(document.getElementById("myChartIR"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "匹配相似度统计",
          textStyle: {
            color: "#fff",
          },
          left: "40%",
          top: "5%",
        },
        legend: {
          bottom: "5%",
          textStyle: {
            color: "#07bffb",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          textStyle: {
            color: "rgba(255, 255, 255, 0.9)",
          },
          backgroundColor: "rgba(3, 28, 67, 0.7)",
        },
        dataset: {
          dimensions: [
            "姓名",
            "时间重合度",
            "空间相近度",
            "爱好相似度",
            "匹配度",
          ],
          source: [
            {
              "姓名": that.MatchingDegreeData[0].name,
              "时间重合度": that.MatchingDegreeData[0].timeDegree,
              "空间相近度": that.MatchingDegreeData[0].spatialDegree,
              "爱好相似度": that.MatchingDegreeData[0].hobbyDegree,
              "匹配度": that.MatchingDegreeData[0].matchDegree,
            },
            {
              "姓名": that.MatchingDegreeData[1].name,
              "时间重合度": that.MatchingDegreeData[1].timeDegree,
              "空间相近度": that.MatchingDegreeData[1].spatialDegree,
              "爱好相似度": that.MatchingDegreeData[1].hobbyDegree,
              "匹配度": that.MatchingDegreeData[1].matchDegree,
            },
            {
              "姓名": that.MatchingDegreeData[2].name,
              "时间重合度": that.MatchingDegreeData[2].timeDegree,
              "空间相近度": that.MatchingDegreeData[2].spatialDegree,
              "爱好相似度": that.MatchingDegreeData[2].hobbyDegree,
              "匹配度": that.MatchingDegreeData[2].matchDegree,
            }
          ],
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#fff",
          },
          axisLine: {
            show: true,
            symbol: ["none", "none"],
            lineStyle: {
              color: "#07bffb",
            },
          },
          textStyle: {
            color: "#07bffb",
            fontSize: 10,
          },
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 1,
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: "#fff",
          },
          axisLine: {
            show: true,
            symbol: ["none", "none"],
            lineStyle: {
              color: "#07bffb",
            },
          },
          textStyle: {
            color: "#07bffb",
          },
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              color: "#858FF8",
              // borderWidth: 0,
              normal: {
                color: "#858FF8",
              },
              borderColor: "#858FF8",
            },
          },
          {
            type: "bar",
            itemStyle: {
              color: "#37D2D4",
              // borderWidth: 0,
              normal: {
                color: "#37D2D4",
              },
              borderColor: "#37D2D4",
            },
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
          },
          {
            type: "bar",
            itemStyle: {
              color: "#2E8CFF",
              // borderWidth: 0,
              normal: {
                color: "#2E8CFF",
              },
              borderColor: "#2E8CFF",
            },
          },
          {
            type: "line",
            name: "匹配度",
            lineStyle: {
              color: "#F7E270",
              width: 4, //设置线条粗细
            },
            axisLine: {
              show: true,
              symbol: ["none", "none"],
            },
            symbol: "circle", //设定为实心点
            symbolSize: 10, //设定实心点的大小
            hoverAnimation: false,
            animation: false,
            itemStyle: {
              color: "#F7E270",
              // borderWidth: 0,
              normal: {
                color: "#F7E270",
              },
              borderColor: "#F7E270",
            },
          },
        ],
      };
      window.addEventListener('resize', function() {
        that.chart = that.$echarts.init(document.getElementById('myChartIR'))
        that.chart.resize()
      })
      // 使用刚指定的配置项和数据显示图表。
      myChartIR.setOption(option);
    },
  },
};
</script>

<style scoped>
#i-recommend-chart {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>