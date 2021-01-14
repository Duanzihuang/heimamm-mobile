import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    isLogin: false
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setIsLogin (state, isLogin) {
      state.isLogin = isLogin
    }
  },
  actions: {},
  modules: {}
})
