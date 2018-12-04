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
    return new Promise((resolve, reject) => {
      httpClent
        .get(stroiesUrl, {}, true)
        .then(res => {
          for (let item of res.stories) {
            item.images[0] = 'https://images.weserv.nl/?url=' + item.images[0] // 解决图片403 ，会导致图片加载慢
          }
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  /**
   * 获取详情
   *
   * @param {*} { commit }
   * @param {*} id
   * @returns
   */
  async getStroy({ commit }, id) {
    return new Promise((resolve, reject) => {
      httpClent
        .get(storyDetailUrl + id, {}, true)
        .then(res => {
          // 解决图片403 ，会导致图片加载慢
          res.image = 'https://images.weserv.nl/?url=' + res.image
          res.body = res.body.replace(
            /http:\/\//g,
            'https://images.weserv.nl/?url='
          )
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  


  /**
   *  获取以往新闻
   * @param {} param0
   * @param {*} date
   */
  async getBeforeNews({ commit }, date) {
    return new Promise((resolve, reject) => {
      httpClent
        .get(beforeNewsUrl + date, {}, false)
        .then(res => {
          for (let item of res.stories) {
            item.images[0] = 'https://images.weserv.nl/?url=' + item.images[0] // 解决图片403 ，会导致图片加载慢
          }
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
