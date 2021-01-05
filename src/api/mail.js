import request from '@/utils/request-mail'
export function getEmailUserList(params) {
  return request({
    url: '/users?accessToken=zhggp',
    method: 'get',
    params
  })
}
export function getEmailUserById(id) {
  return request({
    url: '/users/' + id + '?accessToken=zhggp',
    method: 'get'
  })
}
export function deleteUserByid(id) {
  return request({
    url: '/users/' + id + '?accessToken=zhggp',
    method: 'delete'
  })
}

export function setUserInfo(query) {
  return request({
    url: '/users?accessToken=zhggp',
    method: 'post',
    data: query
  })
}
export function resetUserPwd(id, query) {
  return request({
    url: '/users/' + id + '/password/reset' + '?accessToken=zhggp',
    method: 'post',
    data: query
  })
}

export function editUserInfo(id, query) {
  return request({
    url: '/users/' + id + '?accessToken=zhggp',
    method: 'PUT',
    data: query
  })
}

export function getEmailAddressesList(params) {
  return request({
    url: '/addresses?accessToken=zhggp',
    method: 'get',
    params
  })
}
export function getEmailAddressesById(id) {
  return request({
    url: '/addresses/resolve/' + id + '?accessToken=zhggp',
    method: 'get'
  })
}

export function setAddress(id, query) {
  return request({
    url: '/users/' + id + '/addresses?accessToken=zhggp',
    method: 'post',
    data: query
  })
}
export function editAddress(user, address, query) {
  return request({
    url: '/users/' + user + '/addresses/' + address + '?accessToken=zhggp',
    method: 'PUT',
    data: query
  })
}
export function deleteAddressesByid(user, addresses) {
  return request({
    url: '/users/' + user + '/addresses/' + addresses + '?accessToken=zhggp',
    method: 'delete'
  })
}

export function setStorageUsed(query) {
  return request({
    url: '/users/' + query + '/quota/reset?accessToken=zhggp',
    method: 'post'
    // data: {
    //   storageUsed: query.storageUsed
    // }
  })
}
