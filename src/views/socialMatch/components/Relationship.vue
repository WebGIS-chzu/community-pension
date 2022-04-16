<template>
  <div id="relationship">
    <div style="height:calc(48vh - 50px);width:calc(44vh);">
      <RelationGraph ref="seeksRelationGraph" :options="graphOptions" />
    </div>
  </div>
</template>

<script>
import RelationGraph from 'relation-graph'
import bus from 'common/js/Bus.js'

import { getUserChainByCondition } from "network/socialgraph" 

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
            'layoutClassName': 'seeks-layout-force'
          }
        ]
      },
      images: [],
      nodes: [],
      relation: ['相识', '朋友', '挚友', '知己', '旧友', '好友', '莫逆', '密友', '邻居', '网友']
    }
  },
  components: {
    RelationGraph,
  },
  mounted() {
    var that = this;
    // that.showSeeksGraph()
    bus.$on("socialid", function(id) {
      that.getUserChainByCondition(id)
    })
  },
  methods: {
    showSeeksGraph(query) {
      var that = this;
      var numbers = []
      for (var i = 0; i < 4; i++) {
        numbers.push(Math.floor(Math.random() * 10))
      }
      var __graph_json_data = {
        rootId: '0',
        // nodes: [
        //   { id: '0', text: '元杰奎', borderColor: '#ff875e', color: '#ec6941',  fixed: true, x: 100, y: 0, innerHTML: '<div class="c-my-node" style="background-image: url(http://1.15.241.95:9000/headsculpture/10000742.jpg);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">元杰奎</div></div>'},
        //   { id: '1', text: '齐正南', borderColor: '#ff875e', color: '#ec6941',  innerHTML: '<div class="c-my-node" style="background-image: url(http://1.15.241.95:9000/headsculpture/10000742.jpg);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">齐正南</div></div>'},
        //   { id: '2', text: '何芬勇', borderColor: '#ff875e',color: '#ec6941', innerHTML: '<div class="c-my-node" style="background-image: url(http://1.15.241.95:9000/headsculpture/10000742.jpg);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">何芬勇</div></div>'},
        //   { id: '3', text: '余丹磊', borderColor: '#ff875e', color: '#ec6941', innerHTML: '<div class="c-my-node" style="background-image: url(http://1.15.241.95:9000/headsculpture/10000742.jpg);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">余丹磊</div></div>'}
        // ],
        nodes: that.nodes,
        links: [
          { from: '0', to: '1', text: that.relation[numbers[0]], color: '#43a2f1' },
          { from: '0', to: '2', text: that.relation[numbers[1]] },
          { from: '0', to: '3', text: that.relation[numbers[2]] },
          { from: '1', to: '3', color: '#67C23A', text: that.relation[numbers[3]]}
        ]
      }
      // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置 
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
        // Called when the relation-graph is completed 
      })
    },
    getUserChainByCondition(id) {
      var that = this;
      that.images = [];
      getUserChainByCondition({"userid": id, "name":""}).then(res => {
        if (res) {
          if (res.data.result.nodeList.length > 4) {
            for (var i = 0; i < 4; i++) {
              that.images.push({
                "name": res.data.result.nodeList[i].name,
                "headPortrait": res.data.result.nodeList[i].headPortrait})
            }
          } else {
            for (var i = 0; i < res.data.result.nodeList.length; i++){
              that.images.push({
                "name": res.data.result.nodeList[i].name,
                "headPortrait": res.data.result.nodeList[i].headPortrait})
            }
          }
          that.getNodesLink()
        }
      })
    },
    getNodesLink() {
      var that = this;
      that.nodes = [{ id: '0', text: that.images[0].name, borderColor: '#ff875e', 
        color: '#ec6941',  fixed: true, x: 100, y: 0, 
        innerHTML: '<div class="c-my-node"'+'style="background-image: '+'url('+that.images[0].headPortrait+');'+'border:#ff875e solid 3px;">'+'<div class="c-node-name" style="color:#ff875e">'+that.images[0].name+'</div></div>'}]
      for (var i = 1; i < that.images.length; i++) {
        that.nodes.push({id: i, text: that.images[i].name, borderColor: '#ff875e', color: '#ec6941', innerHTML: '<div class="c-my-node"'+'style="background-image: '+'url('+that.images[i].headPortrait+');'+'border:#ff875e solid 3px;">'+'<div class="c-node-name" style="color:#ff875e">'+that.images[i].name+'</div></div>'})
      }
      that.showSeeksGraph();
    }
  },
}
</script>

<style>
  .c-my-node{
    background-position: center center;
    background-size: 100%;
    border:#ff8c00 solid 2px;
    height:70px;
    width:70px;
    border-radius: 40px;
  }
  .c-node-name{
    width:160px;
    margin-left:-40px;
    text-align:center;
    margin-top:70px;
  }
</style>

<style scoped>
#relationship {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30%;
}
::v-deep .rel-map[data-v-2964abc9]{
  background-color: transparent !important;
}
</style>