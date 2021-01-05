
const titleList = [
  {
    id: '1-1',
    cate_id: '1',
    title: '在线留言',
    status: true,
    ord: 1,
    author: 'admin',
    contents: '<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1783627040,2442271822&fm=26&gp=0.jpg"/>'
  },
  {
    id: '1-2',
    cate_id: '2',
    title: '联系我们',
    status: false,
    ord: 1,
    author: 'admin',
    contents: '<div class="copyright">' +
	'<div class="copyright_c">' +
		'<div class="copyright_head">' +
			'<div class="copyright_L">' +
				'<p>联系我们</p>' +
				'<span>' +
			'<em>服务时间：</em>' +
			'<em>周一至周日  9:00-18:00</em>' +
	'	</span>' +
			'	<span>' +
		'	<em>客服电话：</em>' +
		'	<strong>4000-000-0000</strong>' +
	'	</span>' +
				'<span>' +
		'	<em>客服QQ：</em>' +
		'	<a href="#" >在线交谈</a>' +
	'	</span>' +
			'</div>' +

			'<div class="copyright_R">' +
			'	<span ><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590487927291&di=ba984a0c0c3b15dc910a9790020cd77a&imgtype=0&src=http%3A%2F%2Fsrc.onlinedown.net%2Fimages%2Fxcs%2F10%2F2017-09-18_59bf6a2170092.jpg" style="width:  150px; " /></span>' +
			'	<p>扫描关注微信公众号</p>' +
		'	</div>' +
		'</div>' +
		'<div class="copyright_bottom">' +
			'<span>京B2-xxxxxxx 京公海网安备1101080xxxxxxx号 京ICP备xxxxxxxx号-32   </span>' +
			'<p>建站创建能为您带去订单的网站</p>' +
		'</div>' +
	'</div>' +
'</div>'
  },
  {
    id: '1-3',
    cate_id: '3',
    title: '公司简介',
    status: true,
    author: 'admin',
    ord: 1,
    contents: '广州市七巧网络科技有限公司创立于2011年，是一家以创客文化为理念，拥有系列品牌【思客】、【云客】的创新型电商互联网平台公司。'
  }, {
    id: '1-1',
    cate_id: '4',
    title: '七巧云主要功能介绍',
    contents: '1、系统采用高效、简洁、强悍的模板标签，只要懂HTML就可快速开发企业网站',
    status: true,
    ord: 1,
    cover_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590486244961&di=6ac726df02e57e521fb8df163d448ae0&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171101%2Fcc358053a29b4529a3dd14251092ce9f.jpeg',
    author: 'admin'
  },
  {
    id: '1-2',
    cate_id: '5',
    title: '消费者信心逐步恢复 4月家电线下市场降幅收窄',
    contents: '随着国内疫情得到有效控制，目前国内绝大部分地区的社会生产活动逐步恢复正常，消费者信心得到恢复，从而带动消费市场加速回暖。',
    status: true,
    ord: 2,
    cover_img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=177935845,1728929618&fm=26&gp=0.jpg',
    author: 'admin',
    zuozhe: '璐璐璐'
  },
  {
    id: '1-3',
    cate_id: '4',
    title: '七巧云正式上线',
    contents: '1、系统采用高效、简洁、强悍的模板标签，只要懂HTML就可快速开发企业网站',
    status: true,
    ord: 1,
    cover_img: 'http://files.3158.cn/article/201508/1703/400497573586166.jpg',
    author: 'admin',
    zuozhe: '璐璐璐'
  },
  {
    id: '1-4',
    cate_id: '5',
    title: '互联网电视业务“上路”换道IPv6',
    contents: '日前，工业和信息化部、国家广播电视总局联合发出了《关于推进互联网电视业务IPv6改造的通知》（以下简称《通知》），部署推进互联网电视业务IPv6改造工作，目标是在2020年年内实现以IPv6支撑互联网电视业务。今年是IPv6实现“通路”、走向“通车”的关键年。',
    status: true,
    ord: 1,
    cover_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590486197855&di=a0461104b8a24d519827a9633bcdcdff&imgtype=0&src=http%3A%2F%2Fp5.qhimg.com%2Ft012f912dfd04dab4a6.jpg%3Fsize%3D840x479',
    author: 'admin',
    zuozhe: '璐璐璐'
  },
  {
    id: '1-1',
    cate_id: '7',
    title: '前端开发工程师',
    contents: '熟悉vue，layui，等框架<br/>' +
    '（1）精通JAVA开发语言、熟练掌握Eclipse开发工具；熟悉HTML、精通Apache、JSP、Servlet等Web开发相关技术；熟悉主流数据库，熟练掌握SQL。<br/>' +
    '（2）熟悉使用struts、spring、hibernate等常用开发框架；查看、分析前述和其它Java开源项目源代码者优先。<br/>' +
    '（3）熟练使用JavaScript和Ajax技术；具有一年及以上Ajax开发经验或熟悉Javascript。<br/>' +
   ' 通过合并同类项，上述三个要求，基本上是所有公司招聘Java程序员的基本要求。<br/>',
    status: true,
    ord: 1,
    author: 'admin'
  },
  {
    id: '1-2',
    cate_id: '7',
    title: 'java开发工程师',
    contents: '三个基本要求：<br/>' +
      '（1）学历要求：大学本科以上学历（含本科），专业： 计算机相关专业本科以上；专科以上学历，计算机及其相关专业，3年以上相关岗位经验；<br/>' +
      '（2）工作经验要求：一年以上java开发工作经验；B/S项目开发经验2年以上；3年以上的Java, J2EE, XML等开发经验,1年以上架构设计经验(Windows环境)；<br/>' +
      '（3）项目开发要求：具有一定规模的项目开发经验；',
    status: true,
    ord: 1,
    author: 'admin'
  },
  {
    id: '1-3',
    cate_id: '7',
    title: 'PHP开发工程师',
    contents: '（1）精通Java面向对象基本语法，能完成Java Web开发。<br/>' +
    '（2）熟练SSH三大开发框架，能用它们完成一些项目。<br/>' +
    '（3）掌握Ajax开发技术。',
    status: true,
    ord: 1,
    author: 'admin'
  }

]

