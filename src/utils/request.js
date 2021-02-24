import axios from 'axios'
import { getToken, removeToken } from './token'
import router from '@/router'
import { Toast } from 'vant'
import store from '@/store'

// 创建一个副本
const request = axios.create({
  baseURL: process.env.VUE_APP_BASEURL
})
// 请求拦截
request.interceptors.request.use(
  function (config) {
    const token = getToken()
    // 是否需要携带token，默认值为true
    const needToken = config.needToken
    if (needToken && token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截
request.interceptors.response.use(
  function (res) {
    if (res.data.code === 200) {
      return res.data
    } else if (!res.config.needDealError) {
      // token过期了
      removeToken() // 删除token

      // 设置未登录
      store.commit('setIsLogin', false)

      // 阻止.then执行
      return Promise.reject(new Error(res.data.message))
    } else if (res.data.code === 401 || res.data.code === 403) {
      // token过期了
      removeToken() // 删除token

      // 提示信息
      Toast.fail(res.data.message)

      // 设置未登录
      store.commit('setIsLogin', false)

      // 跳转到登录页面
      router.push('/login')

      // 阻止.then执行
      return Promise.reject(new Error(res.data.message))
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default request
