<template>
  <div class="logo-box">
    <div class="logo"><img src="../../common/images/zenith-logo.png"
        :class="isColl ? 'show-img':'show-img-big'"></div>
    <!-- <div class="logo-title" v-if="isColl==false">Vue Zenith</div> -->
  </div>
</template>
<script> 
export default {
  props: ["isColl"],
  data() {
    return {
    };
  },
  created() {

  },
  methods: {
  }
}
</script>

<style lang="scss">
.logo-box {
  width: 100%;
  // background: #fff;
  .logo {
    display: inline-block;
    width: 100%;
    text-align: center;
    padding: 20px 0 10px 0;
  }
  .logo img {
    height: 80px;
  }
  .logo-title {
    display: inline-block;
    vertical-align: top;
    line-height: 60px;
    height: 60px;
    font-size: 22px;
    color: #fff;
  }
}
.show-img {
  animation: scaleDraw 0.5s ease-in-out alternate forwards;
}
::v-deep .el-menu{
  background-color: transparent !important;
}
@keyframes scaleDraw {
  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  100% {
    transform: scale(0.4);
  }
}
.show-img-big {
  animation: scaleDrawBig 0.5s ease-in-out alternate forwards;
}
@keyframes scaleDrawBig {
  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
  0% {
    transform: scale(0.4); /*开始为原始大小*/
  }
  100% {
    transform: scale(1);
  }
}
</style>