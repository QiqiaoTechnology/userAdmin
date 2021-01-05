import request from '@/utils/request'

export function userlogin(data) {
  return request({
    url: 'qiqiao/systemUser/login',
    method: 'post',
    data
  })
}
export function getuserInfo(token) {
  return request({
    url: 'qiqiao/systemUser/personalCenter',
    method: 'get',
    params: { token }
  })
}
export function getTemplate() {
  return request({
    url: 'qiqiao/websiteTemplate/currentWebsiteTemplate',
    method: 'get'
  })
}
