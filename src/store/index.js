import Vue from 'vue'
import Vuex from 'vuex'
import users from './module/users'
import news  from './module/zhihu/stroy'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const store = new Vuex.Store({
  modules: { users, news }
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
