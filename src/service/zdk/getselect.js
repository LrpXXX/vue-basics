import { getTree } from '@/service/api/configureManage/groupManagement'

function getParentId (list, id) {
  for (const i in list) {
    if (list[i].id == id) {
      return [list[i]]
    }
    if (list[i].children != null) {
      let node = getParentId(list[i].children, id)
      if (node !== undefined) {
        return node.concat(list[i])
      }
    }
  }
}

export function getGroup (data, groupId) {
  return new Promise((resolve, reject) => {
    getTree({ type: data.type }, res => {
      if (res.code == 200) {
        let groupPath = []
        if (groupId) {
          groupPath = getParentId(res.data, groupId)
        }
        resolve(res, groupPath)
      }
    })
  })
}

// 项匹配公共方法
// arr-数组,val-过滤的值,a-匹配的键名
export function filterItem (arr, val, a) {
  let value = a || 'value'
  let obj = {}
  arr.forEach(item => {
    if (item[value] == val) {
      obj = item
    }
  })
  return obj
}
