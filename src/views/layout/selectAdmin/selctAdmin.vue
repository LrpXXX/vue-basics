<template>
  <div class="selectAdmin">
    <el-row class="allcard">
      <el-col :span="8">
      <el-card class="card">
        <div>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            alt="这是示例图片"
            width="100%"
          />
        </div>
        <div class="text">场地管理系统</div>
        <el-button type="primary" class="span" @click="go">进入系统</el-button>
      </el-card>
      </el-col>
      <el-col :span="8">
      <el-card class="card">
        <div>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            alt="这是示例图片"
            width="100%"
          />
        </div>
        <div class="text">客户预约系统</div>
        <el-button type="primary" class="span" @click="go">进入系统</el-button>

      </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {

  },
  methods: {
    go () {
      console.log(111)
      this.$router.push('/layout')
    }
  }
}
</script>
<style scoped lang="scss">
.selectAdmin {
  width: 60%;
  margin: 10% auto;
  .allcard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text{
      margin-top: 10%;
      font: bold;
      color: #000;
      font-size: 26px;
      text-align: center;
    }
    .span{
      text-align: center;
      margin-top: 10%;
      color: #fff;
      margin-left: calc(31%);
    }
  }
}
</style>
