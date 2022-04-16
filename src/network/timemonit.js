import { request } from './request'

// [手环页面]
// 获取(手环页面)异常人数
export function getBraceletAbnormalTypeNumber() {
  return request({
    url: '/intelligent/custody/bracelet/getBraceletAbnormalTypeNumber',
    method: 'get',
  })
}
// 获取手环滚动条信息
export function getUsersInformation() {
  return request({
    url: '/intelligent/custody/bracelet/getUsersInformation',
    method: 'get',
  })
}
// 获取手环页面异常数据的位置信息和获取手环滚动条信息
export function getAbnormalUserByAbnormal(params) {
  return request({
    url: "/intelligent/custody/bracelet/getAbnormalUserByAbnormal",
    method: "post",
    data: params,
  })
}

// [监控页面]
// 获取（监控页面）异常人数
export function getMonitorAbnormalTypeNumber() {
  return request({
    url: '/intelligent/custody/monitor/getMonitorAbnormalTypeNumber',
    method: 'get',
  })
}
// 获取监控页面异常数据的位置信息
export function getMonitorAbnormalUserByAbnormal(params) {
  return request({
    url: "/intelligent/custody/monitor/getMonitorAbnormalUserByAbnormal",
    method: "post",
    data: params,
  })
}
// 获取监控页面监控页面异常用户的具体信息
export function getMonitorAbnormalUserInformation(params) {
  return request({
    url: '/intelligent/custody/monitor/getMonitorAbnormalUserInformation',
    method: 'post',
    data: params
  })
}

// [消费页面]
// 左边统计图
export function getConsumeAbnormalTypeNumber() {
  return request({
    url: '/intelligent/custody/consume/getConsumeAbnormalTypeNumber',
    method: 'get'
  })
}
// 中间统计图
export function getAbnormalTypeNumberGroupByDate() {
  return request({
    url: '/intelligent/custody/consume/getAbnormalTypeNumberGroupByDate',
    method: 'get'
  })
}
// 右边统计图
export function getSolveStateNumber() {
  return request({
    url: '/intelligent/custody/consume/getSolveStateNumber',
    method: 'get'
  })
}
// 弹窗
export function getAbnormalUserInformationByType(params) {
  return request({
    url: '/intelligent/custody/consume/getAbnormalUserInformationByType',
    method: 'post',
    data: params
  })
}
// 右侧滚动信息条
export function getWpgRecord() {
  return request({
    url: '/intelligent/custody/consume/getWpgRecord',
    method: 'get'
  })
}