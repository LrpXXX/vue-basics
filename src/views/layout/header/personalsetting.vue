<template>
  <section class="setting-box">
    <div class="header-drawer-title">主题色设置</div>   
        <div class="color-box" v-for="(item,index) in predefineColors"  :key="index" :title="item.colorName" @click="changeTheme(item)">
          <div class="color-block"  :style="setBg(item.color)" ><i v-show="userSetting.themePackers==item.name" class="el-icon-check"></i></div>
          <div class="color-name">{{item.colorName}}</div>
        </div>     
      <el-divider></el-divider>
      <div class="header-drawer-title">字体大小设置</div>  
      <el-radio-group v-model="userSetting.fontSize" @change="changeSize()">
        <div class="fontsize-radiobox">
          <el-radio :label="12">小</el-radio><span style="font-size:12px;margin-left:14px;color:rgba(0,0,0,.65);">这里是内容示例。</span>
        </div>
        <div class="fontsize-radiobox">
          <el-radio :label="14">标准</el-radio><span style="font-size:14px;color:rgba(0,0,0,.65);">这里是内容示例。</span>
        </div>
        <div class="fontsize-radiobox">
          <el-radio :label="16">中</el-radio><span style="font-size:16px;margin-left:14px;color:rgba(0,0,0,.65);">这里是内容示例。</span>
        </div>
        <div class="fontsize-radiobox">
          <el-radio :label="18">大</el-radio> <span style="font-size:18px;margin-left:14px;color:rgba(0,0,0,.65);">这里是内容示例。</span>
        </div>
      </el-radio-group>

      <el-divider></el-divider>
      <div class="header-drawer-title">其他设置</div>  
      <div class="switch-fullbox">
        <div class="switch-left">表格每页显示条数</div>
        <div class="switch-right">
           <el-select v-model="userSetting.pageSize" placeholder="请选择" style="width:100px" size="small" @change="changeTablePageSize()">
              <el-option
                v-for="(item,index) of pageSizeArr" :key="item.index"                
                :label="item"
                :value="item">
              </el-option>
            </el-select>
        </div>        
      </div>
      <div class="switch-fullbox">
        <div class="switch-left">字体设置</div>
        <div class="switch-right">
           <el-select v-model="this.userSetting.pageSize" placeholder="请选择" style="width:100px" size="small" >
              <el-option
                v-for="(item,index) of pageSizeArr" :key="item.index"                
                :label="item"
                :value="item">
              </el-option>
            </el-select>
        </div>        
      </div>
      <div class="switch-fullbox">
        <div class="switch-left">多页签模式</div>
        <div class="switch-right"><el-switch v-model="gPageTabs"></el-switch></div>        
      </div>
      <div class="switch-fullbox">
        <div class="switch-left">固定侧边菜单</div>
        <div class="switch-right"><el-switch v-model="gSiteBarFixed"></el-switch></div>        
      </div>      
  </section>
</template>

