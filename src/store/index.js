import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      reducer({ tokenObj, history }) {
        // 默认传入state
        // console.log({ tokenObj ,history})
        return { tokenObj, history }
      }
    })
  ],
  state: {
    tokenObj: {},
    history: []
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    },
    /**
     *
     * @param {*} history 添加或者删除后的数据
     */
    SET_HISTORIES(state, history) {
      state.history = history
    }
  },
  actions: {},
  modules: {}
})
