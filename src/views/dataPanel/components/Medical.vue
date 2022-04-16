<template>
  <div id="medical">
    <div id="myChart3" style="width: 100%; height: 100%; z-index: 100"></div>
  </div>
</template>

<script>
import { getTreatmentValues } from "network/datapanel";

export default {
  name: "Medical",
  created() {
    this.getTreatmentValues();
  },
  data() {
    return {
      medicalServe: [],
    };
  },
  mounted() {
    this.serve();
  },

  methods: {
    getTreatmentValues() {
      var that = this;
      getTreatmentValues().then((res) => {
        // console.log("res", res);
        that.medicalServe = res.data.result;
        that.serve();
      });
    },
    serve() {
      // 基于准备好的dom，初始化echarts实例
      let myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      var that = this;
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "item",
          show: true,

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
          backgroundColor: "rgba(3, 28, 67, 0.7)",
          textStyle: {
            color: "rgba(255, 255, 255, 0.9)",
          },
        },
        legend: [
          {
            data: ["预约挂号", "陪医就诊", "协助服药"],
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
            data: ["药品管理", "定期检查", "急救处理"],
            x: "50%",
            y: "75%",
            itemWidth: 10,
            itemGap: 7,
            itemHeight: 10,
            orient: "vertical",
            textStyle: {
              fontSize: 11,
              color: "#07bffb",
            },
          },
        ],
        series: [
          {
            name: "医疗服务",
            type: "pie",
            radius: ["48%", "85%"],
            avoidLabelOverlap: false,
            color: [
              "#0239a7",
              "#fff",
              "#24feb4",
              "#23539b",
              "#3c9de4",
              "#F7E270",
            ],
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: that.medicalServe,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart3.setOption(option);
    },
  },
};
</script>

<style scoped>
#medical {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  margin: 0 4%;
}
</style>