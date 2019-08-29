// Configuration for your app

module.exports = function(ctx) {
    return {
        // app boot (/src/boot)
        boot: [],
        css: ['app.styl'],
        extras: [
            'roboto-font',
            'material-icons' // optional, you are not bound to it
            // 'ionicons',
            // 'mdi',
            // 'fontawesome'
        ],
        supportIE: false,
        build: {
            scopeHoisting: true,
            vueRouterMode: 'hash',
            // vueCompiler: true,
            //  gzip: true,
            // analyze: true,
            //   publicPath: '/',
            extractCSS: true,
            extendWebpack(cfg) {}
        },
        devServer: {
            // https: true,
            // port: 8080,
            open: true // opens browser window automatically
        },
        // framework: 'all' --- includes everything; for dev only!
        framework: {
            components: [
                'QLayout',
                'QHeader',
                'QDrawer',
                'QPageContainer',
                'QPage',
                'QToolbar',
                'QToolbarTitle',
                'QBtn',
                'QIcon',
                'QList',
                'QItem',
                'QItemSection',
                'QItemLabel',
                'QFooter',
                'QField',
                'QInput',
                'QBtn',
                'QIcon',
                'QList',
                'QItem',
                'QItemSection',
                'QItemLabel',
                'QTabs',
                'QTab',
                'QRouteTab',
                'QInfiniteScroll',
                'QInnerLoading',
                'QSpinnerDots',
                'QPullToRefresh'
            ],
            directives: ['Ripple'],
            // Quasar plugins
            plugins: ['Dialog', 'Notify', 'Loading'],
            //iconSet: 'ionicons-v4',
            lang: 'zh-hans' // Quasar language
        },
        // animations: 'all' --- includes all animations
        animations: [],
        ssr: {
            pwa: false
        },
        pwa: {
            // workboxPluginMode: 'InjectManifest',
            // workboxOptions: {},
            manifest: {
                // name: 'Quasar App',
                // short_name: 'Quasar-PWA',
                // description: 'Best PWA App in town!',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#ffffff',
                theme_color: '#027be3',
                icons: [{
                        src: 'statics/icons/icon-128x128.png',
                        sizes: '128x128',
                        type: 'image/png'
                    },
                    {
                        src: 'statics/icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'statics/icons/icon-256x256.png',
                        sizes: '256x256',
                        type: 'image/png'
                    },
                    {
                        src: 'statics/icons/icon-384x384.png',
                        sizes: '384x384',
                        type: 'image/png'
                    },
                    {
                        src: 'statics/icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        },
        cordova: {
            // id: 'org.cordova.quasar.app'
        },
        electron: {
            // bundler: 'builder', // or 'packager'
            extendWebpack(cfg) {
                // do something with Electron process Webpack cfg
            },
            packager: {
                // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',
                // Window only
                // win32metadata: { ... }
            },
            builder: {
                // https://www.electron.build/configuration/configuration
                // appId: 'quasar-app'
            }
        }
    }
}