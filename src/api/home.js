
import request from '@/utils/request'

export function getSetting(typeName) {
  return request({
    url: '/site/getSetting/' + typeName,
    method: 'get'
  })
}

export function editSetting(query) {
  return request({
    url: '/site/doSetting/',
    method: 'post',
    data: query
  })
}

