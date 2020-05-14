import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '工具箱'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '关于'
    }
  },
  {
    path: '/idcard',
    name: 'IDCardGenerator',
    component: () => import(/* webpackChunkName: "tools" */ '../views/IDCardGenerator.vue'),
    meta: {
      title: '身份证号码生成器'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/toolbox',
  routes
})

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta?.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
