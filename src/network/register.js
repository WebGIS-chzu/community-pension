import { request } from './request'

export function goRegister(params) {
  return request({
    url: '/intelligent/user/register',
    method: 'post',
    data: params,
    headers:{'Content-Type': 'application/json'},
  })
}