import {request} from './request'

export function goLogin(parmas) {
  return request({
    url: '/intelligent/user/login',
    method: 'post',
    data: parmas,
    withCredentials: true
    // headers:{'Content-Type': 'application/json'}, 
  })
}