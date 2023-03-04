## #表格组件使用说明
### 	一、整体说明

​		该组件是将表格与分页封装在一起，并让表格高度根据父盒子高度来实现高度自适应。

- 表格列的内容默认显示字段对应的文字字符串,也可以用插槽来自定义列对应的内容，表格保留el-table的属性功能，可以参考。

  [elementUI官网：]: https://element.eleme.cn/#/zh-CN/component/table	"表格组件"

  

- 分页是将el-pagination二次封装后再封入公共表格组件里，默认情况下分页显示，可以控制是否使用组件分页。el-pagination在官网上有的基本功能基本都保留，可以参考

  [elementUI官网]: https://element.eleme.cn/#/zh-CN/component/pagination	"分页组件"

  。

  ```html
  注：1、该组件只考虑基本功能的统一封装，如果需要需改组件的一些功能样式可以进行相应修改。
  2、使用时表格组件父盒子必须要有高度，因为需要计算表格高度。表格高度默认情况下是根据父盒子高度来计算，也可以在配置对象写一个固定值。
  ```

  ### 二、使用说明

  #### 1、配置文件，table.js

  ```javascript
  //SELF-参数是列表所在页面实列对象，相当于页面中的this
  export const tableConfing = (SELF) => {
    return {
      $queryForm:SELF.$refs, //queryForm表格搜索元素容器，搜索外层盒子ref="queryForm"
      title: '表格',//此字段只起到标识作用，在组件内不应用
      height: '730px', //表格高度（不必填）
      api: SELF.getList, //列表数据获取方法（必填）
      expandAll: false, //是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效（不必填,默认false）
      treeProps: {children: 'children', hasChildren: 'hasChildren'}, //渲染嵌套数据的配置选项(Object,不必填)
      isPage:true,//是否含有分页，不必填
      isSelection:false,//是否显示多选复选框（不必填）
      isfixed: true, //复选框列是否固定在左侧或者右侧，true 表示固定在左侧,可选值true、left、right（不必填）
      columns: [ //（必填）
         //表格列配项 lable——显示的标题,prop——对应列内容的字段名,width——对应列的宽度
         //min-width——对应列的最小宽度，sortable——对应列是否可以排序,align——对齐方式
        { label: '编号', prop: 'sn', minWidth:90},
        { label: '名称', prop: 'name',width: 120, },
        { label: '类型', prop: 'type',minWidth:110,sortable:'custom' },
        { label: '排序', prop: 'sort'},
        { label: '操作', prop: 'option',handle:SELF.look,solt:'option' },  
      ],
      data: [//表格数据，这里可以加默认值
        {sn:'1',id:'0',name:'某某',type:1,sort:3}
      ],
      pageNum: 1,//当前页码（不必填）
      pageSize: 13,//每页显示个数（不必填）
      pageOpt: [13, 30, 50,100],//每页显示个数选择器的选项设置（不必填）
      total: 0,//总条目数（必填）
      layout:'total, sizes, prev, pager, next, jumper',//组件布局，子组件名用逗号分隔，这是默认值(不必填)
    };
  };
  ```

  #### 2、页面使用

  ```vue
  <template>
    <div class="app-container">
      <div class="head">表格组件使用示例</div>
      <div class="w100 h100">
          <!-- 搜索框的最外层盒子必须要有ref="queryForm" -->
          <el-row class="page-search"  ref="queryForm">
              <el-col class="search-box">
                  <el-form ref="searchForm" :model="queryParams" label-width="100px" @submit.native.prevent>
                      <el-form-item label="名称">
                          <el-input v-model="queryParams.name" placeholder="请输入名称" clearable @keyup.enter.native="listQuery()"></el-input>
                      </el-form-item>
                  </el-form>
                  <el-button class="searchBtn" type="primary" @click="listQuery()" size="small" icon="el-icon-search">查询</el-button>
              </el-col>
          </el-row>
          <!-- 表格组件 -->
          <public-table class="table-block" ref="table" v-model="table" @row-click="rowClick" @selection-change="handleSelectionChange">
              <!-- 自定义复选插槽 -->
            <template #selection>
              <el-table-column slot="selection" align="center" :selectable="selectable" type="selection" width="55"></el-table-column>
            </template>
  			<!-- 自定义表格列内容插槽，插槽名称必须和表格配置项的一致，如{ label: '操作', prop: 'option',slot:'optionSlot'},  -->
            <template #optionSlot='itemProps'>
                <div style="width:100%;heigth:50px;">
                  {{itemProps.scope.type==1?'修改':'编辑'}}
                  <span @click="optionFun">查看</span>
                </div>
            </template>
          </public-table>
      </div>
    </div>
  
  </template>
  
  
  
  <script>
  import PublicTable from "@/components/publictable";
  import { tableConfing } from "./table.js";
  
  export default {
    name: "example",
    components: {
      PublicTable
    },
    props: {},
    data() {
      return {
        table: tableConfing(this), //将实列对象传递给子组件
        queryParams: {
          name: ""
        },
        multipleSelection: [],
      };
    },
    created() {},
    mounted() {
      this.table.getList(); //初始化表格，获取表格数据，必须要这样调用，否则组件表格不刷新列表数据
    },
    methods: {
      listQuery(){
          this.table.getList();
      },
      getList(params) { //params是子组件放出的参数
          //params={pageNum: this.pageNum,pageSize: this.pageSize,order: this.order,sort: this.sort}
  
        let searchdata = {
          ...this.queryParams,
          ...params
        };
      //   return getFiberInfoList(searchdata).then(res => {
      //     res.data.forEach(item => {
      //       return item;
      //     })
      //     return res;
      //   });
          return {
              total: 10,
              data:[{sn:'1',id:'0',name:'某某',type:1,sort:3}]
          }
      },
      optionFun(e, a) {
        console.log("查看", e, a);
      },
      selectable(row, index) { //控制自定义复选框是否禁用
        if (row.status == '占用' || row.status == '故障') {
          return false
        } else {
          return true
        }
      },
      rowClick(val, event) {
        console.log(event);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .page-search {
    background-color: #fff;
    margin: 0 0 15px 0;
    padding: 10px 10px 0 10px;
    .search-box {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      border-bottom: 1px solid #eee;
      .searchBtn {
        height: 30px;
        margin: 5px 0 0 10px;
    }
    }
  }
  </style>
  ```
  
  