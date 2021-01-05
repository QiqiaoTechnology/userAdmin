
import request from '@/utils/request'

export function getMenuList(websiteTemplateId) {
  return request({
    url: 'qiqiao/websiteElement/getMenuBarList/' + websiteTemplateId,
    method: 'get'
  })
}
export function getTreeInfo(data) {
  return request({
    url: 'qiqiao/websiteElement/getTree',
    method: 'get',
    params: data
  })
}
export function getBannerList(websiteTemplateId) {
  return request({
    url: 'qiqiao/websiteElement/bannerByModule/' + websiteTemplateId,
    method: 'get'
  })
}
export function getBannerListByPage(data) {
  return request({
    url: 'qiqiao/banner/findByPage',
    method: 'get',
    params: data
  })
}
export function getMaterialList(websiteTemplateId) {
  return request({
    url: 'qiqiao/websiteElement/attachmentMaterialByModule/' + websiteTemplateId,
    method: 'get'
  })
}
export function getArticlelList(websiteTemplateId) {
  return request({
    url: 'qiqiao/websiteElement/articleByModule/' + websiteTemplateId,
    method: 'get'
  })
}
export function getArticleListByPage(data) {
  return request({
    url: 'qiqiao/article/findMyArticle',
    method: 'get',
    params: data
  })
}
export function updateBannerModule(websiteElementId, bannerId) {
  return request({
    url: 'qiqiao/websiteElement/updateBannerModule/' + websiteElementId + '/' + bannerId,
    method: 'put'
  })
}
export function findByAttachmentType(data) {
  return request({
    url: 'qiqiao/attachmentMaterial/findByPage',
    method: 'get',
    params: data
  })
}
export function updateArticleModule(websiteElementId, upArticleId, articleId) {
  return request({
    url: 'qiqiao/websiteElement/updateArticleRegion/' + websiteElementId + '/' + upArticleId,
    method: 'put',
    articleId
  })
}
export function updateMaterialModule(websiteElementId, upArticleId) {
  return request({
    url: 'qiqiao/websiteElement/updateAttachmentMaterialRegion/' + websiteElementId + '/' + upArticleId,
    method: 'put'
  })
}
export function updateModuleTitle(data) {
  return request({
    url: 'qiqiao/websiteElement/updateMetaDataOfElement/',
    method: 'put',
    data
  })
}

export function saveRegion(data) {
  return request({
    url: 'qiqiao/websiteElement/saveRegion',
    method: 'post',
    data
  })
}
export function updateIsDeleted(data) {
  return request({
    url: 'qiqiao/websiteElement/updateIsDeleted/' + data,
    method: 'put'

  })
}
export function getTreeForManagement(data) {
  return request({
    url: 'qiqiao/websiteElement/getTreeForManagement/' + data,
    method: 'get'
  })
}
export function saveModule(data) {
  return request({
    url: 'qiqiao/websiteElement/saveModule',
    method: 'post',
    data
  })
}
export function deleteRegion(data) {
  return request({
    url: 'qiqiao/websiteElement/region/' + data,
    method: 'delete'
  })
}
