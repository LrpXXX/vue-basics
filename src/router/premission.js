// //路由处理
import router from '@/router'
import tools from '@/service/zdk/tools' // session处理工具类
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import _ from 'lodash'
import {POWERDATA} from './routerdata'
// import {getUserMenu,getTokenCheck} from '@/service/api/sysinfo'

let _import;
if( process.env.NODE_ENV=="development"){//开发环境
  _import=(file) =>
    resolve =>require(['@/views/' + file + '.vue'],resolve).default
}else if( process.env.NODE_ENV=="production"){//正式环境
  _import = (file) => () =>
      import(
        /* webpackChunkName:"[request]" */ '@/views/' + file + '.vue'
      )

}

// let layoutRouter = router.options.routes[1];
// // //公开页面白名单
// let whiteRouterList=["login"];
// router.beforeEach((to, from, next) => {
//   let token = to.query.token;
//   NProgress.start() //全局进度条
//   to.query.t= new Date().getTime();//过期时间
//   if (_.indexOf(whiteRouterList,to.name)==-1 &&  !router.options.isInitChildren ) { //不加这个判断，路由会陷入死循环
//     if(token){
//       otherObjFrom(token,next).then(a=>{
//         getMenuRouter(to,next)
//       })
//     }else{
//       getMenuRouter(to,next);
//     }
//     // getMenuRouter(to,next)

//       let dd={"basicid":"10","fontSize":14,"pageSize":15,"themePackers":"theme1","isstate":true,"userid":"1"}
//       let obj={}
//       dd.forEach(v=>{
//         let key= v.varName;
//         let value=v.varValue;
//         obj[key]=value;
//       })
//       tools.setObjSession('SysVariables', obj);
//   } else {
//     next()
//   }
//   // next()
// })

// // token到期重新请求获取新的token
// function otherObjFrom(token,next){
//   return new Promise((resolve,reject)=>{
//     getTokenCheck({token:token}, res => {
//       if (res.code == 200 && res.success) {
//         tools.setSession('accessToken',res.data.accessToken);
//         tools.setSession('refreshToken',res.data.refreshToken);
//         //sso
//         tools.setSession('validTime',new Date().getTime()+Number(res.data.expiresIn)*1000);
//         tools.setSession('userName',res.data.userName);
//         tools.setSession('userInfo',res.data.userInfo);
//         tools.setSession('permission',res.data.permission);
//         //错误信息不自动关闭提示信息及弹出框
//         // this.$message({ message: '登录成功，欢迎回来！', type: 'success',showClose:true,offset:60,});
//         resolve(res)
//       }else {
//         // reject(res)
//         next({ "path": "/" })
//       }
//     })
//   })
// }

// // 处理导航栏数据
// function getMenuRouter(to,next){
//   let url = to.query.jump;
//   // let  data=POWERDATA;
//   // let moduleData=[]
//   // let outModuleData=[]
//   // const  menuData=_.cloneDeep(data)
//   // initMenuData(menuData,(menuArr)=>{
//   //   tools.setObjSession("menuData", menuArr)
//   //   data.forEach(item=>{
//   //     if(item.openMode=='2' ){
//   //         outModuleData.push(item);
//   //       } else{
//   //         moduleData.push(item);
//   //       }
//   //   })
//   //   console.log(moduleData,'moduleData');
//   //   layoutRouter["children"]=initRouterData(moduleData);
//   //   router.addRoutes([layoutRouter])
//   //   console.log(outModuleData,'outModuleData');
//   //   let outlayoutRouter=initRouterData(outModuleData);
//   //   router.addRoutes(outlayoutRouter)
//   //   router.addRoutes( [{"path": '*', "name": 's404', component:()=>import("@/views/system/404") }])
//   //   router.options.isInitChildren= true;
//   //   //  //执行路由跳转方法
//   //   if(url){
//   //     next(url)
//   //   }else{
//   //     next({ ...to, replace: true })//路由不可跳转
//   //   }
//   // });
//   getUserMenu({}, res => {
//     if (res.code == 200) {
//       // let data=POWERDATA;
//       let data=res.data;
//       let moduleData=[]     //一级路由配置
//       let outModuleData=[] // 二级路由配置
//       const menuData=_.cloneDeep(data);

