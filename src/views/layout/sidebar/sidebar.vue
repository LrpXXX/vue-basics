<template>
  <el-menu
    class="el-menu-vertical"
    unique-opened
    :default-active="nowMenuID"
    :default-openeds="nowMenuArrFID"
    @select="handleSelect"
  >
    <menu-tree v-if="menuData.length>0" :data.sync="menuData" ></menu-tree>
    <div v-else class="noMenuData">你拿点数据呀</div>
  </el-menu>
</template>
<script>
import MenuTree from '@/views/layout/sidebar/menutree'

export default {
  props: ['menuData'], // 父组件传的参数 unique-opened
  components: {
    MenuTree
  },
  data () {
    return {
      menuData: [],
      nowMenuArrFID: [], // 需要展开的父ID节点
      nowMenuID: '' // 当前选中的菜单ID
    }
  },
  watch: {
    // 监听路由变化，改变当前选中的菜单
    nowMenuID (val) {
      this.nowMenuID = val
    }
  },
  // computed: {
  //   nowMenuID(){
  //     return  this.$route.meta.id;
  //   },
  // },
  mounted () {
    // 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
    if (this.$route.meta.id) {
      this.nowMenuID = this.$route.meta.id
    }

    this.nowMenuArrFID = []
  },
  methods: {
    handleSelect (key, keyPath) {
      this.nowMenuArrFID = keyPath
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-menu-vertical {
    height: calc(100vh - 85px);
    overflow-y: auto;
    // overflow-x: hidden;
  }
   .el-menu-vertical:not(.el-menu--collapse) {
    width: 199px;
    border-color: #ddd;
  }
  .el-menu{
    background-color: #eaeaea ;
  }
  .noMenuData{
    width: 100%;
    color: rgb(77, 76, 76);
    font-size: 14px;
    text-align: center;
    padding-top: 15px;
  }
</style>
