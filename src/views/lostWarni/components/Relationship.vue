<template>
  <div id="relationship">
    <div style="height:50%; width:100%; margin-top: 62%">
      <RelationGraph ref="seeksRelationGraph" :options="graphOptions" />
    </div>
  </div>
</template>

<script>
import RelationGraph from 'relation-graph'

export default {
  name: "Relationship",
  data() {
    return {
      graphOptions: {
        allowShowMiniToolBar: false, // 是否显示工具
        allowShowZoomMenu: false, // 放大缩小
        defaultJunctionPoint: 'border', // 线与节点间的连接方式
        'layouts': [
          {
            'label': '自动布局',
            'layoutName': 'force',
            'layoutClassName': 'lost-layout',
          }
        ]
      }
    }
  },
  components: {
    RelationGraph,
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    showSeeksGraph(query) {
      var __graph_json_data = {
        rootId: 'a',
        nodes: [
          { id: 'a', text: '邓力夫', borderColor: '#ff875e', color: '#ec6941', styleClass: 'size',fixed: true, x: 100, y: 0, innerHTML: '<div class="lost-node" style="background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp6.itc.cn%2Fimages01%2F20200611%2Fa38ab8d072d34c42a848cedcc27c9506.jpeg&refer=http%3A%2F%2Fp6.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651083054&t=6e3dc6c81d8b6e41fb0c1a6791d3fcdc);border:#ff875e solid 3px;"><div class="lost-name" style="color:#ff875e">邓力夫</div></div>'},
          { id: 'b', text: '邓倩', borderColor: '#ff875e', color: '#ec6941', styleClass: 'size', innerHTML: '<div class="lost-node" style="background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D3ba4207d912f07085f502204dc1494af%2Fd53f8794a4c27d1e6e6909f614d5ad6eddc438b0.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651083141&t=c1aa4354bbdc7856e78261824bda65a7);border:#ff875e solid 3px;"><div class="lost-name" style="color:#ff875e">邓倩</div></div>'},
          { id: 'c', text: '邓勇', borderColor: '#ff875e',color: '#ec6941', styleClass: 'size', innerHTML: '<div class="lost-node" style="background-image: url(https://t12.baidu.com/it/u=4012235498,158868556&fm=30&app=106&f=JPEG?w=640&h=360&s=288304DD1C5331C41E18C42203007055);border:#ff875e solid 3px;"><div class="lost-name" style="color:#ff875e">邓勇</div></div>'},
          { id: 'e', text: '余丹嘉', borderColor: '#ff875e', color: '#ec6941', styleClass: 'size',innerHTML: '<div class="lost-node" style="background-image: url(https://img1.baidu.com/it/u=3454129109,3020258182&fm=253&fmt=auto&app=138&f=JPEG?w=752&h=500);border:#ff875e solid 3px;"><div class="lost-name" style="color:#ff875e">余丹嘉</div></div>'}
        ],
        links: [
          { from: 'a', to: 'b', text: '父女', color: '#43a2f1' },
          { from: 'a', to: 'c', text: '父子', color: '#43a2f1' },
          { from: 'a', to: 'e', text: '配偶', color: '#43a2f1' },
          { from: 'b', to: 'e', text: '母女', color: '#67C23A' },
          { from: 'b', to: 'c', text: '兄妹', color: '#67C23A' },
          { from: 'c', to: 'e', text: '母子', color: '#67C23A' }
        ]
      }
      // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置 
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
        // Called when the relation-graph is completed 
      })
    },
  },
}
</script>

<style>
  .lost-layout .rel-map-canvas{
    /* transform: scale(0.8, 0.8) !important; */
  }
  .size {
    height: 58px !important;
    width: 58px !important;
  }
  .lost-node {
    width: 50px !important;
    border-radius: 40px;
    height: 50px !important;
    background-position: center center;
    background-size: 100%;
    border:#ff8c00 solid 2px;
  }
  .lost-name{
    width: 150px;
    margin-left: -50px;
    text-align: center;
    margin-top: 49px;
  }
</style>

<style scoped>
#relationship {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
}
::v-deep .rel-map[data-v-2964abc9]{
  background-color: transparent !important;
}
</style>