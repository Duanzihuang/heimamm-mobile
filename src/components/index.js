// import Vue from 'vue'
import moment from 'moment'
import MyNavBar from './MyNavBar/Index'

export default {
  install (Vue) {
    Vue.component(MyNavBar.name, MyNavBar)

    // 把基地址挂载到Vue原型上
    Vue.prototype.$baseUrl = process.env.VUE_APP_BASEURL

    // 全局过滤器
    Vue.filter('formatTime', val => {
      const time = new Date(val)

      const diff = moment().diff(time, 'h')
      if (diff < 1) {
        return '刚刚'
      } else if (diff < 24) {
        return diff + '小时前'
      } else {
        return moment(time).format('YYYY.MM.DD')
      }
    })
  }
}
