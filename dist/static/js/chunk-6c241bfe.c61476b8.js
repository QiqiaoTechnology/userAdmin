(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c241bfe"],{"08b3":function(e,t,n){},1338:function(e,t,n){"use strict";var i=n("08b3"),r=n.n(i);r.a},"23e3":function(e,t,n){"use strict";n.d(t,"h",(function(){return r})),n.d(t,"j",(function(){return o})),n.d(t,"e",(function(){return l})),n.d(t,"f",(function(){return a})),n.d(t,"g",(function(){return u})),n.d(t,"d",(function(){return s})),n.d(t,"c",(function(){return d})),n.d(t,"n",(function(){return c})),n.d(t,"b",(function(){return m})),n.d(t,"m",(function(){return b})),n.d(t,"p",(function(){return f})),n.d(t,"q",(function(){return p})),n.d(t,"l",(function(){return h})),n.d(t,"o",(function(){return g})),n.d(t,"i",(function(){return w})),n.d(t,"k",(function(){return v})),n.d(t,"a",(function(){return q}));var i=n("b775");function r(e){return Object(i["b"])({url:"qiqiao/websiteElement/getMenuBarList/"+e,method:"get"})}function o(e){return Object(i["b"])({url:"qiqiao/websiteElement/getTree",method:"get",params:e})}function l(e){return Object(i["b"])({url:"qiqiao/websiteElement/bannerByModule/"+e,method:"get"})}function a(e){return Object(i["b"])({url:"qiqiao/banner/findByPage",method:"get",params:e})}function u(e){return Object(i["b"])({url:"qiqiao/websiteElement/attachmentMaterialByModule/"+e,method:"get"})}function s(e){return Object(i["b"])({url:"qiqiao/websiteElement/articleByModule/"+e,method:"get"})}function d(e){return Object(i["b"])({url:"qiqiao/article/findMyArticle",method:"get",params:e})}function c(e,t){return Object(i["b"])({url:"qiqiao/websiteElement/updateBannerModule/"+e+"/"+t,method:"put"})}function m(e){return Object(i["b"])({url:"qiqiao/attachmentMaterial/findByPage",method:"get",params:e})}function b(e,t,n){return Object(i["b"])({url:"qiqiao/websiteElement/updateArticleRegion/"+e+"/"+t,method:"put",articleId:n})}function f(e,t){return Object(i["b"])({url:"qiqiao/websiteElement/updateAttachmentMaterialRegion/"+e+"/"+t,method:"put"})}function p(e){return Object(i["b"])({url:"qiqiao/websiteElement/updateMetaDataOfElement/",method:"put",data:e})}function h(e){return Object(i["b"])({url:"qiqiao/websiteElement/saveRegion",method:"post",data:e})}function g(e){return Object(i["b"])({url:"qiqiao/websiteElement/updateIsDeleted/"+e,method:"put"})}function w(e){return Object(i["b"])({url:"qiqiao/websiteElement/getTreeForManagement/"+e,method:"get"})}function v(e){return Object(i["b"])({url:"qiqiao/websiteElement/saveModule",method:"post",data:e})}function q(e){return Object(i["b"])({url:"qiqiao/websiteElement/region/"+e,method:"delete"})}},"9aee":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,border:"","row-key":"websiteElementId","default-expand-all":"","tree-props":{children:"children"}}},[n("el-table-column",{attrs:{label:"页面名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.title))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"状态",width:"70px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-switch",{attrs:{"active-value":0,"inactive-value":1,"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(n){return e.isActive(t.row)}},model:{value:t.row.isDeleted,callback:function(n){e.$set(t.row,"isDeleted",n)},expression:"scope.row.isDeleted"}})]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return e.editTitle(t.row)}}},[e._v("\n          修改标题\n        ")]),e._v(" "),n("el-button",{staticStyle:{color:"#23B3FF"},attrs:{type:"text"},on:{click:function(n){return e.handleView(t.row)}}},[e._v("\n          预览页面\n        ")]),e._v(" "),n("el-button",{staticStyle:{color:"#e6a23c"},attrs:{type:"text"},on:{click:function(n){return e.handleEdit(t.row)}}},[e._v("\n          去填充\n        ")])]}}])})],1),e._v(" "),n("el-dialog",{attrs:{"show-close":!1,"close-on-click-modal":!1,title:"修改名称",width:"40%",visible:e.dialogaddFormVisible},on:{"update:visible":function(t){e.dialogaddFormVisible=t}}},[n("el-form",{ref:"addForm",attrs:{model:e.addForm,rules:e.rules,"label-width":"150px"}},[n("el-form-item",{attrs:{label:"模块名称",prop:"title"}},[n("el-input",{attrs:{placeholder:"请输入模块名称",autocomplete:"off"},model:{value:e.addForm.title,callback:function(t){e.$set(e.addForm,"title","string"===typeof t?t.trim():t)},expression:"addForm.title"}})],1),e._v(" "),0!==e.parentElementId?n("el-form-item",{attrs:{label:"模块副标题",prop:"subtitle"}},[n("el-input",{attrs:{placeholder:"请输入模块副标题",autocomplete:"off"},model:{value:e.addForm.subtitle,callback:function(t){e.$set(e.addForm,"subtitle","string"===typeof t?t.trim():t)},expression:"addForm.subtitle"}})],1):e._e()],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){return e.cancelForm("addForm")}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleSubmit("addForm")}}},[e._v("确 定")])],1)],1)],1)},r=[],o=n("5530"),l=n("23e3"),a=n("2f62"),u={data:function(){return{list:[],parentElementId:-1,dialogaddFormVisible:!1,listLoading:!0,addForm:{websiteElementId:"",title:"",subtitle:null},rules:{title:{required:!0,message:"请输入模块名称!",trigger:"blur"},subtitle:{required:!0,message:"请输入模块副标题!",trigger:"blur"}}}},computed:Object(o["a"])({},Object(a["b"])(["temp"])),created:function(){this.getList()},methods:{handleSubmit:function(e){var t=this,n=this;this.$refs[e].validate((function(i){if(!i)return!1;Object(l["q"])(t.addForm).then((function(i){n.$message.success("修改成功"),n.$refs[e].resetFields(),t.dialogaddFormVisible=!1,n.getList()}))}))},cancelForm:function(e){this.$refs[e].resetFields(),this.dialogaddFormVisible=!1},editTitle:function(e){this.parentElementId=e.parentElementId,0!==this.parentElementId&&(this.addForm.subtitle=e.subtitle),this.addForm.title=e.title,this.addForm.websiteElementId=e.websiteElementId,this.dialogaddFormVisible=!0},getList:function(){var e=this;this.listLoading=!0,Object(l["i"])(this.temp).then((function(t){e.list=t.data,setTimeout((function(){e.listLoading=!1}),500)}))},isActive:function(e){var t=this,n=e.title;Object(l["o"])(e.websiteElementId).then((function(i){e.isDeleted?t.$message({type:"success",message:n+"模块已关闭"}):t.$message({type:"success",message:n+"模块已激活"}),t.getList()})).catch((function(){t.getList()}))},handleView:function(){window.open("http://81.69.18.147","_blank")},handleEdit:function(e){if(1===this.temp){var t=this.$router.resolve({path:"/template_1/menu"});window.open(t.href,"_blank")}else if(2===this.temp){var n=this.$router.resolve({path:"/template_2/menu"});window.open(n.href,"_blank")}else if(3===this.temp){var i=this.$router.resolve({path:"/template_3/menu"});window.open(i.href,"_blank")}}}},s=u,d=(n("1338"),n("2877")),c=Object(d["a"])(s,i,r,!1,null,"636919e8",null);t["default"]=c.exports}}]);