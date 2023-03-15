import axios from 'axios'
import router from '@/router/index'
import request from './api'// 服务IP配置
import { Message } from 'element-ui'
import { getUTCTime } from '../zdk/timeUtil'
import tools from '../zdk/tools'

let isTokenRefreshing = false// 当标志为true 代表程序正在获取新token
let subscribesArr = []// 存储前端发送请求的数组
const tokenRequestTime = 100// token离过期提前请求时间（单位：秒）
// 被拦截的请求push到数组中
function subscribesArrRefresh (cb) {
  subscribesArr.push(cb)
}
// 用新token发起请求队列中的所有请求
function reloadSubscribesArr (newToken) {
  subscribesArr.map(cb => {
    // console.log("当前存储接口数为:" + subscribesArr.length);
    cb(newToken)
  })
}

// 判断当前时间是否超过token过期时间
function isTokenExpire (serverTokenExpire) {
  return getUTCTime(new Date()) >= serverTokenExpire * 1
}

/**
 * http request 拦截器
 * 日期 ：2020/1/4
 ***/
axios.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem('accessToken')// 获取当前token值
    let refreshToken = sessionStorage.getItem('refreshToken')// 刷新token值
    let validTime = sessionStorage.getItem('validTime')// 获取获取token有效时间

    // 是否需要拦截

    if (config.interceptor == 'undefined' || !config.interceptor) {
      return config
    }
    // 判断当前token是否逻辑失效
    if (validTime == 'undefined' || isTokenExpire(validTime)) {
      // 判断当前是否正在获取新token中
      if (!isTokenRefreshing) {
        isTokenRefreshing = true
        // 请求token
        let tokenAPI = '/sso/authenticate/refreshToken'
        tokenAPI = request.getIP(tokenAPI)
        axios.post(tokenAPI, { accessToken: token, refreshToken: refreshToken })
          .then(res => {
            if (res.status == 200 && res.data.code == 200) {
              tools.setSession('accessToken', res.data.data.accessToken)
              tools.setSession('refreshToken', res.data.data.refreshToken)
              // sso
              tools.setSession('validTime', new Date().getTime() + Number(res.data.data.expiresIn) * 1000)
              tools.setSession('userName', res.data.data.userName)
              tools.setSession('userInfo', res.data.data.userInfo)
              tools.setSession('permission', res.data.data.permission)

              let Arr = res.data.data.accessToken.split('.')
              Arr.forEach((item, i) => {
                Arr[i] = Base64.decode(item)
              })
              tools.setSession('validTime', JSON.parse(Arr[0]).expire_time)
              tools.setSession('userName', JSON.parse(Arr[0]).name)
              tools.setSession('userInfo', JSON.parse(Arr[1]).user)
              isTokenRefreshing = false
              reloadSubscribesArr(res.data.data.accessToken)
            } else {
              // 请求失败，清空缓存，返回登录页
              isTokenRefreshing = false
              Message.warning('登录失效，请重新登录。', 5)
              subscribesArr = []
              tools.delAllSession()
              router.options.isInitChildren = false
              router.replace({
                path: '/',
                query: {
                  redirect: router.currentRoute.fullPath
                }
              })
            }
          }).catch(err => {
            // 请求失败，清空缓存，返回登录页
            isTokenRefreshing = false
            Message.warning('登录超时，请重新登录。', 5)
            subscribesArr = []
            tools.delAllSession()
            router.options.isInitChildren = false
            router.replace({
              path: '/',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
            console.log(err)
          })
      }
      let retry = new Promise((resolve, reject) => {
        subscribesArrRefresh((newToken) => {
          config.headers['Authorization'] = newToken
          resolve(config)
        })
      })
      return retry
    } else {
      config.headers['Authorization'] = tools.getLocal('accessToken')
      return config
    }
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * http response 拦截器
 * 日期 ：2018/9/12
 ***/
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          switch (error.response.data.data) {
            case 'F': // 非法
              Message.error('您的token非法，请不要恶意尝试。', 5)
              console.error('您的token非法，请不要恶意尝试!')
              break
            case 'S': // 失效
              Message.warning('登录已过期，请重新登陆！', 5)
              console.error('登录已过期，请重新登陆!')
              break
            case 'N': // 不存在
              Message.error('token值无效！', 5)
              console.error('token值无效!')
              break
            case 'G': // 过期
              Message.warning('您的token过期，请重新登录!', 5)
              console.error('您的token过期，请获取新token!')
              break
            case 'Q': // 人为挤下线
              Message.warning('您的账号在其它设备上登录,请重新登录!', 5)
              console.error('您的账号在其它设备上登录,请重新登录!')
              break
            default:
              return true
          }
          sessionStorage.clear()
          localStorage.removeItem('token')
          localStorage.removeItem('validTime')
          router.options.isInitChildren = false

          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          sessionStorage.clear()
          break
      }
    }
    return error.response
  }
)

export default axios