//       //将目录树结构存入session中，名称为"menuData"
//       initMenuData(menuData,(menuArr)=>{
//         tools.setObjSession("menuData", menuArr)
//         data.forEach(item=>{
//           if(item.openMode=='2' ){
//               outModuleData.push(item);
//             } else{
//               moduleData.push(item);
//             }
//         })
//         console.log(moduleData,'moduleData');
//         layoutRouter["children"]=initRouterData(moduleData);
//         router.addRoutes([layoutRouter])
//         console.log(outModuleData,'outModuleData');
//         let outlayoutRouter=initRouterData(outModuleData);
//         router.addRoutes(outlayoutRouter)
//         router.addRoutes( [{"path": '*', "name": 's404', component:()=>import("@/views/system/404") }])
//         router.options.isInitChildren= true;
//         //  //执行路由跳转方法
//         if(url){
//           next(url)
//         }else{
//           next({ ...to, replace: true })//路由不可跳转
//         }
//       });
//     }

//   });
// }

// router.afterEach(() => {
//   NProgress.done()
// })

// router.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g;
//   const isChunkLoadFailed = error.message.match(pattern);
//   const targetPath = router.history.pending.fullPath;
//   if (isChunkLoadFailed) {
//     router.replace(targetPath);
//   }
// });

// // 配置加载路径
// function initRouterData(data) {
//   const accessedRouters = data.filter(route => {
//     if( accessedRouters==undefined){
//     }
//     if (route.pathUrl != "") {
//       if (!_.startsWith(route.pathUrl,"/")) {//如果前面没加/
//         route.pathUrl = "/" + route.pathUrl;
//       }
//       route.path = route.pathUrl;
//     if (_.startsWith(route.pathUrl,"/")){
//         try {
//           route.component = _import(_.trimStart(route.pathUrl, "/"))
//         } catch (e) {
//           console.log(1111,e,'错误处理');
//           console.error("加载",route.name,"模块错误，加载路径：",route.pathUrl,"错误："+e);
//         }
//       }
//       if(route.isKeepAlive !=null && route.isKeepAlive !=undefined){
//         route.meta={
//           keepAlive:route.isKeepAlive
//         }
//       }

//       route.meta = {...route.meta,...{id:route.id,topId:route.topId}};

//     }else{
//       // route.pathUrl =ErrorPageUrl;
//       // route.path = route.pathUrl;
//       // try {
//       //   route.component = _import(_.trimStart(route.pathUrl, "/"))
//       // } catch (e) {
//       //   console.error(e)
//       // }
//       //跳过没有pathUrl的路由
//       return false;
//     }

//     if (route.children && route.children.length) {
//       //添加路由携带的信息元，用于菜单选中效果
//       // route.meta = {id:route.id}
//       // route.meta = {...route.meta,...{id:route.id,topId:route.topId}};
//       route.children = initRouterData(route.children)
//     }
//     return true
//   })
//   return accessedRouters

// }
// // 头部的导航设置
// function initMenuData(data,callbake) {
//   let menuData = []
//   menuData = jsonTree(data, {
//     index: 'id',
//     pid: 'pid',
//     children: 'children'
//   });
//   callbake(menuData)
// }
// // json数据转换成树形结构
// function jsonTree(data, config) {
//   let id = config.id || 'id',
//     pid = config.pid || 'pid',
//     children = config.children || 'children';
//   let idMap = {},
//     newIdMap = {},
//     jsonTree = [];

//   data.forEach(function (v) {
//       if(v){
//         // v.meta.id = v.id + "";
//         v.index = v.id + "";
//         idMap[v[id]] = v;
//       }
//   });
//   data.forEach(function (v) {
//     // if(v.type == '2'){
//       var parent = idMap[v[pid]];
//       if(v.parent) delete v.parent;
//       if (parent) {
//         !parent[children] && (parent[children] = []);
//         if (v.pid != 0 || v.pid != "" || v.pid != null) {
//           v.index = v.pid + "-" + v.index;
//         }
//         parent[children].push(v);
//       } else {
//         jsonTree.push(v);
//       }
//     // }
//   });
//   return jsonTree;
// };
