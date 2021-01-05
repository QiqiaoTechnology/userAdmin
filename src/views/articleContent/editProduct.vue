<template>
  <div class="app-container userview">
    <!-- 基本信息 -->
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>{{ title }}</span>
        <el-button type="primary" class="cardBtn" :disabled="btnload" @click="handleSubmit('editForm')">立即提交</el-button>
      </div>
      <div class="user-message">
        <el-form
          ref="editForm"
          v-loading="listLoading"
          :model="editForm"
          :rules="rules"
          label-width="100px"
        >
          <div class="userInfo_main dpyflex">
            <el-form-item prop="cover_img">
              <el-upload
                style="margin-left:-100px"
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :http-request="handUpload"
                accept=".jpg, .jpeg, .png, .gif, .bmp"
              >
                <img v-if="editForm.cover_img" :src="editForm.cover_img" class="avatar">
                <div v-else class="avatar-uploader-icon">点击上传封面图</div>
              </el-upload>
            </el-form-item>

            <div class="formContent">
              <el-form-item label="产品名称:" prop="title" class="lg_input">
                <el-input v-model.trim="editForm.title" clearable placeholder="请输入产品名称" autocomplete="off" />
              </el-form-item>
              <el-form-item label="内容副标题:" prop="subtitle" class="lg_input">
                <el-input v-model.trim="editForm.subtitle" clearable placeholder="请输入内容副标题" autocomplete="off" />
              </el-form-item>
              <el-form-item label="产品价格:" prop="prices">
                <el-input v-model.trim="editForm.prices" type="number" clearable placeholder="请输入产品价格 " autocomplete="off" />
              </el-form-item>

              <el-form-item label="标签状态:" prop="ord">
                <el-radio-group v-model="editForm.ord">
                  <el-radio :label="0">默认</el-radio>
                  <el-radio :label="1">热门</el-radio>
                  <!-- <el-radio :label="2">推荐</el-radio> -->
                </el-radio-group>
              </el-form-item>

              <el-form-item label="显示状态:">
                <el-switch
                  v-model="editForm.status"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                />
              </el-form-item>
              <el-form-item label="产品描述:" prop="descs" class="lg_input">
                <el-input v-model.trim="editForm.descs" clearable placeholder="请输入产品描述 " autocomplete="off" />
              </el-form-item>
            </div>
          </div>
          <div class="userInfo_main">
            <el-row :gutter="20">
              <el-col
                :span="12"
                class="el_col userInfo_label"
              >
                <label>内容主体</label>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col
                :span="24"
                class="el_col"
              >
                <el-form-item style="margin-left: -100px;" class="lg_tinymce" prop="contents" />
              </el-col>
            </el-row>

          </div>
        </el-form>
      </div></el-card>
  </div>
</template>
<script>
import { baseurl } from '@/utils/request'
import {
  getCountsInfo,
  editFriendshipchain,
  uploadImg
} from '@/api/content.js'

export default {
  data() {
    return {
      btnload: false,
      listLoading: false,
      imageUrl: '',
      editFlag: false,
      viewId: '',
      title: '新增产品',
      fileList: [],
      columnlist: [],
      editForm: {
        cate_id: 3,
        title: '',
        cover_img: '',
        subtitle: '',
        contents: '',
        status: 0,
        ord: 0,
        descs: '',
        prices: 0
      },
      rules: {
        title: { required: true, message: '请输入产品标题', trigger: 'blur' },
        prices: { required: true, message: '请输入产品作者!', trigger: 'blur' },
        cover_img: { required: true, message: '请输入上传产品封面图!', trigger: 'blur' }

      }

    }
  },
  created() {
    // 从父页面接收数据并赋值
    const queryParam = this.$route.query
    if (queryParam.id) {
      this.viewId = queryParam.id
      this.title = '编辑产品'
      this.editFlag = true
      this.getCountsInfo(queryParam.id)
    }
  },

  methods: {
    getCountsInfo(id) {
      getCountsInfo('product', id).then(response => {
        this.editForm = response.data
        this.editForm.contents = response.data.relation_information.contents
        this.editForm.prices = response.data.relation_information.prices
      })
    },
    handUpload(e) {
      const type = this.beforeUpload(e.file)
      if (type) {
        this.loading = true
        var formdata = new FormData()
        formdata.append('file_upload', e.file)
        uploadImg(formdata).then(res => {
          this.editForm.cover_img = baseurl + res.data.url
          setTimeout(() => {
            this.loading = false
          }, 2 * 1000)
          this.$message.success('图片上传成功！')
        }).catch(e => {
          this.$message.error('图片上传失败！' + e)
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      const pos = file.name.lastIndexOf('.')
      const lastName = file.name.substring(pos, file.name.length)
      const supportTypes = ['.gif', '.jpeg', '.png', '.bmp', '.jpg'] // gif、 jpeg、 png、 bmp
      if (supportTypes.indexOf(lastName.toLowerCase()) <= -1) {
        this.$message.error('商品图片仅支持 gif、 jpeg、 png、 bmp 4种格式！')
        return false
      }
      if (file.size / (1024 * 1024) > 3) {
        this.$message.error('上传商品图片大小应小于3Mb')
        return false
      }
      return true
    },
    handleSubmit(editForm) {
      const that = this
      this.$refs[editForm].validate(valid => {
        if (valid) {
          that.btnload = true
          that.listLoading = true
          that.editForm.cate_id = 3
          editFriendshipchain('alterProduct', that.editForm).then(res => {
            if (that.editFlag) {
              that.$confirm('产品修改成功, 是否继续修改?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '返回产品中心',
                type: 'warning'
              }).then(() => {
                that.getCountsInfo(this.viewId)
                that.listLoading = false
                that.btnload = false
              }).catch(() => {
                that.$router.push({
                  path: '/product'
                })
              })
            } else {
              that.$confirm('产品新增成功, 是否继续新增?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '返回产品中心',
                type: 'warning'
              }).then(() => {
                that.$refs[editForm].resetFields()
                that.listLoading = false
                that.btnload = false
              }).catch(() => {
                that.$router.push({
                  path: '/product'
                })
              })
            }
          }).catch(() => {
            that.error('提交失败，请刷新重试')
            that.listLoading = false
            that.btnload = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .avatar-uploader-icon {
     font-size: 14px;
    color: #8c939d;
    width: 190px;
    height: 190px;
    line-height: 190px;
    text-align: center;
  }
  .avatar {
    width: 190px;
    height: 190px;
    display: block;
  }

</style>