const labelList = [
  { labelId: '1', labelName: '内容标题', labelType: '输入框', labelField: 'title', isdisable: true, labelStatus: true, labelAuthor: 'admin' },
  { labelId: '2', labelName: '内容主体', labelType: '富文本', labelField: 'contents', isdisable: true, labelStatus: true, labelAuthor: 'admin' },
  { labelId: '3', labelName: '状态', labelType: '开关', labelField: 'status', isdisable: true, labelStatus: true, labelAuthor: 'admin' },
  { labelId: '4', labelName: '推荐', labelType: '开关', labelField: 'recommendState', isdisable: true, labelStatus: true, labelAuthor: 'admin' },
  { labelId: '5', labelName: '置顶', labelType: '开关', labelField: 'topState', isdisable: true, labelStatus: true, labelAuthor: 'admin' },
  { labelId: '6', labelName: '产品类型', labelType: '输入框', labelField: 'productType', isdisable: true, labelStatus: true, labelAuthor: 'admin' },
  { labelId: '7', labelName: '图片上传', labelType: '文件上传', labelField: 'cover_img', isdisable: true, labelStatus: true, labelAuthor: 'admin' },
  { labelId: '8', labelName: '多图片上传', labelType: '文件上传', labelField: 'imgList', isdisable: true, labelStatus: true, labelAuthor: 'admin' },
  { labelId: '9', labelName: '产品价格', labelType: '数字框', labelField: 'productPrice', isdisable: true, labelStatus: true, labelAuthor: 'admin' },
  { labelId: '10', labelName: '文章作者', labelType: '输入框', labelField: 'zuozhe', isdisable: true, labelStatus: true, labelAuthor: 'admin' },
  { labelId: '11', labelName: '测试', labelType: '输入框', labelField: 'ceshi', isdisable: false, labelStatus: true, labelAuthor: 'admin' }
]

