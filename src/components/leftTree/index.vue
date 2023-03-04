<template>
  <!-- 左侧树结构组件 -->
  <div class="leftDiv">
    <div class="leftTitle">{{treeTitle}}</div>
    <div class="catalogueDiv">
      <el-input :placeholder="search.placeholder"
                v-model.trim="filterText"
                size="mini"
                clearable></el-input>
      <div class="catalogue">
        <el-tree :data.sync="groupData"
                 :highlight-current="true"
                 :props="{ children: 'children'}"
                 default-expand-all
                 :expand-on-click-node="false"
                 :filter-node-method="filterNode"
                 ref="tree"
                 node-key="id"
                 :current-node-key="currentKey"
                 @setCurrentKey="setCurrentKey">
          <div class="custom-tree-node"
               slot-scope="{ data }">
            <div @click="groupItemClick(data)"
                 :title="data[search.prop]"
                 class="clable">{{ data[search.prop] }}</div>
          </div>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    treeTitle: { //树结构标题
      type: String,
      default: '树形分组'
    },
    search: { //搜索属性
      type: Object,
      default: () => {
        return {
          prop: 'name',
          placeholder: '输入分组名称'
        }
      }
    },
    groupData: { //树结构数据
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data () {
    return {
      filterText: '', //作业分组搜索
      currentKey: '', //树当前选中的id
    }
  },
  watch: {
    filterText (val) { //搜索
      this.$refs.tree.filter(val);
    }
  },
  mounted () {
  },
  methods: {
    filterNode (value, data) { //搜索树结构
      if (!value) return true;
      return data[this.search.prop].indexOf(value) !== -1;
    },
    setCurrentKey (e) { //设置当前选中的id
      e = e == null ? '' : e;
      this.$refs.tree.setCurrentKey(e);
    },
    groupItemClick (e) { //点击树结构,如果含有子节点将子节点的id取出
      let data = null;
      if (e.id) {
        if (e.children) {
          let arr = [e.id, ...this.flatten(e.children)];
          data = arr.join(',');
        } else {
          data = e.id;
        }
      } else {
        data = '';
      }
      this.$emit('groupClick', data)
    },
    //递归查找子节点
    flatten (arr) {
      var res = [];
      arr.map(item => {
        if (item.children && item.children.length > 0) {
          res.push(item.id);
          res = res.concat(this.flatten(item.children));
        } else {
          res.push(item.id);
        }
      });
      return res;
    },
  }
}
</script>

<style scoped lang="scss">
.leftDiv {
  height: 100%;
  width: 100%;
  margin: 16px 18px 0 18px;
  background-color: #fff;
  .leftTitle {
    font-size: 15px;
    color: #fff;
    background: #02a7f0;
    letter-spacing: 4px;
    text-align: center;
    padding: 10px 0;
  }
  .catalogueDiv {
    height: 94%;
    padding: 15px;
    background: #fff;
    font-size: 14px;
    .addBtn {
      margin-top: 5px;
      background: #02a7f0;
      font-size: 14px;
    }
    .catalogue {
      margin-top: 10px;
      height: 92%;
      overflow: auto;
      .custom-tree-node {
        display: flex;

        .clable {
          max-width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