<script>
const version = require("element-ui/package.json").version; // element-ui version from node_modules
const ORIGINAL_THEME = "#409EFF"; // default color
export default {
   data() {
      return {
        gPageTabs:true,//是否启用页面tabs
        gSiteBarFixed:false,//左侧菜单是否随滚动条滚动
        siteBarTheme:"",//默认使用深色菜单
        setChange:false,//用户修改设置
        userSetting:{},
        predefineColors: [],//主题色
        pageSizeArr:[],//表格分页
      };
    },
    
    created(){
      this.userSetting=this.$t.getObjLocal("userSetting");         
      this.predefineColors=this.$g.COLORS;
      this.pageSizeArr=this.$g.PAGE_SIZE_ARR;
    },
    methods: {      
      //全局用户字体设置
      changeSize(){
        window.document.documentElement.setAttribute('data-size', this.userSetting.fontSize)
        this.SaveSetting();
      },
      //表格每页显示条数设置
      changeTablePageSize(){
        ELEMENT.Pagination.props.pageSize.default=this.userSetting.pageSize;
        this.SaveSetting();
      },

      changeTheme(item){        
        this.userSetting.themePackers=item.name;        
        this.setTheme()
        this.SaveSetting();
      },
      setBg(color){
        return "background:"+color;
      },
      SaveSetting(){
        this.$t.setObjLocal("userSetting",this.userSetting)
         this.$message.success( "设置成功！",3);
      },
      setTheme() {
        const oldVal = "409EFF";
        const val = this.$t.setTheme(this.userSetting.themePackers);//设置第三方或自定义模块换肤样式
        if (typeof val !== "string") return;
        const themeCluster = this.getThemeCluster(val.replace("#", ""));
        const originalCluster = this.getThemeCluster(oldVal.replace("#", ""));
        const getHandler = (variable, id) => {
          return () => {
            const originalCluster = this.getThemeCluster(
              ORIGINAL_THEME.replace("#", "")
            );
            const newStyle = this.updateStyle(
              this[variable],
              originalCluster,
              themeCluster
            );

            let styleTag = document.getElementById(id);
            if (!styleTag) {
              styleTag = document.createElement("style");
              styleTag.setAttribute("id", id);
              document.head.appendChild(styleTag);
            }
            styleTag.innerText = newStyle;
          };
        };

        const chalkHandler = getHandler("chalk", "chalk-style");

      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
        this.getCSSString(url, chalkHandler, "chalk");
      } else {
        chalkHandler();
      }

      const styles = [].slice
      .call(document.querySelectorAll("style"))
      .filter((style) => {
        const text = style.innerText;
        return (
          new RegExp(oldVal, "i").test(text) && !/Chalk Variables/.test(text)
        );
      });
      styles.forEach((style) => {
        const { innerText } = style;
        if (typeof innerText !== "string") return;
        style.innerText = this.updateStyle(
          innerText,
          originalCluster,
          themeCluster
        );
      });
    },
    //换肤
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style;
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
      });
      return newStyle;
    },
    getCSSString(url, callback, variable) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, "");
          callback();
        }
      };
      xhr.open("GET", url);
      xhr.send();
    },

    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(",");
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));

          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);

          return `#${red}${green}${blue}`;
        }
      };

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);

        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);

        return `#${red}${green}${blue}`;
      };

      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    },
    }
  }


</script>

<style  lang="scss" scoped>
  .el-drawer__header{margin-bottom:10px !important}
  .setting-box{
    padding:15px;
  }
  .switch-fullbox{
    height: 50px;
    .switch-left{float:left;font-size:14px;line-height:28px;color:rgba(0,0,0,.65);};
    .switch-right{float:right};
  }
     .dark{background:url(../../../common/images/system/pifu-dark.png) no-repeat;
    width:48px;height: 41px;display: inline-block;vertical-align:middle;cursor: pointer; }
    .light{background:url(../../../common/images/system/pifu-light.png) no-repeat;
    width:48px;height: 41px;display: inline-block;vertical-align:middle;cursor: pointer; margin-right:20px;}  

    .header-drawer-title {
        color: rgba(0,0,0,.85);
        font-size: 16px;
        line-height: 1;
        margin: 15px 0;
        font-weight: 500;
    }
    .color-box{
      display: inline-block;vertical-align: top;margin-left:10px;text-align: center;cursor: pointer;width:55px;margin-bottom:20px;
      .color-block{
        width: 25px;margin: 0 auto;
        height: 25px;
        border-radius: 4px;
        padding-left: 0;
        padding-right: 0;
        text-align: center;
        color: #fff;
        font-weight: 700;
        line-height: 1.2;
        i{font-size:20px;color: #fff;}
      }
      .color-name{color:rgba(0, 0, 0, 0.65);font-size:14px;line-height: 30px;}
    }
    
.check-box{padding-top: 13px;padding-left:22px;}
.check-box i{font-size: 20px;color: #1890ff}
.fontsize-radiobox{margin:18px 0;}

</style>
