import { request } from "./request"

// 获取老人的位置
export function getElderlyLocation() {
  return request({
    url: "/intelligent/social/chain/getElderlyLocation",
    method: "get",
  })
}

// 获取老人的信息
export function getUserInformationByUserId(params) {
  return request({
    url: "/intelligent/social/chain/getUserInformationByUserId",
    method: "post",
    data: params,
  })
}

// 获取关系图谱
export function getUserChainByCondition(params) {
  return request({
    url: "/intelligent/social/chain/getUserChainByCondition",
    method: "post",
    data: params,
  })
}