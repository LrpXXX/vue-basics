<template>
  <el-dialog :title="dialogInfo.title"
             :visible.sync="dialogInfo.visible"
             width="600px"
             style="z-index: 1000;">
    <el-row :gutter="15">
      <el-form :model="processForm"
               :rules="processRules"
               :getter="15"
               ref="processForm"
               label-width="110px">
        <el-col :span="24">
          <el-form-item label="流程名称："
                        prop="kpName">
            <el-input v-model.trim="processForm.kpName"
                      placeholder="请输入流程名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="流程描述："
                        prop="kpDesc">
            <el-input type="textarea"
                      v-model.trim="processForm.kpDesc"
                      placeholder="请输入流程描述"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <span slot="footer"
          class="dialog-footer">
      <el-button type="primary"
                 @click="submitForm('processForm')"
                 :loading="btnloading"
                 icon="el-icon-edit">保 存</el-button>
      <el-button @click="dialogInfo.visible = false"
                 icon="el-icon-refresh-left">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>

import { processAdd, processUpdate } from "@/service/api/dataProcess/process.js";
export default {
  data () {
    return {//这里可以初始化值，但是禁止引用函数
      orgArr: [], //机构数组
      choooseGroup: null,
      processForm: {
        kpDesc: '',
        kpName: ''
      },//弹窗表单对象
      btnloading: false,//点击保存的遮罩层
      processRules: {
        kpName: [
          { required: true, message: '请填写角色名称', trigger: 'blur' },
          { min: 1, max: 49, message: "长度不能超过50", trigger: "change" }
        ],
        kpDesc: [
          { min: 1, max: 199, message: "长度不能超过200", trigger: "change" }
        ],
      },//弹出框表单验证规则
    };
  },
  props: {
    dialogInfo: {
      type: Object,
      default: () => { }
    },
    processInfo: {
      type: Object,
      default: () => { }
    }
  },
  created () {
    if (this.dialogInfo.type == 'edit') {
      this.processForm.kpDesc = this.processInfo.kpDesc;
      this.processForm.kpName = this.processInfo.kpName;
    }
  },
  mounted () {
  },
  methods: {
    submitForm (formName) {
      this.btnloading = true;//是否允许编辑
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogInfo.type == 'add') {
            processAdd(this.processForm, res => {
              this.btnloading = false;
              if (res.code == 200 && res.success) {
                this.$message.success("新增成功！", 5);
                this.dialogInfo.visible = false;
                this.$parent.getList();
              }
            });
          } else if (this.dialogInfo.type == 'edit') {
            let editInfo = {
              id: this.processInfo.id,
              kpName: this.processForm.kpName,
              kpDesc: this.processForm.kpDesc,
              version: this.processInfo.version
            }
            processUpdate(editInfo, res => {
              this.btnloading = false;
              if (res.code == 200 && res.success) {
                this.$message.success("修改成功！", 5);
                this.dialogInfo.visible = false;
                this.$parent.getList();
              }
            })
          }
        } else {
          this.$message.error("请先正确填写表单内容。", 3);
          return false;
        }
      });
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
