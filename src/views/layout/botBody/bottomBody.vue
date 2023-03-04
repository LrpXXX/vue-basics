<template>
  <div>
    <!--  -->
    <div class="left-nav">
      <sidebar-item :menuData="submenuData"></sidebar-item>
    </div>
    <el-scrollbar class="scoll-main">
      <el-main>
        <transition name="fade-transform" >
          <router-view :key="$route.fullPath"></router-view>
        </transition>
      </el-main>    
    </el-scrollbar>
  </div>
</template>
<script>

import SidebarItem from "@/views/layout/sidebar/sidebar";
export default {
  components: { SidebarItem},
  data(){
    return{

    }
  },
  created(){
    console.log(this.$route);
  }
}
</script>