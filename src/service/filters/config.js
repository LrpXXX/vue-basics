import Qs from 'qs'
/**
 * axios配置文件
 * 日期 ：2018/9/12
 ***/
export default {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: '',
  interceptor: false,
  method: 'GET',
  timeout: 10000, // `timeout` 请求超时的毫秒数(0 表示无超时时间), 如果请求超过 `timeout` 的时间，请求将被中断
  withCredentials: false, // default 表示跨域请求时是否需要使用凭证
  responseType: 'json', // 数据返回格式 “”responseType”表示服务器将响应的数据类型
  // 发送请求      之前是否对数据进行修改
  transformRequest: [
    function (data) {
      return data
    }
  ],
  // 返回请求   `transformResponse`允许在 then / catch之前对响应数据进行更改
  transformResponse: [
    function (data) {
      if (typeof (data) === 'string') {
        data = JSON.parse(data)
      }
      return data
    }
  ],

  // `headers` 是即将被发送的自定义请求头
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },

  params: {},
  paramsSerializer: function (params) { // `paramsSerializer`是一个可选的函数，负责序列化`params`
    return Qs.stringify(params)
  },

  // 防止跨域状态下发起option请求
  // onUploadProgress: function(progressEvent) {
  //  // Do whatever you want with the native progress event
  // },
  // onDownloadProgress: function(progressEvent) {
  //  // Do whatever you want with the native progress event
  // },
  // `maxContentLength`定义允许的http响应内容的最大大小
  maxContentLength: 2000,
  // `validateStatus`定义是否解析或拒绝给定的promise
  validateStatus: function (status) {
    return status >= 200 && status < 500 // default
  },
  // `maxRedirects`定义在node.js中要遵循的重定向的最大数量。
  maxRedirects: 5 // default
}
