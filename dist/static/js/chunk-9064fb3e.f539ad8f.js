(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9064fb3e"],{"333d":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[a("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},n=[];a("c5f6");Math.easeInOutQuad=function(t,e,a,i){return t/=i/2,t<1?a/2*t*t+e:(t--,-a/2*(t*(t-2)-1)+e)};var r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function o(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function u(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(t,e,a){var i=u(),n=t-i,l=20,c=0;e="undefined"===typeof e?500:e;var s=function t(){c+=l;var u=Math.easeInOutQuad(c,i,n,e);o(u),c<e?r(t):a&&"function"===typeof a&&a()};s()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[8,10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&l(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},s=c,d=(a("3ad7"),a("2877")),m=Object(d["a"])(s,i,n,!1,null,"99833538",null);e["a"]=m.exports},"37cb":function(t,e,a){"use strict";a.d(e,"t",(function(){return n})),a.d(e,"B",(function(){return r})),a.d(e,"b",(function(){return o})),a.d(e,"n",(function(){return u})),a.d(e,"A",(function(){return l})),a.d(e,"h",(function(){return c})),a.d(e,"a",(function(){return s})),a.d(e,"k",(function(){return d})),a.d(e,"C",(function(){return m})),a.d(e,"g",(function(){return f})),a.d(e,"c",(function(){return b})),a.d(e,"s",(function(){return p})),a.d(e,"D",(function(){return h})),a.d(e,"L",(function(){return g})),a.d(e,"i",(function(){return q})),a.d(e,"j",(function(){return v})),a.d(e,"J",(function(){return y})),a.d(e,"o",(function(){return j})),a.d(e,"E",(function(){return I})),a.d(e,"v",(function(){return O})),a.d(e,"d",(function(){return w})),a.d(e,"e",(function(){return M})),a.d(e,"x",(function(){return C})),a.d(e,"I",(function(){return _})),a.d(e,"l",(function(){return F})),a.d(e,"f",(function(){return k})),a.d(e,"w",(function(){return L})),a.d(e,"u",(function(){return x})),a.d(e,"H",(function(){return $})),a.d(e,"K",(function(){return B})),a.d(e,"q",(function(){return S})),a.d(e,"y",(function(){return N})),a.d(e,"m",(function(){return z})),a.d(e,"G",(function(){return T})),a.d(e,"p",(function(){return V})),a.d(e,"z",(function(){return P})),a.d(e,"F",(function(){return U})),a.d(e,"r",(function(){return A}));var i=a("b775");function n(t){return Object(i["b"])({url:"qiqiao/article/findMyArticle",method:"get",params:t})}function r(t){return Object(i["b"])({url:"qiqiao/articleLabel/myArticleLabel",method:"get",params:t})}function o(t){return Object(i["b"])({url:"qiqiao/articleLabel",method:"post",data:t})}function u(t){return Object(i["b"])({url:"qiqiao/articleLabel",method:"put",data:t})}function l(t){return Object(i["b"])({url:"qiqiao/articleLabel/"+t,method:"get"})}function c(t){return Object(i["b"])({url:"qiqiao/articleLabel",method:"delete",data:t})}function s(t){return Object(i["b"])({url:"qiqiao/article",method:"post",data:t})}function d(t){return Object(i["b"])({url:"qiqiao/article",method:"put",data:t})}function m(){return Object(i["b"])({url:"qiqiao/articleLabel/myArticleLabelList",method:"get"})}function f(t){return Object(i["b"])({url:"qiqiao/article/deleteByArticleIdList",method:"delete",data:t})}function b(t){return Object(i["b"])({url:"qiqiao/article/"+t,method:"delete"})}function p(t){return Object(i["b"])({url:"qiqiao/article/"+t,method:"get"})}function h(t){return Object(i["b"])({url:"qiqiao/attachmentMaterial/findByPage",method:"get",params:t})}function g(t){return Object(i["b"])({url:"distributedFileSystem/attachmentInfo/upload",method:"post",data:t})}function q(t){return Object(i["b"])({url:"qiqiao/attachmentMaterial/"+t,method:"delete"})}function v(t){return Object(i["b"])({url:"qiqiao/attachmentMaterial/deleteByMaterialIdList",method:"delete",data:t})}function y(t){return Object(i["b"])({url:"qiqiao/attachmentMaterial",method:"post",data:t})}function j(t){return Object(i["b"])({url:"qiqiao/attachmentMaterial",method:"put",data:t})}function I(t){return Object(i["b"])({url:"qiqiao/attachmentMaterial/list",method:"get",params:t})}function O(t){return Object(i["b"])({url:"qiqiao/banner/myBanner",method:"get",params:t})}function w(t){return Object(i["b"])({url:"qiqiao/banner",method:"delete",data:t})}function M(t){return Object(i["b"])({url:"qiqiao/bannerDetail/"+t,method:"delete"})}function C(t){return Object(i["b"])({url:"qiqiao/friendshipLink/findByPage",method:"get",params:t})}function _(t){return Object(i["b"])({url:"qiqiao/friendshipLink",method:"post",data:t})}function F(t){return Object(i["b"])({url:"qiqiao/friendshipLink",method:"put",data:t})}function k(t){return Object(i["b"])({url:"qiqiao/friendshipLink",method:"delete",data:t})}function L(t){return Object(i["b"])({url:"qiqiao/friendshipLink/"+t,method:"get"})}function x(t){return Object(i["b"])({url:"qiqiao/banner/findBannerWithDetailByBannerId/"+t,method:"get"})}function $(t){return Object(i["b"])({url:"qiqiao/banner",method:"post",data:t})}function B(t){return Object(i["b"])({url:"qiqiao/bannerDetail",method:"post",data:t})}function S(t){return Object(i["b"])({url:"qiqiao/bannerDetail",method:"put",data:t})}function N(){return Object(i["b"])({url:"qiqiao/basicInfo/enterpriseBasicInfo",method:"get"})}function z(t){return Object(i["b"])({url:"qiqiao/basicInfo/enterpriseBasicInfo",method:"put",data:t})}function T(){return Object(i["b"])({url:"qiqiao/websiteTemplate/list",method:"get"})}function V(t){return Object(i["b"])({url:"qiqiao/websiteTemplate/currentWebsiteTemplate/"+t,method:"put"})}function P(){return Object(i["b"])({url:"qiqiao/attachmentMaterial/attachmentMaterialAmount",method:"get"})}function U(){return Object(i["b"])({url:"qiqiao/websiteTemplate/templateAmount",method:"get"})}function A(){return Object(i["b"])({url:"qiqiao/article/articleAmount",method:"get"})}},"39a6":function(t,e,a){},"3ad7":function(t,e,a){"use strict";var i=a("39a6"),n=a.n(i);n.a},"475d":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container userview"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("div",[t._v("\n        "+t._s(t.viewtitle)+"\n      ")]),t._v(" "),a("el-button",{staticClass:"cardBtn",attrs:{type:"primary",disabled:t.btnload},on:{click:function(e){return t.handleSubmit("editForm")}}},[t._v("立即提交")])],1),t._v(" "),a("div",{staticClass:"user-message"},[a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],ref:"editForm",attrs:{model:t.editForm,rules:t.rules,"label-width":"160px"}},[a("div",{staticClass:"userInfo_main dpyflex"},[a("div",{staticClass:"formContent"},[a("el-form-item",{attrs:{label:"封面图:",prop:"attachmentMaterialId"}},[a("el-button",{on:{click:t.openMedia}},[t._v("点击选择轮播图图片封面图")]),t._v(" "),t.editForm.attachmentMaterialId?a("span",{staticStyle:{"margin-left":"15px",color:"#67c23a",cursor:"pointer"},attrs:{title:"点击查看图片"},on:{click:function(e){return t.showImg(t.editForm.attachmentMaterialId)}}},[a("i",{staticClass:"el-icon-circle-check"}),t._v(" "+t._s(t.imgVal))]):a("span",{staticStyle:{"margin-left":"15px",color:"#e6a23c"}},[a("i",{staticClass:"el-icon-remove-outline"}),t._v("暂无封面图")])],1),t._v(" "),a("el-form-item",{staticClass:"lg_input",attrs:{label:"轮播图图片标题:",prop:"title"}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入轮播图图片标题",autocomplete:"off"},model:{value:t.editForm.title,callback:function(e){t.$set(t.editForm,"title","string"===typeof e?e.trim():e)},expression:"editForm.title"}})],1),t._v(" "),a("el-form-item",{staticClass:"lg_input",attrs:{label:"轮播图图片副标题:",prop:"subtitle"}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入轮播图图片副标题",autocomplete:"off"},model:{value:t.editForm.subtitle,callback:function(e){t.$set(t.editForm,"subtitle","string"===typeof e?e.trim():e)},expression:"editForm.subtitle"}})],1),t._v(" "),a("el-form-item",{staticClass:"lg_input",staticStyle:{"margin-bottom":"0px"},attrs:{label:"轮播图图片跳转链接:",prop:"redirectUrl"}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入轮播图图片跳转链接",autocomplete:"off"},model:{value:t.editForm.redirectUrl,callback:function(e){t.$set(t.editForm,"redirectUrl","string"===typeof e?e.trim():e)},expression:"editForm.redirectUrl"}})],1)],1)])])],1)]),t._v(" "),a("el-dialog",{staticClass:"imgForm",attrs:{title:"选择图片",visible:t.dialogVisible,width:"60%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"上传图片",name:"first"}},[a("el-upload",{staticClass:"avatar-uploader",staticStyle:{margin:"auto"},attrs:{action:"#","show-file-list":!1,"http-request":t.handUpload,accept:".jpg, .jpeg, .png, .gif, .bmp"}},[t.source_url?a("img",{staticClass:"avatar",attrs:{src:t.source_url}}):a("div",{staticClass:"avatar-uploader-icon"},[t._v("点击上传封面图")])])],1),t._v(" "),a("el-tab-pane",{attrs:{label:"媒体库",name:"last"}},[a("el-row",{attrs:{gutter:15}},t._l(t.mediaData,(function(e,i){return a("el-col",{key:i,staticStyle:{"margin-bottom":"10px"},attrs:{span:6}},[a("el-card",{class:t.currentClass(i),attrs:{"body-style":{padding:"2px"}}},[a("div",{staticClass:"center-image",style:{backgroundImage:"url("+e.attachmentUrl+")"},on:{click:function(a){return t.setActive(e,i)}}})])],1)})),1),t._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total > 0"}],attrs:{total:t.total,page:t.queryparameters.page,limit:t.queryparameters.size},on:{"update:page":function(e){return t.$set(t.queryparameters,"page",e)},"update:limit":function(e){return t.$set(t.queryparameters,"size",e)},pagination:t.getMediaCenterByPage}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",loading:t.btnload},on:{click:t.setattachmentMaterialId}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{staticClass:"imgForm",attrs:{title:"显示封面图片",visible:t.dialogImgVisible,width:"60%"},on:{"update:visible":function(e){t.dialogImgVisible=e}}},[a("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.imgUrl}})])],1)},n=[],r=(a("7f7f"),a("ac6a"),a("333d")),o=a("37cb"),u={components:{Pagination:r["a"]},data:function(){return{imgVal:"",imgUrl:"",dialogImgVisible:!1,currentNumber:-1,mediaId:"",uploadId:"",postVal:!0,activeName:"first",questForm:{attachmentType:2},mediaData:[],mediacountData:[],total:0,queryparameters:{attachmentType:2,size:8,page:1},addMedisForm:{},source_url:"",dialogVisible:!1,viewtitle:"",btnload:!1,listLoading:!1,viewId:"",bannerName:"",remarks:null,editForm:{title:null,subtitle:null,redirectUrl:null,attachmentMaterialId:null},rules:{title:{required:!0,message:"请输入轮播图图片标题",trigger:"blur"},subtitle:{required:!0,message:"请输入轮播图图片副标题",trigger:"blur"},redirectUrl:{required:!0,message:"请输入轮播图图片跳转链接",trigger:"blur"},attachmentMaterialId:{required:!0,message:"请选择轮播图图片",trigger:"blur"}}}},created:function(){var t=this.$route.query;t.title&&(this.viewtitle="新增【"+t.title+"】中的的轮播图图片信息",this.bannerName=t.title,this.remarks=t.remarks,t.bannerId&&(this.viewId=t.bannerId)),this.getMediaCenterByPage(),this.getMediaTotal()},methods:{addMedis:function(){var t=this;Object(o["J"])(this.addMedisForm).then((function(e){t.btnload=!1,t.listLoading=!1,t.uploadId=e.data,t.$message.success("图片上传成功！"),t.getMediaTotal(),t.getMediaCenterByPage()})).catch((function(e){t.source_url="",t.listLoading=!1,t.btnload=!1,t.imgVal=""}))},showImg:function(t){this.imgUrl=this.formatMedia(t).attachmentUrl,this.dialogImgVisible=!0},currentClass:function(t){return[this.currentNumber===t?"imgActive":""]},setActive:function(t,e){this.imgVal=t.attachmentName,this.mediaId=t.attachmentMaterialInfoId,this.currentNumber=e},handleClick:function(t,e){var a=this;"0"===t.index?a.postVal=!0:(a.getMediaCenterByPage(),a.postVal=!1)},setattachmentMaterialId:function(){this.postVal?this.editForm.attachmentMaterialId=this.uploadId:this.editForm.attachmentMaterialId=this.mediaId,this.dialogVisible=!1,this.uploadId=0,this.mediaId=0,this.currentNumber=-1},formatMedia:function(t){var e={},a=this;return a.mediacountData.forEach((function(a){a.attachmentMaterialInfoId===t&&(e=a)})),e},beforeUpload:function(t){var e=t.name.lastIndexOf("."),a=t.name.substring(e,t.name.length),i=[".gif",".jpeg",".png",".bmp",".jpg"];return i.indexOf(a.toLowerCase())<=-1?(this.$message.error("商品图片仅支持 gif、 jpeg、 png、 bmp、jpg 5种格式！"),!1):!(t.size/1048576>5)||(this.$message.error("上传商品图片大小应小于5Mb"),!1)},handUpload:function(t){var e=this,a=this.beforeUpload(t.file);if(a){this.btnload=!0,this.listLoading=!0;var i=new FormData;i.append("file",t.file),Object(o["L"])(i).then((function(t){e.addMedisForm.attachmentId=t.data.attachmentInfoId,e.addMedisForm.title=t.data.attachmentName.slice(0,60),e.source_url=t.data.attachmentUrl,e.imgVal=t.data.attachmentName.slice(0,60),e.addMedis()})).catch((function(t){e.$message.error("图片上传失败！"+t),e.listLoading=!1,e.btnload=!1}))}},getMediaTotal:function(){var t=this;return new Promise((function(e,a){Object(o["E"])(t.questForm).then((function(a){t.mediacountData=a.data,e(t.mediacountData)}))}))},getMediaCenterByPage:function(){var t=this;Object(o["D"])(this.queryparameters).then((function(e){t.mediaData=e.data.content,t.total=e.data.total}))},openMedia:function(){this.dialogVisible=!0},handleSubmit:function(t){var e=this;this.$refs[t].validate((function(a){if(!a)return!1;if(e.btnload=!0,e.listLoading=!0,e.viewId)e.editForm.bannerId=e.viewId,Object(o["K"])(e.editForm).then((function(a){e.$message.success("轮播图图片添加成功"),e.$confirm("轮播图图片添加成功, 是否继续添加?","提示",{confirmButtonText:"继续添加该轮播图集合下轮播图片",cancelButtonText:"返回轮播图集合列表页",type:"warning"}).then((function(){e.listLoading=!1,e.btnload=!1,e.$refs[t].resetFields()})).catch((function(){e.$router.push({path:"/picture"})}))})).catch((function(){e.listLoading=!1}));else{var i=[];i.push(e.editForm);var n={bannerName:e.bannerName,remarks:e.remarks,bannerDetailList:i};Object(o["H"])(n).then((function(a){e.$message.success("轮播图图片添加成功"),e.$confirm("轮播图图片添加成功, 是否继续添加?","提示",{confirmButtonText:"继续添加该轮播图集合下轮播图片",cancelButtonText:"返回轮播图集合列表页",type:"warning"}).then((function(){e.listLoading=!1,e.btnload=!1,e.$refs[t].resetFields(),e.viewId=a.data})).catch((function(){e.$router.push({path:"/picture"})}))})).catch((function(){e.listLoading=!1}))}}))}}},l=u,c=a("2877"),s=Object(c["a"])(l,i,n,!1,null,null,null);e["default"]=s.exports}}]);