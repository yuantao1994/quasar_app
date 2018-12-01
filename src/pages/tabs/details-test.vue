
<template>
  <q-page-container>
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round aria-label="arrow_back_ios" @click="back">
          <q-icon name="arrow_back_ios"/>
        </q-btn>
        <q-toolbar-title>Details</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page>
      <q-btn color="primary" label="模拟请求" @click="dialog"/>
      <q-btn color="primary" label="选择图片" @click="openImg"/>
      {{src}}
      <img src="http://www.quasarchs.com/images/quasar-logo.png" width="200" height="200">
      {{user.name}}
      api result: {{result}}
    </q-page>
  </q-page-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import ImagePickerPlugins from 'app/src/plugins/imagePickerPlugins'

export default {
  name: 'detailsTest',
  data() {
    return {
      result: '',
      src: ''
    };
  },
  computed: {
    ...mapState({
      user: state => state.users.user
    })
  },
  methods: {
    ...mapActions('users', ['login']),
    back() {
      this.$router.go(-1);
    },
    async dialog() {
      let s = await this.login()
      this.result = s
      this.$q.dialog({
        title: 'Warning',
        message: 'message'
      })
    },

    openImg() {
      ImagePickerPlugins.getPictures().then(v => {
        console.log('success:' + JSON.stringify(v))
        this.src = v[0]
        this.src = 'http://www.quasarchs.com/images/quasar-logo.png'
      }).catch(e => {
        this.$q.dialog({
          title: 'error',
          message: e
        })
      })
    }

  },
  mounted() { }
};
</script>

<style>
</style>
