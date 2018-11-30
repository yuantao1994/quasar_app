<template>
  <div id="q-app">
    <router-view />
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
</style>
