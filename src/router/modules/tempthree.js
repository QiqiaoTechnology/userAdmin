/** When your routing table is too long, you can split it into small modules **/

const tempthreeRouter = [
  {
    path: '/template_3/menu',
    component: resolve => require(['@/tempthree/home'], resolve),
    name: 'T3Home',
    meta: {
      nav: '首页'
    }
  },
  {
    path: '/template_3/menu/home',
    component: resolve => require(['@/tempthree/home'], resolve),
    name: 'T3Home-2',
    meta: {
      nav: '首页'
    }
  },
  {
    path: '/template_3/menu/work',
    component: resolve => require(['@/tempthree/solution/work'], resolve),
    name: 'Work',
    meta: {
      nav: 'work'
    }
  },
  {
    path: '/template_3/menu/about',
    component: resolve => require(['@/tempthree/solution/about'], resolve),
    name: 'About',
    meta: {
      nav: 'about'
    }
  },
  {
    path: '/template_3/menu/serves',
    component: resolve => require(['@/tempthree/solution/server'], resolve),
    name: 'Serves',
    meta: {
      nav: 'serves'
    }
  },
  {
    path: '/template_3/menu/news',
    component: resolve => require(['@/tempthree/solution/news'], resolve),
    name: 'News',
    meta: {
      nav: 'news'
    }
  }

]

export default tempthreeRouter
