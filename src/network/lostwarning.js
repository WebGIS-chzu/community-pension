import { request } from "./request"

// 获取地图的上方标签
export function getLostTypeInformation() {
  return request({
    url: "/intelligent/lost/lostWarning/getLostTypeInformation",
    method: 'get',
  })
}

// 获取走失人员信息
export function getBelostUserInformation() {
  return request({
    url: "/intelligent/lost/lostWarning/getBelostUserInformation",
    method: 'get',
  })
}

// 走失老人寻找情况
export function insertLostFindInformationByUserid(params) {
  return request({
    url: "/intelligent/lost/lostWarning/insertLostFindInformationByUserid",
    method: 'post',
    data: params,
  })
}

// 获取未找到列表
export function getLostFindInformation() {
  return request({
    url: "/intelligent/lost/lostWarning/getLostFindInformation",
    method: "get",
  })
}