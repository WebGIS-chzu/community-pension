import { request } from './request'

// 获取活动举办统计
export function getActivityTypeNumber() {
  return request({
    url: '/intelligent/social/activity/getActivityTypeNumber',
    method: 'get',
  })
}

// 获取异常活跃用户
export function getAbnormalInformation() {
  return request({
    url: '/intelligent/social/activity/getAbnormalInformation',
    method: 'get',
  })
}

// 分页查询活动信息
export function getActivityInformation(params) {
  return request({
    url: '/intelligent/social/activity/getActivityInformation',
    method: 'post',
    data: params,
  })
}

// 发布活动
export function addActivity(params) {
  return request({
    url: '/intelligent/social/activity/addActivity',
    method: 'post',
    data: params,
  })
}
