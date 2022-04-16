<template>
  <div id="world-cloud">
    <wordcloud
    :data="defaultWords"
    nameKey="name"
    ref="word"
    valueKey="value"
    color="Accent"
    :showTooltip="true"
    :wordClick="wordClickHandler">
    </wordcloud>
  </div>
</template>

<script>
import wordcloud from 'vue-wordcloud'

import { ServiceWords } from "network/serve"
import bus from "common/js/Bus.js";

export default {
  name: 'WorldCloud',
  components: {
    wordcloud
  },
  data() {
    return {
      defaultWords: [],
    }
  },
  created() {
    this.ServiceWords()
  },
  mounted() {
    var that = this;
    that.ServiceWords();
    bus.$on("servetype", function(type) {
      that.ServiceWords(type)
    })
  },
  methods: {
    wordClickHandler() {
    },
    ServiceWords(type) {
      var that = this;
      ServiceWords({"serviceType": type}).then((res) => {
        // console.log("serve111", res.data.result)
        that.defaultWords = res.data.result
      })
    },    
  },
}
</script>

<style scoped>
#world-cloud {
  position: relative;
  width: 100%;
  height: 100%;
}
.wordCloud {
  height: 100% !important;
  z-index: 100;
}
</style>