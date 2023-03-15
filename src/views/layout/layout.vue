<template>
  <section class="layout-bg">
      <div class="bot-box">
        <div class="left-nav">
          <sidebar-item :menuData="submenuData" ref="submenu"></sidebar-item>
        </div>
        <el-main class="scoll-main" v-show="submenuData.length>0">
          <transition name="fade-transform">
            <router-view :key="$route.fullPath" >没有东西呀</router-view>
          </transition>
        </el-main>
        <!-- 没有子菜单时 -->
        <div class="noPermission" v-show="submenuData.length==0">
          <el-image class="noPermissionimage" :src="require('@/assets/noPermission.png')"></el-image>
          <div class="noPermissiontext">暂无权限</div>
        </div>
      </div>
  </div>
</section>
</template>

<script>
import SidebarItem from '@/views/layout/sidebar/sidebar'
import HeaderItem from '@/views/layout/header/header'
import { outLinkJump } from '@/service/api/sysinfo'

const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF' // default color
const submenu = [{
  'id': '3',
  'name': '数据汇聚 ',
  'sorting': '1',
  'pid': '0',
  'type': '1',
  'pathUrl': '/dataCollect/index',
  'serialNumber': '1',
  'icon': 'sjhj',
  'openMode': '1',
  'keepalive': true
},
{
  'id': '4',
  'name': '预约管理 ',
  'sorting': '1',
  'pid': '0',
  'type': '1',
  'pathUrl': '/appotionment/appotionment',
  'serialNumber': '1',
  'icon': 'sjhj',
  'openMode': '1',
  'keepalive': true
},
{
  'id': '5',
  'name': '人员管理 ',
  'sorting': '1',
  'pid': '0',
  'type': '1',
  'pathUrl': '/personnel/personnel',
  'serialNumber': '1',
  'icon': 'sjhj',
  'openMode': '1',
  'keepalive': true
},
{
  'id': '6',
  'name': '人员管理 ',
  'sorting': '1',
  'pid': '0',
  'type': '1',
  'pathUrl': '/personnel/personnel',
  'serialNumber': '1',
  'icon': 'sjhj',
  'openMode': '1',
  'keepalive': true
}]
export default {

  components: { SidebarItem, HeaderItem },
  data () {
    return {
      fn: null,
      theme: '409EFF',
      userSetting: {}, // 用户设置
      setChange: false, // 用户设置是否改变
      firstMenu: [],
      submenuData: submenu, // 侧边栏导航数据
      activeIndex: '' // 头部导航栏默认选中(已弃用)
    }
  },
  computed: {
    toIndex () { // 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
      return this.$route.meta.topId
    }
  },
  created () {
    this.firstMenu = this.$t.getObjSession('menuData')
  },
  mounted () {
    this.$nextTick(() => {
      this.routerJump(null)
    })
  },
  methods: {
    /*
      点击头部菜单后跳转
      openMode ：跳转方式:1项目内跳转。2打开新窗口跳转路由 3打开新窗口跳转其他系统
      url：跳转路径
    */
    routerJump (menus) {
      let menu = menus
      let topId = this.$route.meta.topId
      // 是否加载第一次加载菜单。判断是否刷新页面
      let bool = true
      if (!menu) {
        if (topId) {
          this.firstMenu.forEach(item => {
            if (item.id == topId) {
              menu = item
              bool = false
            }
          })
        } else {
          menu = this.firstMenu[0]
        }
      }
      if (menu.openMode == '1') { // 菜单路由跳转
        this.submenuData = menu.children ? menu.children : []
        if (menu.children) {
          if (bool) {
            this.findLeafMenu(menu.children)
          }
        } else {
          this.$message({ showClose: true, message: '暂无权限！', type: 'warning' })
        }
      }
      if (menu.openMode == '2' && menu.type == '2') { // 新窗口打开路由
        window.open(menu.pathUrl + '?t=' + new Date().getTime(), '_blank')
      }
      if (menu.openMode == '2' && menu.type == '3') { // 新窗口跳转其他系统
        outLinkJump(menu.pathUrl, {}, res => {
          window.open(res.data.SsoLoginUrl, '_blank')
        })
      }
      // this.$t.setObjSession("checkedMenu", menu);
    },

    // initPersonalSetting() {
    //   if(this.$t.getObjLocal("userSetting")==undefined){
    //         this.userSetting={"basicid":"10","fontSize":14,"pageSize":15,"themePackers":"theme1","isstate":1,"userid":"1"}
    //         this.$t.setObjLocal("userSetting",this.userSetting)
    //         window.document.documentElement.setAttribute("data-size", this.userSetting.fontSize);
    //         ELEMENT.Pagination.props.pageSize.default=this.userSetting.pageSize;
    //   }else{
    //     this.userSetting=this.$t.getObjLocal("userSetting")
    //      window.document.documentElement.setAttribute("data-size", this.userSetting.fontSize);
    //      ELEMENT.Pagination.props.pageSize.default=this.userSetting.pageSize;
    //   }
    // },
    // 初始菜单、刷新页面菜单选中问题
    // refreshMenu(){
    //   this.firstMenu = this.$t.getObjSession("menuData");
    //   let Arr = this.$t.getObjSession("menuData")
    //   for(let n=0;n<Arr.length;n++){
    //     if(Arr[n].id == this.$route.meta.topId){
    //         if(Arr[n].children && Arr[n].children.length>0){
    //           this.submenuData = Arr[n].children;
    //         }
    //         return;
    //     }else{
    //       this.submenuData = Arr[0].children;
    //       this.findLeafMenu(Arr[0].children);
    //     }
    //   }
    // },
    // 获取菜单叶子节点
    findLeafMenu (arr) {
      if (arr[0].children) {
        this.findLeafMenu(arr[0].children)
      } else {
        this.$router.push(arr[0].pathUrl)
      }
    }
  }

}
</script>
<!--这里做全局样式 不要scoped-->
<style scoped lang="scss">

