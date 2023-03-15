<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<template>
  <div>
    <common-table
      :tableData="tableData"
      :columObj="columObj"
      :pageObj="pageObj"
      @rowOperation="rowOperation"
      @switchChange="switchChange"
      @editInputBlur="editInputBlur"
      @rowClick="rowClick"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></common-table>
  </div>
</template>

<script>
import commonTable from '@/components/common-table/index.vue'
export default {
  components: {
    commonTable
  },
  data () {
    return {
      // 分页对象
      pageObj: {
        position: 'center', // 分页组件位置
        total: 100,
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [
        {
          id: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          switchs: true,
          img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
          objmsg: {
            msg: '11111111111111'
          }
        },
        {
          id: '2',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          switchs: true,
          img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
          objmsg: {
            msg: '11111111111111'
          }
        },
        {
          id: '3',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          switchs: true,
          img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
          objmsg: {
            msg: '11111111111111'
          }
        },
        {
          id: '4',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          switchs: true,
          img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
          objmsg: {
            msg: '11111111111111'
          }
        }
      ],
      columObj: {
        // 选择框
        selection: true,
        // 选择框根据条件是否可选
        selectable: (row) => {
          if (row.switchs) {
            return true
          }
        },
        lazy: 'true',
        // column列,columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
        // prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
        columnData: [
          {
            text: true,
            prop: 'date',
            editRow: undefined,
            label: '默认样式',
            width: '',
            align: 'center'
          },
          {
            text: true,
            prop: 'id',
            label: '可以排序',
            width: '',
            align: 'center',
            editRow: undefined,
            sortable: true // 开启排序
          },
          {
            ownDefined: true,
            prop: 'address',
            label: '自定义返回内容',
            width: '',
            align: 'center',
            sortable: false,
            // eslint-disable-next-line no-unused-vars
            ownDefinedReturn: (row, $index) => {
              return row.address
            }
          },
          {
            switch: true,
            prop: 'switchs',
            label: 'switch开关',
            width: '',
            align: 'center',
            openText: '打开',
            closeText: '关闭',
            sortable: false
          },
          {
            image: true,
            prop: 'img',
            label: '图片',
            width: '',
            align: 'center',
            sortable: false
          },
          {
            text: true,
            editRow: undefined,
            prop: 'name',
            label: '点击可编辑',
            width: '',
            align: 'center',
            sortable: false
          },
          // 如果为操作列,则需要填写需要的操作按钮,类型为Object。operation(操作类型,可选edit,delete,see),type(按钮样式,参考el—botton类型),label(按钮文字)icon(参考el-icon),color(字体颜色)
          {
            isOperation: true,
            fixed: 'right',
            label: '操作',
            width: '180',
            align: 'center',
            sortable: false,
            operation: [
              {
                operation: 'edit',
                type: 'text',
                label: '编辑',
                icon: '',
                // color: "red",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true
                }
              },
              {
                operation: 'delete',
                type: 'text',
                label: '删除',
                icon: '',
                // color: "blue",
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true
                }
              },
              {
                operation: 'see',
                type: 'primary',
                label: '查看',
                icon: '',
                color: '',
                // eslint-disable-next-line no-unused-vars
                isShow: (row, $index) => {
                  return true
                }
              }
            ]
          }
        ]
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 操作按钮点击事件
    rowOperation (row, $index, now) {
      console.log(row, $index, now)
    },
    // switch切换事件
    switchChange (row, $index, prop) {
      console.log(row, $index, prop)
    },
    // 行点击事件
    rowClick (row, column) {
      // 点击行触发，编辑点击的所在列，排除selection选择框
      if (column.type != 'selection') {
        this.columObj.columnData[column.index].editRow = row.rowIndex
      }
    },
    // 输入框失焦事件
    editInputBlur (row, $index, prop, columIndex) {
      this.columObj.columnData[columIndex].editRow = -1
    },
    // 页码变化
    handleCurrentChange (e) {
      this.pageObj.pageIndex = e
    },
    // 条数变化
    handleSizeChange (e) {
      this.pageObj.pageSize = e
      this.pageObj.pageIndex = 1
    }
  }
}
</script>
