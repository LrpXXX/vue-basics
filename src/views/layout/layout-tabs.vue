<template>
  <section class="layout-bg">
 
    <div class="main">
      <div :class="leftClass">
        <logo :isColl="isCollapse"></logo>
        <sidebar-item :isColl="isCollapse" :menuData="menuData"></sidebar-item>
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
        <router-view :key="$route.fullPath"></router-view>
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
      menuData: [],
      fn: null,
      theme: "409EFF",
    };
  },
  created() {
    if (this.collapseOpen) {
      //初始化页面判断
      this.sideBarOpen();
    } else {
      this.sideBarClosed();
    }
    this.getMenu();
    this.initPersonalSetting();
    this.setTheme();
    //this.getWindow()
    // this.fn = this.resizeHandler();
    // this.$nextTick(() => {
    //   this.fn();
    //   window.addEventListener("resize", this.fn);
    // });
  },
  // beforeDestroy() {
  //   window.removeEventListener("resize", this.fn);
  // },
  methods: {
    //个性化设置初始化
    /*设想思路：
      1.判断本地localstorage里面是否有值
      2.如果没有，则去数据库相应用户个性设置表中查询是否有值
      3.如果没有，则取系统默认值，并将默认值设置到 localstorage 中值及 用户个性设置表中（防止用户频繁变更，写表设置10S延迟）
      4.如果用户修改设置，则修改 localstorage 中值及 用户个性设置表
       */
    initPersonalSetting() {
      //初始化全局字体大小
      if (this.$t.getLocal("fontSize")) {
        this.fontSize = parseInt(this.$t.getLocal("fontSize"));
      } else {
        this.fontSize = parseInt(this.$g.FONT_SIZE);
      }
      this.$t.setLocal("fontSize", this.fontSize); //设置到缓存
      window.document.documentElement.setAttribute("data-size", this.fontSize);
    },
    getMenu() {
      //console.log(this.$t.jsonShow(this.$t.getObjSession("menuData")))
      this.menuData = this.$t.getObjSession("menuData");
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
      //const val = typeof localStorage.getItem("tremePackers")!="undefined"? ""+localStorage.getItem("tremePackers")+"":'#409EFF';
      //const val="#EF7527";
      const val = this.theme;
      console.log(val);
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
      this.$t.setLocal("tremePackers", val); //设置到缓存
      window.document.documentElement.setAttribute("themecolor", val);
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
  getWindow() {
    let win = {};
    const winH = window.innerHeight;
    const winW = window.innerWidth;
    let winSize = 3;
    win.width = window.innerWidth;
    win.height = window.innerHeight;
    //根据尺寸(暂定为宽度)获取用户屏幕尺寸 范围
    if (winW <= 1440) {
      winSize = 1; //小尺寸
    } else if (winW > 1440 && winW < 1880) {
      winSize = 2; //中尺寸
    } else {
      winSize = 3; //大尺寸
    }
    win.size = winSize;
    this.$t.setObjLocal("window", win);
    console.log(this.$t.getObjLocal("window"));
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
  background-color: #349DFB;
  i {
    font-size: 24px;
    color: rgba(255, 255, 255, 1);
  }
  i:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.9);
  }
}

.scoll-main {
  height: calc(100vh - 110px - 20px);
  overflow-x: hidden;
}
.el-main {
  background-color: #fff;
  margin: 15px 5px 15px 15px;
  // padding:0 !important;
  color: #333;
  min-height: calc(100vh - 90px);
}

@media screen and (max-width: 1360px) {
  .el-main {
    margin: 10px;
  }
}
</style>
