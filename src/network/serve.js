import { request } from "./request"

// 获取服务数据
export function ServiceOrders(parmas) {
  return request ({
    url: '/intelligent/service/getServiceOrderInformationByServiceType',
    method: 'post',
    data: parmas,
  })
}

// 获取护工数量
export function WorkerNumber(parmas) {
  return request({
    url: '/intelligent/service/getNursingWorkersServiceNumber',
    method: 'post',
    data: parmas,
  })
}

// 护工评价
export function WorkersLevel(parmas) {
  return request({
    url: '/intelligent/service/getNursingWorkersLevelNumber',
    method: 'post',
    data: parmas,
  })
}

// 护工评价的词云
export function ServiceWords(parmas) {
  return request({
    url: '/intelligent/service/getServiceWordsNumber',
    method: 'post',
    data: parmas,
  })
}
