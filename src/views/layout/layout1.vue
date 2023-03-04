<template>
  <section class="layout-bg"> 
    <div class="main">
      <div :class="leftClass">
        <logo :isColl="isCollapse"></logo>
        <sidebar-item :isColl="isCollapse"></sidebar-item>
      </div>
      <div :class="rightClass">
        <el-header>
          <el-row>
            <el-col :span="4" style="height: 60px; line-height: 60px">
              <el-tooltip
                class="item"
                effect="dark"
                content="菜单收折"
                placement="bottom"
              >
                <i :class="classCollapse" @click="sidebarCollapse"></i>
              </el-tooltip>
            </el-col>
          <el-col :span="20">
            <header-item></header-item>
          </el-col>
        </el-row>
      </el-header>
       <!-- <Tabs class="tabs" ></Tabs>       -->
       
       <el-scrollbar class="scoll-main">
        <el-main>
          <transition name="fade-transform" >
            <router-view :key="$route.fullPath"></router-view>
          </transition>
      </el-main>    
    </el-scrollbar>
      </div>
  </div>
</section>
</template>

<script>
import SidebarItem from "@/views/layout/sidebar/sidebar";
import HeaderItem from "@/views/layout/header/header";

import Tabs from "@/views/layout/tabs/tabs";
import Logo from "@/views/layout/logo";
const version = require("element-ui/package.json").version; // element-ui version from node_modules
const ORIGINAL_THEME = "#409EFF"; // default color

export default {
  components: { SidebarItem, HeaderItem, Logo, Tabs },
  data() {
    return {
      collapseOpen: true, //左侧菜单默认展开
      leftClass: "", //左边菜单Class
      rightClass: "", //右边内容区Class
      classCollapse: "", //折叠按钮样式
      isCollapse: false,
      transitionName:"",
      fn: null,
      theme: "409EFF",
      userSetting:{},//用户设置
      setChange:false,//用户设置是否改变
    };
  },
  created() {
    if (this.collapseOpen) {//初始化页面判断
      this.sideBarOpen();
    } else {
      this.sideBarClosed();
    }   
    this.initPersonalSetting();
  },
  methods: {
    initPersonalSetting() {     
      if(this.$t.getObjLocal("userSetting")==undefined){
            this.userSetting={"basicid":"10","fontSize":14,"pageSize":15,"themePackers":"theme1","isstate":1,"userid":"1"}
            this.$t.setObjLocal("userSetting",this.userSetting)
            window.document.documentElement.setAttribute("data-size", this.userSetting.fontSize);
            ELEMENT.Pagination.props.pageSize.default=this.userSetting.pageSize;            
            this.setTheme();
      }else{
        this.userSetting=this.$t.getObjLocal("userSetting")       
         window.document.documentElement.setAttribute("data-size", this.userSetting.fontSize);
         ELEMENT.Pagination.props.pageSize.default=this.userSetting.pageSize;              
        this.setTheme();
      }
    },
    sidebarCollapse() {
      //菜单收折
      if (this.collapseOpen) {
        this.collapseOpen = false;
        this.sideBarClosed();
        window.document.documentElement.setAttribute("menu-show", "false");
      } else {
        //菜单展开
        this.collapseOpen = true;
        this.sideBarOpen();
        window.document.documentElement.setAttribute("menu-show", "true");
      }
    },
    sideBarOpen() {
      //菜单展开样式处理
      this.leftClass = "leftBox";
      this.rightClass = "rightBox";
      this.classCollapse = "icon-Collapse el-icon-s-fold";
      this.isCollapse = false;
    },
    sideBarClosed() {
      //菜单收折
      this.leftClass = "leftBox leftCollapse";
      this.rightClass = "rightBox rightCollapse";
      this.classCollapse = "icon-Collapse el-icon-s-unfold";
      this.isCollapse = true;
    },
    setTheme() {
      const oldVal = "409EFF";
      //const val = this.userSetting.themePackers;
      const val = this.$t.setTheme(this.userSetting.themePackers);//设置第三方或自定义模块换肤样式
      // if(val == oldVal) return;
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
  },
 
};
</script>
<!--这里做全局样式 不要scoped-->
<style  lang="scss">


.layout-bg {
  background: #fff !important;
}
.leftBox {
  display: inline-block;
  vertical-align: top;
  width: 200px;
}
.rightBox {
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 200px);
  background: #fff;
}
.leftCollapse {
  animation: leftmove 0.5s;
  width: 64px;
}
.rightCollapse {
  animation: rightmove 0.5s;
  width: calc(100% - 64px);
}
.tabs {
  border-left: 1px solid #ccc;
}

@keyframes leftmove {
  from {
    width: 200px;
  }
  to {
    width: 64px;
  }
}
@keyframes rightmove {
  from {
    width: calc(100% - 200px);
  }
  to {
    width: calc(100% - 64px);
  }
}
.el-header {
  background-color: #fff;
  border-bottom: 1px solid #e2e5e9;
  i {
    font-size: 24px;
    color: #afb9c8;
  }
  i:hover {
    cursor: pointer;
    color: #afb9c8;
  }
}


</style>
