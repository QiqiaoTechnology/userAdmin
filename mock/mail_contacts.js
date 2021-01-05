
const mailList = [
  {
    id: '1-1',
    name: '曾艳芬',
    mail: 'zengyanfen@snh48.com',
    mobile: '15815151515', groud: '塞纳河部',
    sex: 2, stutas: true,
    avatarUrl: 'http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg',
    role: 'admin',
    job: '歌手',
    avatarUrlList: ['http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg']
  },
  {
    id: '1-2',
    name: '黄婷婷',
    mobile: '15815151515', groud: '塞纳河部',
    mail: 'huangtingting@snh48.com',
    sex: 2, stutas: true,
    avatarUrl: 'http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg',
    role: 'admin',
    job: '歌手',
    avatarUrlList: ['http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg']
  },
  {
    id: '1-3',
    name: '冯薪朵',
    mobile: '15815151515', groud: '塞纳河部',
    mail: 'fengxinduo@snh48.com',
    sex: 2, stutas: true,
    avatarUrl: 'http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg',
    role: 'admin',
    job: '歌手',
    avatarUrlList: ['http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg']
  },
  {
    id: '1-4',
    name: '陆婷',
    mobile: '15815151515', groud: '塞纳河部',
    mail: 'luting@snh48.com',
    sex: 2, stutas: false,
    avatarUrl: 'http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg',
    role: 'admin',
    job: '歌手',
    avatarUrlList: ['http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg']
  },
  {
    id: '2-2',
    name: '曾可妮',
    mobile: '15815151515', groud: '青春有你部',
    mail: 'zengkeni@qcyn.com',
    sex: 2, stutas: true,
    avatarUrl: 'http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg',
    role: 'admin',
    job: '舞者',
    avatarUrlList: ['http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg']
  }, {
    id: '2-3',
    name: '刘令姿',
    mobile: '15815151515', groud: '青春有你部',
    mail: 'liulingzi@qcyn.com',
    sex: 2, stutas: false,
    avatarUrl: 'http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg',
    role: 'admin',
    job: '歌手',
    avatarUrlList: ['http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg']
  },
  {
    id: '2-4',
    name: '赵小棠',
    mobile: '15815151515', groud: '青春有你部',
    mail: 'zxt@qcyn.com',
    sex: 2, stutas: true,
    avatarUrl: 'http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg',
    role: 'admin',
    job: '舞者',
    avatarUrlList: ['http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg']
  },
  {
    id: '2-5',
    name: '周周',
    mobile: '15815151515', groud: '青春有你部',
    mail: 'zz@qcyn.com',
    sex: 2, stutas: false,
    avatarUrl: 'http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg',
    role: 'admin',
    job: '制作人',
    avatarUrlList: ['http://pic2.zhimg.com/50/v2-958d33fd4a4de747058adcafdf753074_hd.jpg']
  }
]
const voiceList = [
  {
    id: '1-1',
    name: '曾艳芬',
    mail: 'zengyanfen@snh48.com',
    mobile: '15815151515', groud: '青春有你部',
    stauts: 1,
    contents: '我觉得你们的功能做的非常棒 继续加油哟'
  },
  {
    id: '2-2',
    name: '曾可妮',
    mobile: '15815151515', groud: '青春有你部',
    mail: 'zengkeni@qcyn.com',
    stauts: 2,
    contents: '我参加了爱奇艺青春有你第二季，快来为我打call吧'
  }, {
    id: '2-3',
    name: '刘令姿',
    mobile: '15815151515', groud: '青春有你部',
    mail: 'liulingzi@qcyn.com',
    stauts: 2,
    contents: '加油！不达目的不能放弃'
  }
]

const pictureList = [
  {
    id: '1-1',
    title: '七巧云CMS',
    link: 'qiqiaoyun.com',
    twotitle: '重新定义大数据时代',
    stauts: false,
    zuozhe: 'aadmin',
    avatarUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590484048382&di=35ccede60c2e237155ebff03964ea2bf&imgtype=0&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D3930510857%2C1870350260%26fm%3D214%26gp%3D0.jpg',
    avatarUrlList: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590484048382&di=35ccede60c2e237155ebff03964ea2bf&imgtype=0&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D3930510857%2C1870350260%26fm%3D214%26gp%3D0.jpg']
  },

  {
    id: '1-2',
    title: 'CMS',
    link: 'qiqiaoyun.com',
    twotitle: '高效、简洁、强悍的PHP建站源码',
    stauts: true,
    zuozhe: 'admin',
    avatarUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590753320017&di=4aa6cb16680349483765561763ccc070&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F011f29597890fea8012193a3ec4d2d.jpg%401280w_1l_2o_100sh.jpg',
    avatarUrlList: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590753320017&di=4aa6cb16680349483765561763ccc070&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F011f29597890fea8012193a3ec4d2d.jpg%401280w_1l_2o_100sh.jpg']
  }

]

export default [
  // get user info
  {
    url: '/mail_contacts/list',
    type: 'get',
    response: config => {
      const info = mailList

      return {
        code: 20000,
        data: info,
        total: mailList.length
      }
    }
  }, {
    url: '/mail_contacts/pictureList',
    type: 'get',
    response: config => {
      const info = pictureList

      return {
        code: 20000,
        data: info,
        total: pictureList.length
      }
    }
  }, {
    url: '/mail_contacts/voiceList',
    type: 'get',
    response: config => {
      const info = voiceList

      return {
        code: 20000,
        data: info,
        total: voiceList.length
      }
    }
  }

]

