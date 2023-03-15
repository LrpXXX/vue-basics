import Vue from 'vue'

import Zform from '@/modules/zform/components/zform.vue'

import zformSelect from '@/modules/zform/components/zform_select.vue'// 自定义表单显示页
Vue.component('zform', Zform)// 自定义表单显示页
Vue.component('zform-select', zformSelect)
