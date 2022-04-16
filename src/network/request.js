import axios from 'axios'
axios.defaults.withCredentials = true

export function request(config) {
       // 1.创建axios的实例
       const instance = axios.create({
        baseURL: '/api',
        // timeout: 2000
      })
    
      // 2.axios的拦截器
      // 2.1 全局请求拦截的作用(所有的网络请求都会先走方法)
      instance.interceptors.request.use(config => {
        // console.log(config)
        // 1.比如config中的一些信息不符合服务器的要求

        // 2.比如每次发送网络请求时，都希望页面中显示一个请求的图标

        // 3.某些网络请求（比如登录（token）,必须携带特殊信息）
        // let flag = window.localStorage.getItem("user");
        // let flag = that.$route.query.stage
        // if (flag) {
        //   // req.Cookie.Authorization =  flag
        //   // req.Cookie.JSESSIONID =  flag
        //   config.headers.Authorization =  flag
        // }
        return config
      }, err => {
        // console.log(err)
      });

      // 2.2全局响应拦截(服务器返回数据后都会)
      instance.interceptors.response.use(res => {
        // console.log(res);
        return res
      }, err => {
        // console.log(err);
      });

      // 3.发送真正的网络请求
      return instance(config)
}