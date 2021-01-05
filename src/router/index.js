import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import tempRouter from './modules/temp'
import temptwoRouter from './modules/temptwo'
import tempthreeRouter from './modules/tempthree'
/* Layout */
import Layout from '@/layout'
// 公共页面
// const children = [...tempRouter]
// const children = [...temptwoRouter]
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/template_2/menu',
    component: resolve => require(['@/temptwo/Main'], resolve),
    children: temptwoRouter,
    hidden: true
  },
  {
    path: '/template_1/menu',
    component: resolve => require(['@/temp/Main'], resolve),
    children: tempRouter,
    hidden: true
  },
  {
    path: '/template_3/menu',
    component: resolve => require(['@/tempthree/Main'], resolve),
    children: tempthreeRouter,
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '工作台', icon: 'gongzuotai', affix: true }
      }
    ]
  }
]
// 动态挂载
export const asyncRoutes = [

  {
    path: '/email',
    component: Layout,
    redirect: '/email/emailUserList',
    name: 'Email',
    meta: {
      title: '邮箱服务',
      icon: 'email',
      roles: ['superAdmin', 'admin']
    },
    children: [
      {
        path: '/emailUserList',
        component: () => import('@/views/email/emailUserList'),
        name: 'EmailUserList',
        meta: { title: '用户列表', icon: 'yonghu' }
      },
      {
        path: '/emailAddressesList',
        component: () => import('@/views/email/emailAddressesList'),
        name: 'EmailAddressesList',

        meta: { title: '邮箱列表', icon: 'youxiang' }
      }
    ]
  },
  {
    path: '/webServer',
    component: Layout,
    meta: {
      title: '建站服务',
      icon: 'shezhi'
    },

    children: [
      {
        path: 'basicContent',
        component: () => import('@/views/webServer/index'), // Parent router-view
        meta: { title: '基础设置', icon: 'shezhi' },
        children: [
          {
            path: '/templateList',
            component: () => import('@/views/basicContent/templateList'),
            name: 'TemplateList',
            meta: { title: '模板管理', icon: 'tubiaoku' }
          },
          // {
          //   // path: '/viewList',
          //   path: 'http://81.69.18.147/online_editing/',
          //   meta: { title: '可视化页面', icon: 'yemian' }
          // },
          {
            path: '/viewList',
            component: () => import('@/views/basicContent/viewList'),
            name: 'ViewList',
            meta: { title: '页面管理', icon: 'zhandian' }
          },
          {
            path: '/corporateInformation',
            component: () => import('@/views/basicContent/corporateInformation'),
            name: 'CorporateInformation',
            meta: { title: '公司信息', icon: 'gongsi' }
          }

        ]
      },
      {
        path: 'articleContent',
        component: () => import('@/views/webServer/index'), // Parent router-view
        meta: { title: '内容管理', icon: 'wenzhang_huaban' },
        children: [
          {
            path: '/lableManagement',
            component: () => import('@/views/articleContent/labelManagement'),
            name: 'LableManagement',
            meta: { title: '文章标签', icon: 'mulu' }
          },
          {
            path: '/thematic',
            component: () => import('@/views/articleContent/thematic'),
            name: 'Thematic',
            meta: { title: '文章管理', icon: 'wenzhang' }
          },
          {
            path: '/editThematic',
            component: () => import('@/views/articleContent/editThematic'),
            name: 'EditThematic',
            hidden: true,
            meta: { title: '编辑图文素材' }
          },
          {
            path: '/viewThematic',
            component: () => import('@/views/articleContent/thematicView'),
            name: 'ViewThematic',
            hidden: true,
            meta: { title: '文章详情' }
          },
          {
            path: '/addThematic',
            component: () => import('@/views/articleContent/editThematic'),
            name: 'AddThematic',
            hidden: true,
            meta: { title: '新增图文素材' }
          },
          {
            path: '/addCutForm',
            component: () => import('@/views/articleContent/editCutForm'),
            name: 'AddCutForm',
            hidden: true,
            meta: { title: '新增文章素材' }
          },
          {
            path: '/editCutForm',
            component: () => import('@/views/articleContent/editCutForm'),
            name: 'EditCutForm',
            hidden: true,
            meta: { title: '编辑文章素材' }
          },
          {
            path: '/teletext',
            component: () => import('@/views/articleContent/teletext'),
            name: 'Teletext',
            meta: { title: '图文管理', icon: 'muban' }
          },
          {
            path: '/media',
            component: () => import('@/views/articleContent/media'),
            name: 'Media',
            meta: { title: '多媒体素材', icon: 'tupian' }
          },
          {
            path: '/picture',
            component: () => import('@/views/extendedContent/picture'),
            name: 'Picture',
            meta: { title: '轮播图片', icon: 'lunbotu' }
          },
          {
            path: '/pictureView',
            component: () => import('@/views/extendedContent/pictureView'),
            name: 'PictureView',
            hidden: true,
            meta: { title: '轮播图详情', icon: 'lunbotu' }
          },
          {
            path: '/pictureAdd',
            component: () => import('@/views/extendedContent/pictureAdd'),
            name: 'PictureAdd',
            hidden: true,
            meta: { title: '轮播图新增', icon: 'lunbotu' }
          },
          {
            path: '/pictureEdit',
            component: () => import('@/views/extendedContent/pictureEdit'),
            name: 'PictureEdit',
            hidden: true,
            meta: { title: '轮播图编辑', icon: 'lunbotu' }
          },

          {
            path: '/blogroll',
            component: () => import('@/views/extendedContent/blogroll'),
            name: 'Blogroll',
            meta: { title: '友情链接', icon: 'lianjie' }
          }
        ]
      }

    ]
  },

  {
    path: '/weChatService',
    component: Layout,
    redirect: '/weChatService/index',
    name: 'WeChatService',
    meta: {
      title: '微信服务管理',
      icon: 'wechat'
    },
    children: [
      {
        path: 'infrastructure',
        name: 'Infrastructure',
        component: () => import('@/views/weChatService/infrastructure'),
        meta: { title: '基础设置', icon: 'jichushezhi' }
      },
      {
        path: 'fansList',
        name: 'FansList',
        component: () => import('@/views/weChatService/fansList'),
        meta: { title: '粉丝管理', icon: 'fensi' }
      },
      {
        path: 'blackFansList',
        name: 'BlackFansList',
        component: () => import('@/views/weChatService/blackFansList'),
        meta: { title: '黑名单管理', icon: 'heimingdan' }
      },
      {
        path: 'fansLabel',
        name: 'FansLabel',
        component: () => import('@/views/weChatService/fansLabel'),
        meta: { title: '粉丝标签', icon: 'fensibiaoqian' }
      },
      {
        path: 'msgList',
        name: 'MsgList',
        component: () => import('@/views/weChatService/msgList'),
        meta: { title: '消息列表', icon: 'wenzhang' }
      },
      {
        path: 'msghistory',
        name: 'Msghistory',
        component: () => import('@/views/weChatService/msghistory'),
        meta: { title: '消息历史', icon: 'wenzhang' },
        hidden: true
      },
      // {
      //   path: 'theMediaList',
      //   name: 'TheMediaList',
      //   component: () => import('@/views/weChatService/theMediaList'),
      //   meta: { title: '素材管理', icon: 'sucai' }
      // },
      // {
      //   path: 'groupSentMsg',
      //   name: 'GroupSentMsg',
      //   component: () => import('@/views/weChatService/groupSentMsg'),
      //   meta: { title: '群发助手', icon: 'sucai' }
      // },
      // {
      //   path: 'wcteletext',
      //   name: 'Wcteletext',
      //   component: () => import('@/views/weChatService/wcteletext'),
      //   meta: { title: '图文素材', icon: 'sucai' }
      // },

      {
        path: 'theMessageList',
        name: 'TheMessageList',
        component: () => import('@/views/weChatService/theMessageList'),
        meta: { title: '自动回复', icon: 'huifu' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
