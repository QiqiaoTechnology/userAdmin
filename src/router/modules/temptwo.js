
const temptwoRouter = [
  {
    path: '/template_2/menu',
    component: resolve => require(['@/temptwo/home'], resolve),
    name: 'THome'

  },
  {
    path: '/template_2/menu/home',
    component: resolve => require(['@/temptwo/home'], resolve),
    name: 'THome-2'
  }
]

export default temptwoRouter

