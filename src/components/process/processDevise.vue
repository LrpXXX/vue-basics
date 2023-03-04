<template>
  <div class="process-box">
    <div class="process-top-box">
      <span>流程设计</span>
      <el-button @click="handleSaveDevise"
                 class="devise-save"
                 type="primary">保存流程</el-button>
    </div>
    <div class="contant process-contant">
      <div class="process-operate"
           ref="processbox">
        <processList @changeItem="handleChangeItem"
                     @deleteItem="handleDeleteItem"
                     @dragChange="handleDragChange"
                     :processListData="processListData"
                     :deviseInfo="deviseInfo"
                     :currentIndex="curItemIndex"
                     :isSaveCurent="isSaveCurent" />
      </div>
      <div class="process-attribute">
        <el-form :model="formSyncData"
                 label-width="120px"
                 :rules="syncRules"
                 ref="syncForm"
                 v-if="isShowType == 'sync'">
          <el-form-item label="组件名称"
                        prop="name">
            <el-input v-model="formSyncData.name"
                      placeholder="请输入组件名称"></el-input>
          </el-form-item>
          <el-form-item label="来源库(模式)"
                        prop="sourceDbId">
            <el-select v-model="formSyncData.sourceDbId"
                       placeholder="请选择来源库"
                       @change="handleChangeSourceDB($event,true)">
              <el-option v-for="(item,index) in dbtypeArr"
                         :key="index"
                         :value="item.id"
                         :label="item.dbNameZn + ((item.dbSchema!=null&&item.dbSchema!='')?'('+ item.dbSchema + ')':'') "></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来源表(模式)"
                        prop="sourceTableName">
            <el-select v-model="formSyncData.sourceTableName"
                       placeholder="请选择来源表">
              <el-option v-for="(item,index) in sourcedbTables"
                         :key="index"
                         :value="item.tableName"
                         :label="item.tableName + ((item.tableSchema!=null && item.tableSchema != '')? '('+item.tableSchema+')':'')"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来源SQL"
                        prop="sourceSql">
            <el-input type="textarea"
                      :rows="5"
                      v-model="formSyncData.sourceSql"
                      placeholder="SELECT * FROM table"></el-input>
          </el-form-item>
          <el-form-item label="目标库"
                        prop="targetDbId">
            <el-select v-model="formSyncData.targetDbId"
                       placeholder="请选择目标库"
                       @change="handleChangeSourceDB($event,false)">
              <el-option v-for="(item,index) in dbtypeArr"
                         :key="index"
                         :value="item.id"
                         :label="item.dbNameZn + ((item.dbSchema!=null&&item.dbSchema!='')?'('+ item.dbSchema + ')':'') "></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="目标表"
                        prop="targetTableName">
            <el-select v-model="formSyncData.targetTableName"
                       placeholder="请选择目标表">
              <el-option v-for="(item,index) in targetdbTables"
                         :key="index"
                         :value="item.tableName"
                         :label="item.tableName + ((item.tableSchema!=null && item.tableSchema != '')? '('+item.tableSchema+')':'')"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否裁剪">
            <el-checkbox v-model="formSyncData.truncateTable"
                         @change="(e)=>{
                if(e && this.formSyncData.truncateSql == ''){
                  this.formSyncData.truncateSql = 'TRUNCATE TABLE '+this.formSyncData.targetTableName;
                }else{
                  this.formSyncData.truncateSql = '';
                }
              }">裁剪目标表</el-checkbox>
          </el-form-item>
          <el-form-item label="裁剪SQL"
                        v-show="formSyncData.truncateTable">
            <el-input type="textarea"
                      :rows="4"
                      v-model="formSyncData.truncateSql"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea"
                      :rows="4"
                      v-model="formSyncData.remarks"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="formOrderData"
                 :rules="orderRules"
                 ref="orderForm"
                 label-width="90px"
                 v-if="isShowType == 'order'">
          <el-form-item label="组件名称"
                        prop="name">
            <el-input v-model="formOrderData.name"
                      placeholder="请输入组件名称"></el-input>
          </el-form-item>
          <el-form-item label="数据源"
                        prop="dbId">
            <el-select v-model="formOrderData.dbId"
                       placeholder="请选择数据源">
              <el-option v-for="(item,index) in dbtypeArr"
                         :key="index"
                         :value="item.id"
                         :label="item.dbNameZn + ((item.dbSchema!=null&&item.dbSchema!='')?'('+ item.dbSchema + ')':'') "></el-option>
            </el-select>

          </el-form-item>
          <el-form-item label="数据SQL"
                        prop="sql">
            <el-input v-model="formOrderData.sql"
                      type="textarea"
                      :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea"
                      :rows="4"
                      v-model="formOrderData.remarks"></el-input>
          </el-form-item>
        </el-form>
        <div class="formbtn-box"
             v-if="isShowType">
          <el-button @click="handleSetFormData"
                     type="primary"
                     :loading="saveLoading">保存组件</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import processTypeList from '@/components/process/processTypeList'
