import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/service/store' //vuex内存存储
import '@/router/premission' //路由处理

import '@/common/scss/index.scss' //样式文件
import '@/common/css/public.css' //公共样式文件
import '@/assets/font/font.css' //字体文件
import '@/common/icon/iconfont.css' //纯色小图标
import '@/common/icon3/iconfont.js' //iconfont彩色图标引入JS
import SvgIcon from '@/components/iconfont.vue'; //iconfont 彩色图标组件

import '@/service/zdk/elementui_config' //element全局配置文件
import tools from '@/service/zdk/tools' //全局工具方法
import _ from 'lodash' //lodash JS工具库
import global from '@/service/zdk/global_variable' //全局变量
import publicArr from '@/service/store/publicArr' //公共数组
import Api from '@/service/filters'
import RSA from'@/service/zdk/rsa'; //RSA加密

import breadNav from '@/views/commonComponents/breadNav'; //引入自定义公用组件
Vue.use(breadNav);
Vue.component('bread-nav', breadNav);
import topItem from '@/views/commonComponents/topItem'; //引入自定义公用组件
Vue.use(topItem);
Vue.component('top-item', topItem);

Vue.use(Api);
Vue.component('SvgIcon', SvgIcon);

// // 引入 ECharts 主模块

// let echarts = require('echarts/lib/echarts');
// // 引入折线图/柱状图等组件
// require('echarts/lib/chart/line')
// require('echarts/lib/chart/bar')
// require('echarts/lib/chart/radar')
// // 引入提示框和title组件，图例
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
// require('echarts/lib/component/legend')
// require('echarts/lib/component/legendScroll')//图例滚动
// //vue全局注入echarts
import echarts from 'echarts' //echarts主题
import 'echarts/theme/macarons' //echarts主题

Vue.prototype.$echarts = echarts //全局注册echarts


//全局定义
//使用方法:在 *.vue 页面中可直接使用 this.$t.aa（方法名），JS文件中需要单独import引入
Vue.prototype.$rsa = RSA;
Vue.prototype.$t = tools; //工具类
Vue.prototype.$g = global; //全局变量。在 *.vue 页面中直接 this.$g.aa（方法名）
Vue.prototype.$p = publicArr; //全局数组变量。在 *.vue 页面中直接 this.$p.bb（数组名）
Vue.prototype._ = _ //lodash JS工具库
Vue.config.productionTip = false
new Vue({
    router,
    store,
    mounted() {
        store.commit('SET_MULTI_PAGE', true)
            //store.commit('SET_MULTI_PAGE', Vue.ls.get(DEFAULT_MULTI_PAGE,true))
    },
    render: h => h(App)
}).$mount('#app')
