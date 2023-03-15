export const DAY_TIME_START = '00:00:00'
export const DAY_TIME_END = '23:59:59'

// 获取当前日期yy-mm-dd
// date 为时间对象
export function getDateStr (date = new Date()) {
  let now = date
  let year = '' + now.getFullYear()
  let month = ''
  let day = ''
  if ((now.getMonth() + 1) < 10) {
    month = '0' + (now.getMonth() + 1)
  } else {
    month = '' + (now.getMonth() + 1)
  }
  if ((now.getDate()) < 10) {
    day = '0' + (now.getDate())
  } else {
    day = '' + (now.getDate())
  }
  return year + '-' + month + '-' + day
}
/**
 * 获得相对当前周AddWeekCount个周的起止日期
 * AddWeekCount为0代表当前周   为-1代表上一个周   为1代表下一个周以此类推
 * **/
export function getWeekStartAndEnd (AddWeekCount = 0) {
  // 起止日期数组
  let startStop = []
  // 一天的毫秒数
  const millisecond = 1000 * 60 * 60 * 24
  // 获取当前时间
  let currentDate = new Date()
  // 相对于当前日期AddWeekCount个周的日期
  currentDate = new Date(currentDate.getTime() + (millisecond * 7 * AddWeekCount))
  // 返回date是一周中的某一天
  let week = currentDate.getDay()
  // 返回date是一个月中的某一天
  // let month = currentDate.getDate();
  // 减去的天数
  let minusDay = week != 0 ? week - 1 : 6
  // 获得当前周的第一天
  let currentWeekFirstDay = new Date(currentDate.getTime() - (millisecond * minusDay))
  // 获得当前周的最后一天
  let currentWeekLastDay = new Date(currentWeekFirstDay.getTime() + (millisecond * 6))
  // 添加至数组
  startStop.push(getDateStr(currentWeekFirstDay))
  startStop.push(getDateStr(currentWeekLastDay))

  return startStop
}
/**
 * 获得相对当月AddMonthCount个月的起止日期
 * AddMonthCount为0 代表当月 为-1代表上一个月  为1代表下一个月 以此类推
 * ***/
export function getMonthStartAndEnd (AddMonthCount = 0) {
  // 起止日期数组
  let startStop = []
  // 获取当前时间
  let currentDate = new Date()
  let month = currentDate.getMonth() + AddMonthCount
  if (month < 0) {
    let n = parseInt((-month) / 12)
    month += n * 12
    currentDate.setFullYear(currentDate.getFullYear() - n)
  }
  currentDate = new Date(currentDate.setMonth(month))
  // 获得当前月份0-11
  let currentMonth = currentDate.getMonth()
  // 获得当前年份4位年
  let currentYear = currentDate.getFullYear()
  // 获得上一个月的第一天
  let currentMonthFirstDay = new Date(currentYear, currentMonth, 1)
  // 获得上一月的最后一天
  let currentMonthLastDay = new Date(currentYear, currentMonth + 1, 0)
  // 添加至数组
  startStop.push(getDateStr(currentMonthFirstDay))
  startStop.push(getDateStr(currentMonthLastDay))
  // 返回
  return startStop
}

/**
 * 获取近半年的起止日期
 * AddMonthCount为0 代表当月 为-1代表上一个月  为1代表下一个月 以此类推
 * ***/
export function getHalfYearStartAndEnd (AddMonthCount = 0) {
  // 起止日期数组
  let startStop = []
  let timeStart
  let timeEnd
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
  var startMonth = start.getMonth() + 1
  var endMonth = end.getMonth() + 1
  timeStart = start.getFullYear() + '-' + startMonth + '-' + start.getDate() + ' 00:00:00'
  timeEnd = end.getFullYear() + '-' + endMonth + '-' + end.getDate() + ' 23:59:59'
  // 添加至数组
  startStop.push(timeStart)
  startStop.push(timeEnd)
  // 返回
  return startStop
}

/**
 * 获取近一年的起止日期
 * AddMonthCount为0 代表当月 为-1代表上一个月  为1代表下一个月 以此类推
 * ***/
export function getYearStartAndEnd (AddMonthCount = 0) {
  // 起止日期数组
  let startStop = []
  let timeStart
  let timeEnd
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
  var startMonth = start.getMonth() + 1
  var endMonth = end.getMonth() + 1
  timeStart = start.getFullYear() + '-' + startMonth + '-' + start.getDate() + ' 00:00:00'
  timeEnd = end.getFullYear() + '-' + endMonth + '-' + end.getDate() + ' 23:59:59'
  // 添加至数组
  startStop.push(timeStart)
  startStop.push(timeEnd)
  // 返回
  return startStop
}

/**
 * 设置显示的时间  时间格式：7月10日  周三  18:00:00
 * @returns {string}
 */
export function currentShowTime () {
  let str = ''
  let a = ['日', '一', '二', '三', '四', '五', '六']
  let time = new Date()
  let week = time.getDay()
  // var year = time.getFullYear();
  let month = time.getMonth() + 1
  let day = time.getDate()

  str = '' + str + month + '月' + day + '日' + '  &nbsp;&nbsp;周' + a[week] + ' &nbsp;&nbsp;' + getTimeStr(time)
  return str
}

/**
 * 获取当前时间
 * @param time
 * @returns {string}
 */
export function getTimeStr (time = new Date()) {
  let hour = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return '' + hour + ':' + minutes + ':' + seconds
}

/**
 * 将日期和时间拼接起来
 * @param dateStr
 * @param timeStr
 * @returns {string}
 */
export function getShowTime (dateStr, timeStr) {
  return dateStr + ' ' + timeStr
}

// 时间戳转换方法    date:时间戳数字
export function formatDate (date) {
  var date = new Date(date)
  var YY = date.getFullYear() + '-'
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return YY + MM + DD + ' ' + hh + mm + ss
}

// 获取UTC时间
export function getUTCTime (now) {
  let year = now.getUTCFullYear()
  let month = now.getUTCMonth()
  let date = now.getUTCDate()
  let hours = now.getUTCHours()
  let minutes = now.getMinutes()
  let seconds = now.getUTCSeconds()
  let ms = now.getUTCMilliseconds()
  return Date.UTC(year, month, date, hours, minutes, seconds, ms)
}

export function _debounce (fn, delay = 300) {
  var timer = null
  return function () {
    var _this = this
    var args = arguments
    if (timer) clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(_this, args)
    }, delay)
  }
}
