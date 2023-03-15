// 模拟后台根据权限获取的菜单原始数据
// icon  对应element图标 后期会加上阿里iconfont
// pathUrl 路由地址 对应views文件夹下文件位置，前面记得加 /
// type 1 为菜单模块 （会在菜单显示）2 为普通路由，如弹出框等
// openMode  1为本窗口路由打开  2 打开新窗口（如果为外部地址 如百度等 请设置新窗口打开，前面带http头）
// isKeepAlive 路由页面/组件是否缓存，默认false，设为缓存后请认真规划缓存页面，否则可能因为内存不足导致的浏览器卡死！！！
export const POWERDATA = [
  {
    'id': '4',
    'name': '预约管理 ',
    'sorting': '1',
    'pid': '0',
    'type': '1',
    'pathUrl': '/appotionment/appotionment',
    'serialNumber': '1',
    'icon': 'sjhj',
    'openMode': '1',
    'keepalive': true
  },
  {
    'id': '5',
    'name': '人员管理 ',
    'sorting': '1',
    'pid': '0',
    'type': '1',
    'pathUrl': '/personnel/personnel',
    'serialNumber': '1',
    'icon': 'sjhj',
    'openMode': '1',
    'keepalive': true
  },
  {
    'id': '6',
    'name': '道路管理 ',
    'sorting': '1',
    'pid': '0',
    'type': '1',
    'pathUrl': '/personnel/personnel',
    'serialNumber': '1',
    'icon': 'sjhj',
    'openMode': '2',
    'keepalive': true
  },
  {
    'id': '6',
    'name': '人员管理 ',
    'sorting': '1',
    'pid': '0',
    'type': '1',
    'pathUrl': '/personnel/personnel',
    'serialNumber': '1',
    'icon': 'sjhj',
    'openMode': '2',
    'keepalive': true
  }

]
