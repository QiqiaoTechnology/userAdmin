(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67e3a67f"],{"173b":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("header",{attrs:{id:"home"}},[t._m(0),t._v(" "),i("nav",{staticClass:"navbar nav-transparent",attrs:{id:"nav"}},[i("div",{staticClass:"container"},[i("div",{staticClass:"navbar-header"},[i("div",{staticClass:"navbar-brand"},[i("a",{attrs:{href:"index.html"}},[i("img",{staticClass:"logo",attrs:{src:t.companyForm.enterpriseLogoAttachmentUrl,alt:"logo"}}),t._v(" "),i("img",{staticClass:"logo-alt",attrs:{src:t.companyForm.enterpriseLogoAttachmentUrl,alt:"logo"}})])]),t._v(" "),t._m(1)]),t._v(" "),i("ul",{staticClass:"main-nav nav navbar-nav navbar-right"},[t._m(2),t._v(" "),t._l(t.titleList,(function(e,n){return i("li",{key:n},[1!==e.isDeleted?i("a",{attrs:{href:"#"+e.websiteElementId}},[t._v(t._s(e.title))]):t._e()])}))],2)])]),t._v(" "),i("section",{staticClass:"home-wrapper",on:{click:function(e){return t.toBannerEdit(t.bannerInfo)}}},[i("el-carousel",{attrs:{trigger:"click",height:"100vh"}},t._l(t.bannerInfo.bannerDetailList,(function(e,n){return i("el-carousel-item",{key:n},[i("img",{attrs:{src:e.attachmentUrl,width:"100%"}}),t._v(" "),i("div",{staticClass:"home-content"},[i("h1",{staticClass:"white-text"},[t._v(t._s(e.title))]),t._v(" "),i("p",{staticClass:"white-text"},[t._v(t._s(e.subtitle)+"\n            ")])])])})),1)],1)]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0===t.oneView.isDeleted,expression:"oneView.isDeleted===0"}],staticClass:"section md-padding bg-grey",attrs:{id:t.oneView.websiteElementId},on:{click:function(e){return t.toArticle(t.oneView)}}},[i("div",{staticClass:"container"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-6"},[i("div",{staticClass:"section-header"},[i("h2",{staticClass:"title"},[t._v(t._s(t.oneView.title))])]),t._v(" "),i("h3",[t._v(t._s(t.oneViewDS.articleTitle))]),t._v(" "),i("p",[t._v(t._s(t.oneViewDS.articleDescription))])]),t._v(" "),i("div",{staticClass:"col-md-6"},[i("img",{attrs:{src:t.oneViewDS.coverAttachmentUrl,alt:""}})])])])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0===t.twoView.isDeleted,expression:"twoView.isDeleted===0"}],staticClass:"section md-padding",attrs:{id:t.twoView.websiteElementId},on:{click:function(e){return t.toArticle(t.twoView)}}},[i("div",{staticClass:"container"},[i("div",{staticClass:"row"},[i("div",{staticClass:"section-header text-center"},[i("h2",{staticClass:"title"},[t._v(t._s(t.twoView.title))])]),t._v(" "),t._l(t.twoView.children,(function(e,n){return i("div",{key:n,staticClass:"col-md-4"},[i("div",{staticClass:"about"},[i("img",{attrs:{src:e.coverAttachmentUrl}}),t._v(" "),i("h3",[t._v(t._s(e.articleTitle))]),t._v(" "),i("p",[t._v(t._s(e.articleDescription))])])])}))],2)])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0===t.threeView.isDeleted,expression:"threeView.isDeleted===0"}],staticClass:"section md-padding bg-grey",attrs:{id:t.threeView.websiteElementId},on:{click:function(e){return t.toArticle(t.threeView)}}},[i("div",{staticClass:"container"},[i("div",{staticClass:"row"},[i("div",{staticClass:"section-header text-center"},[i("h2",{staticClass:"title"},[t._v(t._s(t.threeView.title))])]),t._v(" "),t._l(t.threeView.children,(function(e,n){return i("div",{key:n,staticClass:"col-md-4 col-xs-6 work"},[i("img",{staticClass:"img-responsive",attrs:{src:e.coverAttachmentUrl,alt:""}}),t._v(" "),i("div",{staticClass:"overlay"}),t._v(" "),i("div",{staticClass:"work-content"},[i("span",[t._v(t._s(e.articleTitle))]),t._v(" "),i("h3",[t._v(t._s(e.articleDescription))])])])}))],2)])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0===t.fourView.isDeleted,expression:"fourView.isDeleted===0"}],staticClass:"section md-padding",attrs:{id:t.fourView.websiteElementId},on:{click:function(e){return t.toArticle(t.fourView)}}},[i("div",{staticClass:"container"},[i("div",{staticClass:"row"},[i("div",{staticClass:"section-header text-center"},[i("h2",{staticClass:"title"},[t._v(t._s(t.fourView.title))])]),t._v(" "),t._l(t.fourView.children,(function(e,n){return i("div",{key:n,staticClass:"col-sm-4"},[i("div",{staticClass:"team"},[i("div",{staticClass:"team-img"},[i("img",{staticClass:"img-responsive",attrs:{src:e.coverAttachmentUrl,alt:""}}),t._v(" "),i("div",{staticClass:"overlay"})]),t._v(" "),i("div",{staticClass:"team-content"},[i("h3",[t._v(t._s(e.articleTitle))]),t._v(" "),i("span",[t._v(t._s(e.articleDescription))])])])])}))],2)])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0===t.fiveView.isDeleted,expression:"fiveView.isDeleted===0"}],staticClass:"section md-padding bg-grey",attrs:{id:t.fiveView.websiteElementId},on:{click:function(e){return t.toArticle(t.fiveView)}}},[i("div",{staticClass:"container"},[i("div",{staticClass:"row"},[i("div",{staticClass:"section-header text-center"},[i("h2",{staticClass:"title"},[t._v(t._s(t.fiveView.title))])]),t._v(" "),t._l(t.fiveView.children,(function(e,n){return i("div",{key:n,staticClass:"col-md-4"},[i("div",{staticClass:"blog"},[i("div",{staticClass:"blog-img"},[i("img",{staticClass:"img-responsive",attrs:{src:e.coverAttachmentUrl,alt:""}})]),t._v(" "),i("div",{staticClass:"blog-content"},[i("ul",{staticClass:"blog-meta"},[e.articleAuthor?i("li",[i("i",{staticClass:"el-icon-user-solid"}),t._v(t._s(e.articleAuthor))]):t._e(),t._v(" "),i("li",[i("i",{staticClass:"el-icon-date"}),t._v(t._s(e.createTime))])]),t._v(" "),i("h3",[t._v(t._s(e.articleTitle))]),t._v(" "),i("p",[t._v(t._s(e.articleDescription))])])])])}))],2)])]),t._v(" "),i("div",{staticClass:"section md-padding",attrs:{id:"contact"}},[i("div",{staticClass:"container"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-sm-4"},[i("div",{staticClass:"contact"},[i("i",{staticClass:"el-icon-mobile"}),t._v(" "),i("h3",[t._v("Phone")]),t._v(" "),i("p",[t._v(t._s(t.companyForm.contactPhone))])])]),t._v(" "),i("div",{staticClass:"col-sm-4"},[i("div",{staticClass:"contact"},[i("i",{staticClass:"el-icon-message"}),t._v(" "),i("h3",[t._v("Email")]),t._v(" "),i("p",[t._v(t._s(t.companyForm.enterpriseEmail))])])]),t._v(" "),i("div",{staticClass:"col-sm-4"},[i("div",{staticClass:"contact"},[i("i",{staticClass:"el-icon-position"}),t._v(" "),i("h3",[t._v("Address")]),t._v(" "),i("p",[t._v(t._s(t.companyForm.enterpriseAddress))])])])])])]),t._v(" "),i("footer",{staticClass:"sm-padding bg-dark",attrs:{id:"footer"}},[i("div",{staticClass:"container"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-12"},[i("div",{staticClass:"footer-logo"},[i("a",{attrs:{href:"#"}},[i("img",{attrs:{src:t.companyForm.enterpriseLogoAttachmentUrl,alt:"logo"}})])]),t._v(" "),i("ul",{staticClass:"footer-follow"},t._l(t.linkList,(function(e,n){return i("li",{key:n},[i("a",{attrs:{href:e.redirectUrl}},[t._v(t._s(e.title))])])})),0),t._v(" "),t._m(3)])])])]),t._v(" "),i("div",{attrs:{id:"back-to-top"}})])},r=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"bg-img",staticStyle:{"background-image":"url('../img/background1.jpg')"}},[i("div",{staticClass:"overlay"})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"nav-collapse"},[i("span")])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("li",[i("a",{attrs:{href:"#"}},[t._v("首页")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"footer-copyright"},[i("p",[t._v("Copyright 东莞七巧网络科技有限公司")])])}],a=i("23e3"),s=i("37cb"),c={name:"Home",data:function(){return{companyForm:{},linkList:[],titleList:[],bannerInfo:[],oneViewDS:{},dataForm:{websiteTemplateId:2,parentElementId:501},oneView:{},twoView:{},threeView:{},fourView:{},fiveView:{}}},created:function(){this.getEnterpriseInfo(),this.getBasicColumnList(),this.getTree()},methods:{getEnterpriseInfo:function(){var t=this;Object(s["y"])().then((function(e){t.companyForm=e.data}))},getBasicColumnList:function(){var t=this,e={page:1,size:10};Object(s["x"])(e).then((function(e){t.linkList=e.data.content}))},toBannerEdit:function(t){this.$parent.dialog=!0,this.$parent.itemForm=this.bannerInfo,this.$parent.bannerEdit=!1,this.$parent.srcList=this.bannerInfo.bannerDetailList.map((function(t){return t.attachmentUrl})),this.$parent.editWebsiteElementId=this.bannerInfo.id},toArticle:function(t){this.$parent.dialogArticle=!0,this.$parent.articleForm=t,this.$parent.srcList=t.children.map((function(t){return t.coverAttachmentUrl})),this.$parent.editWebsiteElementId=t.id},getTree:function(){var t=this;Object(a["j"])(t.dataForm).then((function(e){var i=e.data[0];t.titleList=[];for(var n=1;n<i.children.length;n++){var r={websiteElementId:i.children[n].websiteElementId,title:i.children[n].title,isDeleted:i.children[n].isDeleted};t.titleList.push(r)}Object(a["e"])(i.children[0].websiteElementId).then((function(e){t.bannerInfo=e.data.children,t.bannerInfo.id=i.children[0].websiteElementId})),Object(a["d"])(i.children[1].websiteElementId).then((function(e){t.oneView=e.data,t.oneViewDS=e.data.children[0],t.oneView.id=i.children[1].websiteElementId})),Object(a["d"])(i.children[2].websiteElementId).then((function(e){t.twoView=e.data,t.twoView.id=i.children[2].websiteElementId})),Object(a["d"])(i.children[3].websiteElementId).then((function(e){t.threeView=e.data,t.threeView.id=i.children[3].websiteElementId})),Object(a["d"])(i.children[4].websiteElementId).then((function(e){t.fourView=e.data,t.fourView.id=i.children[4].websiteElementId})),Object(a["d"])(i.children[5].websiteElementId).then((function(e){t.fiveView=e.data,t.fiveView.id=i.children[5].websiteElementId}))}))}}},o=c,l=i("2877"),u=Object(l["a"])(o,n,r,!1,null,"b504a180",null);e["default"]=u.exports},"23e3":function(t,e,i){"use strict";i.d(e,"h",(function(){return r})),i.d(e,"j",(function(){return a})),i.d(e,"e",(function(){return s})),i.d(e,"f",(function(){return c})),i.d(e,"g",(function(){return o})),i.d(e,"d",(function(){return l})),i.d(e,"c",(function(){return u})),i.d(e,"n",(function(){return d})),i.d(e,"b",(function(){return m})),i.d(e,"m",(function(){return b})),i.d(e,"p",(function(){return f})),i.d(e,"q",(function(){return h})),i.d(e,"l",(function(){return v})),i.d(e,"o",(function(){return w})),i.d(e,"i",(function(){return p})),i.d(e,"k",(function(){return _})),i.d(e,"a",(function(){return q}));var n=i("b775");function r(t){return Object(n["b"])({url:"qiqiao/websiteElement/getMenuBarList/"+t,method:"get"})}function a(t){return Object(n["b"])({url:"qiqiao/websiteElement/getTree",method:"get",params:t})}function s(t){return Object(n["b"])({url:"qiqiao/websiteElement/bannerByModule/"+t,method:"get"})}function c(t){return Object(n["b"])({url:"qiqiao/banner/findByPage",method:"get",params:t})}function o(t){return Object(n["b"])({url:"qiqiao/websiteElement/attachmentMaterialByModule/"+t,method:"get"})}function l(t){return Object(n["b"])({url:"qiqiao/websiteElement/articleByModule/"+t,method:"get"})}function u(t){return Object(n["b"])({url:"qiqiao/article/findMyArticle",method:"get",params:t})}function d(t,e){return Object(n["b"])({url:"qiqiao/websiteElement/updateBannerModule/"+t+"/"+e,method:"put"})}function m(t){return Object(n["b"])({url:"qiqiao/attachmentMaterial/findByPage",method:"get",params:t})}function b(t,e,i){return Object(n["b"])({url:"qiqiao/websiteElement/updateArticleRegion/"+t+"/"+e,method:"put",articleId:i})}function f(t,e){return Object(n["b"])({url:"qiqiao/websiteElement/updateAttachmentMaterialRegion/"+t+"/"+e,method:"put"})}function h(t){return Object(n["b"])({url:"qiqiao/websiteElement/updateMetaDataOfElement/",method:"put",data:t})}function v(t){return Object(n["b"])({url:"qiqiao/websiteElement/saveRegion",method:"post",data:t})}function w(t){return Object(n["b"])({url:"qiqiao/websiteElement/updateIsDeleted/"+t,method:"put"})}function p(t){return Object(n["b"])({url:"qiqiao/websiteElement/getTreeForManagement/"+t,method:"get"})}function _(t){return Object(n["b"])({url:"qiqiao/websiteElement/saveModule",method:"post",data:t})}function q(t){return Object(n["b"])({url:"qiqiao/websiteElement/region/"+t,method:"delete"})}},"37cb":function(t,e,i){"use strict";i.d(e,"t",(function(){return r})),i.d(e,"B",(function(){return a})),i.d(e,"b",(function(){return s})),i.d(e,"n",(function(){return c})),i.d(e,"A",(function(){return o})),i.d(e,"h",(function(){return l})),i.d(e,"a",(function(){return u})),i.d(e,"k",(function(){return d})),i.d(e,"C",(function(){return m})),i.d(e,"g",(function(){return b})),i.d(e,"c",(function(){return f})),i.d(e,"s",(function(){return h})),i.d(e,"D",(function(){return v})),i.d(e,"L",(function(){return w})),i.d(e,"i",(function(){return p})),i.d(e,"j",(function(){return _})),i.d(e,"J",(function(){return q})),i.d(e,"o",(function(){return g})),i.d(e,"E",(function(){return C})),i.d(e,"v",(function(){return j})),i.d(e,"d",(function(){return O})),i.d(e,"e",(function(){return E})),i.d(e,"x",(function(){return V})),i.d(e,"I",(function(){return I})),i.d(e,"l",(function(){return y})),i.d(e,"f",(function(){return L})),i.d(e,"w",(function(){return k})),i.d(e,"u",(function(){return D})),i.d(e,"H",(function(){return A})),i.d(e,"K",(function(){return B})),i.d(e,"q",(function(){return M})),i.d(e,"y",(function(){return x})),i.d(e,"m",(function(){return F})),i.d(e,"G",(function(){return T})),i.d(e,"p",(function(){return $})),i.d(e,"z",(function(){return U})),i.d(e,"F",(function(){return S})),i.d(e,"r",(function(){return P}));var n=i("b775");function r(t){return Object(n["b"])({url:"qiqiao/article/findMyArticle",method:"get",params:t})}function a(t){return Object(n["b"])({url:"qiqiao/articleLabel/myArticleLabel",method:"get",params:t})}function s(t){return Object(n["b"])({url:"qiqiao/articleLabel",method:"post",data:t})}function c(t){return Object(n["b"])({url:"qiqiao/articleLabel",method:"put",data:t})}function o(t){return Object(n["b"])({url:"qiqiao/articleLabel/"+t,method:"get"})}function l(t){return Object(n["b"])({url:"qiqiao/articleLabel",method:"delete",data:t})}function u(t){return Object(n["b"])({url:"qiqiao/article",method:"post",data:t})}function d(t){return Object(n["b"])({url:"qiqiao/article",method:"put",data:t})}function m(){return Object(n["b"])({url:"qiqiao/articleLabel/myArticleLabelList",method:"get"})}function b(t){return Object(n["b"])({url:"qiqiao/article/deleteByArticleIdList",method:"delete",data:t})}function f(t){return Object(n["b"])({url:"qiqiao/article/"+t,method:"delete"})}function h(t){return Object(n["b"])({url:"qiqiao/article/"+t,method:"get"})}function v(t){return Object(n["b"])({url:"qiqiao/attachmentMaterial/findByPage",method:"get",params:t})}function w(t){return Object(n["b"])({url:"distributedFileSystem/attachmentInfo/upload",method:"post",data:t})}function p(t){return Object(n["b"])({url:"qiqiao/attachmentMaterial/"+t,method:"delete"})}function _(t){return Object(n["b"])({url:"qiqiao/attachmentMaterial/deleteByMaterialIdList",method:"delete",data:t})}function q(t){return Object(n["b"])({url:"qiqiao/attachmentMaterial",method:"post",data:t})}function g(t){return Object(n["b"])({url:"qiqiao/attachmentMaterial",method:"put",data:t})}function C(t){return Object(n["b"])({url:"qiqiao/attachmentMaterial/list",method:"get",params:t})}function j(t){return Object(n["b"])({url:"qiqiao/banner/myBanner",method:"get",params:t})}function O(t){return Object(n["b"])({url:"qiqiao/banner",method:"delete",data:t})}function E(t){return Object(n["b"])({url:"qiqiao/bannerDetail/"+t,method:"delete"})}function V(t){return Object(n["b"])({url:"qiqiao/friendshipLink/findByPage",method:"get",params:t})}function I(t){return Object(n["b"])({url:"qiqiao/friendshipLink",method:"post",data:t})}function y(t){return Object(n["b"])({url:"qiqiao/friendshipLink",method:"put",data:t})}function L(t){return Object(n["b"])({url:"qiqiao/friendshipLink",method:"delete",data:t})}function k(t){return Object(n["b"])({url:"qiqiao/friendshipLink/"+t,method:"get"})}function D(t){return Object(n["b"])({url:"qiqiao/banner/findBannerWithDetailByBannerId/"+t,method:"get"})}function A(t){return Object(n["b"])({url:"qiqiao/banner",method:"post",data:t})}function B(t){return Object(n["b"])({url:"qiqiao/bannerDetail",method:"post",data:t})}function M(t){return Object(n["b"])({url:"qiqiao/bannerDetail",method:"put",data:t})}function x(){return Object(n["b"])({url:"qiqiao/basicInfo/enterpriseBasicInfo",method:"get"})}function F(t){return Object(n["b"])({url:"qiqiao/basicInfo/enterpriseBasicInfo",method:"put",data:t})}function T(){return Object(n["b"])({url:"qiqiao/websiteTemplate/list",method:"get"})}function $(t){return Object(n["b"])({url:"qiqiao/websiteTemplate/currentWebsiteTemplate/"+t,method:"put"})}function U(){return Object(n["b"])({url:"qiqiao/attachmentMaterial/attachmentMaterialAmount",method:"get"})}function S(){return Object(n["b"])({url:"qiqiao/websiteTemplate/templateAmount",method:"get"})}function P(){return Object(n["b"])({url:"qiqiao/article/articleAmount",method:"get"})}}}]);