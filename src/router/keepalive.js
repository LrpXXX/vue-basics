// 路由缓存管理
export default {
  computed: {
      keepAliveConf(){          
          return this.$store.state.keepAliveList;
      }
  },
  watch:{
      keepAliveConf(e){
          if(!e.includes(name)) {
             this.$destroy()
          }
      },
      /*
      通过路由判断  ，请先满足该页面使用mixin且引入keepalive.js
      来的路由是详情页，并且去的路由是对应列表页，则调用list初始化对应function刷新列表,
      toRoute :跳转后路由对象
      fromRoute:跳转前路由对象
      */
      '$route': function (toRoute,fromRoute) {
        console.log(fromRoute.path)
        console.log(toRoute.path)
        
        //通知维护
        if(fromRoute.path=="/fzbg/tzgg/tzggmod" && toRoute.path=="/fzbg/tzgg/tzggwhlist"){
            this.tzggSearchForm();
        }
        //发文维护
        else if(fromRoute.path=="/gwgl/fw/fwmodtab" && toRoute.path=="/gwgl/fw/fwwhlist"){
            this.bindTableList();    
        }
      }  
  },
}