import httpClent from 'app/src/plugins/httpClient'
import config from 'app/src/config/config'
const state = {
  user: {
    phone: '',
    name: 'test1'
  }
}

const getters = {}

const mutations = {
  setUser(state, payload) {
    state.user = payload.user
  }
}

const actions = {
  async login({ commit }, params) {
    try {
      let res = await httpClent.get(
        config.apiBase + '/axios/axios',
        params,
        true
      )
      commit({
        type: 'setUser',
        user: { phone: '1111', name: 'tes11' } // TODO
      })
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
