import Vue from 'vue'
import Router from 'vue-router'
if (!window.VueRouter) Vue.use(Router)
var constantRouterMap=[
  {"path": '/', "name": 'login', component:()=>import(/* webpackChunkName:"login" */  "@/views/login/login" )},
  // {"path": '/logindemo', "name": 'logindemo', component:()=>import(/* webpackChunkName:"login" */  "@/views/pagedemo/login" ) },
  {"path": '/layout', "name": 'layout', component:()=>import(/* webpackChunkName:"layout" */   "@/views/layout/layout" ) },
  // {"path": '/bottomBody', "name": 'bottomBody', component:()=>import(/* webpackChunkName:"layout" */   "@/views/layout/botBody/bottomBody" ) },
]
export default new Router({
  mode: 'history',
  base: '/web',
  routes: constantRouterMap ,
  isInitChildren:false //layout是否加载子路由
})

//解决vue项目路由出现message: "Navigating to current location (XXX) is not allowed"的问题
//原因：在路由中添加了相同的路由。
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
