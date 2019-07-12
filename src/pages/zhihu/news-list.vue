<template>
  <q-page-container>
    <q-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round aria-label="arrow_back_ios" @click="$router.back()">
          <q-icon name="arrow_back_ios" />
        </q-btn>
        <q-toolbar-title>News</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-pull-to-refresh @refresh="refresher">
      <q-page class="scroll_box">
        <q-infinite-scroll @load="loadMore" ref="infiniteScroll">
          <q-list highlight inset-separator>
            <q-item-label header>今天</q-item-label>
            <q-item
              multiline
              v-for="news in newsList.stories"
              :key="news.id"
              :to="'newsDetials/'+news.id"
            >
              <q-item-section top thumbnail class="q-ml-none">
                <img :src="news.images[0]" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{news.title}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <q-list highlight inset-separator v-for="item in datas" :key="item.date">
            <q-item-label header>{{item.date}}</q-item-label>
            <q-item
              multiline
              v-for="news in item.stories"
              :key="news.id"
              :to="'newsDetials/'+news.id"
            >
              <q-item-section top thumbnail class="q-ml-none">
                <img :src="news.images[0]" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{news.title}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <div class="row justify-center" style="margin-bottom: 50px;">
            <q-spinner-dots slot="message" :size="40" />
          </div>
        </q-infinite-scroll>
      </q-page>
    </q-pull-to-refresh>
  </q-page-container>
</template>

<script>
import { date } from 'quasar'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: "newsList",
  data() {
    return {
      newsList: {},
      datas: [],
    }
  },
  computed: {
    ...mapState({
      //   newsList: state => state.news.stories
    })
  },
  methods: {
    ...mapActions('news', ['getStories', 'getBeforeNews']),
    /**
     * 上拉加载
     *
     */
    async  loadMore(index, done) {
      let newdate = date.addToDate(new Date(), { days: -index })
      let params = date.formatDate(newdate, 'YYYYMMDD')
      try {
        let res = await this.getBeforeNews(params)
        if (res && res.stories && res.stories.length > 0) {
          this.datas.push(res)
        } else {
        }
        done(false)
      } catch (error) {
        done(true)
      }
    },

    /**
     * 下拉刷新
     *
     */
    async refresher(done) {
      try {
        this.newsList = await this.getStories()
      } catch (error) {

      }
      done()
    }
  },
  async created() {
    try {
      this.newsList = await this.getStories()
    } catch (error) {

    }
  },
}
</script>

<style>
</style>
