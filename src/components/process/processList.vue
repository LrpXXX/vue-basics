<template>
  <div class="process-list-box"
       @click="typeShow = false">
    <div>
      <div class="process-item">
        <div class="process-item-cont">
          <div class="process-title">开始</div>
          <div class="process-cont">开始</div>
        </div>
        <div class="process-next">
          <div class="process-line"></div>
          <div class="process-add el-icon-circle-plus"
               @click.stop="handleAddItem($event,-1)">
          </div>
          <div class="process-line"></div>
        </div>
      </div>
      <draggable class="sort-group"
                 v-bind="dragOptions"
                 v-model="processListData"
                 :disabled="draggableDisabled"
                 @end="dragend">
        <div class="process-item"
             v-for="(item,index) in processListData"
             :key="index"
             :class="[item.componentType == '同步组件'?'sync-box':item.componentType == '命令组件'? 'order-box':' ',activeIndex== index?'active-item':'']">
          <div class="process-item-cont"
               @click="handleFocusItem(index,item)"
               :ref="'cont'+index">
            <div class="editicon-box"
                 v-if="item.componentType != 'start'">
              <span class="el-icon-delete"
                    @click.stop="handleDeleteItem(item,index)"></span>
            </div>
            <div class="process-title">{{item.componentType}}</div>
            <div class="process-cont">{{item.componentContent.name}}</div>
          </div>
          <div class="process-next"
               v-if="item.componentType != 'end'">
            <div class="process-line"></div>
            <div class="process-add el-icon-circle-plus"
                 @click.stop="handleAddItem($event,index)">
            </div>
            <div class="process-line"></div>
          </div>
        </div>
      </draggable>
      <div class="process-item"
           v-if="isEnd">
        <div class="process-item-cont">
          <div class="process-title">结束</div>
          <div class="process-cont">结束</div>
        </div>
      </div>
    </div>
    <processTypeList v-if="typeShow"
                     :isShowEnd="isShowEnd"
                     :style="'left:'+typeItemPosition.posX+'px;top:'+typeItemPosition.posY+'px;'"
                     @typeClick="handleTypeClick" />
  </div>

