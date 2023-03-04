<template>
  <div id="app" class="app">
    <title>{{this.$g.SYSTEM_CONFIG.sysTitle}}</title>
    <router-view/>
  </div>
</template>

<script>
import {getSysConfiguration} from '@/service/api/sysinfo';

export default {
  name: 'App',
  data() {
    return {
      // 默认系统名称
      sysName: '数据采集平台',
      // 系统ID
      sysId: '9ea3c46f0bea458e9121c7d6a7073d1e',
    }
  },
  created() {
    getSysConfiguration({id: this.sysId}, res => {
      if (res.success) {
        this.$g.SYSTEM_CONFIG.sysTitle = res.data.sysTitle;
        this.$g.SYSTEM_CONFIG.sysName = res.data.sysName;
        this.$g.SYSTEM_CONFIG.sysFooter = res.data.sysFooter;
        if(res.data.sysTitleIcon){
          var link  = document.querySelector('link[rel*="icon"]');
          link.href = res.data.sysTitleIcon
        }
      } else {
        this.$g.SYSTEM_CONFIG.sysTitle = this.sysName;
        this.$g.SYSTEM_CONFIG.sysName = this.sysName;
        this.$g.SYSTEM_CONFIG.sysFooter = this.sysName;
      }
    });
  }
}
</script>
