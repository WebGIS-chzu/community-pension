import { request } from './request'

// 获取护工的位置
export function queryNursingWorkerByCondition(params) {
  return request({
    url: '/intelligent/query/queryNursingWorkerByCondition',
    method: 'post',
    data: params,
  })
}

// 获护工基本信息
export function getNursingWorkerInformationByNursingId(params) {
  return request({
    url: '/intelligent/query/getNursingWorkerInformationByNursingId',
    method: 'post',
    data: params,
  })
}

// 获取老人位置信息
export function queryElderlyByCondition(params){
  return request({
    url: "/intelligent/query/queryElderlyByCondition",
    method: 'post',
    data: params,
  })
}

// 获取老人基本信息
export function getElderlyInformationByUserid(params){
  return request({
    url: "/intelligent/query/getElderlyInformationByUserid",
    method: 'post',
    data: params,
  })
}

// 获取老人居住地址信息
export function getElderlyAddress() {
  return request({
    url: "/intelligent/query/getElderlyAddress",
    method: 'get',
  })
}