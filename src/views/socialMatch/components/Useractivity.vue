<template>
  <div id="useractivity">
    <div
      id="myChart7"
      style="width: 100%; height: 100%; z-index: 100; bottom: 0%; right: 0%"
    ></div>
  </div>
</template>

<script>
import { getActivityTypeNumber } from "network/community";

export default {
  name: "Useractivity",
  data() {
    return {
      communityType: [],
      communityNum: [],
      communityPeo: [],
    };
  },

  mounted() {},

  created() {
    this.getActivityTypeNumber();
  },

  methods: {
    getActivityTypeNumber() {
      var that = this;
      getActivityTypeNumber().then((res) => {
        // console.log(res);
        //   活动类型
        that.communityType = [
          res.data.result[0].valueList[0].name,
          res.data.result[0].valueList[1].name,
          res.data.result[0].valueList[2].name,
          res.data.result[0].valueList[3].name,
          res.data.result[0].valueList[4].name,
        ];
        that.communityNum = [
          res.data.result[0].valueList[0].value,
          res.data.result[0].valueList[1].value,
          res.data.result[0].valueList[2].value,
          res.data.result[0].valueList[3].value,
          res.data.result[0].valueList[4].value,
        ];
        that.communityPeo = [
          res.data.result[1].valueList[0].value,
          res.data.result[1].valueList[1].value,
          res.data.result[1].valueList[2].value,
          res.data.result[1].valueList[3].value,
          res.data.result[1].valueList[4].value,
        ];
        that.useractivity();
      });
    },
    useractivity() {
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart7 = this.$echarts.init(document.getElementById("myChart7"));
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            color: "rgba(255, 255, 255, 0.9)",
          },
          backgroundColor: "rgba(3, 28, 67, 0.7)",
        },
        legend: {
          data: ["活动举办次数", "活动参加人数"],
          textStyle: {
            color: "#07bffb",
          },
          x: "45%",
          y: "0%",
        },
        xAxis: {
          type: "category",
          name: "种类",
          boundaryGap: 2,
          axisLabel: {
            interval: 0,
          },
          orient: "vertical",
          nameTextStyle: {
            color: "#07bffb",
            fontSize: 10,
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
          data: that.communityType,
          //   [
          //     "象棋",
          //     "麻将",
          //     "钓鱼",
          //     "扑克",
          //     "旅游",
          //     "书法",
          //     "太极",
          //     "跳舞",
          //   ],
        },
        yAxis: [
          {
            type: "value",
            name: "活动次数",
            nameTextStyle: {
              color: "#07bffb",
            },
            axisLabel: {
              show: true,
              showMinLabel: true,
              formatter: function (value) {
                return value;
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
            },
          },
          {
            type: "value",
            name: "活动人数",
            nameRotate: 0,

            axisLabel: {
              show: true,
              showMinLabel: true,
              formatter: function (value) {
                return value;
              },
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
          },
        ],
        series: [
          {
            name: "活动参加人数",
            type: "line",
            smooth: true,
            yAxisIndex: 1,
            data: that.communityPeo,
            // [100, 261, 83, 119, 223, 321, 205, 310],
            symbol: "circle",
            symbolSize: 4,
            itemStyle: {
              normal: {
                color: "#ffd220",
                //折线点颜色
              },
              lineStyle: {
                color: "#ffd220",
              },
            },
            // itemStyle: {normal:{label: {show: true}}},
            markPoint: {
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
          {
            name: "活动举办次数",
            type: "line",
            smooth: true,
            yAxisIndex: 0,
            interval: 5,
            // itemStyle: {normal:{label: {show: true}}},
            symbol: "circle",
            symbolSize: 4,
            itemStyle: {
              normal: {
                color: "#0efcff",
                //折线点颜色
              },
              lineStyle: {
                color: "0efcff",
              },
            },
            data: that.communityNum,
            // [2, 3, 2, 5, 3, 4, 3, 5],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart7.setOption(option);
    },
  },
};
</script>

<style scoped>
#useractivity {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0%;
  /* color: rgba(132, 223, 230, 0.924); */
}
</style>