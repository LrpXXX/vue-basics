import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const DEFAULT_MULTI_PAGE = 'DEFAULT_MULTI_PAGE'

export default new Vuex.Store({
  state: {
    multipage: true, //默认多页签模式
    userSetting:{},//用户个人设置
    roleTabName:"",//角色设置tabs选中的name
    baseUrl:'', //接口API地址
  },
  mutations: {
    SET_MULTI_PAGE (state, multipageFlag) {
      //Vue.ls.set(DEFAULT_MULTI_PAGE, multipageFlag)
      state.multipage = multipageFlag
    },
    SET_USER_SETTING (state, obj) {
      state.userSetting = obj
    },
    SET_roleTabName (state, val) {
      state.roleTabName = val
    }
  },
  actions: {
    ToggleMultipage({ commit }, multipageFlag) {
      commit('SET_MULTI_PAGE', multipageFlag)
    }
  },
  modules: {

  }
})
