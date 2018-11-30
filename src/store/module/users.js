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
    return new Promise((resolve, reject) => {
      httpClent
        .get(config.apiBase + '/axios/axios', params, true)
        .then(res => {
          commit({
            type: 'setUser',
            user: { phone: '1111', name: 'tes11' } // TODO
          })
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