</template>
<script>
import processTypeList from './processTypeList.vue'
import draggable from 'vuedraggable'
export default {
  name: 'processList',
  components: { processTypeList, draggable },
  props: {
    processListData: {
      type: Array,
      default: () => { }
    },
    deviseInfo: {
      type: Object,
      default: () => { }
    },
    currentIndex: {
      type: Number,
      Object: null
    },
    isSaveCurent: {
      type: Boolean,
      Object: false
    }
  },
  data () {
    return {
      // 保存新增时类型的位置
      typeItemPosition: {
        posX: 0,
        posY: 0
      },
      activeIndex: null,
      curentTypeData: {},//当前新增对象类型
      addIndex: 0,
      typeShow: false,
      isEnd: false,
      isShowEnd: true
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
  },
  created () {
    if (this.processListData.length != 0) {
      this.activeIndex = this.currentIndex;
      this.isEnd = true
    }
  },
  mounted () {
  },
  methods: {
    dragend (value) {
      this.$emit('dragChange', this.processListData)
    },
    // 点击新增图标
    handleAddItem (e, index) {
      let scrollTop = this.$parent.$refs.processbox.scrollTop;//出现滚动条时滚动的位置 this.$parent.$parent.$refs.processbox.scrollTop
      if (this.processListData.length == 0 || !index) {
        this.isShowEnd = false
      }
      if (this.processListData.length > (index + 1)) {
        this.isShowEnd = false
      }
      if (this.processListData.length == (index + 1) && index != -1 && !this.isEnd) {
        this.isShowEnd = true
      }
      this.addIndex = index + 1;
      this.typeItemPosition.posX = 440;
      this.typeItemPosition.posY = e.clientY + scrollTop - 314;
      this.typeShow = true;
    },
    // 获取焦点事件
    handleFocusItem (index, value) {
      this.activeIndex = index;
      this.$parent.$refs.syncForm ? this.$parent.$refs.syncForm.resetFields() : '';
      this.$parent.$refs.orderForm ? this.$parent.$refs.orderForm.resetFields() : '';
      this.$emit('changeItem', value, index);
    },
    // 点击删除图标
    handleDeleteItem (value, index) {
      // 判断删除的item是否是新增的值，若是将this.curentTypeData设置为空
      if (JSON.stringify(this.curentTypeData) === JSON.stringify(value)) { this.curentTypeData = {} }
      if (this.activeIndex == index && index != 0) {
        this.handleFocusItem(index - 1, this.processListData[index - 1])
      }
      if (this.activeIndex == index && index == 0 && this.processListData.length > 1) {
        this.handleFocusItem(index, this.processListData[index + 1])
      }
      if (this.activeIndex == index && index == 0 && this.processListData.length == 1) {
        this.handleFocusItem(null, null)
      }
      if (this.typeShow) this.typeShow = false
      this.processListData.splice(index, 1)
      this.$emit('deleteItem', value)
    },
    // 点击typeItem事件
    handleTypeClick (value) {
      let addItem = {
        componentContent: {},//form表单属性内容，json值
        componentOrder: null,//组件顺序
        componentType: value.name,//组件类型
        processId: this.deviseInfo.id,
        componentId: value.type == 'order' ? '71451d6d68694688b6476c3ba9467698' : value.type == 'sync' ? '702ca5b554e44f96bb483824d9d7be75' : ''

      };
      let formOrderData = {
        // id: '71451d6d68694688b6476c3ba9467698',
        dbId: '',
        truncateSql: '',
        name: '命令组件',
        remarks: ''
      }
      let formSyncData = {
        // id: '702ca5b554e44f96bb483824d9d7be75',
        name: '同步组件',
        processId: this.deviseInfo.id,
        sourceDbId: '',
        sourceTableName: '',
        sourceSql: '',
        targetDbId: '',
        targetTableName: '',
        truncateTable: false,
        truncateSql: '',
        remarks: ''
      }
      value.type == 'order' ? addItem.componentContent = formOrderData : value.type == 'sync' ? addItem.componentContent = formSyncData : '';


      // 判断当前组件的必须属性是否已填
      if (this.curentTypeData.componentType == '命令组件') {
        let iscontinue = this.$parent.$refs.orderForm.validate(valid => {
          if (!valid) {
            this.$message.warning("请填写当前组件的必填项！", 5);
          } else {
            if (!this.isSaveCurent) {
              this.$message.warning("请先保存当前组件属性值！", 5);
              return
            }
            this.curentTypeData = addItem;
            this.processListData.splice(this.addIndex, 0, addItem)
            this.processListData.forEach((el, index) => {
              el.componentOrder = index + 1
            })
            this.handleFocusItem(this.addIndex, this.processListData[this.addIndex]);
            this.$parent._data.isSaveCurent = false;
            // this.isSaveCurent = false;
          }
        })
      } else if (this.curentTypeData.componentType == '同步组件') {
        this.$parent.$refs.syncForm.validate(valid => {
          if (valid) {
            if (!this.isSaveCurent) {
              this.$message.warning("请先保存当前组件属性值！", 5);
              return
            }
            this.curentTypeData = addItem;
            this.processListData.splice(this.addIndex, 0, addItem)
            this.processListData.forEach((el, index) => {
              el.componentOrder = index + 1
            })
            this.handleFocusItem(this.addIndex, this.processListData[this.addIndex]);
            this.$parent._data.isSaveCurent = false;
          } else {
            this.$message.warning("请填写当前组件的必填项！", 5);
          }
        })
      } else {
        this.curentTypeData = addItem;
        this.processListData.splice(this.addIndex, 0, addItem)
        this.processListData.forEach((el, index) => {
          el.componentOrder = index + 1
        })
        this.handleFocusItem(this.addIndex, this.processListData[this.addIndex])
      }
      if (value.type == 'end') {
        this.isEnd = true;
        return
      }
      // let addItem = {
      //   componentContent: {},//form表单属性内容，json值
      //   // componentContentId: null,//组件id
      //   componentOrder: null,//组件顺序
      //   componentType: value.name,//组件类型
      //   processId: this.deviseInfo.id
      // };
      // let formOrderData = {
      //   dbId: '',
      //   truncateSql: '',
      //   name: '命令组件'
      // }
      // let formSyncData = {
      //   name: '同步组件',
      //   processId: this.deviseInfo.id,
      //   sourceDbId: '',
      //   sourceTableName: '',
      //   sourceSql: '',
      //   targetDbId: '',
      //   targetTableName: '',
      //   truncateTable: false,
      //   truncateSql: ''
      // }
      // value.type == 'order' ? addItem.componentContent = formOrderData : value.type == 'sync' ? addItem.componentContent = formSyncData : '';
      // this.curentTypeData = addItem;
      // this.processListData.splice(this.addIndex, 0, addItem)
      // this.processListData.forEach((el, index) => {
      //   el.orderBy = index + 1
      // })
      // this.handleFocusItem(this.addIndex, this.processListData[this.addIndex])
    }
  }
}
</script>
<style lang="scss" scoped>
.process-list-box {
  // width: 1180px;
  width: 800px;
  min-height: 600px;
  display: flex;
  justify-content: center;
  position: relative;
}
.process-item {
  width: 220px;
  // height: 80px;
  border-radius: 4px;
  .process-item-cont {
    position: relative;
    // padding-top: 24px;
    .editicon-box {
      width: 100%;
      text-align: right;
      position: absolute;
      top: -22px;
      right: 0;
      span {
        display: none;
        padding: 4px;
      }
    }
    cursor: pointer;
    &:hover {
      .process-cont {
        border-color: #2c3e50;
      }
      .editicon-box {
        span {
          display: block;
        }
      }
    }
  }
  .process-next {
    text-align: center;
    position: relative;
  }
  .process-line {
    height: 30px;
    width: 2px;
    background-color: rgb(138, 194, 73);
    margin: 6px auto 16px;
    position: relative;
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -22px;
      left: -7px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 12px solid transparent;
      border-top: 10px solid rgb(138, 194, 73);
    }
  }
  .process-add {
    font-size: 28px;
    cursor: pointer;
    color: #2c92fb;
    position: relative;
  }
  .process-title {
    height: 30px;
    background-color: #2c3e50;
    color: #fff;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding-left: 20px;
    line-height: 30px;
  }
  .process-cont {
    border: 1px solid #ddd;
    height: 50px;
    border-top: 0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding-left: 20px;
    line-height: 50px;
  }
}
.sync-box {
  .process-title {
    background-color: #1296db;
  }
  .process-item-cont {
    &:hover {
      .process-cont {
        border-color: #1296db;
      }
    }
  }
}
.order-box {
  .process-title {
    background-color: #fe873d;
  }
  .process-item-cont {
    &:hover {
      .process-cont {
        border-color: #fe873d;
      }
    }
  }
}
.active-item.sync-box {
  .process-item-cont .process-cont {
    border-color: #1296db;
  }
}
.active-item.order-box {
  .process-item-cont .process-cont {
    border-color: #fe873d;
  }
}
</style>