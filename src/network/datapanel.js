import { request } from './request'

//获取分类老人人数
export function getUserInformationState() {
  return request({
    url: '/intelligent/dataPanel/getUserInformationState',
    method: 'get',
  })
}

// 服务结构
export function getServiceStructure() {
  return request({
    url: '/intelligent/dataPanel/getServiceStructure',
    method: 'get',
  })
}

// 医疗服务
export function getTreatmentValues() {
  return request({
    url: '/intelligent/dataPanel/getTreatmentValues',
    method: 'get',
  })
}

// 护工评价
export function getWorkersEvaluate() {
  return request({
    url: '/intelligent/dataPanel/getNursingWorkersEvaluate',
    method: 'get',
  })
}

// 健康指数异常
export function getAbnormalHealth() {
  return request({
    url: '/intelligent/dataPanel/getAbnormalHealth',
    method: 'get',
  })
}

// 年龄组统计
export function getAgeGroup() {
  return request({
    url: '/intelligent/dataPanel/getAgeGroup',
    method: 'get',
  })
}