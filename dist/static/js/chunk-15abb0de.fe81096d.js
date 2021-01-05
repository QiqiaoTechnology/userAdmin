(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15abb0de"],{1301:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"tab-w"},[n("div",{staticClass:"btnlist"},[n("el-button",{attrs:{size:"mini"},on:{click:e.addResMessage}},[n("span",{staticClass:"el-icon-plus"}),e._v("添加回复规则")]),e._v(" "),e.selectList.length>0?n("el-button",{attrs:{type:"danger",plain:"",size:"mini",icon:"el-icon-delete"},on:{click:function(t){return e.handleDelete("all")}}},[e._v("批量删除")]):e._e()],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.messageList,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",label:"ID",width:"58"}}),e._v(" "),n("el-table-column",{attrs:{label:"规则名"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.ruleName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"是否精确匹配"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.exactMatch?"是":"否"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"关键词"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.matchValue))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"回复内容"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.replyContent))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center",width:"200","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(n){return e.handleEditView(t.row)}}},[e._v("\n            修改\n          ")]),e._v(" "),t.row.isdisable?e._e():n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.handleDelete(t.row)}}},[e._v("\n            删除\n          ")])]}}])})],1),e._v(" "),n("el-dialog",{attrs:{title:!0===e.editFlag?"编辑回复":"添加回复",width:"500px",visible:e.dialogAddFormVisible},on:{"update:visible":function(t){e.dialogAddFormVisible=t}}},[n("el-form",{ref:"addForm",staticClass:"addForm",attrs:{model:e.addForm,rules:e.rules,"label-width":"130px"}},[n("el-form-item",{attrs:{label:"规则名称",prop:"ruleName"}},[n("el-input",{attrs:{placeholder:"请输入规则名称",autocomplete:"off"},model:{value:e.addForm.ruleName,callback:function(t){e.$set(e.addForm,"ruleName","string"===typeof t?t.trim():t)},expression:"addForm.ruleName"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"匹配关键词",prop:"matchValue"}},[n("el-input",{attrs:{placeholder:"请输入匹配关键词",autocomplete:"off"},model:{value:e.addForm.matchValue,callback:function(t){e.$set(e.addForm,"matchValue","string"===typeof t?t.trim():t)},expression:"addForm.matchValue"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"是否精准匹配",prop:"exactMatch"}},[n("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.addForm.exactMatch,callback:function(t){e.$set(e.addForm,"exactMatch",t)},expression:"addForm.exactMatch"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"回复内容",prop:"replyContent"}},[n("el-input",{attrs:{placeholder:"请输入回复内容",autocomplete:"off"},model:{value:e.addForm.replyContent,callback:function(t){e.$set(e.addForm,"replyContent","string"===typeof t?t.trim():t)},expression:"addForm.replyContent"}})],1),e._v(" "),n("el-form-item")],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){return e.cancelForm("addForm")}}},[e._v("取 消")]),e._v(" "),n("el-button",{on:{click:function(t){return e.submitForm("addForm")}}},[e._v("确 定")])],1)],1)],1)])},a=[],o=(n("ac6a"),n("4cfb")),s={data:function(){return{editFlag:!1,dialogAddFormVisible:!1,selectList:[],addForm:{ruleName:"",matchValue:"",replyContent:"",replyType:"text",exactMatch:!1},messageList:[],listLoading:!1,rules:{ruleName:[{required:!0,message:"请输入规则名称",trigger:"blur"}],matchValue:[{required:!0,message:"请输入匹配关键字",trigger:"blur"}],replyContent:[{required:!0,message:"请输入回复内容",trigger:"blur"}]}}},created:function(){this.getList()},methods:{handleEditView:function(e){this.editFlag=!0,this.addForm=e,this.dialogAddFormVisible=!0},handleDelete:function(e){var t=this,n=this;n.$confirm("此操作将删除选中规则, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var r=[];if("all"===e)r=t.selectList;else{var a=[];a.push(e.ruleId),r=a}Object(o["f"])(r).then((function(e){n.$message({type:"success",message:"成功删除该规则"}),n.getList()}))})).catch((function(){n.$message({type:"info",message:"已取消删除"})}))},getList:function(){var e=this;Object(o["l"])().then((function(t){e.messageList=t.page.list}))},handleSelectionChange:function(e){var t=this;this.selectList=[],e.forEach((function(e){t.selectList.push(e.ruleId)}))},addResMessage:function(){this.dialogAddFormVisible=!0},submitForm:function(e){var t=this;this.$refs[e].validate((function(n){if(!n)return!1;t.editFlag?Object(o["v"])(t.addForm).then((function(n){t.$message.success("回复规则修改成功"),t.getList(),t.$refs[e].resetFields(),t.dialogAddFormVisible=!1})):Object(o["r"])(t.addForm).then((function(n){t.$message.success("回复规则添加成功"),t.getList(),t.$refs[e].resetFields(),t.dialogAddFormVisible=!1}))}))},cancelForm:function(e){this.dialogAddFormVisible=!1,this.$refs[e].resetFields()}}},i=s,l=n("2877"),u=Object(l["a"])(i,r,a,!1,null,null,null);t["default"]=u.exports},"4cfb":function(e,t,n){"use strict";var r=n("bc3a"),a=n.n(r),o=n("5c96"),s=n("4360"),i="http://81.69.18.147/wisdom/",l=a.a.create({baseURL:i,timeout:5e4});l.interceptors.request.use((function(e){return console.log(e),e}),(function(e){return Object(o["Message"])({message:"网络请求失败，请稍后再试",type:"error",duration:5e3}),console.log(e),Promise.reject(e)})),l.interceptors.response.use((function(e){var t=e.data,n=e.headers["authorization"];return n&&(t.token=n),200!==t.code&&"200"!==t.code?(Object(o["Message"])({message:t.msg||"Error",type:"error",duration:5e3}),401===t.code&&o["MessageBox"].confirm("您已经登出，您可以取消以停留在此页面，或再次登录","确认注销",{confirmButtonText:"重新登入",cancelButtonText:"取消",type:"warning"}).then((function(){s["a"].dispatch("user/resetToken").then((function(){location.reload()}))})),Promise.reject(new Error(t.msg||"Error"))):t}),(function(e){var t=e.response.data.msg;return console.log("err"+t),Object(o["Message"])({message:t,type:"error",duration:5e3}),Promise.reject(e)}));var u=l;function c(e){return u({url:"/wx/manage/wxAccount/list",method:"get",params:e})}function d(e){return u({url:"/wx/manage/wxAccount/save",method:"post",data:e})}function m(e){return u({url:"/wx/manage/msgReplyRule/list",method:"get",params:e})}function f(e){return u({url:"/wx/manage/msgReplyRule/save",method:"post",data:e})}function g(e){return u({url:"/wx/manage/msgReplyRule/update",method:"post",data:e})}function p(e){return u({url:"/wx/manage/msgReplyRule/delete",method:"post",data:e})}function h(e){return u({url:"/wx/manage/wxUser/list",method:"get",params:e})}function w(e){return u({url:"/wx/manage/wxUserTags/list",method:"get",params:e})}function b(e){return u({url:"/wx/manage/wxUserTags/save",method:"post",data:e})}function x(e){return u({url:"/wx/manage/wxUserTags/batchTagging",method:"post",data:e})}function v(e){return u({url:"/wx/manage/wxUserTags/delete/"+e,method:"post"})}function F(e){return u({url:"/wx/manage/wxUserTags/batchUnTagging",method:"post",data:e})}function _(e){return u({url:"/wx/manage/wxUser/syncWxUsers",method:"post",data:e})}function y(e){return u({url:"/wx/manage/wxMsg/list",method:"get",params:e})}function k(e){return u({url:"/wx/manage/wxMsg/reply",method:"post",data:e})}function L(e){return u({url:"/wx/manage/wxMsg/delete",method:"post",data:e})}function V(e){return u({url:"/wx/manage/wxUser/info/"+e,method:"get"})}function C(e){return u({url:"/wx/manage/wxUser/delete",method:"post",data:e})}function M(e){return u({url:"/wx/manage/wxBlacklist/pushToBlacklist",method:"post",data:e})}function T(){return u({url:"/wx/manage/wxBlacklist/syncBlacklist",method:"get"})}function $(e){return u({url:"/wx/manage/wxBlacklist/pullFromBlacklist",method:"post",data:e})}function j(e){return u({url:"/wx/manage/wxBlacklist/list",method:"get",params:e})}n.d(t,"m",(function(){return c})),n.d(t,"s",(function(){return d})),n.d(t,"l",(function(){return m})),n.d(t,"r",(function(){return f})),n.d(t,"v",(function(){return g})),n.d(t,"f",(function(){return p})),n.d(t,"j",(function(){return h})),n.d(t,"i",(function(){return w})),n.d(t,"q",(function(){return b})),n.d(t,"a",(function(){return x})),n.d(t,"d",(function(){return v})),n.d(t,"c",(function(){return F})),n.d(t,"u",(function(){return _})),n.d(t,"k",(function(){return y})),n.d(t,"p",(function(){return k})),n.d(t,"e",(function(){return L})),n.d(t,"h",(function(){return V})),n.d(t,"b",(function(){return C})),n.d(t,"o",(function(){return M})),n.d(t,"t",(function(){return T})),n.d(t,"n",(function(){return $})),n.d(t,"g",(function(){return j}))}}]);