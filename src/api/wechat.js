import request from '@/utils/request-wc'
export function getWechatUser(params) {
  return request({
    url: '/wx/manage/wxAccount/list',
    method: 'get',
    params
  })
}

export function setWechatUserInfo(query) {
  return request({
    url: '/wx/manage/wxAccount/save',
    method: 'post',
    data: query
  })
}
// 素材库
export function getPermanentMediaList(params) {
  return request({
    url: '/wx/manage/wxAssets/materialFileBatchGet',
    method: 'get',
    params
  })
}
// 规则列表
export function getResponseMessageList(params) {
  return request({
    url: '/wx/manage/msgReplyRule/list',
    method: 'get',
    params
  })
}
// 新增规则
export function setResponseMessages(query) {
  return request({
    url: '/wx/manage/msgReplyRule/save',
    method: 'post',
    data: query
  })
}
// 修改规则
export function upResponseMessages(query) {
  return request({
    url: '/wx/manage/msgReplyRule/update',
    method: 'post',
    data: query
  })
}
// 删除规则
export function deleteMsgRule(query) {
  return request({
    url: '/wx/manage/msgReplyRule/delete',
    method: 'post',
    data: query
  })
}
// 上传图片
export function uploadPermanentMedia(query) {
  return request({
    url: '/wx/manage/wxAssets/materialFileUpload',
    method: 'post',
    data: query
  })
}

// 粉丝增长
export function getusersummary(query) {
  return request({
    url: '/offical/getusersummary',
    method: 'post',
    data: query
  })
}
export function getusercumulate(query) {
  return request({
    url: '/offical/getusercumulate',
    method: 'post',
    data: query
  })
}

// 粉丝用户集合
export function getFansList(params) {
  return request({
    url: '/wx/manage/wxUser/list',
    method: 'get',
    params
  })
}
// 标签集合
export function getFansLableList(params) {
  return request({
    url: '/wx/manage/wxUserTags/list',
    method: 'get',
    params
  })
}
// 新增标签
export function saveFansLableInfo(query) {
  return request({
    url: '/wx/manage/wxUserTags/save',
    method: 'post',
    data: query
  })
}
// 批量新增用户标签
export function batchTagging(query) {
  return request({
    url: '/wx/manage/wxUserTags/batchTagging',
    method: 'post',
    data: query
  })
}
// 删除用户标签
export function deleteFansLableInfo(tagid) {
  return request({
    url: '/wx/manage/wxUserTags/delete/' + tagid,
    method: 'post'
  })
}
// 批量删除用户标签
export function deleteFansInfoLable(query) {
  return request({
    url: '/wx/manage/wxUserTags/batchUnTagging',
    method: 'post',
    data: query
  })
}

// 同步数据库
export function upFansList(query) {
  return request({
    url: '/wx/manage/wxUser/syncWxUsers',
    method: 'post',
    data: query
  })
}
// 消息列表
export function getMsgList(params) {
  return request({
    url: '/wx/manage/wxMsg/list',
    method: 'get',
    params
  })
}
// 消息回复
export function replyMsg(query) {
  return request({
    url: '/wx/manage/wxMsg/reply',
    method: 'post',
    data: query
  })
}
export function deleteMsg(query) {
  return request({
    url: '/wx/manage/wxMsg/delete',
    method: 'post',
    data: query
  })
}
export function getFansInfo(openid) {
  return request({
    url: '/wx/manage/wxUser/info/' + openid,
    method: 'get'
  })
}
export function deleteFansInfo(query) {
  return request({
    url: '/wx/manage/wxUser/delete',
    method: 'post',
    data: query
  })
}

export function pushToBlacklist(query) {
  return request({
    url: '/wx/manage/wxBlacklist/pushToBlacklist',
    method: 'post',
    data: query
  })
}
export function syncBlacklist() {
  return request({
    url: '/wx/manage/wxBlacklist/syncBlacklist',
    method: 'get'
  })
}
export function pullFromBlacklist(query) {
  return request({
    url: '/wx/manage/wxBlacklist/pullFromBlacklist',
    method: 'post',
    data: query
  })
}
export function getBlackFansList(params) {
  return request({
    url: '/wx/manage/wxBlacklist/list',
    method: 'get',
    params
  })
}
