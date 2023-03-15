
export default {
  joblogoType: [
    { value: 'Error', name: '错误日志' },
    { value: 'Minimal', name: '最小日志' },
    { value: 'Basic', name: '基本日志' },
    { value: 'Detailed', name: '详细日志' },
    { value: 'Debug', name: '调试' },
    { value: 'Rowlevel', name: '行级日志(非常详细)' }
  ],
  jobTaskType: [
    { value: 0, name: '周期性及CRON' },
    { value: 1, name: '一次性' }
  ],
  runningStatus: [
    { value: -1, name: '未运行' },
    { value: 0, name: '正常' },
    { value: 1, name: '准备中' },
    // {value:2, name:'暂停中'},
    { value: 3, name: '运行中' },
    { value: 404, name: '异常' }
  ],
  // 脱敏
  desensitization: [
    { value: 'NAME', name: '姓名' },
    { value: 'IDENTITY_ID', name: '身份证号' },
    { value: 'PHONE', name: '电话' },
    { value: 'MAIL', name: '邮箱' },
    { value: 'ADDRESS', name: '地址' },
    { value: 'QUANTITY', name: '数量' }
  ],
  // 搜索关系
  searchType: [
    { value: 'eq', name: '等于' },
    { value: 'like', name: '匹配' },
    { value: 'gt', name: '大于' },
    { value: 'lt', name: '小于' }
  ],
  // 操作类型
  optionType: ['查询', '修改', '删除', '新增', '导入', '导出', '登录', '退出', '授权', '启动', '停止', '执行'],
  // 菜单类型数组
  menuType: [
    { value: '1', name: '流程' },
    { value: '2', name: '模块' },
    { value: '3', name: '后台' },
    { value: '4', name: '功能' }
  ],
  // 请求方式
  requestType: [
    { value: 'GET', name: 'GET' },
    { value: 'POST', name: 'POST' },
    { value: 'PUT', name: 'PUT' },
    { value: 'DELETE', name: 'DELETE' },
    { value: 'PATCH', name: 'PATCH' },
    { value: 'HEAD', name: 'HEAD' },
    { value: 'OPTIONS', name: 'OPTIONS' },
    { value: 'TRACE', name: 'TRACE' }
  ]
}
