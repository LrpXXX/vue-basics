import request from '@/service/filters/api'
 /* 获取所有类别列表(带分页)
 * obj 传到后端的data参数
 *fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
 export const getType=(data,fun)=> {
  request.postG('business/codeTable/getType', data ,fun,false)
}
 /* 获取所有类别列表
 * obj 传到后端的data参数
 *fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
 export const getTypeByPage=(data,fun)=> {
  request.get('business/codeTable/listPage', data ,fun,false)
}

/* 新增类别
 * obj 传到后端的data参数
 *fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const add=(data,fun)=> {
  request.post('business/codeTable/add', data ,fun,false)
}

/* 修改类别 */
 export const update=(data,fun)=> {
  request.post('business/codeTable/update', data ,fun,false)
}

/* 删除类别 */
export const del=(data,fun)=> {
  request.postG('business/codeTable/delete', data ,fun,false)
}