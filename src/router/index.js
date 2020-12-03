import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入子组件
import Login from '../views/login/Index.vue'
import Home from '../views/home/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

export default router
