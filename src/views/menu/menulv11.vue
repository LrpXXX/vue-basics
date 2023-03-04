<template>
<div style="width:100%">
   <el-row><el-col class="box-title">菜单1-1</el-col></el-row> 
  <div style="height:1500px;width:100%;background:#f3f3f3">
    <div>全局变量1：{{this.$g.serverUserIP}}</div>
    <div>全局变量2：{{this.$g.serverUserAPI}}</div>
    <div>近一年时间：{{nearYear}}</div>
    <div>近半年时间：{{nearHalfYear}}</div>
  </div>
  </div>
</template>

<script>
//局部引入方法
import {getHalfYearStartAndEnd ,getYearStartAndEnd} from '@/service/zdk/timeUtil'
export default {
    data() {
      return {//这里可以初始化值，但是禁止引用函数
       nearYear:'',
       nearHalfYear:''
      };
    },
    created(){
      this.init();
    },
    methods: {     
      init(){
        this.nearYear=getYearStartAndEnd()
        this.nearHalfYear=getHalfYearStartAndEnd()      
      }
    },
      
      
   
  }
  
</script>
<style scoped lang="scss">    

</style>