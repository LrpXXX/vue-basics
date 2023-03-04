<template>
  <div class="process-type-list">
    <div class="protype-item"
         v-for="(item,index) in typeListData"
         :key="index"
         @click="handleTypeClick(item)">
      <template v-if="isShowEnd || item.type != 'end'">
        <div class="protype-img">
          <img class="img-normal"
               :src="require('@/assets/images/process/'+item.imgName+'.png')">
          <img class="img-select"
               :src="require('@/assets/images/process/'+item.imgName+'_select.png')">
        </div>
        <p>{{item.name}}</p>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'processTypeList',
  props: {
    isShowEnd: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      typeListData: [
        { name: '命令组件', type: 'order', imgName: 'order' },
        { name: '同步组件', type: 'sync', imgName: 'sync' },
        { name: '结束', type: 'end', imgName: 'end' },
      ]
    }
  },
  methods: {
    handleTypeClick (itemValue) {
      this.$emit('typeClick', itemValue)
    }
  }
}
</script>
<style lang="scss" scoped>
.process-type-list {
  background-color: #fff;
  position: absolute;
  width: 260px;
  left: 20px;
  top: 0;
}
.protype-item {
  display: inline-block;
  margin-right: 16px;
  cursor: pointer;
  .img-select {
    display: none;
  }
  &:hover {
    .protype-img {
      background-color: #1296db;
      .img-select {
        display: block;
      }
      .img-normal {
        display: none;
      }
    }
    p {
      color: #1296db;
    }
  }
  .protype-img {
    width: 66px;
    height: 66px;
    border-radius: 50%;
    border: 1px solid #ececec;
    position: relative;
    margin-bottom: 12px;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 36px;
    }
  }
  p {
    font-size: 14px;
    color: #333;
    text-align: center;
  }
}
</style>