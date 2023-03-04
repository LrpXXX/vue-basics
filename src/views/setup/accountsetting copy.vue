<template>
  <section>
    <el-row>
      <el-col class="box-title">账户设置</el-col>
    </el-row>

    <el-row>
      <el-col :span="20" class="tl">
        <div class="grid-content ">
          <h3>账户密码</h3>
          <p><span>当前密码强度:</span> <span>强</span></p>
        </div>
      </el-col>
      <el-col :span="4" class="tr">
        <div class="grid-content ">
              <a class="set_edit" @click="open">修改</a>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="20">
        <div class="grid-content tl">
          <h3>密保手机</h3>
          <p><span>已绑定手机:</span> <span>138****8293</span></p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content tr">
              <a class="set_edit" @click="open">修改</a>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="20" class="tl">
        <div class="grid-content ">
          <h3>密保问题</h3>
          <p><span>未设置密保问题，密保问题可有效保护账户安全</span></p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content tr">
              <a class="set_edit" @click="open">修改</a>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>

    <el-row>
      <el-col :span="20" class="tl">
        <div class="grid-content ">
          <h3>备用邮箱</h3>
          <p><span>已绑定邮箱:</span> <span>ant***sign.com</span></p>
        </div>
      </el-col>
      <el-col :span="4" class="tr">
        <div class="grid-content ">
               <a class="set_edit" @click="open">修改</a>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="20" class="tl">
        <div class="grid-content ">
          <h3>MFA 设备</h3>
          <p><span>未绑定 MFA 设备，绑定后，可以进行二次确认</span></p>
        </div>
      </el-col>
      <el-col :span="4" class="tr">
        <div class="grid-content ">
              <a class="set_edit" @click="open">修改</a>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
  </section>
</template>

<script>
export default {
  methods: {
      open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    }

};
</script>
<style scoped lang="scss">
.grid-content h3{    margin-bottom: 4px;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    line-height: 22px;}
    .grid-content p span{color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;}
    .set_edit{font-size: 14px;padding-top: 15px; float: right;}
    .el-divider--horizontal{margin: 20px 0}
</style>
