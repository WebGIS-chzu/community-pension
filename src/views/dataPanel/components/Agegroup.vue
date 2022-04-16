<template>
  <div id="agegroup">
    <div id="myChart5" style="width: 100%; height: 100%; z-index: 100"></div>
  </div>
</template>

<script>
import { getAgeGroup } from "network/datapanel";

export default {
  name: "Agegroup",
  created() {
    this.getAgeGroup();
  },
  data() {
    return {
      // 中年，年轻，老年
      mendata: [],
      womendata: [],
    };
  },
  mounted() {
    this.agegroup();
  },
  methods: {
    getAgeGroup() {
      var that = this;
      getAgeGroup().then((res) => {
        // console.log("res", res);
        that.mendata = res.data.result.slice(0, 3);
        that.womendata = res.data.result.slice(3, 6);
        that.agegroup();
      });
    },
    agegroup() {
      // 基于准备好的dom，初始化echarts实例
      let myChart5 = this.$echarts.init(document.getElementById("myChart5"));
      var that = this;
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "item",
          textStyle: {
            color: "rgba(255, 255, 255, 0.9)",
          },
          backgroundColor: "rgba(3, 28, 67, 0.7)",
          // 百分比展示
          // formatter: "{a} <br/>{b} : {c}%",
        },
        grid: {
          //控制图的大小
          top: "80%",
          left: "20%",
        },
        legend: [
          {
            data: ["男年轻老年", "男中老年", "男老年"],
            x: "0%",
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
          {
            data: ["女年轻老年", "女中老年", "女老年"],
            x: "70%",
            y: "0%",
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
            name: "Pyramid",
            type: "funnel",
            width: "40%",
            height: "70%",
            left: "5%",
            top: "20%",
            // bottom:'90%',
            sort: "ascending",
            funnelAlign: "right",
            color: ["#0E84F2", "#33C9FC", "#014EB8"],
            label: {
              position: "insideRight",
              padding: [50, 0, 60, 0],
              borderWidth: 0,
              color: "#FFF",
            },
            // itemStyle: {
            //   borderWidth: 0,
            // },
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            // textStyle: {
            //   fontSize: 11,
            //   color: "#FFFF00",
            // },
            data: that.mendata,
          },
          {
            name: "Pyramid",
            type: "funnel",
            width: "40%",
            height: "70%",
            left: "50%",
            top: "20%",
            sort: "ascending",
            funnelAlign: "left",
            color: ["#FFE882", "#FEFC98", "#F8931D"],
            // itemStyle: {
            //   borderWidth: 0,
            // },
            // label: {
            //   position: "insideLeft",
            //   fontSize: 11,
            //   color: "#1E293D",
            //   left: "30%",
            //   borderWidth: 0,
            // },
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  // color: "#1E293D",
                },
                labelLine: {
                  show: false,
                  length: 0,
                },
              },
            },
            data: that.womendata,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart5.setOption(option);
    },
  },
};
</script>

<style scoped>
#agegroup {
  position: relative;
  width: 50%;
  height: 100%;
  margin: 0 4%;
  /* color: rgba(132, 223, 230, 0.924); */
}
</style>