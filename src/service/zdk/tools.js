// 通用本地存储公共类 基于ES6
// 全局引用的常用公共函数
import global from '@/service/zdk/global_variable' // 全局变量
export default {
  /*
   *  json转换成
   * @param data 设置的对象值
   */
  jsonShow: function (data) {
    if (data != undefined) {
      if (typeof (data) === 'object') {
        return JSON.stringify(data, null, '\t')
      } else {
        console.log('jsonShow()传如参数类型错误，请传入object对象；当前传入参数类型为' + typeof (data))
      }
    }
  },
  // 新窗口打开外链接
  winOpen: function (url) {
    window.open(url, '_blank')
  },
  /* ------------------ sessionStorage------------------- */
  /*
   * 存储 sessionStorage 单个对象   例子：sessionStorage.setItem("fakeRouter",strfakeRouter) ;
   * @param name 设置的对象名称
   * @param data 设置的对象值
   */
  setSession: function (name, data) {
    sessionStorage.setItem(name, data)
  },
  /*
   * 获取 sessionStorage 单个对象
   * @param name 获取的对象名称
   */
  getSession: function (name) {
    return sessionStorage.getItem(name)
  },
  /*
   * 存储 sessionStorage 数组对象
   * @param name 设置的对象名称
   * @param data 设置的对象值
   */
  setObjSession: function (name, data) {
    sessionStorage.setItem(name, JSON.stringify(data))
  },
  /*
  * 获取sessionStorage 数组对象
  * param name 获取的对象名称
  如：sessionStorage.setItem("fakeRouter",strfakeRouter) ;
  */
  getObjSession: function (name) {
    return JSON.parse(sessionStorage.getItem(name))
  },

  /*
   * 删除 sessionStorage 单个对象
   * @param name 获取的对象名称
   */
  delSession: function (name) {
    return sessionStorage.removeItem(name)
  },

  /*
   * 删除 sessionStorage 所有对象
   */
  delAllSession: function () {
    return sessionStorage.clear()
  },

  /* ------------------localStorage------------------- */
  /*
   * 存储 localStorage 单个对象   例子：localStorage.setItem("fakeRouter",strfakeRouter) ;
   * @param name 设置的对象名称
   * @param data 设置的对象值
   */
  setLocal: function (name, data) {
    localStorage.setItem(name, data)
  },
  /*
   * 获取 localStorage 单个对象
   * @param name 获取的对象名称
   */
  getLocal: function (name) {
    return localStorage.getItem(name)
  },
  /*
   * 存储 localStorage 数组对象
   * @param name 设置的对象名称
   * @param data 设置的对象值
   */
  setObjLocal: function (name, data) {
    localStorage.setItem(name, JSON.stringify(data))
  },
  /*
  * 获取localStorage 数组对象
  * param name 获取的对象名称
  如：localStorage.setItem("fakeRouter",strfakeRouter) ;
  */
  getObjLocal: function (name) {
    try {
      return JSON.parse(localStorage.getItem(name))
    } catch (error) {
      console.error(error)
      return 'undefined'
    }
  },

  /*
   * 删除 localStorage 单个对象
   * @param name 获取的对象名称
   */
  delLocal: function (name) {
    return localStorage.removeItem(name)
  },

  /*
   * 删除 localStorage 所有对象 --没有~~
   */
  /** ------------------Cookie--------------------- */
  /**
   * 设置
   * @param name cookie名称
   * @param {value}存储值
   *  @param {time}  过期时间(单位:分钟) 默认30分钟
   */
  setCookie (name, value, time) {
    var exp = new Date()
    if (time === undefined) {
      exp.setTime(exp.getTime() + 30 * 60 * 1000)
    } else {
      exp.setTime(exp.getTime() + time * 60 * 1000)
    }

    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
  },
  /**
   * 获取cookice
   */
  getCookie (name) {
    var arr; var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (arr = document.cookie.match(reg)) { return unescape(arr[2]) } else { return null }
  },
  /**
   * 删除cookice
   */
  delCookie (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 60 * 60 * 1000)
    var cval = getCookie(name)
    if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/' }
  },
  /** --------------------------------------- */
  /**
   * 获取日期格式字符串
   * @param dateTimeStr 日期时间字符串
   * @return {string}日期格式字符串
   */
  getDateStr (dateTimeStr) {
    if (!dateTimeStr) return ''
    return dateTimeStr.length > 10 ? dateTimeStr.substring(0, 10) : dateTimeStr
  },
  /**
   * 下载文件
   */
  downFile (fileContent, fileName) {
    let blob = new Blob([fileContent], {
      type: fileContent.type
    })
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName)
    } else {
      var link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName
      link.click()
      // 释放内存
      window.URL.revokeObjectURL(link.href)
    }
  },
  /**
   * 从文件服务器下载文件
   * @param fileId 附件id
   * @param fileName 附件名称
   */
  downFileById (fileId, fileName) {
    request.uploadFile('storage/download/' + fileId, {}, res => {
      this.downFile(res, fileName)
    }, {
      responseType: 'blob'
    })
  },
  /**
   * 触发 window.resize
   */
  triggerWindowResizeEvent: function () {
    let event = document.createEvent('HTMLEvents')
    event.initEvent('resize', true, true)
    event.eventType = 'message'
    window.dispatchEvent(event)
  },
  // 时间戳转换方法    date:时间戳数字
  // formatDate("YYYY-mm-dd HH:MM", date) ==> 2019-06-06 19:45`
  formatDate: function (date, fmt) {
    date = new Date(date)
    let ret
    const opt = {
      'Y+': date.getFullYear().toString(), // 年
      'm+': (date.getMonth() + 1).toString(), // 月
      'd+': date.getDate().toString(), // 日
      'H+': date.getHours().toString(), // 时
      'M+': date.getMinutes().toString(), // 分
      'S+': date.getSeconds().toString() // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (let k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt)
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
      };
    };
    return fmt
  },
  /***
   * 查询条件组合
   * obj：            查询表单对象
   * changeObj  查询表单对象对应的查询方法 如 > =  like等，详情请看getSearchCode()
   */
  buildSearchJson: function (obj, changeObj) {
    let object = _.cloneDeep(obj)
    for (let item of changeObj) {
      let key = item.name
      if (object[key] != undefined) {
        if (object[key] == '') {
          delete object[key]
        } else {
          let keyName = key + '_' + this.getSearchCode(item.judge)
          object[keyName] = object[key]
          delete object[key]
        }
      }
    }
    // console.log(object)
    return object
  },
  // 查询条件组装
  getSearchCode: function (code) {
    code = code.trim()
    switch (code) {
      case '=': // 等于
        return 'equal'
        break
      case '<>': // 不等于
        return 'notequal'
        break
      case 'like': // 约等于 默认
        return 'like'
        break
      case 'notlike': // 不约等于
        return 'notlike'
        break
      case '>': // 大于
        return 'gt'
        break
      case '<': // 小于
        return 'lt'
        break
      case 'date>': // 时间大于
        return 'dategt'
        break
      case 'date<': // 时间小于
        return 'datelt'
        break
      case 'date=': // 时间等于
        return 'dateequal'
        break
      case 'null': // 等于空
        return 'null'
        break
      case 'notnull': // 不等于空
        return 'notnull'
        break
      case 'ignore': // 默认
        return 'ignore'
        break
    }
  },
  // 组装表单
  buildFormComponent: function (code) {
    code = code.trim()
    switch (code) {
      case '10001': // 单行文本框
        return '<el-input></el-input>'
        break
      case '10002': // 多行文本框
        return 'notequal'
        break
      case '10003': // 下拉框 默认
        return 'like'
        break
      case '10004': // 单选框
        return 'notlike'
        break
      case '10005': // 复选框
        return 'gt'
        break
      case '10006': // 静态文本
        return 'lt'
        break
      case 'date>': // 时间大于
        return 'dategt'
        break
      case 'date<': // 时间小于
        return 'datelt'
        break
      case 'date=': // 时间等于
        return 'dateequal'
        break
      case 'null': // 等于空
        return 'null'
        break
      case 'notnull': // 不等于空
        return 'notnull'
        break
      case 'ignore': // 默认
        return 'ignore'
        break
    }
  },

  _debounce: function (fn, delay = 300) {
    var timer = null
    return function () {
      var _this = this
      var args = arguments
      if (timer) clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(_this, args)
      }, delay)
    }
  },
  setTheme: function (theme) {
    let themeColor = global.COLORS
    for (let item of themeColor) {
      if (item.name == theme) {
        window.document.documentElement.setAttribute('themecolor', item.name)
        return item.color
      }
    }
  },
  // 每3位数字加逗号 如 10,005,133
  toNum (num) {
    let result = ''
    let counter = 0
    num = (num || 0).toString()
    for (var i = num.length - 1; i >= 0; i--) {
      counter++
      result = num.charAt(i) + result
      if (!(counter % 3) && i != 0) {
        result = ',' + result
      }
    }
    return result
  },
  /**
   * @desc 函数防抖---“立即执行版本” 和 “非立即执行版本” 的组合版本
   *  立即执行版：就是 触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
   *  非立即执行版：指的是 触发事件后函数会立即执行，然后 n 秒内不再触发该事件才能继续执行函数的效果
   * @param func 需要执行的函数
   * @param wait 延迟执行时间（毫秒）
   * @param immediate---true 表立即执行，false 表非立即执行
   * eg : function handle(){console.log(Math.random());}
   * window.addEventListener("mousemove",debounce(handle,1000,true)); // 调用立即执行版本
   * window.addEventListener("mousemove",debounce(handle,1000,false)); // 调用非立即执行版本
   **/
  debounce (func, wait, immediate) {
    let timer// 定时器，用来 setTimeout
    // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
    return function () {
      // 保存函数调用时的上下文和参数，传递给 fn
      let context = this
      let args = arguments

      if (timer) clearTimeout(timer)// 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
      if (immediate) {
        let callNow = !timer
        timer = setTimeout(() => {
          timer = null
        }, wait)
        if (callNow) func.apply(context, args)
      } else {
        timer = setTimeout(function () {
          func.apply(context, args)
        }, wait)
      }
    }
  },
  /**
  * @desc 函数节流 固定函数执行的速率，即所谓的“节流”，通过记录时间差，来判断是否执行func
  * @param fn {Function}   实际要执行的函数
  * @param delay {Number}  执行间隔，单位是毫秒（ms）  *
  * @return {Function}     返回一个“节流”函数
  */
  throttle (fn, threshhold) {
    // 记录上次执行的时间
    let last
    // 定时器
    let timer
    // 默认间隔为 250ms
    threshhold || (threshhold = 250)
    // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
    return function () {
      // 保存函数调用时的上下文和参数，传递给 fn
      let context = this
      let args = arguments

      let now = +new Date()
      // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
      // 执行 fn，并重新计时
      if (last && now < last + threshhold) {
        clearTimeout(timer)
        // 保证在当前时间区间结束后，再执行一次 fn
        timer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, threshhold)

      // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
      } else {
        last = now
        fn.apply(context, args)
      }
    }
  }

}
