# Quasar App 基本框架

框架基于 Quasar 搭建，Quasar 是一个开源框架（基于 Vue），可以做到开箱即用.
cordova 基础插件已经添加，包括相机、图库、文件等

## 运行

```
 # 本地浏览器运行
 1. npm install
 2. quasar dev
 #  手机运行（自行安装cordova环境、配置Android或iOS）
 1. quasar mode -a cordova
 2. quasar dev -m cordova -T android # 在手机上本地调试
 3. 使用 quasar build -m cordova -T android  命令生成并签名

```

quasar build -m cordova -T ios

## 热更新

1. 全局安装 codepush

```
npm install -g code-push-cli

```

2. 创建一个 CodePush 的云账户，登录账号

```
code-push register

```

3. 创建 CodePush 应用，记录测试环境和正式环境的 key

```
code-push app add quasar_app_android android cordova  # quasar_app_android 为项目名称, android 为平台名称，iOS和安卓要分开创建并保存key。可以通过code-push deployment list quasar_app_android -k 查看key

```

4. 添加插件

```
cordova plugin add cordova-plugin-code-push@latest

```

5. 配置 config.xml

```
<platform name="android">
    <preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" />
</platform>
<platform name="ios">
    <preference name="CodePushDeploymentKey" value="YOUR-IOS-DEPLOYMENT-KEY" />
</platform>

查看是否安装了cordova-plugin-whitelist ，如果没有则安装,然后添加
<access origin="*" /> 或者
<access origin="https://codepush.appcenter.ms" />
<access origin="https://codepush.blob.core.windows.net" />
<access origin="https://codepushupdates.azureedge.net" />

```

6. 确保你的应用程序可以访问 CodePush 服务器,在 index.html 文件添加

```
<meta http-equiv="Content-Security-Policy" content="default-src https://codepush.appcenter.ms 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" /> 到head里面

```

7. 添加检测更新代码

```
    document.addEventListener('deviceready', function () {
      codePush.sync()
    }, false)
    document.addEventListener("resume", function () {
      codePush.sync()
    })

```

8. 正常编译项目

```
quasar build -m cordova -T android

```

9. 发布更新

```
code-push release-cordova quasar_app_android android -d "Production"  -m --des "更新描述"  #默认是打包Staging环境的
# -m : 表示是否强制更新
```

10. 查看记录和删除

```
 code-push deployment clear quasar_app Production # 删除正式环境已发布记录

 code-push deployment ls quasar_app # 查看记录

```

文档地址：https://github.com/Microsoft/cordova-plugin-code-push

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
   需要安装 Android SDK ，运行 quasar dev -m cordova -T android；手机和电脑在同一个局域网内，可以通过 alert 调试，或者使用 Android Studio 查看输入（在 js 中使用 console.error/等方法）。

### 其他

1. app 在线升级
