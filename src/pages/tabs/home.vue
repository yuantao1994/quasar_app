
<template>
  <q-page>
    <q-btn color="primary" label="插件测试1" @click="gotest" />
    <q-btn color="primary" label="知乎日报1" @click="gozhihu" />
  </q-page>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {}
  },
  methods: {
    gotest() {
      this.$router.push({ name: 'details-test' })
    },
    gozhihu() {
      this.$router.push({ name: 'news' })
    }
  }
}
</script>

<style>
</style>
