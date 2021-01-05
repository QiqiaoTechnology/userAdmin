
import request from '@/utils/request'

// export function userlogin(data) {
//   return request({
//     url: 'qiqiao/systemUser/login',
//     method: 'post',
//     data
//   })
// }
export function getArticleList(data) {
  return request({
    url: 'qiqiao/article/findMyArticle',
    method: 'get',
    params: data
  })
}
export function getLabelList(data) {
  return request({
    url: 'qiqiao/articleLabel/myArticleLabel',
    method: 'get',
    params: data
  })
}
export function addLabelInfo(data) {
  return request({
    url: 'qiqiao/articleLabel',
    method: 'post',
    data
  })
}
export function editLabelInfo(data) {
  return request({
    url: 'qiqiao/articleLabel',
    method: 'put',
    data
  })
}
export function getLabelInfo(data) {
  return request({
    url: 'qiqiao/articleLabel/' + data,
    method: 'get'
  })
}
export function deleteLabelByid(id) {
  return request({
    url: 'qiqiao/articleLabel/' + id,
    method: 'delete'
  })
}
export function deleteLabelList(data) {
  return request({
    url: 'qiqiao/articleLabel',
    method: 'delete',
    data
  })
}

export function addArticleInfo(data) {
  return request({
    url: 'qiqiao/article',
    method: 'post',
    data
  })
}
export function editArticleInfo(data) {
  return request({
    url: 'qiqiao/article',
    method: 'put',
    data
  })
}
export function getLabelSelect() {
  return request({
    url: 'qiqiao/articleLabel/myArticleLabelList',
    method: 'get'
  })
}
export function deleteByArticleIdList(data) {
  return request({
    url: 'qiqiao/article/deleteByArticleIdList',
    method: 'delete',
    data
  })
}
export function deleteArticleByid(id) {
  return request({
    url: 'qiqiao/article/' + id,
    method: 'delete'
  })
}
export function getArticleInfo(data) {
  return request({
    url: 'qiqiao/article/' + data,
    method: 'get'
  })
}

export function getMediaList(data) {
  return request({
    url: 'qiqiao/attachmentMaterial/findByPage',
    method: 'get',
    params: data
  })
}
export function uploadMedia(data) {
  return request({
    url: 'distributedFileSystem/attachmentInfo/upload',
    method: 'post',
    data
  })
}
export function deleteMediaByid(id) {
  return request({
    url: 'qiqiao/attachmentMaterial/' + id,
    method: 'delete'
  })
}
export function deleteMediaList(data) {
  return request({
    url: 'qiqiao/attachmentMaterial/deleteByMaterialIdList',
    method: 'delete',
    data
  })
}
export function setMediaInfo(data) {
  return request({
    url: 'qiqiao/attachmentMaterial',
    method: 'post',
    data
  })
}
export function editMediaInfo(data) {
  return request({
    url: 'qiqiao/attachmentMaterial',
    method: 'put',
    data
  })
}

export function getMediaSelect(data) {
  return request({
    url: 'qiqiao/attachmentMaterial/list',
    method: 'get',
    params: data
  })
}
export function getBannerList(data) {
  return request({
    url: 'qiqiao/banner/myBanner',
    method: 'get',
    params: data
  })
}
export function deleteBanner(data) {
  return request({
    url: 'qiqiao/banner',
    method: 'delete',
    data
  })
}
export function deleteBannerItem(id) {
  return request({
    url: 'qiqiao/bannerDetail/' + id,
    method: 'delete'
  })
}
export function getBasicColumnList(data) {
  return request({
    url: 'qiqiao/friendshipLink/findByPage',
    method: 'get',
    params: data
  })
}
export function setBasicColumnInfo(data) {
  return request({
    url: 'qiqiao/friendshipLink',
    method: 'post',
    data
  })
}
export function editBasicColumnInfo(data) {
  return request({
    url: 'qiqiao/friendshipLink',
    method: 'put',
    data
  })
}
export function deleteBasicColumn(data) {
  return request({
    url: 'qiqiao/friendshipLink',
    method: 'delete',
    data
  })
}
export function getBasicColumnInfo(id) {
  return request({
    url: 'qiqiao/friendshipLink/' + id,
    method: 'get'
  })
}
export function getBannerById(id) {
  return request({
    url: 'qiqiao/banner/findBannerWithDetailByBannerId/' + id,
    method: 'get'
  })
}
export function setBanner(data) {
  return request({
    url: 'qiqiao/banner',
    method: 'post',
    data
  })
}
export function setbannerDetail(data) {
  return request({
    url: 'qiqiao/bannerDetail',
    method: 'post',
    data
  })
}
export function editbannerDetail(data) {
  return request({
    url: 'qiqiao/bannerDetail',
    method: 'put',
    data
  })
}

export function getEnterpriseInfo() {
  return request({
    url: 'qiqiao/basicInfo/enterpriseBasicInfo',
    method: 'get'
  })
}
export function editEnterpriseBasicInfo(data) {
  return request({
    url: 'qiqiao/basicInfo/enterpriseBasicInfo',
    method: 'put',
    data
  })
}

export function getTemplateList() {
  return request({
    url: 'qiqiao/websiteTemplate/list',
    method: 'get'
  })
}
export function edit_theme(data) {
  return request({
    url: 'qiqiao/websiteTemplate/currentWebsiteTemplate/' + data,
    method: 'put'

  })
}
export function getImgCount() {
  return request({
    url: 'qiqiao/attachmentMaterial/attachmentMaterialAmount',
    method: 'get'
  })
}
export function getTempCount() {
  return request({
    url: 'qiqiao/websiteTemplate/templateAmount',
    method: 'get'
  })
}
export function getArticleCount() {
  return request({
    url: 'qiqiao/article/articleAmount',
    method: 'get'
  })
}
