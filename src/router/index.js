import Vue from 'vue'
import VueRouter from 'vue-router'

import { getToken } from '@/utils/token'
import store from '@/store'
import { getUserInfo } from '@/api/my'

// 导入子组件
import Login from '../views/login/Index.vue'
import Layout from '../views/layout/Index.vue'
import Company from '../views/layout/company/Index'
import Question from '../views/layout/question/Index'
import Find from '../views/layout/find/Index'
import My from '../views/layout/my/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    redirect: '/layout/my',
    children: [
      { path: '/layout/company', component: Company },
      { path: '/layout/question', component: Question },
      { path: '/layout/find', component: Find },
      { path: '/layout/my', component: My, meta: { needLogin: true } }
    ]
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach(async (to, from, next) => {
  if (!to.meta.needLogin) {
    // 不需要登录
    next()
  } else {
    // 需要登录
    const token = getToken()
    if (token) {
      // 本地有token
      if (store.state.isLogin) {
        // 登录过
        next()
      } else {
        // 强制刷新了
        const res = await getUserInfo()

        // vuex中设置用户信息和是否登录
        store.commit('setUserInfo', res.data)
        store.commit('setIsLogin', true)

        next()
      }
    } else {
      // 没有token
      next('/login')
    }
  }
})

export default router
