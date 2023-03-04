<template>
  <div class="com-bread-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>中天数据平台</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in brumbList" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <p class="com-bred-sub-title">{{brumbList[brumbList.length-1]}}</p>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  props:{
    brumbList:[]
  },
  created(){
  }

}
</script>
<style lang="scss" scoped>

</style>