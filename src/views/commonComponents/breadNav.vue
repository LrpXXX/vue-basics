<template>
  <!-- 面包屑导航 -->
  <div class="main-breadnav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadData" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  props:['breadData'],
}
</script>
<style lang="scss" scoped>
.main-breadnav{padding: 0 20px;background-color: #fff;box-shadow: 0px 0px 10px #ccc;}
.el-breadcrumb{height: 50px;line-height: 50px;color: #7f7f7f;}
</style>
