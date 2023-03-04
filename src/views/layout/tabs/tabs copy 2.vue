<!--作为引入页面时，不要加template-->
<template>
  <div id="menu-tabs" >
    <tabsmenu :itemList="menuItemList" :visible.sync="menuVisible"  @select="onMenuSelect"></tabsmenu>
      <el-tabs closable type="border-card"  style="margin-top:5px; " v-model="activePage"  
              @contextmenu.native="e => onTabsmenu(e)"
              @change="changePage" @edit="editPage" @tab-click="tabCallBack" v-if="pageList.length">
      <el-tab-pane :key="item.path+':'+item.name"  v-for="(item, index) in pageList" :name="getKey(item.name,item.path)">
        <template slot="label" >
          <i class="el-icon-s-home" v-if="item.path=='/about'"></i>
          <i class="el-icon-notebook-1" v-else-if="item.path!='about' && index%2==0"></i> 
          <i class="el-icon-notebook-2" v-else></i> 
          {{item.name}} 
          </template>
      </el-tab-pane>
    </el-tabs>      
    <el-scrollbar class="main">
        <el-main>
            <keep-alive>
              <router-view :key="activePage"  v-if="$route.meta.keepAlive&&reloadFlag"> </router-view>
            </keep-alive>
              <router-view :key="activePage" v-if="!$route.meta.keepAlive&&reloadFlag"> </router-view>
        </el-main>
      
    </el-scrollbar>
  </div>
