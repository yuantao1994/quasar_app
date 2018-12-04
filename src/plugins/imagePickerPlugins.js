let options = {
  maximumImagesCount: 9, // 最大选择数量
  width: 1920,
  height: 1440,
  quality: 40 // 质量
}

function _extend(left, right) {
  if (!(left && left instanceof Object)) return right
  if (right && right instanceof Object) {
    for (let k in right) {
      if (right[k] && right[k] !== left[k]) {
        left[k] = right[k]
      }
    }
  }
  return left
}
/**
 * cordova 图片多选插件包含拍照
 * url :https://github.com/giantss/cordova-plugin-ImagePicker
 * @export
 * @class ImagePickerPlugins
 */
export default class ImagePickerPlugins {
  /**
   * 选择多个文件
   *
   * @static
   * @param {any} pickerOptions
   * @returns 返回一个图片路径数组
   * @memberof ImagePickerPlugins
   */
  static async getPictures(pickerOptions) {
    let _options = _extend(options, pickerOptions)
    console.log('选择多个文件' + JSON.stringify(_options))
    return new Promise((resolve, reject) => {
      ImagePicker.getPictures(
        function(result) {
          console.log('选择多个文件success:' + JSON.stringify(result))
          if (result.images[0].path) {
            resolve(result.images.map(v => v.path))
          } else {
            resolve(result.images)
          }
        },
        function(err) {
          console.log('选择多个文件error：' + err)
          reject(err)
        },
        _options
      )
    })
  }
}
