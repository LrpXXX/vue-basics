<template>
<section class="box-main" style="padding-left:0 ;">

  <el-tabs :tab-position="tabPosition" class="setup">
    <el-tab-pane label="基本设置" >
      <div class="setup_header">基本设置</div>
      <div class="setup_content">
        <div class="content_left">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="" class="demo-ruleForm">
            <el-form-item label="" prop="email">
              <div class="input_label">邮箱</div>
              <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>

            <el-form-item label="" prop="name">
              <div class="input_label">昵称</div>
              <el-input v-model="ruleForm.name" placeholder="请输入昵称"></el-input>
            </el-form-item>

            <el-form-item label="" prop="desc">
              <div class="input_label" placeholder="请输入个人简介">个人简介</div>
              <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="ruleForm.desc"></el-input>
            </el-form-item>

            <el-form-item prop="city">
              <div class="input_label">所在省市</div>
              <el-cascader
                placeholder="请点击选择地址"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
                clearable
              ></el-cascader>
            </el-form-item>

           <el-form-item label="" prop="address">
              <div class="input_label">街道地址</div>
              <el-input type="textarea" placeholder="请输入街道地址" v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="" prop="phone">
              <div class="input_label">联系电话</div>
              <el-input  v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">更新基本信息</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

          </el-form>
        </div>
        <div class="content_right">
           <div class="setup_header">头像</div>
          <div class="avatar">
            <el-avatar :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="安全设置">配置管理</el-tab-pane>
    <el-tab-pane label="账号绑定">角色管理</el-tab-pane>
    <el-tab-pane label="新消息通知">定时任务补偿</el-tab-pane>
  </el-tabs>
</section>
</template>
<script>
// import {  getCurrentUser, updatePersonal } from "@/service/api/sysmanage/user";
export default {
  data () {
    return {
      userData: [],
      imageUrl: '',
      tabPosition: 'left',
      ruleForm: {
        name: '',
        desc: '',
        email: '',
        region: '',
        address: '',
        phone: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]

        // email: [
        //   { type: 'array', required: true, message: '请输入一个邮箱', trigger: 'blur' }
        // ],
        // address: [
        //   { required: true, message: '请输入地址', trigger: 'blur' }
        // ],
        // phone: [
        //   { required: true, message: '请填写电话号码', trigger: 'blur' }
        // ]
      },
      // 地址级联选择
      options: [],
      selectedOptions: [],
      cityArr: [], // 城市列表
      areaArr: [], // 区县列表
      province: '', // 省
      city: '', // 市
      area: '', // 区县,
      provinceCityArea: '' // 选择器选择的省市区
    }
  },
  created () {
    this.initDistPicker()
    // 获取当前用户信息
    // getCurrentUser('',(res)=>{
    //   this.userData =  res.data[0]
    //   // console.log( res.data)
    //   this.ruleForm.name = res.data[0].userName
    //   // this.ruleForm.address = res.data[0].childNode[1].value
    // });

    console.log(99999)
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userData.userName = this.ruleForm.name
          // updatePersonal(this.userData,(res)=>{
          //   // console.log(res)
          //   if(res.code!=200){
          //     this.$message.error(res.message, 5);
          //   }
          // })
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    initDistPicker () {
      // console.log("initDistrictsPicker");
      let self = this
      let respones = require('@/assets/js/districts.json')
      // this.$http.get("@/assets/js/districts.json").then(function(respones) {
      // console.log("respones==>", respones);
      let distData = respones
      let options = []
      // 省
      for (var provinceKy in distData['100000']) {
        let optProvinceItem = {
          value: provinceKy,
          label: distData['100000'][provinceKy]
        }
        if (distData[provinceKy]) {
          // 市
          for (var cityKy in distData[provinceKy]) {
            optProvinceItem.children = optProvinceItem.children
              ? optProvinceItem.children
              : []
            let optCityItem = {
              value: cityKy,
              label: distData[provinceKy][cityKy]
            }
            if (distData[cityKy]) {
              // 区
              for (var areaKy in distData[cityKy]) {
                optCityItem.children = optCityItem.children
                  ? optCityItem.children
                  : []
                let optAreaItem = {
                  value: areaKy,
                  label: distData[cityKy][areaKy]
                }
                optCityItem.children.push(optAreaItem)
              }
            }
            optProvinceItem.children.push(optCityItem)
          }
        }
        options.push(optProvinceItem)
      }
      self.distData = distData
      self.options = options
      // });
    },

    // 选择地区
    handleChange (value) {
      let self = this
      // console.log("value=>", value);
      // 获取省名
      self.options.map((item, index) => {
        if (item.value == value[0]) {
          self.cityArr = item.children // 存储城市列表
          self.province = item.label
        }
      })
      // 获取市名
      self.cityArr.map((item, index) => {
        if (item.value == value[1]) {
          self.areaArr = item.children // 存储区县列表
          self.city = item.label
        }
      })
      // 获取区县名
      self.areaArr.map((item, index) => {
        if (item.value == value[2]) {
          self.area = item.label
        }
      })
      self.provinceCityArea = self.province + self.city + self.area
      // console.log("self.provinceCityArea", self.provinceCityArea);
    },

    handleAvatarSuccess (res, file) {
      console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped lang="scss">
.setup_bg{
  background-color: #f5f5f5;
}
.setup{
  background-color: #fff;
  // min-height: calc(100vh - 100px);

  .setup_header{
    font-size: 16px;
    margin-bottom: 20px;
  }
  ::v-deep .el-tabs__content{
    padding: 30px;
    .setup_content{
      display: flex;
      .content_left{
        flex: 2;
      }
      .content_right{
        margin-left: 100px;
        flex: 3;
        .avatar{
          margin-left: 20px;
        }
      }
    }
  }
}
.input_label{
  height: 16px;
  line-height: 16px;
  margin-bottom: 6px;
}
// 导航高度
::v-deep .el-tabs__nav{
  margin-top: 20px;
   min-height: 720px;
   min-width: 180px;
}
::v-deep .el-tabs--left .el-tabs__nav-wrap.is-left::after {
    height: 100%;
    width: 1px;
    bottom: auto;
    top: 0;
    background-color: #f5f5f5;
}
::v-deep .el-tabs--left .el-tabs__item.is-left {
    text-align: left;
}
::v-deep .el-tabs__item.is-active{
  background-color: #e7f2ff;
}

//图片上传
::v-deep .avatar-uploader .el-upload {
    margin:20px;
    border: 1px dashed #d9d9d9  ;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  ::v-deep .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  ::v-deep .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