</template>
<script>

  import tabsmenu from '@/views/layout/tabs/tabsmenu'
  const indexKey = '/homepage/homepage'//默认
  const indexKeyName = '首页'//默认首页的中文名称（必须与路由json配置的一致）
  const dashboardKey = "/layout"
  export default {
    components: {tabsmenu},
    data() {
      return {
        routerViewKey: new Date().getTime(),
        pageList: [],
        linkList: [],
        activePage: '',
        menuVisible: false,
        menuItemList: [
          {key: '4', icon: 'el-icon-refresh', text: '刷 新'},
          //{key: '1', icon: 'el-icon-back', text: '关闭左侧'},
          {key: '2', icon: 'el-icon-right', text: '关闭右侧'},
          {key: '3', icon: 'el-icon-close', text: '关闭其它'}
        ],
        reloadFlag: true
      }
    },
    
    //关闭当前tab页，供子页面调用
    provide() {
      return {
        closeCurrent: this.closeCurrent,
        routeReload: this.routeReload
      }
    },
    methods: {
      changePage(key) {
        this.activePage = key
      },
      tabCallBack() {
        this.$nextTick(() => {
          this.$t.triggerWindowResizeEvent();
        })
      },
      editPage(key, action) {
        this[action](key)
      },
      remove(key,route) {
        let keyObj=JSON.parse(key)
        let path=keyObj.path
        if (path == indexKey) {
          this.$message.warning('首页不能关闭!')
          return
        }
        if (this.pageList.length === 1) {
          this.$message.warning('这是最后一页，不能再关闭了啦')
          return
        }
        this.pageList = this.pageList.filter(item =>{
          let keyObj=JSON.parse(key)
          return !(item.path == keyObj.path&&item.name==keyObj.name)
        })
        let index = this.linkList.indexOf(key)
        this.linkList = this.linkList.filter(item => item !== key)

        if(route){
          this.$router.push(route)
        }else{
          index = index >= this.linkList.length ? this.linkList.length - 1 : index
          this.activePage = this.linkList[index]
        }
      },
      onTabsmenu(e) {
        const pagekey = this.getPageKey(e.target)
        if (pagekey !== null) {
          e.preventDefault()
          this.menuVisible = true
        }
      },
      getPageKey(target, depth) {
        depth = depth || 0
        if (depth > 1) {
          return null
        }
        let pageKey = target.getAttribute('id')
        pageKey = pageKey || (target.previousElementSibling ? target.previousElementSibling.getAttribute('id') : null)
        return pageKey || (target.firstElementChild ? this.getPageKey(target.firstElementChild, ++depth) : null)
      },
      onMenuSelect(key, target) {
        let pageKey = this.getPageKey(target)
        pageKey = pageKey.replace("tab-", "")
        switch (key) {
          case '1':
            this.closeLeft(pageKey)
            break
          case '2':
            this.closeRight(pageKey)
            break
          case '3':
            this.closeOthers(pageKey)
            break
          case '4':
            this.routeReload()
            break
          default:
            break
        }
      },
      /* update_begin author:wuxianquan date:20190828 for: 关闭当前tab页，供子页面调用->望菜单能配置外链，直接弹出新页面而不是嵌入iframe #428 */
      closeCurrent(toRoute) {
        this.remove(this.activePage,toRoute);
      },
      /* update_end author:wuxianquan date:20190828 for: 关闭当前tab页，供子页面调用->望菜单能配置外链，直接弹出新页面而不是嵌入iframe #428 */
      closeOthers(pageKey) {
        let keyObj=JSON.parse(pageKey)
        let path=keyObj.path
        let index = this.linkList.indexOf(pageKey)
        if (path == indexKey || path.indexOf('?ticke=') >= 0) {
          this.linkList = this.linkList.slice(index, index + 1)
          this.pageList = this.pageList.slice(index, index + 1)
          this.activePage = this.linkList[0]
        } else {
          let indexContent = this.pageList.slice(0, 1)[0]
          this.linkList = this.linkList.slice(index, index + 1)
          this.pageList = this.pageList.slice(index, index + 1)
          this.linkList.unshift(this.getKey(indexContent.name,indexContent.path))
          this.pageList.unshift(indexContent)
          this.activePage = this.linkList[1]
        }
      },
      closeLeft(pageKey) {
        if (pageKey == indexKey) {
          return
        }
        let tempList = [...this.pageList]
        let indexContent = tempList.slice(0, 1)[0]
        let index = this.linkList.indexOf(pageKey)
        this.linkList = this.linkList.slice(index)
        this.pageList = this.pageList.slice(index)
        this.linkList.unshift(indexContent.path)
        this.pageList.unshift(indexContent)
        if (this.linkList.indexOf(this.activePage) < 0) {
          this.activePage = this.linkList[0]
        }
      },
      closeRight(pageKey) {
        let index = this.linkList.indexOf(pageKey)
        this.linkList = this.linkList.slice(0, index + 1)
        this.pageList = this.pageList.slice(0, index + 1)
        if (this.linkList.indexOf(this.activePage < 0)) {
          this.activePage = this.linkList[this.linkList.length - 1]
        }
      },
      //update-begin-author:taoyan date:20190430 for:动态路由title显示配置的菜单title而不是其对应路由的title
      dynamicRouterShow(key, title) {
        let keyIndex = this.linkList.indexOf(key)
        if (keyIndex >= 0) {
          let currRouter = this.pageList[keyIndex]
          let meta = Object.assign({}, currRouter.meta, {title: title})
          this.pageList.splice(keyIndex, 1, Object.assign({}, currRouter, {meta: meta}))
        }
      },
      //update-end-author:taoyan date:20190430 for:动态路由title显示配置的菜单title而不是其对应路由的title

      //update-begin-author:taoyan date:20191008 for:路由刷新
      routeReload() {
        this.reloadFlag = false
        let ToggleMultipage = "ToggleMultipage"
        this.$store.dispatch(ToggleMultipage, false)
        this.$nextTick(() => {
          this.$store.dispatch(ToggleMultipage, true)
          this.reloadFlag = true
        })
      },
      getKey(name,path){
        return JSON.stringify({name,path})
      },
      getRouterKey(){
        return this.activePage+new Date().getTime()
      }
    },
    created() {
      if (this.$route.path != indexKey) {
        this.pageList.push({
          name: indexKeyName,
          path: indexKey,
          fullPath: indexKey,
          // meta: {
          //   icon: 'dashboard',
          //   title: '待办任务'
          // }
        })
        this.linkList.push(this.getKey(indexKeyName,indexKey))
      }
      //首页不处理。
      if (this.$route.path === dashboardKey) {
        this.activePage = this.getKey(indexKeyName,indexKey)
        return
      }
      this.pageList.push(this.$route)
      this.linkList.push(this.getKey(this.$route.name,this.$route.path))
      this.activePage = this.getKey(this.$route.name,this.$route.path)
    },
    computed: {
      multipage() {
        //判断如果是手机模式，自动切换为单页面模式
        if (false) {
          return false
        } else {
          return this.$store.state.multipage
        }
      }
    },
    watch: {
      '$route': function (newRoute) {
        this.routerViewKey = new Date().getTime()
        this.activePage = this.getKey(newRoute.name,newRoute.path)
        if (!this.multipage) {
          this.linkList = [this.getKey(newRoute.name,newRoute.path)]
          this.pageList = [Object.assign({}, newRoute)]
        } else if (this.linkList.indexOf(this.getKey(newRoute.name,newRoute.path)) < 0) {
          //this.linkList.push(this.getKey(newRoute.name,newRoute.path))
          this.linkList.push(this.getKey(newRoute.name,newRoute.path))
          this.pageList.push(Object.assign({}, newRoute))
        } else if (this.linkList.indexOf(this.getKey(newRoute.name,newRoute.path))  >= 0) {
          let oldIndex = this.linkList.indexOf(this.getKey(newRoute.name,newRoute.path))
          let oldPositionRoute = this.pageList[oldIndex]
          this.pageList.splice(oldIndex, 1, Object.assign({}, newRoute, {meta: oldPositionRoute.meta}))
        }   
      },
      'activePage': function (key) {
        let index =this.linkList.indexOf(key)
        let waitRouter = this.pageList[index]
        this.$router.push(Object.assign({}, waitRouter));
      },
      'multipage': function (newVal) {
        if (this.reloadFlag) {
          if (!newVal) {
            this.linkList = [this.$route.path]
            this.pageList = [this.$route]
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped> 
::v-deep .el-menu{
    z-index: 2010!important;
  }
::v-deep  .el-main{
    margin:0 !important;
    padding:10px 20px;
    background:#fff;    
    height: calc(100vh - 97px);
  }
  .main{
    min-height: calc(100vh - 61px - 5px);     
    overflow-x:hidden; 
  }
::v-deep  .el-tabs--border-card{
   border: none;
   box-shadow:none;
   .el-tabs__header{background:#fff;    }
   .el-tabs__content{padding:0;}
 } 
::v-deep   .el-tabs__nav-prev{
  line-height: 35px;
}
::v-deep  .el-tabs--border-card>.el-tabs__header .el-tabs__item{
   margin-left:10px !important;
   border-radius: 8px 8px 0 0;
   background:#F4F4F4 ;
   margin: 0;
   padding:0 35px 0 20px !important;
   cursor: pointer !important;
   color:#666666;
   height:32px;   
   line-height: 34px;
   border:1px solid #E4E7ED ;
   border-bottom: 0 !important;
    .el-icon-close{display: none;font-size:14px !important}    
}
::v-deep  .el-tabs--border-card>.el-tabs__header .el-tabs__item:hover{
   .el-icon-close{display: inline}
}
::v-deep  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{  
   background: #FFF;
   color: #3ba2fe;
   span{display: inline}
}
::v-deep .el-tabs--border-card>.el-tabs__header .el-tabs__item:first-child  .el-icon-close{
   display:none
}

::v-deep  .el-tabs__item .el-icon-close{
  position: absolute;
  top:5px;
  right:5px;
}


</style>
