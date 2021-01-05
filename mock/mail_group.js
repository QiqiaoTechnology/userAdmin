
const groupList = [
  {
    id: '1',
    name: '财务部',
    childes: [{
      id: '1-2',
      name: '黄婷婷',
      mail: 'huangtingting@snh48.com'
    },
    {
      id: '1-3',
      name: '冯薪朵',
      mail: 'fengxinduo@snh48.com'
    },
    {
      id: '1-4',
      name: '陆婷',
      mail: 'luting@snh48.com'
    }]
  },
  {
    id: '2',
    name: '人事部',
    childes: [{
      id: '2-2',
      name: '曾可妮',
      mail: 'zengkeni@qcyn.com'
    },
    {
      id: '2-3',
      name: '刘令姿',
      mail: 'liulingzi@qcyn.com'
    },
    {
      id: '2-4',
      name: '赵小棠',
      mail: 'zxt@qcyn.com'
    }]
  }
]

export default [
  // get user info
  {
    url: '/mail_group/groupList',
    type: 'get',
    response: config => {
      const info = groupList

      return {
        code: 20000,
        data: info,
        total: groupList.length
      }
    }
  }
]

