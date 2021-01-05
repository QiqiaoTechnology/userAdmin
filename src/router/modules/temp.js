/** When your routing table is too long, you can split it into small modules **/

const tempRouter = [
  {
    path: '/template_1/menu',
    component: resolve => require(['@/temp/home'], resolve),
    name: 'Home',
    meta: {
      nav: '首页'
    }
  },
  {
    path: '/template_1/menu/home',
    component: resolve => require(['@/temp/home'], resolve),
    name: 'Home-2',
    meta: {
      nav: '首页'
    }
  },
  {
    path: '/template_1/menu/teacher',
    component: resolve => require(['@/temp/solution'], resolve),
    name: 'Teacher',
    meta: {
      nav: '师资团队'
    }
  },
  {
    path: '/template_1/menu/teacher/Info',
    component: resolve => require(['@/temp/solution/techerInfo'], resolve),
    name: 'TeacherInfo',
    meta: {
      nav: '师资团队'
    }
  },
  {
    path: '/template_1/menu/teacher/join',
    component: resolve => require(['@/temp/solution/techerJoin'], resolve),
    name: 'TeacherJoin',
    meta: {
      nav: '加入我们'
    }
  },
  {
    path: '/template_1/menu/mySchool',
    component: resolve => require(['@/temp/solution/mySchool'], resolve),
    name: 'MySchool',
    meta: {
      nav: '我们的校园'
    }
  },
  {
    path: '/template_1/menu/newList',
    component: resolve => require(['@/temp/solution/newList'], resolve),
    name: 'NewList',
    meta: {
      nav: '新闻资讯'
    }
  },
  {
    path: '/template_1/menu/classView',
    component: resolve => require(['@/temp/solution/classView'], resolve),
    name: 'ClassView',
    meta: {
      nav: '课程理念'
    }
  }

]

export default tempRouter
