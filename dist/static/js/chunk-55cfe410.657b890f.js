(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-55cfe410"],{"0816":function(t,e,n){},"1a7f":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("section",{staticClass:"breadcrumb-area breadcrumb-bg",style:"background-image: url("+t.bannerInfo.attachmentUrl+")",on:{click:t.toEditMaterial}},[n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12"},[n("div",{staticClass:"breadcrumb-content text-center"},[n("h2",[t._v(t._s(t.bannerInfo.title))])])])])])]),t._v(" "),n("section",{staticClass:"blog-area gray-bg pt-60 pb-60",attrs:{id:"newlist"},on:{click:function(e){return e.preventDefault(),t.toArticle(t.oneView.websiteElementId)}}},[n("div",{staticClass:"container"},[n("el-row",{attrs:{gutter:10}},[n("el-col",{attrs:{span:6}},[n("aside",{staticClass:"blog-sidebar"},[n("div",{staticClass:"widget mb-30"},[n("div",{staticClass:"single-sidebar white-bg"},[n("div",{staticClass:"sidebar-title mb-25"},[n("el-button",{on:{click:function(e){return e.stopPropagation(),t.saveModels(e)}}},[t._v("点击增加分类模块")])],1),t._v(" "),n("div",{staticClass:"cat-list"},[n("ul",t._l(t.titleList,(function(e,i){return n("div",{key:i},[1!==e.isDeleted?n("li",{on:{click:function(n){return n.stopPropagation(),t.toArticle(e.id)}}},[n("a",{class:e.id===t.oneView.websiteElementId?"isactive":"",on:{click:function(n){return n.stopPropagation(),t.toArticle(e.id)}}},[n("i",{staticClass:"fas fa-caret-right"}),t._v(" "+t._s(e.title))])]):t._e()])})),0)])])])])]),t._v(" "),n("el-col",{attrs:{span:18}},t._l(t.oneView.children,(function(e,i){return n("div",{key:i},[n("div",{directives:[{name:"show",rawName:"v-show",value:0===t.oneView.isDeleted,expression:"oneView.isDeleted===0"}],staticClass:"classic-blog-post mb-20"},[n("div",{staticClass:"blog-thumb"},[n("a",{attrs:{href:"#",target:"_blank"}},[n("img",{attrs:{src:e.coverAttachmentUrl,alt:"img"}})])]),t._v(" "),n("el-col",{staticClass:"blog-content",attrs:{span:24}},[n("div",{staticClass:"classic-blog-tag mb-10"},[n("ul",[n("li",[n("i",{staticClass:"el-icon-user-solid"})]),t._v(" "),n("li",{staticClass:"avatar"},[t._v(t._s(e.articleAuthor))])])]),t._v(" "),n("h4",[n("a",{attrs:{href:"#",target:"_blank"}},[t._v(t._s(e.articleTitle))])]),t._v(" "),n("p",[t._v(t._s(e.articleDescription))]),t._v(" "),n("div",{staticClass:"classic-blog-meta"},[n("ul",[n("li",{staticClass:"blog-post-date"},[n("i",{staticClass:"far fa-clock"}),t._v(t._s(e.createTime)+"\n                    ")]),t._v(" "),n("li",{staticClass:"blog-more-read"},[n("a",{attrs:{href:"#",target:"_blank"}},[t._v("READ MORE")])])])])])],1)])})),0)],1)],1)])])},a=[],r=(n("7514"),n("23e3")),s={inject:["reload"],data:function(){return{bannerInfo:{},titleList:[],dataForm:{websiteTemplateId:1,parentElementId:70},websiteElementIdVal:"",oneView:{},listData:[]}},mounted:function(){this.getTree()},methods:{saveModels:function(){var t=this,e={parentElementId:this.dataForm.parentElementId};Object(r["k"])(e).then((function(e){t.$message.success("新增成功，快去点击标签名添加内容吧！"),t.getTree()}))},toEditMaterial:function(){this.$parent.dialogMaterial=!0,this.$parent.getMaterialList(),this.$parent.editWebsiteElementId=this.bannerInfo.websiteElementId},toArticle:function(t){var e=this;this.websiteElementIdVal=t,Object(r["d"])(t).then((function(t){e.oneView=t.data,e.$parent.dialogArticle=!0,e.$parent.articleForm=t.data,e.$parent.srcList=t.data.children.map((function(t){return t.coverAttachmentUrl})),e.$parent.editWebsiteElementId=t.data.websiteElementId}))},getTree:function(){var t=this,e=this;Object(r["j"])(e.dataForm).then((function(n){var i=n.data[0];Object(r["g"])(i.children[0].websiteElementId).then((function(t){e.bannerInfo=t.data.children[0],e.bannerInfo.id=i.children[0].websiteElementId})),e.titleList=[];for(var a=1;a<i.children.length;a++){var s={id:i.children[a].websiteElementId,title:i.children[a].title,isDeleted:i.children[a].isDeleted};e.titleList.push(s)}if(t.websiteElementIdVal)t.getList(t.websiteElementIdVal);else{var l=i.children.slice(1).find((function(t){return 1!==t.isDeleted}));t.getList(l.websiteElementId)}}))},getList:function(t){var e=this;Object(r["d"])(t).then((function(t){e.oneView=t.data}))}}},l=s,c=(n("af5e"),n("2877")),o=Object(c["a"])(l,i,a,!1,null,"4e6f46bd",null);e["default"]=o.exports},"23e3":function(t,e,n){"use strict";n.d(e,"h",(function(){return a})),n.d(e,"j",(function(){return r})),n.d(e,"e",(function(){return s})),n.d(e,"f",(function(){return l})),n.d(e,"g",(function(){return c})),n.d(e,"d",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"n",(function(){return d})),n.d(e,"b",(function(){return b})),n.d(e,"m",(function(){return f})),n.d(e,"p",(function(){return m})),n.d(e,"q",(function(){return h})),n.d(e,"l",(function(){return g})),n.d(e,"o",(function(){return v})),n.d(e,"i",(function(){return p})),n.d(e,"k",(function(){return w})),n.d(e,"a",(function(){return E}));var i=n("b775");function a(t){return Object(i["b"])({url:"qiqiao/websiteElement/getMenuBarList/"+t,method:"get"})}function r(t){return Object(i["b"])({url:"qiqiao/websiteElement/getTree",method:"get",params:t})}function s(t){return Object(i["b"])({url:"qiqiao/websiteElement/bannerByModule/"+t,method:"get"})}function l(t){return Object(i["b"])({url:"qiqiao/banner/findByPage",method:"get",params:t})}function c(t){return Object(i["b"])({url:"qiqiao/websiteElement/attachmentMaterialByModule/"+t,method:"get"})}function o(t){return Object(i["b"])({url:"qiqiao/websiteElement/articleByModule/"+t,method:"get"})}function u(t){return Object(i["b"])({url:"qiqiao/article/findMyArticle",method:"get",params:t})}function d(t,e){return Object(i["b"])({url:"qiqiao/websiteElement/updateBannerModule/"+t+"/"+e,method:"put"})}function b(t){return Object(i["b"])({url:"qiqiao/attachmentMaterial/findByPage",method:"get",params:t})}function f(t,e,n){return Object(i["b"])({url:"qiqiao/websiteElement/updateArticleRegion/"+t+"/"+e,method:"put",articleId:n})}function m(t,e){return Object(i["b"])({url:"qiqiao/websiteElement/updateAttachmentMaterialRegion/"+t+"/"+e,method:"put"})}function h(t){return Object(i["b"])({url:"qiqiao/websiteElement/updateMetaDataOfElement/",method:"put",data:t})}function g(t){return Object(i["b"])({url:"qiqiao/websiteElement/saveRegion",method:"post",data:t})}function v(t){return Object(i["b"])({url:"qiqiao/websiteElement/updateIsDeleted/"+t,method:"put"})}function p(t){return Object(i["b"])({url:"qiqiao/websiteElement/getTreeForManagement/"+t,method:"get"})}function w(t){return Object(i["b"])({url:"qiqiao/websiteElement/saveModule",method:"post",data:t})}function E(t){return Object(i["b"])({url:"qiqiao/websiteElement/region/"+t,method:"delete"})}},7514:function(t,e,n){"use strict";var i=n("5ca1"),a=n("0a49")(5),r="find",s=!0;r in[]&&Array(1)[r]((function(){s=!1})),i(i.P+i.F*s,"Array",{find:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")(r)},af5e:function(t,e,n){"use strict";var i=n("0816"),a=n.n(i);a.a}}]);