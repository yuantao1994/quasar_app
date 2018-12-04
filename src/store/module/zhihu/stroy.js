import httpClent from 'app/src/plugins/httpClient'
const state = {
  stories: {},
  stroy: {}
}

const stroiesUrl = 'http://news-at.zhihu.com/api/4/news/latest'
const storyDetailUrl = 'http://news-at.zhihu.com/api/4/news/'
const beforeNewsUrl = 'http://news-at.zhihu.com/api/4/news/before/'

const getters = {}

const mutations = {}

const actions = {
  /**
   * 获取今日新闻
   *
   * @param {*} { commit }
   * @returns
   */
  async getStories({ commit }) {
    try {
      let res = await httpClent.get(stroiesUrl, {}, true)
      for (let item of res.stories) {
        item.images[0] = 'https://images.weserv.nl/?url=' + item.images[0] // 解决图片403 ，会导致图片加载慢
      }
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  /**
   * 获取详情
   *
   * @param {*} { commit }
   * @param {*} id
   * @returns
   */
  async getStroy({ commit }, id) {
    try {
      let res = await httpClent.get(storyDetailUrl + id, {}, true)
      res.image = 'https://images.weserv.nl/?url=' + res.image
      res.body = res.body.replace(
        /http:\/\//g,
        'https://images.weserv.nl/?url='
      )
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  /**
   *  获取以往新闻
   * @param {} param0
   * @param {*} date
   */
  async getBeforeNews({ commit }, date) {
    try {
      let res = await httpClent.get(beforeNewsUrl + date, {}, false)
      for (let item of res.stories) {
        item.images[0] = 'https://images.weserv.nl/?url=' + item.images[0] // 解决图片403 ，会导致图片加载慢
      }
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
