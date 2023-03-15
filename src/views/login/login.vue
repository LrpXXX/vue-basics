<template>
  <el-row class="loginDiv">
    <el-col :span="24" class="title-box">
     <img src="@/common/images/layout/logo.svg" alt="">
      <span>{{ this.$g.SYSTEM_CONFIG.sysName }}</span>
    </el-col>
    <!-- <el-col :span="14">
      <div class="login_banner"></div>
    </el-col> -->
    <el-col :span="24" class="loginForm">
        <el-card class="loginForm_bg">
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="0px" class="login_content">
            <!--model：表单名称    status-icon:是否显示输入框后面的状态图标  rules：验证规则    label-width：表单标签文字宽度  -->
            <div class="login_title">用户登录</div>
            <!-- 登录 -->
            <el-form-item label="" prop="userName">
              <el-input v-model="loginForm.userName" placeholder="用户名" maxlength="20" >
                <template slot="prefix"><img class="prefix" src="@/assets/images/user.png" alt="" clearable></template>
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="passWord">
              <el-input type="password" v-model="loginForm.passWord" placeholder="密码">
                <template slot="prefix"><img class="prefix" style="height: 19px;" src="@/assets/images/password.png" alt=""></template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="submitForm" @click="submitForm()" :loading="btnLoading" >登 录</el-button>
              <a @click=" registModel()" style="float: right;">忘记密码</a>
            </el-form-item>
        </el-form>
        </el-card>
    </el-col>
    <forget-edit :dialogObj="dialog"></forget-edit>
  </el-row>
</template>
<script>
import reg from '@/service/zdk/reg'
import { login } from '@/service/api/login'
let Base64 = require('js-base64').Base64
// import {getMenuList} from "@/service/api/sysmanage/menu";
export default {
  components: {
    forgetEdit: resolve => { require(['./forget.vue'], resolve) } // 懒加载
  },
  data () {
    // 复杂验证示例
    const validatePassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      registModelShow: false, // 显示登录或者注册true0

      btnLoading: false,
      loginForm: {
        userName: '',
        passWord: ''
      },
      checked: false,
      rules: {// 表单验证规则
        userName: [ // 跟定义的表单字段必须对应，
          // trigger:验证方式：blur 失去焦点时验证
          // rqueired:是否必填，如不设置，则会根据校验规则自动生成
          // { validator: validateUserName, trigger: 'blur' }
          // 下面是一般较为简单的非空验证 required+message进行设置,多种组合也可以在后累加
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // { min:5, message: '用户名请输入不少于5个字符', trigger: 'blur' },
          { pattern: /^[-a-z0-9_]+$/, message: '不允许输入空格等特殊符号' }
        ],
        passWord: [
          // validator:验证规则,较为复杂的验证时启用
          { validator: validatePassWord, trigger: 'blur' }
        ]
      },
      dialog: {
        // 弹出框设置
        visible: false, // 弹窗是否可见
        gutter: 40, // 表单间隔
        type: 'forget', // 弹窗状态，用于提交时调取不同函数
        title: '忘记密码', // 弹出框标题
        disabled: false, // 输入框是否允许编辑  false  允许
        btnloading: false, // 提交按钮加载状态
        labelwidth: '80px' // 表单文字内容宽度
      }
    }
  },
  created () {
    if (this.$t.getLocal('UN')) {
      this.loginForm.userName = this.$t.getLocal('UN')
    }
    // 键盘回车监听
    let _this = this
    document.onkeydown = function (e) {
      let key = window.event.keyCode
      if (key == 13) {
        _this.submitForm()
      }
    }
  },
  methods: {
    submitForm () {
      // this.$router.push('/selectAdmin')
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          let userInformationDTO = {}
          userInformationDTO.user = this.$rsa.rsaPublicData(this.loginForm.userName)
          userInformationDTO.pass = this.$rsa.rsaPublicData(this.loginForm.passWord)
          userInformationDTO.code = 1
          this.btnLoading = true
          login(userInformationDTO, res => {
            if (res.code == 200 && res.success) {
              this.$t.setSession('accessToken', res.data.accessToken)
              // 本地储存一份token
              this.$t.setLocal('accessToken', res.data.accessToken)
              this.$t.setSession('refreshToken', res.data.refreshToken)
              // sso
              this.$t.setSession('validTime', new Date().getTime() + Number(res.data.expiresIn) * 1000)
              this.$t.setSession('userName', res.data.userName)
              this.$t.setSession('userInfo', res.data.userInfo)
              this.$t.setSession('permission', res.data.permission)
              // let Arr = res.data.accessToken.split('.');
              // Arr.forEach((item,i) => {
              //   Arr[i] = Base64.decode(item);
              // });
              // this.$t.setSession('validTime',JSON.parse(Arr[0]).expire_time);
              // this.$t.setSession('userName',JSON.parse(Arr[0]).name);
              // this.$t.setSession('userInfo',JSON.parse(Arr[1]).user);
              this.$message.success({ showClose: true, message: '登录成功，欢迎回来！' }, 3) // 错误信息不自动关闭提示信息及弹出框
              if (res.data.userName.includes('admin')) {
                this.$router.push('/selectAdmin')
              } else {
                this.$router.push('/layout')
              }

              this.btnLoading = false
            } else {
              this.btnLoading = false
            }
          })
        } else {
          // 有错
          this.$message.warning('请输入账号 / 密码', 5) // 错误信息不自动关闭提示信息及弹出框
          return false
        }
      })
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 打开忘记密码弹出框
    registModel () {
      this.dialog.visible = true
    }
  }

}
</script>
<!--style 后请加上scoped 避免样式命名重复以造成的样式冲突-->
<style lang="scss" scoped>
.loginDiv{
  position: relative;
  background: linear-gradient(to right, #414142, #1b1b1b);
  height: 100vh;
  width: 100vw;
  .title-box{
    background: linear-gradient(to right, #414142, #1b1b1b);
    padding: 15px 0 15px 40px;
    span{font-size: 38px;color: #fff;font-weight: bold;vertical-align: middle;}
    img{margin-right: 8px;vertical-align: middle;margin-right: 10px;}
  }
  .loginForm{
    display: flex;
    justify-content: space-around;
    height: 60vh;
    margin-top: 4%;
    .loginForm_bg{
      width:35%;
      height: 100%;
      position: relative;
      .prefix{
        padding-top: 10px;
        width: 17px;
        height: 15px;
        margin-left: 3px;
      }
    }
    .login_content {
      width: 40%;
      height: 50%;
      position: absolute;
      top: 50%;
      left: 20%;
      transform: translate(10%, -50%);
      .login_title {
        color: #333;
        font-size: 30px;
        width: 100%;
        text-align: center;
        margin-bottom: 30px;
        font-weight: bold;
      }
      .submitForm{
        width: 100%;
        border-radius: 0;
        font-size: 15px;
        text-align: center;
      }
    }
  }
  .login_foot {
    position: absolute;
    bottom: -15%;
    color: #a6afbb;
    font-size: 14px;
    text-align: center;
    line-height: 23px;
  }
}

.login_banner {
  width: 100%;
  height: 100vh;
  background: url(../../assets/images/login_banner.webp) no-repeat center center,
  linear-gradient(to bottom left, #039fee, #0c3cff);
  background-size: 100%;
}

@media screen and (min-width: 1581px) {
  .login_foot {
    margin-bottom: 20vh;
  }
}
.has-success {
  margin-top: 30px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
