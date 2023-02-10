import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 控制则边栏的展开和收缩
    ismenu: false,
    // 侧边栏的页面个数
    loginmenuicon: [],
    // 当前用户信息
    userDate: {}
  },
  getters: {},
  mutations: {
    // 控制则边栏的事件函数
    ismenubtn(state, val) {
      state.ismenu = !state.ismenu
    },
    // 侧边栏页面的个数和图标事件函数
    setloginmenu(state, val) {
      // 判断传进来的为空则return
      if (!val) return
      // val信息缓存在本地存储 页面刷新可以在本地存储获取需要信息
      window.sessionStorage.setItem('router', JSON.stringify(val))
      let arr = []
      // 遍历val获取全部路由路径
      val.forEach((x) => {
        if (x.menu) {
          // 向arr数组添加路由对象
          arr.push({
            path: x.menu,
            component: () => import(`../views/teacher${x.menu}`)
          })
        }
      })
      arr.forEach((x, index) => {
        // 遍历动态添加路由 addRoute(要添加路由的name名称, 要添加的路由)
        router.addRoute('home', x)
      })
      // console.log(arr)
      state.loginmenuicon = val
    },
    getUserDate(state, val) {
      state.userDate = val
    }
  },
  actions: {},
  modules: {}
})
