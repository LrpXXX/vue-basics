import config from './config'
import http from './http'
import store from '@/service/store'
import { encryptData } from "@/service/zdk/dataDES.js"; //提交数据加密

// import {getIP} from './server'//服务IP配置
/**
 * 使用接口请求
 * 日期 ：2018/9/12
 ***/
// ouyi                    http://192.168.13.17:8080/zservice/

let APIIP=""
if( process.env.NODE_ENV=="development"){//开发环境
  APIIP="http://127.0.0.1:9871/system/"
  // APIIP="http://192.168.3.120:10099/screen/"
}else if( process.env.NODE_ENV=="production"){//正式环境
  APIIP=window.DEFAULTAPIIP
  //APIIP="http://192.168.3.120:9870/screen/"
}
store.state.baseUrl = APIIP; //将接口请求API地址保存，用于页面图片请求

export default {

  /*post方法
  *标准的post传值方法，参数是obj表单 对象时的处理方法 参数是赋值到 data上
  * url:API接口路径
  * data:                   json对象数据，这里只是接收，在config.js transformRequest中转换成string
  * options：           回调函数，因为是JS异步处理，所以需要将处理函数传过来
  * isCheckToken:   是否开起token验证，如登录、注册、请求新token、非登录网页展示这类API不需要验证，
  *                           其他项目内API需要打开，可缺省参数，默认打开验证
  * isloading:          是否使用全局loading，可缺省参数，默认false，如果需要触发遮罩层，传ture
  * isEncryptData     是否加密传输数据，可缺省参数，默认false,若需要加密传输数据第6个参数传true
  */
  post : function(url, data, options,isCheckToken,isloading,isEncryptData) {
    config.url =APIIP+url;//this.initConfig.ExaminationPlatformUrl+url;
    if(isEncryptData){
      config.data =JSON.stringify(encryptData(data));
    }else{
      config.data =JSON.stringify(data);
    }
    config.params = "";
    config.responseType = 'json';
    config.headers['Content-Type'] =  "application/json;charset=UTF-8";
    isCheckToken ===undefined ?   config.interceptor=true : config.interceptor=isCheckToken;//默认打开验证
    http.request("POST",config, options, options,isloading);
  },
  /*post方法
  *标准的post传值方法，参数是obj表单 对象时的处理方法 参数是赋值到 data上
  * url:API接口路径
  * data:                   json对象数据，这里只是接收，在config.js transformRequest中转换成string
  * options：           回调函数，因为是JS异步处理，所以需要将处理函数传过来
  * isCheckToken:   是否开起token验证，如登录、注册、请求新token、非登录网页展示这类API不需要验证，
  *                           其他项目内API需要打开，可缺省参数，默认打开验证
  * isloading:          是否使用全局loading，可缺省参数，默认false，如果需要触发遮罩层，传ture
  */
  get : function(url, params, options,isCheckToken,isloading) {
    config.url = APIIP+url;
    config.data ="";
    config.params =params;
    config.responseType = 'json';
    config.headers['Content-Type'] =  "application/json;charset=UTF-8";
    isCheckToken ===undefined ?   config.interceptor=true : config.interceptor=isCheckToken;//默认打开验证
    http.request("GET",config, options, options,isloading);
  },
  /*
  * postG方法
  * 用于替代之前get方法，主要使用场景为参数<4的 '非整表对象'的情况，参数是赋值到 params 以url？id=xxx形式传输的
  * 用于：登录，通过某个ID进行查询、通过ID单条删除等
  * 参数同post
  */
  postG : function(url, data, options,isCheckToken,isloading) {
    config.url = APIIP+url;
    config.data =JSON.stringify(data);
    config.params = data;
    config.responseType = 'json';
    config.headers['Content-Type'] =  "application/json;charset=UTF-8";
    isCheckToken ===undefined ?   config.interceptor=true : config.interceptor=isCheckToken;//默认打开验证
    http.request("POST",config, options, options,isloading);
  },
    /*
  * postPageList
  * 带分页+查询的列表页专用接口,查询条件走data参数，分页参数走params
  *  data 查询条件对象参数
  *  pageobj 分页对象参数
  */
 postPageSearch : function(url, data,pageObj, options,isCheckToken,isloading) {
  config.url = APIIP+url;
  config.data =JSON.stringify(data);
  config.params = pageObj;
   config.responseType = 'json';
   config.headers['Content-Type'] =  "application/json;charset=UTF-8";
  isCheckToken ===undefined ?   config.interceptor=true : config.interceptor=isCheckToken;//默认打开验证
  http.request("POST",config, options, options,isloading);
},

  //加密请求数据方法
  encryptDataFun : function(url,method, data, options,isCheckToken,isloading) {
    config.url = APIIP+url;
    data=encryptData(data) ;//加密
    // config.data = config.paramsSerializer(data);
    config.data = data;
    config.responseType = 'json';
    config.headers['Content-Type'] =  "application/json;charset=UTF-8";
    isCheckToken ===undefined ?   config.interceptor=true : config.interceptor=isCheckToken;//默认打开验证
    http.request(method,config, options, options,isloading);
  },

  postFile : function(url, data, options,isCheckToken,isloading) {
    config.url = APIIP+url;
    // 把参数处理成表达提交格式
    config.data = data;
    config.responseType = 'json';
    config.headers['Content-Type'] =  "application/x-www-form-urlencoded";
    isCheckToken ===undefined ?   config.interceptor=true : config.interceptor=isCheckToken;//默认打开验证
    http.request("POST",config, options, options,isloading);
  } ,
  getIP: function(url){
      return APIIP+url
  },
  //根据id删除一条数据
  deleteId: function(url,data,options,isCheckToken,isloading){
    config.url = APIIP+url;
    config.params = data;
    config.responseType = 'json';
    config.headers['Content-Type'] =  "application/x-www-form-urlencoded";
    isCheckToken ===undefined ?   config.interceptor=true : config.interceptor=isCheckToken;//默认打开验证
    http.request("DELETE",config, options,isloading);
  },
  /**
   * 文件下载
   * url: 接口api(String)
   * method : 请求方式(String)
   * data : 携带参数(Object)
   * success : 成功返回函数
   * error : 失败返回函数
   * name ： 下载的文件名
   ***/
  uploadFile(url,method,data,options,isCheckToken,isloading){
    const formdata = new FormData();
    for(var i in data){
      if(i!='id'){
        formdata.append(i, data[i]);
      }
    }
    config.url = APIIP+url;
    config.method = method;
    // config.data = formdata;
    config.params = data;
    config.responseType = 'blob';
    // config.headers['Content-Type'] =  "application/vnd.ms-excel;charset=utf-8";
    isCheckToken ===undefined ? config.interceptor=true : config.interceptor=isCheckToken;//默认打开验证
    http.request(method.toUpperCase(),config, options,isloading);
  },
  /**
   * form上传文件
   */
  postUploadFile(url, data, options,isCheckToken,isloading) {
    config.url = APIIP+url;
    // 把参数处理成表达提交格式
    config.params = "";
    config.data = data;
    config.responseType = 'json';
    config.headers['Content-Type'] =  "multipart/form-data";
    isCheckToken ===undefined ?   config.interceptor=false : config.interceptor=isCheckToken;//默认打开验证
    http.request("POST",config, options, options,isloading);
  } ,
}
