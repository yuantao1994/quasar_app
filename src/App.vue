<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
import exitApp from './plugins/exitAppServices'
export default {
  name: 'App',
  mounted() {
    document.addEventListener('backbutton', exitApp, false)
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
