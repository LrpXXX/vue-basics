<template>
  <div>
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="30%"   :close-on-click-modal="false">
          <span>
    <el-form
          :model="dialogForm"
          :rules="dialogRules"
          ref="dialogForm"
          :label-width="dialog.labelwidth"
        >
          <el-form-item label="登录账号：" prop="loginUser">
            <el-input v-model="dialogForm.loginUser" :disabled="dialog.disabled"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="userName" >
            <el-input v-model="dialogForm.userName" :disabled="dialog.disabled"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="dialogForm.password" :disabled="dialog.disabled"></el-input>
          </el-form-item>
          <el-form-item label="账号状态：">
            <el-radio-group v-model="dialogForm.isstate" style="text-align:left">
              <el-radio :label="true">启 用</el-radio>
              <el-radio :label="false">停 用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="部门：" prop="institution" 
             v-if="dialog.type=='add' || dialog.type=='update'|| dialog.type=='see'">
              <el-select @remove-tag="removeTag" style="width: 100%;" v-model="dialogForm.institution" value-key="institutionsid" placeholder="请选择" multiple :disabled="dialog.disabled">
              <el-option :value="institution" style="height: auto">
                <el-tree
                :data="treeDate"
                :default-checked-keys="institutionsid"
                default-expand-all show-checkbox :check-strictly="true" node-key="institutionsid" ref="tree"
                highlight-current :props="defaultProps" @check-change="handleCheckRepert"></el-tree>
              </el-option>
              </el-select>
          </el-form-item>
        </el-form>
      </span>
       <div slot="footer" class="dialog-footer" style="text-align:right">
        <el-button @click="dialogVisible('dialogForm')">取 消</el-button>
        <el-button @click="submitForm('dialogForm')"
          type="primary"          
          v-if="dialog.type!='see'"
          :loading="dialog.btnloading"
        >保 存</el-button>
      </div>
   </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'registedit',
  data(){
    return{
      dialogRules: {
        loginUser: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
        ],
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
         password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        institution: [
          { required: true, message: '请选择部门',  trigger: 'blur'  }
        ],
      }, //弹出框表单验证规则
      dialog:this.dialogObj,
      dialogForm:{
        isstate:true,
      },
      };
    },
  props:{
    dialogObj:{},
  },
  methods:{
    dialogVisible(formName){
      this.dialog.visible = false
      this.$refs[formName].clearValidate()
    },
  }
}
</script>

<style>

</style>