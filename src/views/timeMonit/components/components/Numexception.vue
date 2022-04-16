<template>
  <div id="numexception">
    <div id="number" style="width: 100%; height: 100%" />
  </div>
</template>

<script>
import { getAbnormalTypeNumberGroupByDate } from "network/timemonit";

export default {
  name: "Numexception",
  data() {
    return {
      DateNum: [],
      waterAbnormalNum: [],
      powerAbnormalNum: [],
      gassAbnormalNum: [],
      sumAbnormalNum: [],
    };
  },

  mounted() {},

  created() {
    this.getAbnormalTypeNumberGroupByDate();
  },

  methods: {
    getAbnormalTypeNumberGroupByDate() {
      var that = this;
      getAbnormalTypeNumberGroupByDate().then((res) => {
        // console.log("七日水电气异常", res);
        // 日期
        that.DateNum = [
          res.data.result[6].name.slice(5, 10),
          res.data.result[5].name.slice(5, 10),
          res.data.result[4].name.slice(5, 10),
          res.data.result[3].name.slice(5, 10),
          res.data.result[2].name.slice(5, 10),
          res.data.result[1].name.slice(5, 10),
          res.data.result[0].name.slice(5, 10),
        ];
        // 水数据
        that.waterAbnormalNum = [
          res.data.result[6].value[0].value,
          res.data.result[5].value[0].value,
          res.data.result[4].value[0].value,
          res.data.result[3].value[0].value,
          res.data.result[2].value[0].value,
          res.data.result[1].value[0].value,
          res.data.result[0].value[0].value,
        ];
        // 电数据
        that.powerAbnormalNum = [
          res.data.result[6].value[1].value,
          res.data.result[5].value[1].value,
          res.data.result[4].value[1].value,
          res.data.result[3].value[1].value,
          res.data.result[2].value[1].value,
          res.data.result[1].value[1].value,
          res.data.result[0].value[1].value,
        ];
        // 气数据
        that.gassAbnormalNum = [
          res.data.result[6].value[2].value,
          res.data.result[5].value[2].value,
          res.data.result[4].value[2].value,
          res.data.result[3].value[2].value,
          res.data.result[2].value[2].value,
          res.data.result[1].value[2].value,
          res.data.result[0].value[2].value,
        ];
        // 总数据
        that.sumAbnormalNum = [
          res.data.result[6].value[3].value,
          res.data.result[5].value[3].value,
          res.data.result[4].value[3].value,
          res.data.result[3].value[3].value,
          res.data.result[2].value[3].value,
          res.data.result[1].value[3].value,
          res.data.result[0].value[3].value,
        ];
        this.number();
      });
    },
    number() {
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      let number = this.$echarts.init(document.getElementById("number"));
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
          textStyle: {
            color: "rgba(255, 255, 255, 0.9)",
          },
          backgroundColor: "rgba(3, 28, 67, 0.7)",
        },
        grid: {
          //控制图的大小
          top: 50,
          x: 49,
          y: 50,
          x2: 15,
          y2: 30,
        },
        legend: {
          left: "right",
          top: "top",
          orient: "horizontal",
          textStyle: {
            color: "#07bffb",
          },
          margin: 3,
          data: ["水", "电", "气", "总数"],
        },
        toolbox: {
          show: true,
        },
        xAxis: [
          {
            type: "category",
            name: "日期",
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
            data: that.DateNum,
            // ['2月24', '2月25', '2月26', '2月27', '2月28', '3月1', '今天'],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "异常户数",
            textStyle: {
              color: "#07bffb",
              fontSize: 10,
            },
            splitLine: { show: false },
            axisLine: {
              show: true,
              symbol: ["none", "none"],
              lineStyle: {
                color: "#07bffb",
              },
            },
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} ",
            },
          },
          {
            // type: 'value',
            // name: '总数',
            // min: 0,
            // max: 25,
            // interval: 5,
            // axisLabel: {
            //     formatter: '{value} 人'
            // }
          },
        ],
        series: [
          {
            name: "水",
            type: "bar",
            color: "#1eb6fe",
            tooltip: {
              valueFormatter: function (value) {
                return value + " 人";
              },
            },
            data: that.waterAbnormalNum,
            // [4, 4, 7, 23, 25, 7, 13],
          },
          {
            name: "电",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value + " 度";
              },
            },
            color: "#ffd220",
            data: that.powerAbnormalNum,
            // [6, 5, 9, 26, 28, 7, 17],
          },
          {
            name: "气",
            type: "bar",
            color: "#32ffc7",
            tooltip: {
              valueFormatter: function (value) {
                return value + " 立方米";
              },
            },
            data: that.gassAbnormalNum,
            // data: [26, 9, 9, 26, 28, 7, 17],
          },
          {
            name: "总数",
            type: "line",
            lineStyle: {
              color: "#07bffb",
            },
            itemStyle: {
              color: "#07bffb",
              // borderWidth: 0,
              normal: {
                color: "#07bffb",
              },
              borderColor: "#02a6b5",
            },
            // yAxisIndex: 1,
            // tooltip: {
            //     valueFormatter: function (value) {
            //     return value + ' ';
            //     }
            // },
            data: that.sumAbnormalNum,
            // [20, 22, 27, 25, 32, 35, 20],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      number.setOption(option);
    },
  },
};
</script>

<style scoped>
#numexception {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0%;
  /* color: rgba(132, 223, 230, 0.924); */
}
</style>