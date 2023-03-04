<template>
  <svg :class="svgClass" style="font-size:30px;color:#ccc" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<!--
  使用方法
  <icon-svg icon-class="pifu" class-name="" />
-->
<script>
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>