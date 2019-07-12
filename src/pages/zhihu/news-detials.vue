<template>
  <q-page-container>
    <q-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round aria-label="arrow_back_ios" @click="$router.back()">
          <q-icon name="arrow_back_ios" />
        </q-btn>
        <q-toolbar-title>{{details.title}}</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page v-if="details.type==0">
      <img :src="details.image" width="100%" />
      <div v-html="details.body"></div>
    </q-page>
    <q-page v-if="details.type==1" v-html="otherBody"></q-page>
    <link v-for="item of details.css" :key="item" :href="item" rel="stylesheet" />
  </q-page-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import httpClent from 'app/src/plugins/httpClient'
export default {
  name: 'newsDetial',
  data() {
    return {
      id: this.$route.params.id,
      details: {},
      otherBody: {}
    }
  },
  computed: {
    ...mapState({
      //  details: state => state.news.stroy
    })
  },
  methods: {
    ...mapActions('news', ['getStroy']),

    async  getDetials() {
      if (this.id) {
        try {
          this.details = await this.getStroy(this.id)
          if (this.details.type == 1) { // 站外新闻
            this.otherBody = await httpClent.get(this.details.share_url)
          }
        } catch (error) {

        }
      }
    }
  },
  created() {
    this.getDetials()
  },
  activated() {
    if (this.$route.params.id != this.id) {
      this.details = {}
      this.id = this.$route.params.id
      this.getDetials()
    }
  }
}
</script>

<style>
.headline,
.view-more {
  display: none;
}
</style>
