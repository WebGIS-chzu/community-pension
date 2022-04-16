<template>
  <div id="service">
    <div id="myChart2" style="width: 100%; height: 100%; z-index: 100"></div>
  </div>
</template>

<script>
import { getServiceStructure } from "network/datapanel";

export default {
  name: "Service",
  data() {
    return {
      ServeData: [],
    };
  },
  mounted() {
    this.serve();
  },
  created() {
    this.getServiceStructure();
  },
  methods: {
    getServiceStructure() {
      var that = this;
      getServiceStructure().then((res) => {
        // console.log("res", res);
        that.ServeData = res.data.result;
        that.serve();
      });
    },
    serve() {
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      var that = this;
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "item",
          show: true,
          // position: 'bottom',

          // 设置tooltip的位置
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else {
              // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else {
              // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          },
          // trrigger: "axis",
          // axisPointer: {
          //   type: "shadow",
          // },
          // formatter: function(params){
          //   // 可以在控制台查看params想展示的数据的名称
          //   // console.log("params", params)
          //   var tip = "服务类型: " + params.name + "<br/>" + "数量: " + params.value
          //   return tip
          // },
          backgroundColor: "rgba(3, 28, 67, 0.7)",
          // borderColor: "rgba(132, 223, 230, 0.924);",
          // borderWidth: 0.1,
          textStyle: {
            color: "rgba(255, 255, 255, 0.9)",
          },
        },
        legend: [
          {
            data: ["医疗服务", "家政服务", "休闲娱乐"],
            x: "0%",
            y: "75%",
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 7,
            orient: "vertical",
            textStyle: {
              fontSize: 11,
              color: "#07bffb",
            },
          },
          {
            data: ["心理慰藉", "家庭便利"],
            x: "50%",
            y: "75%",
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 7,
            orient: "vertical",
            textStyle: {
              fontSize: 11,
              color: "#07bffb",
            },
          },

          // color: ["#0239a7", "#fff", "#24feb4", "#23539b", "#3c9de4"],
        ],
        series: [
          {
            name: "服务类型",
            type: "pie",
            radius: ["48%", "85%"],
            legendHoverLink: true,
            avoidLabelOverlap: false,
            color: ["#0239a7", "#fff", "#24feb4", "#23539b", "#3c9de4"],
            label: {
              show: false,
              position: "bottom",
            },
            labelLine: {
              show: false,
            },
            data: that.ServeData,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart2.setOption(option);
    },
  },
};
</script>

<style scoped>
#service {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  margin: 0 4%;
  /* color: rgba(132, 223, 230, 0.924); */
}
</style>