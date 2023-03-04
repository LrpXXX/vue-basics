<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <!-- :background="background" -->
    <el-pagination
      small
      :pager-count="pagerCount"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>


<script>
// import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: { //必填，总条目数
      required: true,
      type: Number
    },
    page: { //当前页码
      type: Number,
      default: 1
    },
    limit: { //每页显示个数
      type: Number,
      default: 20
    },
    pagerCount:{ //pagerCount-最大页码按钮数,页码按钮的数量，当总页数超过该值时会折叠,大于等于 5 且小于等于 21 的奇数
      type: Number,
      default: 9
    },
    pageSizes: {//每页显示个数选择器的选项设置
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {//组件布局，子组件名用逗号分隔
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {//
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {//组件是否显示，主要用于该组件封装另一层组件时，控制该组件显示与否
      type: Boolean,
      default: false
    }
  },
  watch:{
    'total': { // 处理total小于当前页数量时 页数过大问题 ，此逻辑待优化
      handler: function(val) {
        if(val<=this.pageSize && this.currentPage!=1){
          this.currentPage = 1;
          this.handleCurrentChange(1);
        }
      }
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) { //pageSize 改变时会触发
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        // scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) { //currentPage 改变时会触发
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        // scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pagination-container {
  background: #fff;
  padding: 22px 16px;

}
.pagination-container.hidden {
  display: none;
}
::v-deep .el-pagination{
  margin-top: 0;
}
</style>
