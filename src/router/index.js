import Vue from 'vue'
import VueRouter from 'vue-router'
import DataPanel from 'views/dataPanel/DataPanel.vue'
import TimeMonit from 'views/timeMonit/TimeMonit.vue'
import LostWarni from 'views/lostWarni/LostWarni.vue'
import ServeMana from 'views/serveMana/ServeMana.vue'
import SocialMatch from 'views/socialMatch/SocialMatch'
import InfoSerch from '../views/infoSerch/InfoSerch.vue'
import Index from '../views/index.vue'
import LayOut from 'views/LayOut'
import Login from 'views/login/Login'
import Register from 'views/login/components/Register'
import Router from 'views/timeMonit/components/Router'
import Monitor from 'views/timeMonit/components/Monitor'
import Consume from 'views/timeMonit/components/Consume'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '登录界面',
    component: LayOut,
    redirect: '/login',
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login,
      },
      {
        path: '/dataPanel',
        name: '导航栏',
        component: Index,
        children: [
          {
            path: '/dataPanel',
            name: '数据面板',
            component: DataPanel,
          },
          {
            path: '/timeMonit',
            name: '实时监护',
            component: Router,
            redirect: '/timeMonit/index',
            children: [
              {
                path: 'index',
                name: '手环',
                component: TimeMonit,
                meta: { icon: 'el-icon-watch' },
              },
              {
                path: 'monitor',
                name: '监控',
                component: Monitor,
                meta: { icon: 'el-icon-video-camera' },
              },
              {
                path: 'consume',
                name: '消费',
                component: Consume,
                meta: { icon: 'el-icon-goods' },
              },
            ],
          },
          {
            path: '/infoSerch',
            name: '信息查询',
            component: InfoSerch,
          },
          
        ],
      },
      {
        path: '/dataPanel',
        name: '导航栏',
        component: Index,
        children: [
          {
            path: '/lostWarni',
            name: '走失预警',
            component: LostWarni,
          },
          {
            path: '/serveMana',
            name: '服务管理',
            component: ServeMana,
          },
          {
            path: '/socialMatch',
            name: '社交匹配',
            component: SocialMatch,
          },
        ],
      },
      {
        path: '/register',
        component: Register,
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// router.beforeEach((to, from, next) => {
//   let flag = window.localStorage.getItem("user");
//   if (window.localStorage.getItem("user") || to.name == "login") {
//     next()
//   } else {
//     next('/login')
//   }
// })

export default router
