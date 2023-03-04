import request from '@/service/filters/api'
/*
声明公布函数写法：const a = () =>  {}
命名规则：以业务相关来进行命名
警告  Warning
Mock.JS会拦截真实HTTP请求。所以如果使用mockJS模拟数据，则该页面请不要使用真实请求；
如果使用真实请求，该页面请勿引入Mock模拟数据；
*/

/*  获取用户路由--菜单模块数据
 data 传到后端的data参数
 fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */

//查询当前登录用户菜单
export const getUserMenu = (data, fun) => {
    request.get("sso/authenticate/getMenu", data, fun);
}
/*  获取用户信息列表
 data 传到后端的data参数
 fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const getUserInfo = (data, fun) => {
    request.post("system/user/getCurrentUser", data, fun);
    //request.post("system/user/getUserInfo",data,fun);
}
/*  获取用户设置
 data 传到后端的data参数
 fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const getUserSetting = (data, fun) => {
    request.postG("system/basic/getBasicByUser", data, fun);
}
/*  设置用户基础设置
 data 传到后端的data参数
 fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const setUserSetting = (data, fun) => {
    request.post("system/basic/submit", data, fun);
}

/*  获取系统变量信息
 data 传到后端的data参数
 fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const getSysVariables = (data, fun) => {
    request.postG("system/systemVariables/list", data, fun);
}
/*  设置系统变量
 data 传到后端的data参数
 fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const setSysVariables = (data, fun) => {
    request.post("system/systemVariables/submit", data, fun);
}
/*  删除系统变量
 data 传到后端的data参数
 fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const delSysVariables = (data, fun) => {
    request.postG("system/systemVariables/remove", data, fun);
}

/*  跳转其他系统
 url  跳转的地址
 data 传到后端的data参数
 fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const outLinkJump = (url, data, fun) => {
    request.get(url, data, fun);
}


/*  其他系统跳转当前系统验证
 data 传到后端的data参数
 fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const getTokenCheck = (data, fun) => {
    request.get('sso/authenticate/redirectVerification', data, fun, false);
}

/*  获取当前系统配置信息
    data 传到后端的data参数
    fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const getSysConfiguration = (data, fun) => {
    request.get('system/sys-configuration/getById', data, fun, false);
}
