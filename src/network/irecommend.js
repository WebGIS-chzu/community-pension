import { request } from './request'

// 按条件智能推荐
export function getRecommendElderlyByCondition(params) {
    return request({
      url: '/intelligent/social/recommend/getRecommendElderlyByCondition',
      method: 'post',
      data: params,
    })
  }