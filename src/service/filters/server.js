/**
 * 使用Api请求服务IP配置
 ***/
let APIIP=[]
//APIIP=" http://192.168.13.26:8080/zservice/"//尤艳明
APIIP="http://192.168.0.228:8080/zservice/"
if( process.env.NODE_ENV=="development"){//开发环境
  APIIP={
    "system"  :   APIIP,    
    "contractinfo"      :   "http://192.168.0.139:8080/zservice/",
   
  }
}else if( process.env.NODE_ENV=="production"){//正式环境
  APIIP={
    "system"  :   APIIP,    
    "contractinfo"      :   "http://192.168.0.139:8080/zservice/",
  }
}

export const getIP=(url)=>{  
  //console.log("请求地址："+url)
  if(url.indexOf("http://")!=-1||url.indexOf("https://")!=-1){
    return url;
  }else{
    let urlHeader=url.substring(0,url.indexOf("/"))
    // console.log(urlHeader)
    for(let key in APIIP){
      //console.log(key)      
      if(key==urlHeader){
        //console.log("返回值："+APIIP[key]+url)
        return APIIP[key]+url        
      }
    }
  }
}

