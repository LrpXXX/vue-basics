<template>
    <el-tabs v-model="noticeName">
      <el-tab-pane label="公告(83)" name="first">
        <el-table  :data="noticeTableData" style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="110">
          </el-table-column>
          <el-table-column
            prop="address"
            label="内容">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="系统消息(117)" name="second">
        <el-table  :data="noticeTableData" style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="110">
          </el-table-column>
          <el-table-column
            prop="address"
            label="内容">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
   data() {
      return {
        noticeName:'first',
        noticeTableData: [{
            date: '2016-05-02',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
        
      };
    },
    created(){


    },
    methods: {     

    }
}

</script>

<style  lang="scss" scoped>
   

   
</style>
