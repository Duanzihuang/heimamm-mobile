import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '@/api/my'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    isLogin: false,
    resList: [] // 发现页面数据
  },
  /*
    vuex的计算属性
    getters:依赖state中的值产生一个新的值
    state是一个固定参数
    使用:this.$store.getters.getUserInfo
  */
  getters: {
    getUserInfo (state) {
      return state.userInfo
    },
    // 是否红色高亮
    isRed (state) {
      return (str, id) => {
        return state.userInfo[str] && state.userInfo[str].includes(Number(id))
      }
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setIsLogin (state, isLogin) {
      state.isLogin = isLogin
    },
    setResList (state, resList) {
      state.resList = resList
    }
  },
  actions: {
    async refreshUserInfo ({ commit }) {
      const res = await getUserInfo()

      commit('setUserInfo', res.data)
      commit('setIsLogin', true)
    }
  },
  modules: {}
})
