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
      <q-page>
        <q-list padding bordered>
          <q-item-label header>今天</q-item-label>
          <q-item v-for="news in newsList.stories" :key="news.id" :to="'newsDetials/'+news.id">
            <q-item-section top thumbnail style="margin-left: 10px" class="q-ml-none">
              <img :src="news.images[0]" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{news.title}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list bordered padding v-for="item in datas" :key="item.date">
          <q-item-label header>{{item.date}}</q-item-label>
          <q-item v-for="news in item.stories" :key="news.id" :to="'newsDetials/'+news.id">
            <q-item-section top thumbnail style="margin-left: 10px" class="q-ml-none">
              <img :src="news.images[0]" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{news.title}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <infinite-loading
          @infinite="infiniteHandler"
          :identifier="infiniteId"
          ref="infiniteLoading"
        >
          <div slot="spinner" class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </infinite-loading>
      </q-page>
    </q-pull-to-refresh>
  </q-page-container>
</template>

<script>
import { date } from "quasar";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "newsList",
  data() {
    return {
      page: 0,
      newsList: {},
      datas: [],
      infiniteId: 1
    };
  },
  computed: {
    ...mapState({
      //   newsList: state => state.news.stories
    })
  },
  methods: {
    ...mapActions("news", ["getStories", "getBeforeNews"]),

    /**
     * 无限加载
     */
    async infiniteHandler($state) {
      this.page += 1;
      let newdate = date.addToDate(new Date(), { days: -this.page });
      let params = date.formatDate(newdate, "YYYYMMDD");
      try {
        let res = await this.getBeforeNews(params);
        if (res && res.stories && res.stories.length > 0) {
          this.datas.push(res);
          $state.loaded();
        } else {
          $state.complete();
        }
        if (this.datas.length > 3) {
          $state.complete();
        }
      } catch (error) {}
    },

    /**
     * 重置
     */
    resetData() {
      this.datas = [];
      this.infiniteId += 1;
      /*  this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit("$InfiniteLoading:reset");
      }); */
    },

    /**
     * 下拉刷新
     *
     */
    async refresher(done) {
      this.resetData();
      try {
        this.newsList = await this.getStories();
      } catch (error) {}
      done();
    }
  },

  async created() {
    try {
      this.newsList = await this.getStories();
    } catch (error) {}
  }
};
</script>

<style>
</style>
