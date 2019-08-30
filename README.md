# Quasar App 基本框架

框架基于 Quasar 搭建，Quasar 是一个开源框架（基于 Vue），可以做到开箱即用.
cordova 基础插件已经添加，包括相机、图库、文件等

## 运行

```
 # 本地浏览器运行
 1. npm install
 2. quasar dev -t ios
 #  手机运行（自行安装cordova环境、配置Android或iOS）
 1. quasar mode -a cordova
 2. quasar dev -m cordova -T android -t ios # 在手机上本地调试
 3. 使用 quasar build -m cordova -T android -t ios 命令生成并签名
 4. 如果app使用热更新(apk) 请先执行cordova-hcp build命令 然后执行cordova build --release android 命令

```
quasar build -m cordova -T ios -t ios

## 热更新

1. 安装 npm install -g cordova-hot-code-push-cli
2. 修改 config.xml 和 cordova-hcp.json 中服务器地址
3. 执行 quasar build -m cordova -T android -t ios
4. 在 cordova 项目中执行 cordova-hcp build
5. 将 cordova 项目下的 www 文件夹放到服务器中

## 项目结构

```
├── src/
│   ├── assets/              # 动态资源（由webpack处理）
│   ├── statics/             # 纯静态资源（直接复制）
│   │   └── config           # 项目基本配置,接口地址等
│   ├── components/          # 用于页面和布局的.vue组件
│   ├── css/                 # CSS/Stylus/Sass/...文件
│   │   ├── app.styl

│   ├── layouts/             # 布局 .vue 文件
│   ├── pages/               # 页面 .vue 文件
│   ├── plugins/             # app插件 (app初始化代码)
│   │   ├── exitAppServices.js        # 双击退出APP服务
│   │   ├── fileService.js            # 文件上传服务
│   │   ├── httpClient.js             # http请求
│   │   └── imagePickerPlugins.js     # 拍照和相册选图图片
│   ├── router/               # Vue路由器
│   │   ├── index.js         # Vue路由器定义
│   │   └── routes.js        # App路由器定义
│   ├── store/                # Vuex Store
│   │   ├── index.js         # Vuex Store 定义
│   │   ├── <folder>         # Vuex Store 模块...
│   │   └── <folder>         # Vuex Store 模块...
│   ├── App.vue               # APP的根Vue组件
│   └── index.template.html   # index.html模板
├── src-cordova/               # Cordova生成的文件夹用于创建移动APP
├── dist/                      # 生产版本代码，用于部署
│   ├── spa-mat/              # 使用MAT主题构建SPA应用生产代码
│   ├── spa-ios/              # 使用IOS主题构建SPA应用生产代码
├── quasar.conf.js           # Quasar App配置文件
├── .babelrc                 # babel配置
├── .editorconfig            # editor配置
├── .eslintignore            # ESlint忽略路径
├── .eslintrc.js             # ESlint配置
├── .postcssrc.js            # PostCSS配置
├── .stylintrc               # Stylus lint配置
├── .gitignore               # GIT忽略路径
├── package.json             # npm脚本和依赖项
└── README.md                # 您的网站/应用程序的自述文件
```

### 部分插件使用方法

1. httpClient 在浏览器中使用 axios，cordova 环境中使用原始 httpclient，解决跨域问题。

```
 # 导入
 import httpClent from 'app/src/plugins/httpClient'
 # 调用
 httpClent.post('login',{})
```

2. fileService 文件上传，包含单文件和多文件上传、文件下载等。使用 cordova-plugin-file-transfer 插件，需要根据服务器返回值对上传结果进行处理

```
  /**
   * 单个文件上传
   *
   * @param {string} fileUrl 文件本地路径
   * @returns 文件上传结果
   * @memberof FileService
   */
  singleFileUpload(fileUrl)

   /**
   * 多文件上传
   *
   * @param {any} filePaths 一组文件地址
   * @returns 一组文件上传结果
   * @memberof FileService
   */
  multipleFilesUpload(filePaths)


  # 调用
  import FileService from 'app/src/plugins/fileService'
  let fileService  = new FileService()
  fileService.singleFileUpload("filepath")
  ....
```

3. imagePickerPlugins 拍照或图片选择。

```

import ImagePickerPlugins from 'app/src/plugins/imagePickerPlugins'

ImagePickerPlugins.getPictures().then(v => {
          // 成功
}
```

### 调试

1. 浏览器中调试
   通用调试方法
2. 手机上面调试
   需要安装 Android SDK ，运行 quasar dev -m cordova -T android -t ios；手机和电脑在同一个局域网内，可以通过 alert 调试，或者使用 Android Studio 查看输入（在 js 中使用 console.error/等方法）。

### 其他

1. app 在线升级
2. 热更新
3. iphone x 适配
