<template>
  <div id="worker-evaluation">
    <div id="evChart" style="width: 100%; height: 100%; z-index: 100" />
  </div>
</template>

<script>
import { WorkersLevel } from "network/serve"
import bus from "common/js/Bus.js";


export default {
  name: "WorkerEvaluation",
  data() {
    return {
      type: "",
      levelData: [],
      range: [],
    }
  },
  created() {
  },
  mounted() {
    var that = this;
    this.WorkersLevel(this.type);
    bus.$on("servetype", function(type) {
      that.WorkersLevel(type);
    })
  },
  methods: {
    evaluation() {
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      let evChart = this.$echarts.init(document.getElementById('evChart'))
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '护工评价等级人数',
          left: 0,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          }
        },
        grid: {
          top: '10%',
        },
        legend: {
          data: ['评价等级'],
          left: 'center',
          top: '90%',
          itemWidth: 20,
          itemHeight: 10,          
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: 'item',
          position: 'left',
        },
        radar: {
          nameGap: 8,
          indicator: that.range,
        },
        series: [
          {
            name: '护工评价等级',
            type: 'radar',
            data: [
              {
                value: that.levelData,
                name: '评价等级'
              }
            ],
            areaStyle: {
              // color: '#daa94f',
              color: 'rgba(231, 173, 47, 0.7)',
            },
            lineStyle: {
              color: '#daa94f',
            },
            itemStyle: {
              color: '#daa94f',
            },
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      evChart.setOption(option)
    },
    WorkersLevel(type) {
      var that = this;
      WorkersLevel({"serviceType": type}).then((res) => {
        if (res) {
          that.levelData = []
          that.range = []
          for (var i = 0; i < res.data.result.length; i++) {
            that.levelData.push(res.data.result[i].value)
            that.range.push({ name: res.data.result[i].name, max: res.data.result[i].max, color: '#fff' })
          }
          that.evaluation();
        }
      })
    },
  },
}
</script>

<style scoped>
#worker-evaluation {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 2% 4%;
  /* color: rgba(132, 223, 230, 0.924); */
}
</style>