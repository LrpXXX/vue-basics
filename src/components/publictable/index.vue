<template>
  <div v-loading="value.loading" ref="container" class="wh100" style="margin: 10px;">
    <el-table ref="table" :data="value.data" :height="value.height" style="width:100%" fit highlight-current-row :default-expand-all="value.expandAll?value.expandAll:false" :tree-props="value.treeProps?value.treeProps:{children: 'children', hasChildren: 'hasChildren'}"
              @sort-change="sortChange" @select="(...p) => emit('select', p, 'selection,row')"
              @select-all="(...p) => emit('select-all', p, 'selection')"
              @selection-change="(...p) => emit('selection-change', p, 'selection')"
              @row-click="(...p) => emit('row-click', p, 'row,column,event')"
              @cell-click="(...p) => emit('cell-click', p, 'row,column,cell,event')"
              :row-key="(p)=>{ return p.id}" >
      <!-- 多选框 -->
      <!-- 默认多选框 -->
      <el-table-column :fixed="value.isFixed" v-if="value.isSelection" :reserve-selection="true" type="selection"
                       width="55" align="center"></el-table-column>
      <!-- 自定义多选框，插槽名称为selection -->
          <slot name="selection"></slot>
      <!-- 定义 序号 -->
      <el-table-column v-if="!value.treeProps" type="index" width="80" label="序号"></el-table-column>
      <!-- 列表字段列 -->
      <el-table-column v-for="(column, index) in columns" :type="column.type" :index="index" :prop="column.prop"
                       :label="column.label" :width="column.width" :fixed="column.fixed" :sortable="column.sortable"
                       :class-name="column.className" :label-class-name="column.labelClassName"
                       :min-width="column.minWidth" :show-overflow-tooltip="column.overTip?column.overTip:true" :align="column.align?column.align:'left'" :key="index">
        <template  v-slot="scope">
          <!-- 插槽 -->
          <slot v-if="column.slot" :name="column.slot" :scope="scope.row" :index="scope.$index"></slot>
          <!-- 显示文字 -->
          <span v-else>{{ scope.row[column.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="value.isPage" class="public-pagination">
      <pagination :total="value.total" :page.sync="value.pageNum" :layout="value.layout" :pagerCount="value.pagerCount"
                  :page-sizes="value.pageOpt" :limit.sync="value.pageSize" @pagination="value.getList()"/>
    </div>
  </div>
</template>

<script>
const baseParams = () => {
  return {
    // el-table vue实例，父元素容器 elementDiv
    $ref: null,
    $queryForm: null,//queryForm表格搜索元素容器
    // $container: null,
    // 选中，行，列，单元格，event
    // selection: [],
    row: {},
    column: {},
    cell: {},
    event: {},
    // 数据，列配置，偏移量，loading，排序，高度
    data: [],
    columns: [],
    isFixed: false, // 固定selection
    offset: 0,
    loading: false,
    order: 'ascending',
    sort: '',
    height: 0, // :height="value.height" 取消高度
    maxHeight: 250, // Table 的最大高度。合法的值为数字或者单位为 px 的高度。
    // 分页
    isPage: true,
    pageNum: 1,
    pageSize: 15,
    total: 0,
    pageOpt: [15, 30, 50, 100],
    // 合计
    isSummary: false,
    sumText: '合计',
    // 方法
    resize() {
      // 含有搜索queryForm
      if (this.$queryForm && this.$queryForm.queryForm) {
        this.height = document.documentElement.scrollHeight - this.$queryForm.queryForm.$el.offsetHeight - 80 - 40 - 20 - 30;
      }

      if (!this.$queryForm && this.$container) {
        // console.log('表格resize',this.$container.clientHeight)
        let height = this.$container.clientHeight;
        if (height && height > 0) {
          this.height = height - (this.isPage ? 30 : 0) - this.offset;
          //   this.height = height - (this.isPage ? 60 : 0) - this.offset;
        }
      }
      if (this.$ref) {
        this.$ref.doLayout();
      }
    },

    // async getList() {
    //   this.loading = true;
    //
    //   let params = {
    //     pageNum: this.pageNum,
    //     pageSize: this.pageSize,
    //     order: this.order,
    //     sort: this.sort
    //   };
    //   // console.log('params',params);
    //   let data = await this.api(params);
    //   this.data = data.data?data.data:data.rows; //表格数据
    //   this.total = data.total;
    //   this.loading = false;
    // }
    getList() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        order: this.order,
        sort: this.sort
      };
      this.api(params);
    }
  };
};
import Pagination from "@/components/pagination";

export default {
  name: 'public-table',
  props: {
    value: Object
  },
  components: {Pagination},
  data() {
    return {
      currentPage1: 1,
      Height: 250,
      loading: false,
    };
  },
  computed: {
    columns() {
      return this.value.columns.filter(v => {
        return v.show == undefined ? true : v.show;
      });
    },

  },
  watch: {
    value: 'initTabel',
    'value.data'() {
      this.$nextTick(() => {
        // this.resize();
      });
    },
    columns() {
      this.$nextTick(() => {
        // this.resize();
      });
    }
  },
  mounted() {
    this.initTabel();
    // window.addEventListener('resize', this.resize);
    // console.log(this.value);
    // this.toggleSelection()
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.resize);
  },
  methods: {
    // // 自适应
    initTabel() {
      let table = baseParams();
      table.$ref = this.$refs.table;//表格
      table.$container = this.$refs.container;
      Object.keys(table).forEach(key => {
        if (this.value[key] == undefined) {
          this.$set(this.value, key, table[key]);
        }
      });
      // table.getList();
      // this.resize();
    },
    resize() {
      this.value.resize();
    },
    sortChange({prop, order}) {
      if (order == 'null') this.value.order = '';
      // if (order == 'ascending') this.value.order = 'asc';
      // if (order == 'descending') this.value.order = 'desc';
      this.value.order = order
      this.value.sort = prop;
      this.value.getList();
    },
    emit(name, params, keys) {
      keys.split(',').forEach((v, i) => (this.value[v] = params[i]));
      this.$emit(name, ...params);
    }
  },
  filters: {},
  created() {
  }
};
</script>

<style lang="scss" scoped>
.wh100 {
  width: 100%;
  height: 100%;
}

.green {
  color: #00896c;
}

.green-block {
  color: #00896c;
  background: #cce7e1;
}

.blue-block {
  color: #279cc1;
  background: #d3ebf3;
}

.yellow-block {
  color: #db962e;
  background: #fcf4e9;
}

.red-block {
  color: #db462e;
  background: #fcece9;
}
</style>
