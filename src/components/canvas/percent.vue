<template>
<section class="map-bg">
111
</section>
</template>

<script>
export default {
  data(){
    return{
    }
  },

}
</script>
<style scoped lang="scss">
.map-bg{
    background: url(../../../assets/images/bigscreen/map/bg.jpg) no-repeat  center top #060c29 !important;height:2016px;width:7680px;
    transform:scale(0.25) ;transform-origin: 0% 0%;overflow: auto;
}
header{
  width:100%;height:150px;padding:50px 200px;animation: header-animation 2.5s linear ;
  .logo{background: url(../../../assets/images/bigscreen/map/logo.png) no-repeat  ;width: 749px;height: 69px;float: left}
  .menu{background: url(../../../assets/images/bigscreen/map/menu.png) no-repeat  ;width: 751px;height: 67px;;float: left;margin-left: 600px}
  .date{background: url(../../../assets/images/bigscreen/map/date.png) no-repeat  ;width: 548px;height: 61px;;float: right;margin-right: 200px}
  @keyframes header-animation {
    0% {   
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
.map-main{
  padding: 100px 200px;display: flex;flex-direction: row;justify-content: space-between;
  .left-div{width: 1780px; display: flex;flex-direction:row;flex-wrap:wrap;position: relative;left:-2000px;}
  .right-div{width: 1780px;display: flex;flex-direction:row;flex-wrap:wrap;position: relative;right:-2000px;}
  .content-box{
     background: url(../../../assets/images/bigscreen/map/box_head.png) no-repeat center top rgba(#000,0.1) ;width:850px;
     position: relative;margin-bottom:20px;
    //  animation: content-box-animation 2.5s linear ;animation-fill-mode : forwards;
    .map-box-head{height:95px ;width:100%;padding: 10px 50px;font-size:40px;color:#fff;line-height: 87px;padding-left: 100px}
    .map-box-main{min-height:400px ;width:100%;padding: 50px 50px;border:1px solid rgba(#ffffff, .1);border-top:none}
  }
  .content-box:nth-child(2n){margin-left:80px;}

  .left-div >:nth-child(1){
    animation: left-content-box-animation 0.8s   ;
    animation-delay:1s;
    animation-fill-mode : forwards
  }
  .left-div >:nth-child(2){
    animation: left-content-box-animation 0.8s  ;
    animation-delay:1.3s;
    animation-fill-mode : forwards
  }
  .left-div>:nth-child(3){
    animation: left-content-box-animation 0.8s  ;
    animation-delay:1.6s;
    animation-fill-mode : forwards
  }
  .left-div >:nth-child(4){
    animation: left-content-box-animation 0.8s  ;
    animation-delay:1.8s;
    animation-fill-mode : forwards
  }
  @keyframes left-content-box-animation {
    0% {transform:translateX(0); opacity: 0.3;  }
    100% {transform:translateX(2000px);  opacity: 1;  }
  }

  .right-div >:nth-child(1){
    animation: right-content-box-animation 0.8s   ;
    animation-delay:1s;
    animation-fill-mode : forwards
  }
  .right-div >:nth-child(2){
    animation: right-content-box-animation 0.8s  ;
    animation-delay:1.3s;
    animation-fill-mode : forwards
  }
  .right-div>:nth-child(3){
    animation: right-content-box-animation 0.8s  ;
    animation-delay:1.6s;
    animation-fill-mode : forwards
  }
  .right-div >:nth-child(4){
    animation: right-content-box-animation 0.8s  ;
    animation-delay:1.8s;
    animation-fill-mode : forwards
  }
  @keyframes right-content-box-animation {
    0% {transform:translateX(0); opacity: 0.3;  }
    100% {transform:translateX(-2000px);  opacity: 1;  }
  }
}

.el-image{
  opacity: 0;
   animation: el-image-animation 1.5s  ;
   animation-delay:2.3s;
    animation-fill-mode : forwards
}
@keyframes el-image-animation {
    0% { opacity: 0;  }
    100% {opacity: 1;  }
  }
</style>
