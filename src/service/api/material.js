import request from '@/service/filters/api'
/* 获取专题列表（带分页）
 * obj 传到后端的data参数
 *fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const getmaterialByPage = (data, fun) => {
  request.get('business/material/listPage', data, fun, false)
}
/* 根据id 获取文件素材
 */
export const getassociationSpecial = (data, fun) => {
  request.get('business/material/getMaterial?id=' + data.id, data.list, fun, false)
}
/* 专题封面根据id获取封面base64
   */
export const getreadFileId = (data, fun) => {
  request.get('business/material/readFileId', data, fun, false)
}

/* 新增修改素材 */
export const addOrUpdateMaterial = (data, fun) => {
  request.post('business/material/addOrUpdateMaterial', data, fun, false)
}

/* 修改素材
* 只修改素材属性（不处理素材文件）
 */
export const updateMaterial = (data, fun) => {
  request.post('business/material/updateMaterial', data, fun, false)
}
// 素材新增文件
export const addMaterialFile = (data, fun) => {
  request.post('business/material/addMaterialFile', data, fun, false)
}
// 素材删除文件
export const deleteMaterialFile = (data, fun) => {
  request.post('business/material/deleteMaterialFile?id=' + data.id, data.list, fun, false)
}

/* 根据id删除一条素材数据 */
export const delMaterial = (data, fun) => {
  request.deleteId('business/material/delId', data, fun, false)
}
