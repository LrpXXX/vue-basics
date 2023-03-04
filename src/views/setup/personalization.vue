<template>
  <section>
    <el-row>
      <el-col class="box-title">个性化设置</el-col>
    </el-row>

    <el-row>
      <el-col :span="20" class="tl">
        <div class="grid-content ">
          <h3>风格配色</h3>
          <p><span>整体风格配色设置</span></p>
        </div>
      </el-col>
      <el-col :span="4" class="tr">
        <div class="grid-content ">
             <el-switch
  v-model="value"
 active-text="暗色菜单"
  inactive-text="亮色菜单">
</el-switch>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="20">
        <div class="grid-content tl">
          <h3>主题色</h3>
          <p><span>页面风格配色：</span> <a>拂晓蓝（默认）</a></p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content tr">
          <div class="color_div setting-drawer-theme-color-colorBlock" style="background-color: rgb(245, 34, 45);"></div>
           <div class="color_div setting-drawer-theme-color-colorBlock" style="background-color: rgb(250, 84, 28);"></div>
            <div class="color_div setting-drawer-theme-color-colorBlock" style="background-color: rgb(82, 196, 26);"></div>
             <div class="color_div setting-drawer-theme-color-colorBlock" style="background-color: rgb(245, 34, 45);"></div>
              <div class="color_div setting-drawer-theme-color-colorBlock" style="background-color: rgb(24, 144, 255);"></div>
               <div class="color_div setting-drawer-theme-color-colorBlock" style="background-color: rgb(47, 84, 235);"></div>
                <div class="color_div setting-drawer-theme-color-colorBlock" style="background-color: rgb(114, 46, 209);"></div>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
  <el-row>
      <el-col :span="20">
        <div class="grid-content tl">
          <h3>全局字体设置</h3>
          <p><span>字体大小：</span> <span>小（12px）</span></p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content tr">
              <a class="set_edit" @click="open">修改</a>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>

  </section>
</template>

<script>
export default {
   data() {
      return {
        value: true
      }
    },
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
    .el-switch{margin-top: 20px}
    .color_div{width: 20px;height: 20px;float: right;margin-left: 10px;margin-top: 20px}
</style>
