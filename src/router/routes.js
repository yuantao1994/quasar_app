const routes = [
  {
    path: '/',
    redirect: '/tabs'
  },
  {
    path: '/tabs',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '/',
        redirect: '/tabs/home'
      },
      { path: 'home', component: () => import('pages/tabs/home.vue') },
      {
        path: 'input',
        name: 'input',
        component: () => import('pages/tabs/input-test.vue')
      }
    ]
  },
  {
    path: '/pages',
    component: () => import('layouts/page-layout.vue'),
    children: [
      {
        path: 'details-test',
        name: 'details-test',
        component: () => import('pages/tabs/details-test.vue')
      },
      {
        path: 'input1',
        name: 'input1',
        component: () => import('pages/tabs/input-test.vue')
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('pages/zhihu/news-list.vue')
      },
      {
        path: 'newsDetials/:id',
        name: 'newsDetials',
        component: () => import('pages/zhihu/news-detials.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
