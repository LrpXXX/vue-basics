<template>
  <div>
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="40%"    :close-on-click-modal="false">

    <el-form
          :model="dialogForm"
          :rules="dialogRules"
          ref="dialogForm"
          :label-width="dialog.labelwidth"
        >
          <el-form-item label="邮箱" prop="eamil">
            <el-input v-model="dialogForm.eamil" :disabled="dialog.disabled"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="validation" >
            <el-input v-model="dialogForm.validation" :disabled="dialog.disabled" maxlength="240px" />
            <el-button type="primary" @click="getValidation">获取验证码</el-button>
          </el-form-item>
        </el-form>

       <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible('dialogForm')">取 消</el-button>
        <el-button @click="submitForm('dialogForm')"
          type="primary"
          v-if="dialog.type!='see'"
          :loading="dialog.btnloading"
        >立即验证</el-button>
      </div>
   </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'forgetEdit',
  data () {
    return {
      dialogRules: {
        eamil: [
          { required: true, message: '需要填写邮箱', trigger: 'blur' }
        ],
        validation: [
          { required: true, message: '需要获取验证码', trigger: 'blur' }
        ]
      }, // 弹出框表单验证规则
      dialog: this.dialogObj,
      dialogForm: {
        isstate: true
      }
    }
  },
  props: {
    dialogObj: {}
  },
  methods: {
    submitForm (formName) {
      console.log(this.$refs[formName].validate)
      this.$refs[formName].validate((res) => {
        if (res) {
          let obj = {
            eamil: this.$refs[formName].eamil,
            validate: this.$refs[formName].validation
          }
          console.log(obj)
        }
      })
    },
    dialogVisible (formName) {
      console.log(formName)
      this.dialog.visible = false
      // 移除表单校验
      this.$refs[formName].clearValidate()
    },
    getValidation () {
      console.log('你需要去调接口拿到数据呀')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input{
  width: 80%;
}
</style>