.layout-bg {
  background: #fff !important;
}
.top-height{
  //#2c92fb rgb(12 121 217 / 98%)
  height: 85px;background-color: #000;line-height:85px;padding:0 20px;
  .el-row{height: 85px;}
  ::v-deep {
    .el-header{padding: 0;height: 100% !important;}
    .el-menu{background-color: transparent;border-bottom: 0 !important;}
    .el-menu--horizontal>.el-menu-item{height: 85px;line-height: 85px;font-size: 20px;color: #fff;border-bottom: none;}
    .el-menu--horizontal>.el-menu-item.is-active{border-bottom: none;background-color: transparent;font-weight: bold;
      &::after{width: 4px;display: inline-block;content: '';height: 38px;background-color: #000;position: relative;top: 12px;margin-left: 20px;}
    }
    .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover{background-color: transparent;font-weight: bold;}
  }

  .title-box{
    span{font-size: 28px;color: #fff;font-weight: bold;}
    img{margin-right: 8px;position: relative;top: 7px;}
  }
  .el-menu-demo{
    .icon{
      height: 22px;
      width: 26px;
    }
  }
}
.bot-box{
  position:relative;
  .left-nav{width: 200px;position: absolute;left: 0;}
  .scoll-main{position: absolute;left: 200px;width: calc(100% - 200px);height: calc(100vh - 85px) !important;overflow: unset;}
}
.noPermission{
  position: absolute;
  left: 200px;
  width: calc(100% - 200px);
  height: calc(100vh - 85px) !important;
  overflow: unset;
  text-align: center;
  .noPermissionimage{
    width: 40%;
  }
  .noPermissiontext{
    position: relative;
    color: rgb(77, 76, 76);
    font-size: 20px;
    bottom: 13%;
    letter-spacing: 2px;
  }
}

// 弹窗过高不滚动
::v-deep .el-dialog__wrapper{
  overflow: hidden !important;
}
</style>
