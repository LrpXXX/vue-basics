<!--作为引入页面时，不要加template-->
<template>
  <el-menu class="tabsmenu" :style="style" v-show="visible" @select="handleClick" :selectedKeys="selectedKeys" unique-opened>
    <el-menu-item :key="item.key" :index="item.key" v-for="item in itemList">
      <i v-if="item.icon" :class="item.icon"/>{{item.text}}
    </el-menu-item>
  </el-menu>
</template>
<script>
  export default {
    name: 'Tabsmenu',
    props: {
      visible: {
        type: Boolean,
        required: false,
        default: false
      },
      itemList: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    data () {
      return {
        left: 0,
        top: 0,
        target: null,
        selectedKeys: []
      }
    },
    computed: {
      style () {
        return {
          left: this.left + 'px',
          top: this.top + 'px'
        }
      }
    },
    created () {
      window.addEventListener('mousedown', e => this.closeMenu(e))
      window.addEventListener('contextmenu', e => this.setPosition(e))
    },
    methods: {
      closeMenu (e) {
        if (['menuitemicon', 'menuitem'].indexOf(e.target.getAttribute('role')) < 0) {
          this.$emit('update:visible', false)
        }
      },
      setPosition (e) {
        this.left = e.clientX
        this.top = e.clientY
        this.target = e.target
      },
      handleClick (key) {
        this.$emit('select', key, this.target)
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tabsmenu{
    width: 134px;
    position: fixed;
    z-index: 1;
   // border-bottom: 1px solid #9e9e9e;
    // border-radius: 4px;
    // box-shadow: 2px 2px 10px #aaaaaa !important;
  }
</style>
