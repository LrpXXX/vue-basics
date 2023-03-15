<template>
  <div>
    <el-table
      size="medium"
      :data="tableData"
      :highlight-current-row="true"
      v-loading="columObj.loading"
      :row-key="columObj.rowKey"
      :row-class-name="rowClassName"
      @row-click="rowClick"
      @select="rowSelect"
    >
      <!-- 选择框是否开启，selectable控制是否单行禁用 -->
      <el-table-column v-if="columObj.selection" type="selection" :selectable="columObj.selectable"></el-table-column>
      <!-- 普通列 -->
      <el-table-column
        v-for="(column, columIndex) in columObj.columnData"
        :key="columIndex"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :fixed="column.fixed"
        :align="column.align || 'center'"
        :sortable="column.sortable"
        :index="columIndex"
        show-overflow-tooltip
      >
        <template slot-scope="{ row, $index }">
          <!-- 默认展示 -->
          <span v-if="column.text && column.editRow != $index">{{ row[column.prop] }}</span>
          <!-- 自定义内容 -->
          <span v-if="column.ownDefined">{{ column.ownDefinedReturn(row, $index) }}</span>
          <!-- switch开关 -->
          <el-switch
            v-if="column.switch"
            v-model="row[column.prop]"
            :inactive-text="row[column.prop] ? column.openText : column.closeText"
            @change="switchChange(row, $index, column.prop)"
          ></el-switch>
          <!-- 图片展示 -->
          <el-popover trigger="hover" placement="top" popper-class="popper">
            <img v-if="column.image" :src="viewUrl + row[column.prop]" />
            <el-image slot="reference" v-if="column.image" :src="viewUrl + row[column.prop]"></el-image>
          </el-popover>
          <!-- 可编辑input，仅在text默认展示类型才可编辑-->
          <el-input
            v-focus
            v-if="column.editRow == $index && column.text"
            v-model="row[column.prop]"
            @blur="editInputBlur(row, $index, column.prop, columIndex)"
          ></el-input>
          <!-- 操作按钮 -->
          <template v-if="column.isOperation">
            <span v-for="(operations, index) in column.operation" :key="index">
              <el-button
                v-if="operations.isShow(row, $index)"
                :icon="operations.icon"
                :type="operations.type"
                @click="rowOperation(row, $index, operations.operation)"
                :style="{ color: operations.color }"
                size="small"
              >
                {{ operations.label }}
              </el-button>
            </span>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="page-wrap" :style="{ textAlign: pageObj.position || 'center' }">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="false"
        :current-page="pageObj.pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageObj.pageSize"
        background
        layout="total, sizes, prev, pager, next"
        :total="pageObj.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    },
    columObj: {
      type: Object,
      required: true
    },
    // column列,columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
    // prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)

    // columObj.type(如果为""空，就不会加载多选框，或者index编号),lazy(是否支持懒加载)
    // columnData.columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
    // prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
    // 如果为操作列,则需要填写需要的操作按钮,类型为Object。operation(操作类型,可选edit,delete,see),type(按钮样式,参考el—botton类型),label(按钮文字)icon(参考el-icon),color(字体颜色)
    pageObj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      viewUrl: ''
    }
  },
  methods: {
    // 行操作
    rowOperation (row, $index, now) {
      this.$emit('rowOperation', row, $index, now)
    },
    // switchChange调用
    switchChange (row, $index, prop) {
      this.$emit('switchChange', row, $index, prop)
    },
    // 点击行，获取点击的下标
    rowClassName ({ row, rowIndex }) {
      row.rowIndex = rowIndex
    },
    // 点击行
    rowClick (row, column, event) {
      this.$emit('rowClick', row, column, event)
    },
    // 选中checkbox
    rowSelect (row, column, event) {
      this.$emit('rowSelect', row, column, event)
    },
    // 可编辑input失去焦点
    editInputBlur (row, $index, prop, columIndex) {
      this.$emit('editInputBlur', row, $index, prop, columIndex)
    },
    // 条数变化
    handleSizeChange (e) {
      this.$emit('handleSizeChange', e)
    },
    // 页码变化
    handleCurrentChange (e) {
      this.$emit('handleCurrentChange', e)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button {
  margin: 0 6px;
}

::v-deep .el-image__inner {
  height: 50px;
}

img {
  height: 200px;
}

.page-wrap {
  padding: 20px 0;
}
</style>