const columnList = [
  { cate_id: '1', columnName: '在线留言', webSite: 'zxly', columnType: '0', labelIdList: ['1', '2', '3', '4'], columnStatus: true, columnAuthor: 'admin' },
  { cate_id: '2', columnName: '关于我们', webSite: 'gywm', columnType: '0', labelIdList: ['1', '2', '3'], columnStatus: true, columnAuthor: 'admin' },
  { cate_id: '3', columnName: '公司简介', webSite: 'gsjj', columnType: '0', labelIdList: ['1', '2', '3'], columnStatus: true, columnAuthor: 'admin' },
  { cate_id: '4', columnName: '公司动态', webSite: 'gsdt', columnType: '1', labelIdList: ['1', '2', '3', '4'], columnStatus: true, columnAuthor: 'admin' },
  { cate_id: '5', columnName: '行业动态', webSite: 'hydt', columnType: '1', labelIdList: ['1', '2', '3', '4'], columnStatus: true, columnAuthor: 'admin' },
  { cate_id: '6', columnName: '产品中心', webSite: 'cpzx', columnType: '1', labelIdList: ['1', '2', '3', '4', '7', '9'], columnStatus: true, columnAuthor: 'admin' },
  { cate_id: '7', columnName: '招贤纳士', webSite: 'zxns', columnType: '1', labelIdList: ['1', '2', '3', '4'], columnStatus: true, columnAuthor: 'admin' }
]
const linkList = [
  {
    id: '1-1',
    title: '广东省东莞市七巧网络科技有限公司',
    link: 'qiqiao.com',
    status: true,
    author: 'admin',
    data: '2020.05.26'
  }
]

const productList = [
  {
    id: '1-1',
    cate_id: '6',
    productType: '网络服务',
    productPrice: '2000',
    title: '七巧云Cms',
    contents: '1、系统采用高效、简洁、强悍的模板标签，只要懂HTML就可快速开发企业网站',
    status: true,
    ord: 1,
    cover_img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1783627040,2442271822&fm=26&gp=0.jpg',
    author: 'admin'
  },
  {
    id: '1-2',
    cate_id: '6',
    productType: '云服务',
    productPrice: '3000',
    title: '七巧云1.0',
    contents: '随着国内疫情得到有效控制，目前国内绝大部分地区的社会生产活动逐步恢复正常，消费者信心得到恢复，从而带动消费市场加速回暖。',
    status: true,
    ord: 2,
    cover_img: 'http://a4.att.hudong.com/22/59/19300001325156131228593878903.jpg',
    author: 'admin'
  },
  {
    id: '1-3',
    cate_id: '6',
    productType: '软件服务',
    productPrice: '2800',
    title: '七巧云2.0',
    contents: '1、系统采用高效、简洁、强悍的模板标签，只要懂HTML就可快速开发企业网站',
    status: true,
    ord: 1,
    cover_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590144280147&di=ee58af6b90ba1e05f9c1a4df45721575&imgtype=0&src=http%3A%2F%2Fwww.qnong.com.cn%2Fuploadfile%2F2016%2F1122%2F20161122093951175.jpg',
    author: 'admin'
  },
  {
    id: '1-4',
    cate_id: '6',
    productType: '定制服务',
    productPrice: '800',
    title: '七巧云定制版',
    contents: '日前，工业和信息化部、国家广播电视总局联合发出了《关于推进互联网电视业务IPv6改造的通知》（以下简称《通知》），部署推进互联网电视业务IPv6改造工作，目标是在2020年年内实现以IPv6支撑互联网电视业务。今年是IPv6实现“通路”、走向“通车”的关键年。',
    status: true,
    ord: 1,
    cover_img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2720396052,2557582271&fm=11&gp=0.jpg',
    author: 'admin'
  }
]
export default [
  // get user info
  {
    url: '/corporate/getThematicList',
    type: 'get',
    response: config => {
      const paindex = config.query.pageIndex
      const size = config.query.pageSize
      const pageList = titleList.filter((item, index) => index < size * paindex && index >= size * (paindex - 1))
      return {
        code: 20000,
        data: pageList,
        total: titleList.length
      }
    }
  }, {
    url: '/corporate/getlabelList',
    type: 'get',
    response: config => {
      const paindex = config.query.pageIndex
      const size = config.query.pageSize
      const pageList = labelList.filter((item, index) => index < size * paindex && index >= size * (paindex - 1))
      return {
        code: 20000,
        data: pageList,
        total: labelList.length
      }
    }
  },
  {
    url: '/corporate/getColumnList',
    type: 'get',
    response: config => {
      //   const pageList = columnList.filter((item, index) => index < size * paindex && index >= size * (paindex - 1))
      return {
        code: 20000,
        data: columnList,
        total: columnList.length
      }
    }
  }, {
    url: '/corporate/getlinkList',
    type: 'get',
    response: config => {
      const info = linkList
      return {
        code: 20000,
        data: info,
        total: linkList.length
      }
    }
  }, {
    url: '/corporate/getproductList',
    type: 'get',
    response: config => {
      const info = productList
      return {
        code: 20000,
        data: info,
        total: productList.length
      }
    }

  }

]

