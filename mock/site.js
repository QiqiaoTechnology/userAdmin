
const titleList = [
  {
    id: '1-1',
    columnName: '联系我们',
    title: '联系我们',
    status: 0,
    author: 'admin'
  },
  {
    id: '1-2',
    columnName: '在线留言',
    title: '在线留言',
    status: 0,
    author: 'admin'
  },
  {
    id: '1-3',
    columnName: '公司简介',
    title: '公司简介',
    status: 0,
    author: 'admin'
  }

]

export default [
  // get user info
  {
    url: '/site/getlist',
    type: 'get',
    response: config => {
      const info = titleList
      return {
        code: 20000,
        data: info,
        total: titleList.length
      }
    }
  }
]

