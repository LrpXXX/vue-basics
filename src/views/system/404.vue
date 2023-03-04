<template>
  <section class="warning-page">
    <div class="grid-content">
      <div class="warning-pic P404"></div>
    </div>
    <div class="grid-content">
        <h1>404</h1>
        <p>抱歉，你访问的页面不存在或仍在开发中。</p>
        <el-button type="primary"  @click="$router.push('/pagedemo/index')"  >返回首页</el-button>
    </div>
  </section>
</template>

<script>
export default {

}
</script>
<style scoped lang="scss">

</style>
