//引入axios
import axios from 'axios'
import { Dialog, Platform } from 'quasar'
import { Loading, QSpinnerMat } from 'quasar'
function loading() {
  Loading.show({
    spinner: QSpinnerMat,
    spinnerSize: 80, // 像素
    spinnerColor: 'white',
    messageColor: 'blue'
  })
}

//请求拦截器
axios.interceptors.request.use(
  config => {
    if (config.isload) {
      loading()
    }
    if (config.url.indexOf('login') == -1) {
      // 非登录请求添加token
      config.headers['Authorization'] = 'Bearer ' + 'token' // TODO
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//#region  注释axios 基础配置

/*

//设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 10000

axios.defaults.baseURL = config.apiBase // TODO
//设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 10000
//请求拦截器
axios.interceptors.request.use(
  config => {
    if (config.isload) {
      loading()
    }
    if (config.url.indexOf('login') == -1) {
      // 非登录请求添加token
      config.headers['Authorization'] = 'Bearer ' + 'token' // TODO
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    if (response.config.isload) {
      Loading.hide()
    }
    return response
  },
  err => {
    if (err.config.isload) {
      Loading.hide()
    }
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break
        case 401:
          err.message = '未授权，请重新登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = '请求错误,未找到该资源'
          break
        case 405:
          err.message = '请求方法未允许'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器端出错'
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          break
        case 505:
          err.message = 'http版本不支持该请求'
          break
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = '连接到服务器失败'
    }
    console.error(err)
    Dialog.create({
      title: '提示',
      message: err.message,
      ok: '确定'
    })
    return Promise.reject(err.message)
  }
) */

//#endregion

function handlerSuccessResponse(response) {
  console.log('处理state==200的请求', response)
  if (Loading.isActive) {
    Loading.hide()
  }
  return new Promise((resolve, reject) => {
    try {
      let data = JSON.parse(response.data)
      console.log(response.data.message)
      resolve(data)
    } catch (e) {
      console.error('JSON parsing error')
      resolve(response.data)
    }
  })
}

function handlerFailResponse(response) {
  if (Loading.isActive) {
    Loading.hide()
  }
  console.log('处理state!=200的请求', response)
  return new Promise((resolve, reject) => {
    let msg = '连接错误'
    if (response) {
      switch (response.status) {
        case 400:
          msg = '错误请求'
          break
        case 401:
          msg = '未授权，请重新登录'
          break
        case 403:
          msg = '拒绝访问'
          break
        case 404:
          msg = '请求错误,未找到该资源'
          break
        case 405:
          msg = '请求方法未允许'
          break
        case 408:
          msg = '请求超时'
          break
        case 500:
          msg = '服务器端出错'
          break
        case 501:
          msg = '网络未实现'
          break
        case 502:
          msg = '网络错误'
          break
        case 503:
          msg = '服务不可用'
          break
        case 504:
          msg = '网络超时'
          break
        case 505:
          msg = 'http版本不支持该请求'
          break
        default:
          msg = `连接错误${response.status}`
      }
    }
    Dialog.create({
      title: '提示',
      message: msg,
      ok: '确定'
    })
    reject(msg)
  })
}

export default class HttpClent {
  /**
   *
   * get 请求
   * @static
   * @param {*} url 请求地址
   * @param {*} param 数据
   * @param {*} isload 是否显示loading 效果
   * @returns
   * @memberof HttpClent
   */
  static async get(url, param, isload) {
    if (isload) {
      loading()
    }
    try {
      const response = await this.sendRequest(url, param, 'get')
      return handlerSuccessResponse(response)
    } catch (error) {
      return handlerFailResponse(error)
    }
  }

  /**
   *
   * post请求
   * @static
   * @param {*} url 请求地址
   * @param {*} param 数据
   * @param {*} isload 是否显示loading 效果
   * @returns
   * @memberof HttpClent
   */
  static async post(url, param, isload) {
    if (isload) {
      loading()
    }
    try {
      const response = await this.sendRequest(url, param, 'post')
      return handlerSuccessResponse(response)
    } catch (error) {
      return handlerFailResponse(error)
    }
  }

  /**
   * 发送请求
   *
   * @static
   * @param {*} url 请求地址
   * @param {*} data 数据
   * @param {*} method 请求方式
   * @returns
   * @memberof HttpClent
   */
  static sendRequest(url, data, method) {
    const options = {
      method: method,
      data: data,
      headers: { Authorization: 'OAuth2: token' } // 非登录请求添加token TODO
    }
    if (Platform.is.cordova && cordova.plugin.http) {
      return new Promise((resolve, reject) => {
        cordova.plugin.http.sendRequest(
          url,
          options,
          response => {
            // prints 200
            console.log(response)
            resolve(response)
          },
          error => {
            // prints 403
            console.error(error.status)
            //prints Permission denied
            console.error(error.error)
            reject(error)
          }
        )
      })
    } else {
      return new Promise((resolve, reject) => {
        axios({
          method: method,
          url,
          data: data
        })
          .then(response => {
            console.log(response, 'success')
            resolve(response)
          })
          .catch(response => {
            console.error(response, 'error')
            reject(response.response)
          })
      })
    }
  }
}
