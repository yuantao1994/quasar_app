//引入axios
import axios from 'axios'
import {
    Dialog,
    Platform,
    Loading,
    QSpinnerTail
} from 'quasar'

let requestNum = 0;


function loading() {
    Loading.show({
        spinner: QSpinnerTail,
        spinnerSize: 60, // 像素
        delay: 400
    })
}
axios.defaults.headers.post['Content-Type'] = 'application/json';

function handlerSuccessResponse(response) {
    console.log('处理state==200的请求', response)
    if (Loading.isActive && requestNum == 1) {
        Loading.hide()
    }
    requestNum--
    return new Promise((resolve, reject) => {
        try {
            if (response.data instanceof Object) {
                resolve(response.data)
            } else {
                let data = JSON.parse(response.data.trim())
                console.log(response.data.message)
                resolve(data)
            }
        } catch (e) {
            console.error('JSON parsing error')
            resolve(response.data.trim())
        }
    })
}

let isDialog = false

function handlerFailResponse(response) {
    if (Loading.isActive && requestNum == 1) {
        Loading.hide()
    }
    requestNum--
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
        if (!isDialog)
            Dialog.create({
                title: '提示',
                message: msg,
                ok: '确定'
            }).then(e => {
                isDialog = false
            })
        isDialog = true
        reject(msg)
    })
}






export default class HttpClent {
    /**
     *
     * get 请求
     * @static
     * @param {*} url 请求地址
     * @param {*} params 数据
     * @param {*} isload 是否显示loading 效果
     * @returns
     * @memberof HttpClent
     */
    static async get(url, params, isload) {
        if (isload) {
            loading()
        }
        try {
            const response = await this.sendRequest(url, null, params, 'get')
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
     * @param {*} data 数据
     * @param {*} isload 是否显示loading 效果
     * @returns
     * @memberof HttpClent
     */
    static async post(url, data, isload) {
        if (isload) {
            loading()
        }
        try {
            const response = await this.sendRequest(url, data, null, 'post')
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
    static sendRequest(url, data, params, method) {
        requestNum++;
        const options = {
            url: url,
            method: method,
            data: data,
            params: params,
            headers: {
                Authorization: 'OAuth2: token'
            } // 非登录请求添加token TODO
        }
        if (Platform.is.cordova && cordova.plugin.http) {
            cordova.plugin.http.setDataSerializer('json');
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
                axios(options)
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