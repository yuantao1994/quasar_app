// import something here
import InfiniteLoading from 'vue-infinite-loading';

// "async" is optional
export default async ({ app, router, Vue }) => {
  // something to do

  Vue.use(InfiniteLoading, { 
    props: {
      spinner: 'default',
      /* other props need to configure */
    },
    system: {
      throttleLimit: 50,
      /* other settings need to configure */
    },

    slots: {
      noMore: '数据加载完成', // you can pass a string value
    },
   });

}
