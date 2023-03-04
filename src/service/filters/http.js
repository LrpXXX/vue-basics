import axios from './axios'// 拦截器
import './code'// 特殊处理参数
import router from '@/router/index'
import {  Message,Loading} from 'element-ui';  //消息提示模块
import { decryptData } from "@/service/zdk/dataDES.js"; //数据解密
import  tools  from '../zdk/tools';

/** axios接口请求
 * 日期 ：2020.1.6
 ***/
export default {
  config:{
    waitTime:1000,//关闭全局遮罩层 '延时' 时间,主要用于被动优化！！！
    LOADING_OPTION:{//全局loading样式设置
      lock: true,
      text: '加载中……',
      background: 'rgba(0, 0, 0, 0.7)'
    }
  },
  /**
   * 接口请求
   * method : 请求方式
   * config : 配置
   * success : 成功返回函数
   * error : 失败返回函数
   * isloading : 是否回调时使用全局遮罩层，可选参数，不传则默认不显示
   ***/
  request: function(method, config, success, error,isloading) {
    // 接口加载等待效果
    let loadingInstance;
    if(isloading==undefined){//默认不显示遮罩层
      isloading=false
    }

    if(isloading){
      loadingInstance = Loading.service(this.config.LOADING_OPTION);
    }

    config.method = method;
    // axios调用接口
    return axios.request(config).then(res => {
      if(isloading){
        setTimeout(() => {// 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        }, this.config.waitTime/3)
      }
      if(res && res.status){
        if(res.status== 200){

          if(res.data.encryption && res.data.success){
            let decData = decryptData(res.data.data.data,res.data.data.key);
            res.data.data = decData.data;
          }
          return success && success(res.data);
        }else{
            switch (res.status) {
              case 500:
                if(!res.data.success){
                  Message({type:'error',message:res.data.msg,customClass:"message_z_index"})
                  console.error(res.data.error)
                  if(res.data.code>6000 && res.data.code<7000){
                    router.options.isInitChildren=false;
                    tools.delAllSession()
                    router.replace({
                      path: '/',
                      query: {
                        redirect: router.currentRoute.fullPath
                      }
                    })
                  }
                }
                break;
              case 400:
                console.error("错误信息:API请求参数错误:"+res.config.url)
                console.error(res.data.msg)
                break;
              default:
                  $httpmap[res.status]?Message.error($httpmap[res.status],5) : message.error('访问失败，请稍后再试。',5);
                  console.error(config.url.substring(config.url.lastIndexOf(":")+5)+"\n请求失败： status:"+res.status+";错误信息："+$httpmap[res.status])
            }
          return error && error(res);
        }
      }else{
        Message.error('访问服务失败，请稍后再试。', 5);
        console.error("服务器请求失败："+config.url.substring(config.url.lastIndexOf(":")+5))
        let resData={
          code :503,
          success:false,
          message:"服务器请求失败，请稍后再试",
        }
        return error && error(resData);//return false;
      }

    }).catch(response => {
      if(isloading){
        setTimeout(() => {// 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        },  this.config.waitTime)
      }
      //return false
      return error && error(response);
    })
  }
}
