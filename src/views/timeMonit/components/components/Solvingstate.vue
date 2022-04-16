<template>
  <div id="solvingstate">
    <div id="solve" style="width: 100%; height: 100%"/>
  </div>
</template>

<script>
import bus from "common/js/Bus.js"

import { getSolveStateNumber } from "network/timemonit";

export default {
  name: "Solvingstate",
  data() {
    return {
      solveNum:"",
      unsolveNum:""
    }
  },

  mounted() {
    
  },

created() {
    this.getSolveStateNumber();
  },

  methods: {
    getSolveStateNumber() {
      var that = this;
      getSolveStateNumber().then((res) => {
        // console.log("解决情况", res);
        that.solveNum=res.data.result[0].value;
        that.unsolveNum=res.data.result[1].value;
        this.solve();
        });
    },
    solve() {
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      let solve = this.$echarts.init(document.getElementById('solve'))
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          textStyle: {
            color: "rgba(255, 255, 255, 0.9)",
            },
            backgroundColor: "rgba(3, 28, 67, 0.7)",
        },
        grid:{ //控制图的大小
            // top: 30,
            // x: 45,
            // y:30,
            // x2:30,
            // y2: 50,
        },
        legend: {
          x: '70%',
          y: "70%",
          left: 'right',
          top: 'top',
          textStyle:{
                color: '#07bffb'
            },
          margin: 3, 
          orient: 'vertical', 
          data: 
          [
            '未解决',
            '已解决',
          ]
        },
        toolbox: {
          show: true,
        },
        series: [
          {
            name: '异常情况',
            type: 'pie',
            radius: [30, 100],
            center: ['50%', '50%'],
            color: ["#1eb6fe","#32ffc7", ],
            // roseType: 'radius',
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 2
            },
            
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
                show: false
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: '40',
            //     fontWeight: 'bold'
            //   }
            // },
            data: 
            [
              { value: that.solveNum, name: '未解决' },
              { value: that.unsolveNum, name: '已解决' },
            ]
          },
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      solve.setOption(option)

      solve.on('click', function (params) {
        bus.$emit("solve", true)
        });
    }
  }
}
</script>

<style scoped>
#solvingstate {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0%;
  /* color: rgba(132, 223, 230, 0.924); */
}
</style>