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
import QuestionInfo from '../views/layout/question/QuestionInfo'
import Find from '../views/layout/find/Index'
import ShareList from '../views/layout/find/ShareList'
import ShareInfo from '../views/layout/find/ShareInfo'
import My from '../views/layout/my/Index'
import MyInfo from '../views/layout/my/MyInfo'
import InfoEdit from '../views/layout/my/InfoEdit'

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
      {
        path: '/layout/company',
        component: Company,
        meta: {
          needTab: true
        }
      },
      {
        path: '/layout/question',
        component: Question,
        meta: {
          needTab: true
        }
      },
      {
        path: '/layout/questionInfo',
        component: QuestionInfo,
        meta: {
          needLogin: true
        }
      },
      {
        path: '/layout/find',
        component: Find,
        meta: {
          needTab: true
        }
      },
      {
        path: '/layout/shareList',
        component: ShareList,
        meta: {
          needTab: false
        }
      },
      {
        path: '/layout/shareInfo',
        component: ShareInfo,
        meta: {
          needTab: false
        }
      },
      {
        path: '/layout/my',
        component: My,
        meta: { needLogin: true, needTab: true }
      },
      { path: '/layout/myinfo', component: MyInfo, meta: { needLogin: true } },
      {
        path: '/layout/infoedit',
        component: InfoEdit,
        meta: { needLogin: true }
      }
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
  // 记录跳转之前滚动到的位置
  from.meta.top =
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop

  if (!to.meta.needLogin) {
    // 不需要登录
    next()

    // 实现刷新浏览器时登录
    /*
    如果满足登陆条件,我们就默默登陆
     1:有token   2:没有登陆
    */
    if (!store.state.isLogin && getToken()) {
      try {
        const res = await getUserInfo(false)
        // vuex中设置用户信息和是否登录
        store.commit('setUserInfo', res.data)
        store.commit('setIsLogin', true)
      } catch (error) {
        console.log('error is ', error)
      }
    }
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

router.afterEach(() => {
  window.scroll(0, 0)
})

export default router
