import Vue from 'vue'
import Vuex from 'vuex'
import users from './module/users'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const store = new Vuex.Store({
  modules: { users }
})

store.registerModule('vux', {
  state: {
    currentPage: ''
  },
  mutations: {
    updateCurrentPage(state, page) {
      state.currentPage = page
    }
  },
  actions: {}
})

export default store
