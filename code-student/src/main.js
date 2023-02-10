import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 登录页面粒子插件
import VueParticles from 'vue-particles'

import axios from 'axios'

// 全局样式表
import './assets/css/index.css'

// 图标
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8888/api/'

// axios.defaults.timeout = 1000

axios.interceptors.request.use((config) => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
axios.interceptors.response.use((response) => {
  NProgress.done()
  return response
})

Vue.prototype.$http = axios

Vue.use(VueParticles)

new Vue({
  router,
  store,
  methods: {
    // 侧边栏的页面的动态和动态路由
    setmenu() {
      const a = window.sessionStorage.getItem('router')
      const menuObj = JSON.parse(a)
      store.commit('setloginmenu', menuObj)
    },
    // 根据用户进入对应的页面
    getUser() {
      const b = window.sessionStorage.getItem('userdata')
      store.commit('getUserDate', JSON.parse(b))
    }
  },
  created() {
    // 在创建生命周期函数调用
    this.setmenu()
    this.getUser()
  },
  render: (h) => h(App)
}).$mount('#app')
