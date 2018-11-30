
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
      {{user.name}}
      api result: {{result}}
    </q-page>
  </q-page-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'detailsTest',
  data() {
    return {
      result: ''
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
        message: "message"
      })
    }
  },
  mounted() { }
};
</script>

<style>
</style>
