<template >
  <fragment>
    <template v-for="menu in data">
      <el-submenu :index="menu.id" v-if="menu.children">
        <template slot="title">
          <span v-show="menu.pid!='' && menu.icon==''" class="child-left"></span>
          <i :class="menu.icon"></i>
          <span slot="title" :class="collapse ?  'menu-title-dis': ' ' "> {{menu.name}} </span>
        </template>
        <label>
          <menutree :data="menu.children"></menutree>
        </label>
      </el-submenu>
      <el-menu-item v-else :index="menu.id" @click="routerJump(menu)">
        <span v-if="menu.pid!='' && menu.icon==''" class="child-left"></span>
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.name}} </span>
      </el-menu-item>
    </template>
  </fragment>
</template>
<script>
export default {
  props: ['data', 'collapse'], // 父组件传的参数 unique-opened
  name: 'menutree', // 声明组件名称
  data () {
    return {

    }
  },
  created () {
  },
  methods: {
    /*
      点击菜单后跳转
      open ：跳转方式:1项目内跳转。2打开新窗口
      url：跳转路径
    */
    routerJump (menu) {
      if (menu.openMode == 1) {
        this.$router.push({
          path: menu.pathUrl,
          query: {
            t: new Date().getTime()
          }
        })
      } else if (menu.openMode == 2) {
        window.open(menu.pathUrl + '?t=' + new Date().getTime(), '_blank') // 新窗口打开外链接
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-menu{
    background-color: transparent;
}
.child-left {
  padding-left: 28px;
}
.menu-wrapper {
  display: block;
}
.menu-title-dis {
  display: none;
}
::v-deep .el-submenu__title {
  color: #666;
  i {
    color: #666;
  }
}
::v-deep .el-menu-item {
  color: #666;
  i {
    color: #666;
  }
}

::v-deep .el-menu-item.is-active {
  background: #e5f3ff !important;
  color: #369ffb !important;
  i {
    color: #369ffb !important;
  }
}

::v-deep .el-submenu__icon-arrow {
  top: 55%;
  // right:10px;
}
</style>
