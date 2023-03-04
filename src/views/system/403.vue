<template>
    <section class="warning-page">
      <div class="grid-content">
        <div class="warning-pic P403"></div>
        </div>
      <div class="grid-content">
          <h1>403</h1>
          <h1>{{abc}}</h1>
          <p>抱歉，你无权访问该页面。</p>
          <el-button type="primary"  @click="$router.push('/pagedemo/index')"  >返回首页</el-button>
      </div>
    </section>
</template>

<script>
export default {
  data() {
      return {
        abc:new Date(),
      }
  }
}
</script>
<style scoped lang="scss">



</style>
