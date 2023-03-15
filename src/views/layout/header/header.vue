<template>
  <section class="header-setting">
    <div class="header-user">
      <div class="header-img">{{sortName}}</div>
      <div class="header-name">欢迎您，{{userInfo.name}}</div>
    </div>
    <div v-if="tenants.length>1">
      <el-dropdown trigger="click" @command="changeTenant">
        <span class="el-dropdown-link">{{tenantName}}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in tenants" :key="index"  :disabled="currentTenantId==item.id" :divided="currentTenantId==item.id" :command="item">{{ getTenantName(item) }}</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="outLogin" @click="outLogin">退出</div>
    <!-- <div>修改密码</div> -->
  <!--个人设置 end-->
  </section>
</template>

<script>
import { quitLogin } from '@/service/api/login'
// import { getInfoByUserId, cutoverTenant } from '@/service/api/configureManage/userManage'
export default {
  data () {
    return {
      drawer: false,
      userInfo: {}, // 用户信息
      sortName: '', // 用户姓名简称
      tenants: [], // 住户信息
      currentTenantId: [], // 当前用户租户
      tenantName: '切换租户' // 当前用户租户名称
    }
  },
  created () {
    this.checkLogin()
  },
  mounted () {
  },
  methods: {
    // 检查token是否存在，防止退出登录后点浏览器后退又回退回主页面
    checkLogin () {
      let userName = this.$t.getSession('userName')
      this.userInfo = JSON.parse(this.$t.getSession('userInfo'))
      let spstr = userName.split('')
      this.sortName = spstr[0]
      // this.getTenantInfo();
    },
    // 获取租户信息
    getTenantInfo () {
      getInfoByUserId({ id: this.userInfo.id }, res => {
        if (res.code == 200 && res.success) {
          this.tenants = res.data.sysTenants
          this.currentTenantId = res.data.currentTenantId
        }
      })
    },
    getTenantName (item) {
      if (item.id == this.currentTenantId) {
        this.tenantName = item.tenantName
      }
      return item.tenantName
    },
    // 切换租户
    changeTenant (item) {
      this.$confirm('您将切换到【' + item.tenantName + '】下使用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cutoverTenant({ userId: this.userInfo.id, tenantId: item.id }, res => {
          if (res.code == 200 && res.success) {
            this.$message.success('切换成功')
            this.$t.setSession('validTime', undefined)
            window.location.reload()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 退出登录
    outLogin () {
      this.$confirm(`是否确认退出?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        quitLogin({}, res => {
          this.$t.delAllSession()
          this.$router.push('/')
          this.$router.options.isInitChildren = false
        })
      }).catch(() => {})
    }
  }
}
</script>

<style  lang="scss" scoped>
    .header-setting{
      // float: right;
      display: flex;
      justify-content: end;
      .iconfont{margin-right: 20px;}
      .icons{color: #afb9c8 !important;outline: 0}
      div{font-size: 16px;color:#fff;}
      &>div:nth-child(2){padding: 0 20px;
        &::before,&::after{display: inline-block;content: '';width: 2px;height: 20px;background-color: #fff;position: relative;top: 5px;}
        &::before{left: -10px;}
        &::after{right: -10px;}
      }
    }
    .outLogin{
      cursor: pointer;
    }

    .notice {  margin-right: 20px;}
    .header-user{ cursor: pointer;  }
    .header-img{height:34px;width:34px; background: #5783ff; border-radius: 50%;line-height: 34px;
    text-align: center;color: #fff;font-size: 18px;display: inline-block;}
    .header-name{font-size: 14px;color: #666666;display: inline-block;padding-left:10px}
    .el-dropdown-link {
      cursor: pointer;
      //color: #409EFF;
    }
</style>
