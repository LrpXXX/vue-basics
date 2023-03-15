/**
 * 注册到vue全局方法，直接在vue组件里面调用this.api;
 */
import api from './api'

function plugin (Vue) {
  if (plugin.installed) {
    return
  }
  Object.defineProperties(Vue.prototype, {
    api: {
      get () {
        return api
      }
    }
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
