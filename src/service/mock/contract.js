const Mock = require('mockjs')
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const RESULT = 0 // 返回状态码，正常的默认为0
const CODE = 200 // 详细状态编码，正常为200
const MESSAGE = '请求成功。'
// 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
Mock.setup({
  timeout: '200 - 500' // 延时200~400毫秒
})

// //获取列表
Mock.mock('/contract/getList', 'get', () => {
  let list = []
  for (let i = 0; i < 20; i++) {
    list.push(Mock.mock({
      id: '@increment',
      'connum|0-10000': 2018 + 0, // 合同编号
      concname: '合同' + Random.ctitle(3, 7), // 合同名称
      'conamount|0-100': 0, // 合同金额
      signdate: 2016 + Random.date('-MM-dd'), // 签订日期
      overdate: 2017 + Random.date('-MM-dd'), // 完工日期
      accountmanager: Mock.mock('@cname'), // 客户经理
      'status|0-1': 0 // 合同状态
      // type: [0, 2],
      // checkbox: [0, 1],
      // 'number|0-100': 0,
      // datetime: 1532932422071,
      // 'sex|0-1': 0,
      // moreselect: [0, 1],
      // "grade": 0,
      // address: Mock.mock('@cparagraph(1, 3)'),
      // check: [1, 3, 4]
    }))
  }
  return {
    result: RESULT,
    code: CODE,
    message: MESSAGE,
    data: {
      total: 11,
      pageSize: 10,
      tableData: list
    }
  }
})

// //获取列表
Mock.mock('/login/getMenu', 'post', (data) => {
  data = JSON.parse(data.body)
  let username = data.username
  let MenuBase = []
  let MenuManage = []
  let datas
  MenuBase = {
    'router': [
      { 'path': '/layout',
        'name': 'layout',
        'component': 'layout/layout',
        'children': [// 如果是菜单点击跳转的，请将页面路由写到本children下
          { 'path': '/formbase', 'name': 'formbase', 'component': 'form/formbase' },
          { 'path': '/leftmenu', 'name': 'leftmenu', 'component': 'layout/sidebar/sidebar' },
          { 'path': '/about', 'name': 'about', 'component': 'about' },
          // 合同管理
          { 'path': '/contactlist', 'name': 'contactlist', 'component': 'contract/contractlist' }
        ]
      }
    ]
  }

  MenuManage = {
    'router': [
      { 'path': '/layout',
        'name': 'layout',
        'component': 'layout/layout',
        'children': [// 如果是菜单点击跳转的，请将页面路由写到本children下
          { 'path': '/formbase', 'name': 'formbase', 'component': 'form/formbase' },
          { 'path': '/leftmenu', 'name': 'leftmenu', 'component': 'layout/sidebar/sidebar' },
          { 'path': '/about', 'name': 'about', 'component': 'about' },
          // 合同管理
          { 'path': '/contactlist', 'name': 'contactlist', 'component': 'contract/contractlist' },
          { 'path': '/addcontract', 'name': 'addcontract', 'component': 'contract/addcontract' },
          { 'path': '/performsitulist', 'name': 'performsitulist', 'component': 'contract/performsitulist' },
          { 'path': '/accountsitu', 'name': 'accountsitu', 'component': 'contract/accountsitu' }, // 收款情况
          { 'path': '/addcollection', 'name': 'addcollection', 'component': 'contract/addcollection' }, // 合同基本信息

          // 系统管理
          { 'path': '/contactlist', 'name': 'contactlist', 'component': 'contract/contractlist' },
          { 'path': '/addcontract', 'name': 'addcontract', 'component': 'contract/addcontract' },
          { 'path': '/menulist', 'name': 'menulist', 'component': 'sysmanage/menu/menulist' },
          { 'path': '/accountsitu', 'name': 'accountsitu', 'component': 'contract/accountsitu' }, // 收款情况
          { 'path': '/addcollection', 'name': 'addcollection', 'component': 'contract/addcollection' } // 合同基本信息
        ]
      }
    ]
  }
  console.log('当前账号：' + username)
  if (username == 'admin') {
    datas = MenuManage
  } else {
    datas = MenuBase
  }
  // return {
  //     result:RESULT,
  //     code:CODE,
  //     msg:MESSAGE,
  //     data: datas
  // }
})
