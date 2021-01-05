<template>
  <div class="app-container">
    <div class="user-form">
      <el-form>
        <el-form-item>
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-plus"
            @click="handleOpenForm('columnEditForm')"
          >新建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children'}"
      style="width:100%;"
    >
      <el-table-column label="栏目名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="栏目别名">
        <template slot-scope="scope">
          <span>{{ scope.row.alias }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="栏目标签" prop="labelIdList">
        <template slot-scope="scope">
          <el-tag v-for="(val,index) in scope.row.labelIdList" :key="index" type="success" size="mini" style="margin:2px 10px 2px 0px">{{ val }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="栏目模型" align="center" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.pid!=0">{{ scope.row.model_id==1?'单页':scope.row.model_id==2?'列表详情页':'列表数据' }}</span>
          <span v-else>顶级栏目</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="60px" align="center">
        <template slot-scope="scope">
          <el-switch
            v-if="scope.row.pid!=0"
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="isActive(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template> </el-table-column>
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.title=='导航列表'" type="text" style="color:#23B3FF" @click="handleEditView(scope.row)">
            修改
          </el-button>
          <el-button :disabled="scope.row.title=='导航列表'||scope.row.alias=='product'" type="text" style="color:#FF5050" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加表单 -->
    <el-dialog :show-close="false" :close-on-click-modal="false" :title="editFlag===true?'编辑栏目':'新增栏目'" width="650px" :visible.sync="dialogcolumnEditFormVisible">
      <el-form
        ref="columnEditForm"
        :model="columnEditForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item prop="cover_img">
          <el-upload
            style="margin-left:-120px"
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :http-request="handUpload"
            accept=".jpg, .jpeg, .png, .gif, .bmp"
          >
            <el-image v-if="columnEditForm.cover_img" :src="columnEditForm.cover_img" class="avatar">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
            <!-- <img v-if="columnEditForm.cover_img" :src="columnEditForm.cover_img" class="avatar"> -->
            <div v-else class="avatar-uploader-icon">点击上传封面图</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="父级栏目" prop="pid">
          <el-cascader
            v-model="columnEditForm.pid"
            :disabled="columnEditForm.pid==1&&editFlag"
            placeholder="顶级栏目"
            :options="list"
            :props="{ label:'title',value:'id'}"
            expand-trigger="hover"
            change-on-select
            :show-all-levels="false"
            clearable
          />
          <el-tooltip class="item" effect="dark" content="为空时默认为顶级栏目" placement="top">
            <i class="el-icon-info" />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="栏目名" prop="title">
          <el-input v-model.trim="columnEditForm.title" placeholder="请输入栏目名" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="columnEditForm.pid!=0" label="栏目模型" prop="model_id">
          <el-radio-group v-model="columnEditForm.model_id" :disabled="editFlag">
            <el-radio :label="1">单页</el-radio>
            <el-radio :label="2">列表详情页</el-radio>
            <!-- <el-radio :label="3">列表数据</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="栏目标签" prop="labelIdList" class="lg_select">
          <el-select v-model="columnEditForm.labelIdList" multiple placeholder="请选择">
            <el-option
              v-for="item in labelList"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item label="栏目别名" prop="alias">
          <el-input v-model.trim="columnEditForm.alias" :disabled="editFlag" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="columnEditForm.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('columnEditForm')">取 消</el-button>
        <el-button v-if="!editFlag" type="primary" @click="handleSubmit('columnEditForm')">确 定</el-button>
        <el-button v-else type="primary" @click="handleSubmit('columnEditForm')">确定修改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import { Yearformat } from '@/utils/index'
// import { baseurl } from '@/utils/request'
// 当前使用接口 其他待删
// import {
//   getCountsList,
//   editCountent,
//   deleteCountent,
//   getCountsInfo,
//   uploadImg
// //   getLabelList
// } from '@/api/content.js'
import { mapGetters } from 'vuex'

export default {

  data() {
    return {
      // 集合
      list: [],
      labelList: [],
      dialogcolumnEditFormVisible: false,
      columnEditForm: { pid: 0, title: '', alias: '', model_id: 1, status: true },
      listLoading: true,
      editFlag: false,
      rules: {
        model_id: { required: true, message: '请选择栏目的类型！!', trigger: 'blur' },
        title: { required: true, message: '请输入栏目名！!', trigger: 'blur' },
        alias: { required: true, message: '请输入栏目别名！!', trigger: 'blur' }
      },

      newdata: '2020年5月19日'

    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    // this.getLabelList()
    this.getList() // 账户数据方法初始化
  },
  methods: {
    // formatDates(row) {
    //   if (row.create_time) {
    //     return Yearformat(row.create_time)
    //   } else {
    //     return '空'
    //   }
    // },
    // getCountsInfo(id) {
    //   getCountsInfo('article_category', id).then(res => {
    //     this.columnEditForm = res.data
    //   })
    // },
    // // 获取列表
    // getList() {
    //   this.listLoading = true
    //   getCountsList('article_category').then(response => {
    //     if (response.data) {
    //       this.list = response.data
    //       // 拿取映射关系
    //     //   this.list.forEach(val => {
    //     //     val.labelIdList = this.myFilter(this.labelList, val.labelIdList)
    //     //   })
    //     }
    //     setTimeout(() => {
    //       this.listLoading = false
    //     }, 0.5 * 1000)
    //   })
    // },
    // // getLabelList() {
    // //   getLabelList(this.queryParam).then(response => {
    // //     this.labelList = response.data
    // //   })
    // // },
    // // 拿取标签id集合查询对应名称
    // // myFilter(arr1, arr2) {
    // //   var ret = []
    // //   arr2.forEach(
    // //     ele => {
    // //       arr1.forEach(x => {
    // //         if (x.labelId === ele) {
    // //           const valName = x.labelName
    // //           ret.push(valName)
    // //         }
    // //       })
    // //     }
    // //   )
    // //   return ret
    // // },

    // // 新增表单
    // handleOpenForm(columnEditForm) {
    //   this.columnEditForm = { pid: 0, title: '', alias: '', model_id: 1, status: true }
    //   this.dialogcolumnEditFormVisible = true
    //   this.editFlag = false
    // },
    // // 编辑表单 打开
    // handleEditView(data) {
    //   this.dialogcolumnEditFormVisible = true
    //   this.editFlag = true
    //   this.getCountsInfo(data.id)
    // },
    // // 删除
    // handleDelete(data) {
    //   const _that = this
    //   _that.$confirm('此操作将永久删除该栏目, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     deleteCountent('article_category', data.id).then(res => {
    //       _that.$message({
    //         type: 'success',
    //         message: '已删除'
    //       })
    //       _that.getList()
    //     })
    //   }).catch(() => {
    //     _that.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // // 上传前判断,如果返回false就是取消上传行为
    // beforeUpload(file) {
    //   const pos = file.name.lastIndexOf('.')
    //   const lastName = file.name.substring(pos, file.name.length)
    //   const supportTypes = ['.gif', '.jpeg', '.png', '.bmp', '.jpg'] // gif、 jpeg、 png、 bmp
    //   if (supportTypes.indexOf(lastName.toLowerCase()) <= -1) {
    //     this.$message.error('商品图片仅支持 gif、 jpeg、 png、 bmp 4种格式！')
    //     return false
    //   }
    //   if (file.size / (1024 * 1024) > 3) {
    //     this.$message.error('上传商品图片大小应小于3Mb')
    //     return false
    //   }
    //   return true
    // },
    // handUpload(e) {
    //   const type = this.beforeUpload(e.file)
    //   if (type) {
    //     this.listLoading = true
    //     var formdata = new FormData()
    //     formdata.append('file_upload', e.file)
    //     uploadImg(formdata).then(res => {
    //       this.columnEditForm.cover_img = baseurl + res.data.url
    //       setTimeout(() => {
    //         this.listLoading = false
    //       }, 5 * 1000)
    //       this.$message.success('图片上传成功！')
    //     }).catch(e => {
    //       this.$message.error('图片上传失败！' + e)
    //       this.listLoading = false
    //     })
    //   }
    // },
    // // 取消
    // cancelForm(columnEditForm) {
    //   this.$refs[columnEditForm].resetFields()
    //   this.dialogcolumnEditFormVisible = false
    // },
    // // 是否激活
    // isActive(rowData) {
    //   const name = rowData.title
    //   editCountent('category', rowData).then(response => {
    //     if (rowData.status) {
    //       this.$message({
    //         type: 'success',
    //         message: name + '栏目已激活'
    //       })
    //     } else {
    //       this.$message({
    //         type: 'success',
    //         message: name + '栏目已关闭'
    //       })
    //     }
    //     this.getList()
    //   }).catch(() => {
    //     this.getList()
    //   })
    // }, handleSubmit(columnEditForm) {
    //   const that = this
    //   this.$refs[columnEditForm].validate(valid => {
    //     if (valid) {
    //       if (that.columnEditForm.pid.length > 1) {
    //         that.columnEditForm.pid = that.columnEditForm.pid[that.columnEditForm.pid.length - 1]
    //       }
    //       editCountent('category', this.columnEditForm).then(res => {
    //         if (that.editFlag) {
    //           that.$message.success('栏目修改成功')
    //         } else {
    //           that.$message.success('栏目添加成功')
    //         }
    //         that.$refs[columnEditForm].resetFields()
    //         that.dialogcolumnEditFormVisible = false
    //         that.getList()
    //       })
    //     } else {
    //       return false
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>

  .avatar-uploader-icon {
     font-size: 14px;
    color: #8c939d;
    width: 600px;
    height: 250px;
    line-height:250px;
    text-align: center;
    border: solid 1px;
  }
  .avatar {
      width: 100%;
    height: 250px;
    display: block;
  }

</style>
