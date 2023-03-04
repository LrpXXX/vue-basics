<template>
  <div class="top-lists">
    <div class="top-item-box" v-for="(item, index) in dataLists" :key="index">
      <div class="left-box">
        <p class="title">{{item.name}}</p>
        <p class="num">{{item.val?item.val:0}}</p>
        <p class="bj">
          <template v-if="index!=0">
            较昨日
            <img src="~@/common/images/component/topitem/icon-up.png" alt="">
            {{item.compare?item.compare:0}}
          </template>
          <template v-else>
            日期：{{item.compare?item.compare:0}}
          </template>
        </p>
      </div>
      <div class="img-box">
        <img :src="require('@/common/images/component/topitem/topItem'+item.iconImg+'.png')" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{}
  },
  props:{
    dataLists:[]
  }
}
</script>
<style lang="scss" scoped>
// .top-lists{
//   display: flex;
// }
// .top-item-box{
//   display: flex;
//   justify-content: space-between;
//   border-radius: 8px;
//   background-color: #FFFFFF;
//   border: 1px solid #F3F3F3;
//   height: 100px;
//   width: 256px;
//   margin-right: 24px;
//   padding: 12px 12px 12px 12px;
//   &:last-child{
//     margin-right: 0;
//   }
// }
// .title{
//   font-size: 14px;
//   color: #B2B2B2;
// }
// .num{
//   font-size: 24px;
//   color: #222222;
//   font-weight: bold;
//   margin: 4px 0;
// }
// .bj{
//   color: #B2B2B2;
//   font-size: 12px;
// }
// .img-box{
//   padding-top: 5px;
//   img{
//     width: 64px;
//   }
// }

.top-lists{
  display: flex;
}
.top-item-box{
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  background-color: #FFFFFF;
  border: 1px solid #F3F3F3;
  height: 100px;
  width: 20rem;
  margin-right: 1.5rem;
  padding: 0.8rem 0.8rem;
  &:last-child{
    margin-right: 0 !important;
  }
}
.title{
  font-size: 12px;
  color: #B2B2B2;
}
.num{
  font-size: 1.5rem;
  color: #222222;
  font-weight: bold;
  margin: 4px 0;
}
.bj{
  color: #B2B2B2;
  font-size: 0.8rem;
}
.img-box{
  padding-top: 0.35rem;
  img{
    width: 4rem;
  }
}

@media screen and (max-width: 1680px) {
  .top-item-box{
    padding: 1.1rem 0.8rem;
  }
}
@media screen and (max-width: 1575px) {
  .top-item-box{
    width: 21rem;
    margin-right: 1rem;
    padding: 1.1rem 0.8rem;
  }
}
@media screen and (max-width: 1516px) {
  .left-box{
    position: relative;
  }
  .top-item-box{
    &:last-child {
      .title{
        position: absolute;
        top: 0;
        min-width: 126px;
      }
      .num{
        margin-top: 20px;
      }
    }
  }
  .img-box{
    padding-top: 1rem;
  }
}
@media screen and (max-width: 1330px) {
  .top-item-box{
    padding: 1.5rem 0.8rem;
  }
  .top-item-box{
    &:nth-child(5){
      .title{
        position: absolute;
        top: 0;
        min-width: 126px;
      }
      .num{
        margin-top: 20px;
      }
    }
  }
  .img-box{
    padding-top: 1.2rem;
  }
}
@media screen and (max-width: 1280px) {
  .top-item-box{
    padding: 16px 8px;
    width: 164px;
  }
  .top-item-box{
    &:nth-child(5){
      .title{
        position: absolute;
        top: 0;
        min-width: 126px;
      }
      .num{
        margin-top: 20px;
      }
    }
  }
  .title{
    font-size: 12px;
  }
  .num{
    font-size: 16px;
  }
  .img-box{
    padding-top: 13px;
    img{
      width: 42.5px;
    }
  }
}
</style>