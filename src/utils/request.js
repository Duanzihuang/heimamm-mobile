import axios from 'axios'

// 创建一个副本
const request = axios.create({
  baseURL: process.env.VUE_APP_BASEURL
})
// 请求拦截
request.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截
request.interceptors.response.use(
  function (res) {
    return res.data
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default request
