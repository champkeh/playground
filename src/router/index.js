import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
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
    path: '/canvas',
    name: 'CanvasDemo',
    component: () => import(/* webpackChunkName: "" */ '../views/Canvas'),
    meta: {
      title: 'Canvas Demo'
    }
  },
  {
    path: '/idcard',
    name: 'IDCardGenerator',
    component: () => import(/* webpackChunkName: "tools" */ '../views/IDCardGenerator.vue'),
    meta: {
      title: '身份证号码生成器'
    }
  },
  {
    path: '/float',
    name: 'FloatPointView',
    component: () => import(/* webpackChunkName: "tools" */ '../views/FloatPointView'),
    meta: {
      title: '浮点数内存视图'
    }
  },
  {
    path: '/linkedlist',
    name: 'LinkedList',
    component: () => import(/* webpackChunkName: "tools" */ '../views/LinkedList'),
    meta: {
      title: '链表模拟'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
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
