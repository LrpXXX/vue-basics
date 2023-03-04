import request from '@/service/filters/api'



 //this.api.postAPIEncrypt("ServerAuthAPI/login", jsonVal, res => {});
  //声明公布函数写法：const a = () =>  {}
 /*登录
 * obj 传到后端的data参数
 *fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const login=(data,fun)=> {
  request.post('sso/authenticate/login', data ,fun,false,true)
}

//退出登录
export const quitLogin=(data,fun)=> {
  request.get('sso/authenticate/quitLogin', data ,fun,true,false)
}
