(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5c942ee8"],{"37cb":function(t,e,r){"use strict";r.d(e,"t",(function(){return a})),r.d(e,"B",(function(){return o})),r.d(e,"b",(function(){return i})),r.d(e,"n",(function(){return c})),r.d(e,"A",(function(){return u})),r.d(e,"h",(function(){return l})),r.d(e,"a",(function(){return m})),r.d(e,"k",(function(){return s})),r.d(e,"C",(function(){return d})),r.d(e,"g",(function(){return p})),r.d(e,"c",(function(){return f})),r.d(e,"s",(function(){return b})),r.d(e,"D",(function(){return h})),r.d(e,"L",(function(){return g})),r.d(e,"i",(function(){return q})),r.d(e,"j",(function(){return y})),r.d(e,"J",(function(){return j})),r.d(e,"o",(function(){return O})),r.d(e,"E",(function(){return F})),r.d(e,"v",(function(){return v})),r.d(e,"d",(function(){return A})),r.d(e,"e",(function(){return L})),r.d(e,"x",(function(){return w})),r.d(e,"I",(function(){return I})),r.d(e,"l",(function(){return U})),r.d(e,"f",(function(){return k})),r.d(e,"w",(function(){return $})),r.d(e,"u",(function(){return x})),r.d(e,"H",(function(){return C})),r.d(e,"K",(function(){return _})),r.d(e,"q",(function(){return N})),r.d(e,"y",(function(){return B})),r.d(e,"m",(function(){return M})),r.d(e,"G",(function(){return E})),r.d(e,"p",(function(){return P})),r.d(e,"z",(function(){return D})),r.d(e,"F",(function(){return Q})),r.d(e,"r",(function(){return S}));var n=r("b775");function a(t){return Object(n["b"])({url:"qiqiao/article/findMyArticle",method:"get",params:t})}function o(t){return Object(n["b"])({url:"qiqiao/articleLabel/myArticleLabel",method:"get",params:t})}function i(t){return Object(n["b"])({url:"qiqiao/articleLabel",method:"post",data:t})}function c(t){return Object(n["b"])({url:"qiqiao/articleLabel",method:"put",data:t})}function u(t){return Object(n["b"])({url:"qiqiao/articleLabel/"+t,method:"get"})}function l(t){return Object(n["b"])({url:"qiqiao/articleLabel",method:"delete",data:t})}function m(t){return Object(n["b"])({url:"qiqiao/article",method:"post",data:t})}function s(t){return Object(n["b"])({url:"qiqiao/article",method:"put",data:t})}function d(){return Object(n["b"])({url:"qiqiao/articleLabel/myArticleLabelList",method:"get"})}function p(t){return Object(n["b"])({url:"qiqiao/article/deleteByArticleIdList",method:"delete",data:t})}function f(t){return Object(n["b"])({url:"qiqiao/article/"+t,method:"delete"})}function b(t){return Object(n["b"])({url:"qiqiao/article/"+t,method:"get"})}function h(t){return Object(n["b"])({url:"qiqiao/attachmentMaterial/findByPage",method:"get",params:t})}function g(t){return Object(n["b"])({url:"distributedFileSystem/attachmentInfo/upload",method:"post",data:t})}function q(t){return Object(n["b"])({url:"qiqiao/attachmentMaterial/"+t,method:"delete"})}function y(t){return Object(n["b"])({url:"qiqiao/attachmentMaterial/deleteByMaterialIdList",method:"delete",data:t})}function j(t){return Object(n["b"])({url:"qiqiao/attachmentMaterial",method:"post",data:t})}function O(t){return Object(n["b"])({url:"qiqiao/attachmentMaterial",method:"put",data:t})}function F(t){return Object(n["b"])({url:"qiqiao/attachmentMaterial/list",method:"get",params:t})}function v(t){return Object(n["b"])({url:"qiqiao/banner/myBanner",method:"get",params:t})}function A(t){return Object(n["b"])({url:"qiqiao/banner",method:"delete",data:t})}function L(t){return Object(n["b"])({url:"qiqiao/bannerDetail/"+t,method:"delete"})}function w(t){return Object(n["b"])({url:"qiqiao/friendshipLink/findByPage",method:"get",params:t})}function I(t){return Object(n["b"])({url:"qiqiao/friendshipLink",method:"post",data:t})}function U(t){return Object(n["b"])({url:"qiqiao/friendshipLink",method:"put",data:t})}function k(t){return Object(n["b"])({url:"qiqiao/friendshipLink",method:"delete",data:t})}function $(t){return Object(n["b"])({url:"qiqiao/friendshipLink/"+t,method:"get"})}function x(t){return Object(n["b"])({url:"qiqiao/banner/findBannerWithDetailByBannerId/"+t,method:"get"})}function C(t){return Object(n["b"])({url:"qiqiao/banner",method:"post",data:t})}function _(t){return Object(n["b"])({url:"qiqiao/bannerDetail",method:"post",data:t})}function N(t){return Object(n["b"])({url:"qiqiao/bannerDetail",method:"put",data:t})}function B(){return Object(n["b"])({url:"qiqiao/basicInfo/enterpriseBasicInfo",method:"get"})}function M(t){return Object(n["b"])({url:"qiqiao/basicInfo/enterpriseBasicInfo",method:"put",data:t})}function E(){return Object(n["b"])({url:"qiqiao/websiteTemplate/list",method:"get"})}function P(t){return Object(n["b"])({url:"qiqiao/websiteTemplate/currentWebsiteTemplate/"+t,method:"put"})}function D(){return Object(n["b"])({url:"qiqiao/attachmentMaterial/attachmentMaterialAmount",method:"get"})}function Q(){return Object(n["b"])({url:"qiqiao/websiteTemplate/templateAmount",method:"get"})}function S(){return Object(n["b"])({url:"qiqiao/article/articleAmount",method:"get"})}},7284:function(t,e,r){"use strict";var n=r("fa7d"),a=r.n(n);a.a},a21d:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-container corporate"},[r("el-form",{ref:"companyForm",attrs:{model:t.companyForm,"label-width":"120px",rules:t.rules}},[r("div",[r("el-form-item",{attrs:{label:"公司名称",prop:"enterpriseName"}},[r("el-input",{attrs:{placeholder:"请输入公司名称",autocomplete:"off"},model:{value:t.companyForm.enterpriseName,callback:function(e){t.$set(t.companyForm,"enterpriseName","string"===typeof e?e.trim():e)},expression:"companyForm.enterpriseName"}})],1)],1),t._v(" "),r("el-form-item",{attrs:{label:"公司LOGO",prop:"enterpriseLogoAttachmentUrl"}},[r("el-upload",{staticClass:"avatar-uploader-max",attrs:{action:"#","show-file-list":!1,"http-request":t.handUploadtwo,accept:".jpg, .jpeg, .png, .gif, .bmp"}},[t.companyForm.enterpriseLogoAttachmentUrl?r("img",{staticClass:"avatar-max",attrs:{src:t.companyForm.enterpriseLogoAttachmentUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),r("el-form-item",{attrs:{label:"联系人称呼",prop:"corporateContactName"}},[r("el-input",{attrs:{placeholder:"请输入公司联系人称呼",autocomplete:"off"},model:{value:t.companyForm.corporateContactName,callback:function(e){t.$set(t.companyForm,"corporateContactName","string"===typeof e?e.trim():e)},expression:"companyForm.corporateContactName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"手机号码",prop:"contactPhone"}},[r("el-input",{attrs:{placeholder:"请输入手机号码",autocomplete:"off"},model:{value:t.companyForm.contactPhone,callback:function(e){t.$set(t.companyForm,"contactPhone","string"===typeof e?e.trim():e)},expression:"companyForm.contactPhone"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"电子邮箱",prop:"enterpriseEmail"}},[r("el-input",{attrs:{placeholder:"请输入电子邮箱",autocomplete:"off"},model:{value:t.companyForm.enterpriseEmail,callback:function(e){t.$set(t.companyForm,"enterpriseEmail","string"===typeof e?e.trim():e)},expression:"companyForm.enterpriseEmail"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"公司地址",prop:"enterpriseAddress"}},[r("el-input",{attrs:{placeholder:"请输入公司地址",autocomplete:"off"},model:{value:t.companyForm.enterpriseAddress,callback:function(e){t.$set(t.companyForm,"enterpriseAddress","string"===typeof e?e.trim():e)},expression:"companyForm.enterpriseAddress"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"公司微信二维码",prop:"wechatQrAttachmentUrl"}},[r("el-upload",{staticClass:"avatar-uploader-max",attrs:{action:"#","show-file-list":!1,"http-request":t.handUploadone,accept:".jpg, .jpeg, .png, .gif, .bmp"}},[t.companyForm.wechatQrAttachmentUrl?r("img",{staticClass:"avatar",attrs:{src:t.companyForm.wechatQrAttachmentUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),r("el-form-item",{attrs:{label:"公司介绍",prop:"enterpriseInstruction"}},[r("el-input",{attrs:{type:"textarea",rows:10,placeholder:"请输入公司介绍",autocomplete:"off"},model:{value:t.companyForm.enterpriseInstruction,callback:function(e){t.$set(t.companyForm,"enterpriseInstruction","string"===typeof e?e.trim():e)},expression:"companyForm.enterpriseInstruction"}})],1),t._v(" "),r("el-form-item",[r("el-button",{on:{click:function(e){return t.cancelForm("companyForm")}}},[t._v("重 置")]),t._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.handleSubmit("companyForm")}}},[t._v("立即提交")])],1)],1)],1)},a=[],o=(r("7f7f"),r("37cb")),i={data:function(){return{imageUrl:"",companyForm:{enterpriseName:"",corporateContactName:"",enterpriseAddress:"",enterpriseLogoAttachmentId:"",contactPhone:"",enterpriseEmail:"",wechatQrAttachmentId:null,wechatQrAttachmentUrl:null,enterpriseInstruction:"",enterpriseLogoAttachmentUrl:""},rules:{enterpriseName:{required:!0,message:"请输入公司名称!",trigger:"blur"},corporateContactName:{required:!0,min:2,message:"请输入公司联系人",trigger:"blur"},enterpriseAddress:{required:!0,min:2,message:"请输入公司地址",trigger:"blur"},contactPhone:{required:!0,min:2,message:"请输入联系方式",trigger:"blur"},enterpriseEmail:{required:!0,min:2,message:"请输入电子邮箱",trigger:"blur"},enterpriseInstruction:{required:!0,min:2,message:"请输入公司介绍",trigger:"blur"},enterpriseLogoAttachmentUrl:{required:!0,message:"请上传公司宣传图片",trigger:"blur"}}}},created:function(){this.getSetting()},methods:{getSetting:function(){var t=this;Object(o["y"])().then((function(e){t.companyForm=e.data}))},beforeUpload:function(t){var e=t.name.lastIndexOf("."),r=t.name.substring(e,t.name.length),n=[".gif",".jpeg",".png",".bmp",".jpg"];return n.indexOf(r.toLowerCase())<=-1?(this.$message.error("商品图片仅支持 gif、 jpeg、 png、jpg、bmp 5种格式！"),!1):!(t.size/1048576>3)||(this.$message.error("上传商品图片大小应小于3Mb"),!1)},handUploadone:function(t){var e=this,r=this.beforeUpload(t.file);if(r){this.loading=!0;var n=new FormData;n.append("file",t.file),Object(o["L"])(n).then((function(t){e.companyForm.wechatQrAttachmentId=t.data.attachmentInfoId,e.companyForm.wechatQrAttachmentUrl=t.data.attachmentUrl,setTimeout((function(){e.loading=!1}),2e3),e.$message.success("图片上传成功！")})).catch((function(t){e.$message.error("图片上传失败！"+t),e.loading=!1}))}},handUploadtwo:function(t){var e=this,r=this.beforeUpload(t.file);if(r){this.loading=!0;var n=new FormData;n.append("file",t.file),Object(o["L"])(n).then((function(t){e.companyForm.enterpriseLogoAttachmentId=t.data.attachmentInfoId,e.companyForm.enterpriseLogoAttachmentUrl=t.data.attachmentUrl,setTimeout((function(){e.loading=!1}),2e3),e.$message.success("图片上传成功！")})).catch((function(t){e.$message.error("图片上传失败！"+t),e.loading=!1}))}},handleSubmit:function(t){var e=this;this.$refs[t].validate((function(r){if(!r)return!1;Object(o["m"])(e.companyForm).then((function(r){e.$message.success("提交成功！"),e.$refs[t].resetFields(),e.getSetting()}))}))},cancelForm:function(t){this.$refs[t].resetFields()}}},c=i,u=(r("7284"),r("2877")),l=Object(u["a"])(c,n,a,!1,null,null,null);e["default"]=l.exports},fa7d:function(t,e,r){}}]);