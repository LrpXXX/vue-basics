import Vue from "vue";
import Router from "vue-router";
if (!window.VueRouter) Vue.use(Router);

const Login = () =>
  import(/* webpackChunkName:"login" */ "@/views/login/login");
const selectAdmin = () =>
  import(
    /* webpackChunkName:"selectAdmin" */ "@/views/layout/selectAdmin/selctAdmin"
  );
const Layout = () =>
  import(/* webpackChunkName:"layout" */ "@/views/layout/layout");
const Personnel = () =>
  import(/* webpackChunkName:"personnel" */ "@/views/personnel/personnel");
export const constantRouterMap = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/selectAdmin",
    name: "selectAdmin",
    component: selectAdmin
  },
  {
    path: "/layout",
    name: "layout",
    component: Layout,
    children: [
      {
        path: "personnel",
        name: "personnel",
        component: Personnel
      }
    ]
  },
  // {"path": '/bottomBody', "name": 'bottomBody', component:()=>import(/* webpackChunkName:"layout" */   "@/views/layout/botBody/bottomBody" ) },
  {
    path: "/appotionment",
    name: "预约管理",
    children: [
      {
        path: "management",
        name: "management",
        component: () =>
          import(
            /* webpackChunkName:"layout" */ "@/views/appotionment/management"
          )
      }
    ]
  },
  {
    path: "/error",
    name: "错误处理",
    // component: () => /* webpackChunkName:"layout" */ "@/views/system/404",
    children: [
      {
        path: "403",
        name: "没有权限",
        component: () =>
          import(/* webpackChunkName:"403" */ "@/views/system/403")
      },
      {
        path: "404",
        name: "找不到资源路径",
        component: () =>
          import(/* webpackChunkName:"403" */ "@/views/system/404")
      },
      {
        path: "500",
        name: "后端链接错误",
        component: () =>
          import(/* webpackChunkName:"403" */ "@/views/system/500")
      }
    ]
  },
  {
    path: "*",
    name: "Not Finde  Moules",
    component: () => import(/* webpackChunkName:"403" */ "@/views/system/404")
  }
];
export default new Router({
  mode: "history",
  base: "/web",
  routes: constantRouterMap,
  isInitChildren: false //layout是否加载子路由
});

//解决vue项目路由出现message: "Navigating to current location (XXX) is not allowed"的问题
//原因：在路由中添加了相同的路由。
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
