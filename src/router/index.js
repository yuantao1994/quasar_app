import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

import createStore from '../store'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function( /* { store, ssrContext } */ ) {
    const store = typeof createStore === 'function' ? createStore() : createStore

    const Router = new VueRouter({
        scrollBehavior: () => ({
            y: 0
        }),
        routes,

        // Leave these as is and change from quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        mode: process.env.VUE_ROUTER_MODE,
        base: process.env.VUE_ROUTER_BASE
    })

    Router.afterEach(function(to, from) {
        store.commit('updateCurrentPage', to.path)

        // 记录上次浏览位置 scroll_box 为需要记录位置的class
        setTimeout(() => {
            if (document.getElementsByClassName('scroll_box').length > 0)
                document.getElementsByClassName('scroll_box')[0].scrollTop =
                to.meta.savedPosition
        }, 0)
    })

    Router.beforeEach((to, from, next) => {
        if (document.getElementsByClassName('scroll_box').length > 0)
            from.meta.savedPosition = document.getElementsByClassName(
                'scroll_box'
            )[0].scrollTop
        next()
    })

    return Router
}