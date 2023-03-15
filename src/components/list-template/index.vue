
<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleCurrentChange (val) {
      // 点击中间页的按钮 执行的方法
      this.currentpage = val
      this.handleTableData()
    },
    handlePrevClick (val) {
      // 点击向前的按钮 执行的方法
      this.currentpage = val
      this.handleTableData()
    },
    // 点击向后的按钮 执行的方法
    handleNextClick (val) {
      // val的值是传递进来的参数，如果是在第一页，点击下一页，这里的val就是2
      // 触发该方法后，将val赋值给 currentpage, currentpage =>用来存放当前页面值的量
      this.currentpage = val
      // 再调用handleTableData 方法
      this.handleTableData()
    }
  },
  mounted () {
    this.tableData2 = this.tableData
    this.tableData_length = this.tableData.length
  }
}
</script>
