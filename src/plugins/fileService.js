import config from 'app/src/config/config'
/**
 * 文件上传服务
 * cordova plugin add cordova-plugin-file-transfer
 * @export
 * @class FileService
 */
export default class FileService {
    /**
     * 单个文件上传
     *
     * @param {string} fileUrl 文件本地路径
     * @returns 文件上传结果
     * @memberof FileService
     */
    singleFileUpload(fileUrl) {
        console.log('文件上传地址：' + fileUrl)
        let options = {}
        options['fileKey'] = 'file'
        fileUrl = fileUrl.toString()
        let index = fileUrl.lastIndexOf('.')
        let suffix = fileUrl.substring(index)
        options['fileName'] = new Date().getTime() + suffix
        options['mimeType'] = 'text/plain'

        /*   var headers = { headerParam: "headerValue" };
        options.headers = headers;
        var params = {};
        params.value1 = "test";
        options.params = params; */
        console.log('上传参数：' + JSON.stringify(options))
        let ft = new FileTransfer()
        return new Promise((resolve, reject) => {
            ft.upload(
                fileUrl,
                encodeURI(config.file),
                function(res) {
                    let resjson = JSON.parse(res.response)
                    if (res.responseCode == 200) {
                        if (resjson.code == 0 && resjson.status == 200) {
                            let result = resjson.content[0]
                            console.log('文件上传成功:' + JSON.stringify(result))
                            resolve(result)
                        } else {
                            reject(resjson.message)
                        }
                    } else {
                        reject(resjson)
                    }
                },
                function(error) {
                    console.log('文件上传失败：' + JSON.stringify(error))
                    reject(error)
                },
                options
            )
        })
    }

    /**
     * 多文件上传
     *
     * @param {any} filePaths 一组文件地址
     * @returns 一组文件上传结果
     * @memberof FileService
     */
    multipleFilesUpload(filePaths) {
        let p = []
        for (let index = 0; index < filePaths.length; index++) {
            let path = filePaths[index]
            p.push(this.singleFileUpload(path))
        }
        return Promise.all(p)
    }

    /**
     * 保存文件
     * @param {} url
     * @param {*} name
     */
    saveFile(url, name) {
        return new Promise((reslove, reject) => {
            url = encodeURI(url)
            let fileType = this.getFileType(name)
            let filePath =
                cordova.file.dataDirectory + '/' + new Date().getTime() + '.' + fileType // 文件本地路径
            let fileTransfer = new FileTransfer()
            fileTransfer.download(
                url,
                filePath,
                entry => {
                    console.log('openfileParh:' + entry.nativeURL)
                    reslove(entry.nativeURL)
                },
                error => {
                    reject('文件下载失败')
                    console.error(
                        'download accessory fail. Because of : ' + JSON.stringify(error)
                    )
                }
            )

            fileTransfer.onprogress = function(event) {
                let num = Math.floor((event.loaded / event.total) * 100)
                if (num === 100) {} else {
                    /*  let title = document.getElementsByClassName('alert-title')[0]
        if (!isBack) title && (title.innerHTML = '下载进度：' + num + '%') */
                }
            }
        })
    }

    /**
     * 文件下载并打开
     * cordova plugin add cordova-plugin-file-opener2
     * @param {any} url
     * @param {any} suffix
     * @memberof FileService
     */
    download(url, name, suffix) {
        return new Promise((reslove, reject) => {
            url = encodeURI(url)
            let fileType = this.getFileType(name)
                //    let filePath = cordova.file.dataDirectory + '/' + new Date().getTime() + '.' + fileType // 文件本地路径

            let filePath = cordova.file.dataDirectory + '/' + name // 文件本地路径

            let fileTransfer = new FileTransfer()
            fileTransfer.download(
                url,
                filePath,
                entry => {
                    let mime = this.getFileMimeType(fileType)
                    console.log('mime:' + mime)
                    console.log('openfileParh:' + entry.nativeURL)
                    cordova.plugins.fileOpener2.open(entry.nativeURL, mime, {
                        error: r => {
                            reslove('打开文件失败')
                            console.log('打开文件失败' + JSON.stringify(r))
                        },
                        success: e => {
                            reject('打开文件成功')
                            console.log('打开文件成功' + JSON.stringify(e))
                        }
                    })
                    console.log(
                        'download accessory successful. accessory information : ' +
                        JSON.stringify(entry)
                    )
                },
                error => {
                    reject('文件下载失败')
                    console.error(
                        'download accessory fail. Because of : ' + JSON.stringify(error)
                    )
                }
            )

            fileTransfer.onprogress = function(event) {
                let num = Math.floor((event.loaded / event.total) * 100)
                if (num === 100) {} else {
                    /*  let title = document.getElementsByClassName('alert-title')[0]
        if (!isBack) title && (title.innerHTML = '下载进度：' + num + '%') */
                }
            }
        })
    }

    getFileType(fileName) {
        return fileName
            .substring(fileName.lastIndexOf('.') + 1, fileName.length)
            .toLowerCase()
    }

    getFileMimeType(fileType) {
        let mimeType = ''

        switch (fileType) {
            case 'txt':
                mimeType = 'text/plain'
                break
            case 'docx':
                mimeType =
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                break
            case 'doc':
                mimeType = 'application/msword'
                break
            case 'pptx':
                mimeType =
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
                break
            case 'ppt':
                mimeType = 'application/vnd.ms-powerpoint'
                break
            case 'xlsx':
                mimeType =
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                break
            case 'xls':
                mimeType = 'application/vnd.ms-excel'
                break
            case 'zip':
                mimeType = 'application/x-zip-compressed'
                break
            case 'rar':
                mimeType = 'application/octet-stream'
                break
            case 'pdf':
                mimeType = 'application/pdf'
                break
            case 'jpg':
            case 'jpeg':
                mimeType = 'image/jpeg'
                break
            case 'png':
                mimeType = 'image/png'
                break
            default:
                mimeType = 'application/' + fileType
                break
        }
        return mimeType
    }
}