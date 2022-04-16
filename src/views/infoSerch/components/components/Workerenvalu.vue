<template>
  <!--  ref="workerenvaluChart" -->
  <div id="workerenvalu">
    <div id="myChart11" style="width: 300px; height: 200px; z-index: 10"></div>
  </div>
</template>

<script>
import bus from 'common/js/Bus.js'

import { getNursingWorkerInformationByNursingId } from "network/query";

export default {
  name: "Workerenvalu",
  // created() {
  //   // this.getTreatmentValues();
  // },
  data() {
    return {
      data: []
      //   medicalServe: [],
    };
  },
  mounted() {
    var that = this;
    bus.$on("id", function(value) {
      if (value[1] == "护工") {
        that.getNursingWorkerInformationByNursingId(value[0]);
      }
    })
  },

  methods: {
    workerenvalu() {
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart11 = this.$echarts.init(document.getElementById("myChart11"));
      var backgroundColor = () =>
        [
          "rgba(2,57,191, 0.4)",
          "rgba(60,210,114, 0.4)",
          "rgba(247,181,0,0.4)",
          "rgba(234,201,0,0.4)",
          "rgba(0,208,255,0.4)",
          "rgba(0,180,192,0.4)",
          "rgba(44,157,104,0.4)",
        ][rindex()];

      // var that = this;
      // 指定图表的配置项和数据
      let option = {
        //提示框
        tooltip: {},
        animationDurationUpdate: function (idx) {
          //越往后的数据延迟越大
          return idx * 100;
        },
        animationEasingUpdate: "bounceIn",
        series: [
          {
            layout: "force",
            force: {
              repulsion: 70,
              edgeLength: 10,
            },
            type: "graph",
            label: {
              show: true,
              formatter: ["{a|{c}}", "{b|{b}}"].join(" \n "),
              fontweight: "100e",
              fontSize: "18",
              align: "center ",
              verticalAlign: "center ",
              rich: {
                // 数字
                a: {
                  color: "#fff",
                  fontsize: 25,
                },
                // 文字
                b: {
                  color: "#C71585",
                  fontsize: 14,
                },
              },
            },
            // data: [
            //   {
            //     name: "医疗服务",
            //     value: 7.7,
            //     symbolSize: 80,
            //     draggable: true,
            //     itemStyle: {
            //       color: "rgba(253,177,38, 0.5)",
            //       borderColor: "rgba(253,177,38, 0.8)",
            //       borderWidth: 3,
            //     },
            //   },
            //   {
            //     name: "心理慰藉",
            //     value: 45,
            //     symbolSize: 50,
            //     draggable: true,
            //     itemStyle: {
            //       color: "rgba(249,224,70, 0.5)",
            //       borderColor: "rgba(249,224,70, 0.8)",
            //       borderWidth: 3,
            //     },
            //   },
            //   {
            //     name: "家政服务",
            //     value: 45,
            //     symbolSize: 60,
            //     draggable: true,
            //     itemStyle: {
            //       color: "rgba(76,205,114,0.5)",
            //       borderColor: "rgba(76,205,114,0.8)",
            //       borderWidth: 3,
            //     },
            //   },
            //   {
            //     name: "家庭便利",
            //     value: 45,
            //     symbolSize: 30,
            //     draggable: true,
            //     itemStyle: {
            //       color: "rgba(233,85,115,0.5)",
            //       borderColor: "rgba(233,85,115,0.8)",
            //       borderWidth: 3,
            //     },
            //   },
            //   {
            //     name: "休闲娱乐",
            //     value: 45,
            //     symbolSize: 40,
            //     draggable: true,
            //     itemStyle: {
            //       color: "rgba(84,185,237,0.5)",
            //       borderColor: "rgba(84,185,237,0.8)",
            //       borderWidth: 3,
            //     },
            //   }
            // ],
            data: that.data,
            zoom: 1.5,
            roam: true,
            edgeSymbol: ["circle", "arrow"],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart11.setOption(option);
    },
    getNursingWorkerInformationByNursingId(id) {
      var that = this
      getNursingWorkerInformationByNursingId({"nursingId": id}).then(res => {
        // console.log(res);
        if (res) {
          that.data = [];
          var itemstyle = [{
            color: "rgba(84,185,237,0.5)",
            borderColor: "rgba(84,185,237,0.8)",
            borderWidth: 3,
          }, 
          {
            color: "rgba(233,85,115,0.5)",
            borderColor: "rgba(233,85,115,0.8)",
            borderWidth: 3,              
          }, 
          {
            color: "rgba(76,205,114,0.5)",
            borderColor: "rgba(76,205,114,0.8)",
            borderWidth: 3,
          }, 
          {
            color: "rgba(249,224,70, 0.5)",
            borderColor: "rgba(249,224,70, 0.8)",
            borderWidth: 3,
          }, 
          {
            color: "rgba(253,177,38, 0.5)",
            borderColor: "rgba(253,177,38, 0.8)",
            borderWidth: 3,
          }];
          var size = [80, 50, 60, 30, 40];       
          for (var i = 0; i < res.data.result.length; i++) {
            for (var j = 0; j < res.data.result[i].queryTypeNumber.length; j++) {
              that.data.push({
                "name": res.data.result[i].queryTypeNumber[j].name,
                "value": res.data.result[i].queryTypeNumber[j].value,
                "itemStyle": itemstyle[j],
                "symbolSize": size[j],
                "draggable": true,
              })           
            }
          }
          that.workerenvalu();
        }
      })
    }
  },
};
</script>

<style scoped>
#workerenvalu {
  width: 100%;
  height: 100%;
}
</style>