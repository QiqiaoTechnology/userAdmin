
import request from '@/utils/request'

export function getSetting(typeName) {
  return request({
    url: '/portal/site/getSetting/' + typeName,
    method: 'get'
  })
}

export function getCountsList(tableName, query) {
  return request({
    url: '/portal/getInfo/' + tableName,
    method: 'get',
    params: query
  })
}

export function getCountsInfo(tableName, query) {
  return request({
    url: '/portal/getInfo/' + tableName + '/' + query,
    method: 'get'
  })
}

// 拿取导航栏目下某栏目列表
export function getNavigationColumn(query) {
  return request({
    url: '/portal/getColumn/navigation/' + query,
    method: 'get' })
}

export function getWebBasicColumn(query) {
  return request({
    url: '/portal/getColumn/webBasic/' + query,
    method: 'get' })
}
// 带条件查询栏目下数据
export function getListByStatus(tableName, query) {
  return request({
    url: '/portal/' + tableName + '/getList',
    method: 'get',
    params: query
  })
}

