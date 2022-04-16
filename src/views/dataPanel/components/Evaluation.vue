<template>
  <div id="evaluation">
    <div id="myChart1" style="width: 100%; height: 100%; z-index: 100;"></div>
  </div>
</template>

<script>
import { getWorkersEvaluate } from "network/datapanel";

export default {
  name: "Evaluation",
  data() {
    return {
      Firstwoker: [],
      Secondwoker: [],
      Thirdwoker: [],
    };
  },
  created() {
    this.getWorkersEvaluate();
  },
  mounted() {},
  methods: {
    getWorkersEvaluate() {
      var that = this;
      getWorkersEvaluate().then((res) => {
        console.log("护工评价", res);
        if (res) {
          that.Firstwoker = res.data.result[0];
          that.Secondwoker = res.data.result[1];
          that.Thirdwoker = res.data.result[2];
          this.evaluate();
        }
      });
    },
    evaluate() {
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      // 指定图表的配置项和数据
      app.config = {
        rotate: 0,
        align: "left",
        verticalAlign: "middle",
        position: "right",
        distance: 15,

        onChange: function () {
          const labelOption = {
            rotate: app.config.rotate,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            position: app.config.position,
            distance: app.config.distance,
          };
          myChart.setOption({
            series: [
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
            ],
          });
        },
      };
      const labelOption = {
        // 条形图上的文字标签是否显示
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: "{c}  ",
        // {name|{a}}
        fontSize: 12,
        color: "#F7E270",

        rich: {
          name: {},
        },
      };
      let option = {
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
        legend: [
          {
            data: ["家政服务", "医疗服务", "家庭便利"],
            textStyle: {
              color: "#07bffb",
            },
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20,
            x: "10%",
            y: "67%",
            orient: "horizontal",
          },
          {
            data: ["心理慰藉", "休闲娱乐", "总评分"],
            textStyle: {
              color: "#07bffb",
            },
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20,
            x: "10%",
            y: "73%",
            orient: "horizontal",
          },
        ],
        grid: {
          //控制图的大小
          top: 10,
          x: 45,
          y: -10,
          x2: 60,
          y2: 100,
        },
        yAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: [
              that.Firstwoker.name,
              that.Secondwoker.name,
              that.Thirdwoker.name,
            ],
            // ["张一", "张二", "张三"],
            inverse: true,
            axisLine: {
              show: true,
              symbol: ["none", "none"],
              lineStyle: {
                color: "#07bffb",
              },
            },
            splitNumber: 5,
            textStyle: {
              color: "#07bffb",
              fontSize: 10,
            },
            max: 2,
          },
        ],
        xAxis: [
          {
            type: "value",
            axisLine: {
              show: true,
              symbol: ["none", "none"],
              lineStyle: {
                color: "#07bffb",
              },
              textStyle: {
                // color: "#07bffb",
                fontSize: 7,
              },
            },

            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "家政服务",
            type: "bar",
            barCategoryGap: "90%",
            barWidth: 8,
            barGap: 10,
            itemStyle: {
              color: "#858FF8",
              // borderWidth: 0,
              normal: {
                color: "#858FF8",
              },
              borderColor: "#858FF8",
            },
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [
              that.Firstwoker.value[3].value,
              that.Secondwoker.value[3].value,
              that.Thirdwoker.value[3].value
            ],
            // [88, 90, 70],
          },
          {
            name: "医疗服务",
            type: "bar",
            barCategoryGap: "40%",
            barWidth: 8,
            barGap: "-40%",
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
            data: [
              that.Firstwoker.value[0].value,
              that.Secondwoker.value[0].value,
              that.Thirdwoker.value[0].value
            ],
            // [90, 0, 80],
          },
          {
            name: "家庭便利",
            type: "bar",
            barCategoryGap: "40%",
            barWidth: 8,
            barGap: "-40%",
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [
              that.Firstwoker.value[1].value,
              that.Secondwoker.value[1].value,
              that.Thirdwoker.value[1].value
            ],
            // data: [90, 80, 84],
          },
          {
            name: "心理慰藉",
            type: "bar",
            barCategoryGap: "40%",
            barWidth: 8,
            barGap: "-40%",
            itemStyle: {
              color: "#2E8CFF",
              // borderWidth: 0,
              normal: {
                color: "#2E8CFF",
              },
              borderColor: "#2E8CFF",
            },
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [
              that.Firstwoker.value[2].value,
              that.Secondwoker.value[2].value,
              that.Thirdwoker.value[2].value
            ],
            // data: [0, 93, 0],
          },
          {
            name: "休闲娱乐",
            type: "bar",
            barCategoryGap: "10%",
            barWidth: 8,
            barGap: "-10%",
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              color: "#19CA88",
              borderWidth: 0,
              normal: {
                color: "#19CA88",
              },
              borderColor: "#19CA88",
            },
            TextStyle: {
              color: "#07bffb",
            //   设置水平坐标轴文字块的内边距
              padding: [12, 0, 0, 0],
            },
            data: [
              that.Firstwoker.value[4].value,
              that.Secondwoker.value[4].value,
              that.Thirdwoker.value[4].value
            ],
            // data: [83, 0, 85],
          },
          {
            name: "总评分",
            type: "line",
            lineStyle: {
              color: "#F7E270",
            },
            axisLine: {
              show: true,
              symbol: ["none", "none"],
            },
            symbol: "circle", //设定为实心点
            symbolSize: 6, //设定实心点的大小
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

            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [
              that.Firstwoker.evaluate,
              that.Secondwoker.evaluate,
              that.Thirdwoker.evaluate
            ],
            // data: [90, 87, 85],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option);
    },
  },
};
</script>

<style scoped>
#evaluation {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 4%;
  /* color: rgba(132, 223, 230, 0.924); */
}
</style>