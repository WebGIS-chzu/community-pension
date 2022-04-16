import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './common/font/fonts.css'

// 添加循环滚动播放
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

// 数字滚动插件
import VueAnimateNumber from 'vue-animate-number'
Vue.use(VueAnimateNumber)

import VueResource from "vue-resource"
Vue.use(VueResource)

// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 安装mapbox
import mapBoxGl from 'mapbox-gl'
// 设置mapBoxGl全局变量
Vue.prototype.$mapboxgl = mapBoxGl

// 引入全局inco
import 'icons/Index.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
