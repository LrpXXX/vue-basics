import request from '@/service/filters/api'
// import axios from "axios";
// import '@/service/mock/contract' // mock模拟数据
/*
声明公布函数写法：const a = () =>  {}
命名规则：以业务相关来进行命名
警告  Warning
Mock.JS会拦截真实HTTP请求。所以如果使用mockJS模拟数据，则该页面请不要使用真实请求；
如果使用真实请求，该页面请勿引入Mock模拟数据；
*/

/*  合同管理列表
 data 传到后端的data参数
 fun 回调处理函数，无需更改，对应vue页面中的res=>后的函数
 */
export const getContractList = (data, fun) => {
  // axios.get("/contract/getList").then(fun)
}

// 根据条件获取列表
export const listbycondition = (data, fun) => {
  request.post('zform/contractinfo/listbycondition', data, fun)
}

// 根据id删除
export const deleteId = (data, fun) => {
  request.post('zform/contractinfo/delete/' + data, {}, fun)
}

// 根据条件进行分页查询
export const pagebycondition = (data, params, fun) => {
  request.postPageSearch('zform/contractinfo/pagebycondition', data, params, fun)
}

// 新增或者修改
export const save = (data, fun) => {
  request.post('zform/contractinfo/save', data, fun)
}

// 根据id查询合同
export const select = (id, fun) => {
  request.get('zform/contractinfo/select/' + id, fun)
}
