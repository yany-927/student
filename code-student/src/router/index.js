import Vue from 'vue'
import VueRouter from 'vue-router'
import MyLogin from '../views/Login.vue'
import MyHome from '../views/Home.vue'
// import MyStu from '../views/teacher/student.vue'
// import Mykc from '../views/teacher/kecheng.vue'
// import Mykb from '../views/teacher/kebiao.vue'
// import Mycj from '../views/teacher/chengji.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  { path: '/login', component: MyLogin },
  {
    path: '/home',
    component: MyHome,
    name: 'home',
    // redirect: '/student',
    children: [
      // { path: '/student', component: MyStu },
      // { path: '/kecheng', component: Mykc },
      // { path: '/kebiao', component: Mykb },
      // { path: '/chengji', component: Mycj }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 配置导航守卫
router.beforeEach((to, from, next) => {
  // to 要导航去的页面
  // from 从哪个页面导航来
  // next() 放行

  // 要访问的页面等于login直接放行
  if (to.path === '/login') return next()
  // 获取本地存储的token 判断是否存在 不存在则强制跳转登陆页面
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  // 存在则直接放行
  next()
})

export default router
