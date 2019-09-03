<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import exitApp from './plugins/exitAppServices'
import { Platform } from 'quasar'

export default {
  name: 'App',
  mounted() {

    if (Platform.is.cordova) {
      document.addEventListener('backbutton', exitApp, false)

      document.addEventListener('deviceready', function () {
        codePush.sync()
      }, false)
      document.addEventListener("resume", function () {
        codePush.sync()
      }, false)
    }
  }
}
</script>
<style>
* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
input {
  -webkit-user-select: auto; /*webkit浏览器*/
}
</style>
