import request from '@/service/filters/api'
 /* 根据id 获取专题信息
 * obj 传到后端的data参数
 *fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const getMaterial=(data,fun)=> {
  request.postG('business/subject/getType', data ,fun,false)
}
 /* 获取专题列表（带分页）
 * obj 传到后端的data参数
 *fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const getTypeByPage=(data,fun)=> {
  request.get('business/subject/listPage', data ,fun,false)
}

 /* 根据专题id获取专题详细信息
 */
 export const getassociationMaterial=(data,fun)=> {
  request.get('business/subject/getMaterial', data ,fun,false)
}

/* 新增专题
 * obj 传到后端的data参数
 *fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const addSubject=(data,fun)=> {
  request.post('business/subject/addSubject', data ,fun,false)
}
/* 修改专题 */
 export const updateSubject=(data,fun)=> {
  request.post('business/subject/updateSubject', data ,fun,false)
}
/* 删除类别 */
export const delSubject=(data,fun)=> {
  request.deleteId('business/subject/deleteSubject', data ,fun,false)
}

/* 专题关联素材 */
export const associationMaterial=(data,fun)=> {
  request.post('business/subject/association?id=' + data.id, data.list ,fun,false)
}