import processList from '@/components/process/processList'

import { getList, getDbTables } from "@/service/api/configureManage/dbSource";
import { processAdd, processUpdate } from "@/service/api/dataProcess/process.js";
export default {
  name: 'processDevise',
  components: { processTypeList, processList },
  data () {
    return {
      saveLoading: false,
      isSaveCurent: false,
      breadData: ["系统管理", this.$route.name],
      curItemIndex: null,//选中流程item的下标
      typeShow: false,
      formOrderData: {
        dbId: '',
        truncateSql: '',
        name: '',
        remarks: ''
      },
      formSyncData: {
        name: '',
        sourceDbId: '',
        sourceTableName: '',
        sourceSql: '',
        targetDbId: '',
        targetTableName: '',
        truncateTable: false,
        truncateSql: '',
        remarks: ''
      },
      isShowType: '',//判断显示属性
      attributeData: {},//保存属性值的数据
      processListData: [],//保存流程图数据
      currentTypeItem: {}, //保存当前选中组件的值
      currentTypeIndex: null,//保存当前选中的下标
      dbtypeArr: [],//保存数据库信息
      sourcedbTables: [],//保存来源表信息
      targetdbTables: [],//保存目标表中信息
      syncRules: { //同步组件表单验证required: true, message: '请输入活动名称', trigger: 'blur'
        name: [{ required: true, message: '请输入组件名称', trigger: 'blur' }],
        sourceDbId: [{ required: true, message: '请选择来源库', trigger: 'change' },],//
        sourceTableName: [{ required: true, message: '请选择来源表', trigger: 'change' }],
        targetDbId: [{ required: true, message: '请选择数据库类型', trigger: 'change' }],
        targetTableName: [{ required: true, message: '请选择数据库类型', trigger: 'change' }],
        sourceSql: [{ required: true, message: '请输入来源SQL', trigger: 'change' }]
      },
      orderRules: {
        name: [{ required: true, message: '请输入组件名称', trigger: 'blur' }],
        sql: [{ required: true, message: '请输入SQL', trigger: 'blur' }],
        dbId: [{ required: true, message: '请选择数据源', trigger: 'change' }],
      },
      key: 0
    }
  },
  props: {
    deviseInfo: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    // formOrderData: {
    //   handler: function (value) {
    //     this.processListData[this.currentTypeIndex].componentContent = JSON.parse(JSON.stringify(value))
    //     // this.currentTypeItem.componentContent = value
    //   },
    //   deep: true
    // },
    // formSyncData: {
    //   handler: function (value) {
    //     this.processListData[this.currentTypeIndex].componentContent = JSON.parse(JSON.stringify(value))
    //     // this.currentTypeItem.componentContent = value
    //   },
    //   deep: true
    // }
  },
  created () {
    this.initData();
    if (this.deviseInfo.ktProcessInfoList.length != 0) {
      this.deviseInfo.ktProcessInfoList.forEach(el => {
        if (typeof el.componentContent == 'string') {
          el.componentContent = JSON.parse(el.componentContent)
        }
      })
      this.processListData = this.deviseInfo.ktProcessInfoList;
      this.handleChangeItem(this.deviseInfo.ktProcessInfoList[0], 0)
      this.curItemIndex = 0

    }
  },
  methods: {
    // 初始化
    initData () {
      // 获取数据库信息
      getList({}, res => {
        if (res.code == 200 && res.success) {
          this.dbtypeArr = res.data;
        }
      })
    },
    // 切换来源库选择信息，获取来源表或者目标表下拉列表信息
    handleChangeSourceDB (id, isSource) {
      this.$set(this.formSyncData, 'sourceDbId', id)
      getDbTables({ id }, res => {
        if (res.code == 200 && res.success) {
          if (isSource) {//切换来源库获取来源表信息
            this.sourcedbTables = res.data
          } else {
            this.targetdbTables = res.data
          }
        }
      })
    },
    // 点击item,切换对应的属性
    handleChangeItem (value, index) {
      this.currentTypeIndex = index
      this.currentTypeItem = JSON.parse(JSON.stringify(value))
      if (!value) {
        this.isShowType = ''
        return
      }
      if (value.componentType == '命令组件') {
        this.isShowType = 'order';
        this.formOrderData = JSON.parse(JSON.stringify(value.componentContent));
      } else if (value.componentType == '同步组件') {
        this.isShowType = 'sync';
        this.formSyncData = JSON.parse(JSON.stringify(value.componentContent));
      }
    },
    // 删除item
    handleDeleteItem (value) {

    },
    // 点击属性中保存按钮
    handleSetFormData () {
      this.saveLoading = true
      this.isSaveCurent = true
      // 命令组件的属性保存
      if (this.isShowType == 'order') {
        this.$refs.orderForm.validate(valid => {
          // 判断表单验证是否通过
          if (valid) {
            this.processListData[this.currentTypeIndex].componentContent = JSON.parse(JSON.stringify(this.formOrderData))
          }
        })
        // this.currentTypeItem.formOrderData = this.formOrderData
      } else if (this.isShowType == 'sync') {  //同步组件属性保存

        this.$refs.syncForm.validate(valid => {
          // 验证表单
          if (valid) {
            this.processListData[this.currentTypeIndex].componentContent = JSON.parse(JSON.stringify(this.formSyncData))
          }
        })
        // this.currentTypeItem.formSyncData = this.formSyncData
      }
      this.$message.success("组件信息保存成功！", 5);
      this.saveLoading = false
    },
    // 拖动顺序改变后数据改变
    handleDragChange (value) {
      this.processListData = value;
    },
    // 点击保存事件
    handleSaveDevise () {
      this.processListData.forEach((el, index) => {
        el.componentOrder = index + 1
        el.componentContent = JSON.stringify(el.componentContent);
      })
      let processData = JSON.parse(JSON.stringify(this.deviseInfo));
      processData.ktProcessInfoList = this.processListData
      processUpdate(processData, res => {
        if (res.code == 200 && res.success) {
          this.$message.success("保存成功！", 5);
          this.$parent._data.isDevise = false;
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.process-box {
  height: 100%;
  padding: 1%;
  margin: 1% 2%;
}
.process-top-box {
  background-color: #fff;
  margin-bottom: 14px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
}
.devise-save {
  // float: right;
}
.process-contant {
  // height: calc(100% - 50px);
  // padding: 20px;
  display: flex;
}
.process-operate {
  background-color: #fff;
  height: 100%;
  width: calc(100% - 420px);
  margin-right: 20px;
  // display: flex;
  // justify-content: center;
  padding: 40px 0 30px;
  overflow: auto;
  max-height: 680px;
}
.process-attribute {
  background-color: #fff;
  // height: 100%;
  width: 400px;
  padding: 20px 15px;
  .el-select {
    width: 100%;
  }
}
.formbtn-box {
  text-align: center;
  margin-top: 40px;
}
::v-deep .el-dialog__body {
  background-color: #fafafa;
  padding: 0;
}
</style>
