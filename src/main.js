import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'

// 导入amfe-flexible
import 'amfe-flexible'

import Components from '@/components'

// 集成Vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// 全局注册自定义组件
Vue.use(Components)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
