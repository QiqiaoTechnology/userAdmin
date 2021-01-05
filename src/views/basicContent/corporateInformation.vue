<template>
  <div class="app-container corporate">
    <el-form
      ref="companyForm"
      :model="companyForm"
      label-width="120px"
      :rules="rules"
    >
      <div>
        <el-form-item label="公司名称" prop="enterpriseName">
          <el-input v-model.trim="companyForm.enterpriseName" placeholder="请输入公司名称" autocomplete="off" />
        </el-form-item>
      </div>
      <el-form-item label="公司LOGO" prop="enterpriseLogoAttachmentUrl">
        <el-upload
          class="avatar-uploader-max"
          action="#"
          :show-file-list="false"
          :http-request="handUploadtwo"
          accept=".jpg, .jpeg, .png, .gif, .bmp"
        >
          <img v-if="companyForm.enterpriseLogoAttachmentUrl" :src="companyForm.enterpriseLogoAttachmentUrl" class="avatar-max">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="联系人称呼" prop="corporateContactName">
        <el-input v-model.trim="companyForm.corporateContactName" placeholder="请输入公司联系人称呼" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号码" prop="contactPhone">
        <el-input v-model.trim="companyForm.contactPhone" placeholder="请输入手机号码" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电子邮箱" prop="enterpriseEmail">
        <el-input v-model.trim="companyForm.enterpriseEmail" placeholder="请输入电子邮箱" autocomplete="off" />
      </el-form-item>
      <el-form-item label="公司地址" prop="enterpriseAddress">
        <el-input v-model.trim="companyForm.enterpriseAddress" placeholder="请输入公司地址" autocomplete="off" />
      </el-form-item>

      <el-form-item label="公司微信二维码" prop="wechatQrAttachmentUrl">
        <el-upload
          class="avatar-uploader-max"
          action="#"
          :show-file-list="false"
          :http-request="handUploadone"
          accept=".jpg, .jpeg, .png, .gif, .bmp"
        >
          <img v-if="companyForm.wechatQrAttachmentUrl" :src="companyForm.wechatQrAttachmentUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="公司介绍" prop="enterpriseInstruction">
        <el-input
          v-model.trim="companyForm.enterpriseInstruction"
          type="textarea"
          :rows="10"
          placeholder="请输入公司介绍"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item>
        <el-button @click="cancelForm('companyForm')">重 置</el-button>
        <el-button type="primary" @click="handleSubmit('companyForm')">立即提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

import {
  editEnterpriseBasicInfo,
  getEnterpriseInfo,
  uploadMedia
} from '@/api/website'
export default {
  data() {
    return {
      imageUrl: '',
      // 新增企业表单
      companyForm: {
        enterpriseName: '',
        corporateContactName: '',
        enterpriseAddress: '',
        enterpriseLogoAttachmentId: '',
        contactPhone: '',
        enterpriseEmail: '',
        wechatQrAttachmentId: null,
        wechatQrAttachmentUrl: null,
        enterpriseInstruction: '',
        enterpriseLogoAttachmentUrl: ''
      },
      rules: {
        enterpriseName: { required: true, message: '请输入公司名称!', trigger: 'blur' },
        corporateContactName: { required: true, min: 2, message: '请输入公司联系人', trigger: 'blur' },
        enterpriseAddress: { required: true, min: 2, message: '请输入公司地址', trigger: 'blur' },
        contactPhone: { required: true, min: 2, message: '请输入联系方式', trigger: 'blur' },
        enterpriseEmail: { required: true, min: 2, message: '请输入电子邮箱', trigger: 'blur' },
        enterpriseInstruction: { required: true, min: 2, message: '请输入公司介绍', trigger: 'blur' },
        enterpriseLogoAttachmentUrl: { required: true, message: '请上传公司宣传图片', trigger: 'blur' }
      }
    }
  },
  created() {
    this.getSetting()
  },
  methods: {
    getSetting() {
      getEnterpriseInfo().then(res => {
        this.companyForm = res.data
      })
    },
    // 上传前判断,如果返回false就是取消上传行为
    beforeUpload(file) {
      const pos = file.name.lastIndexOf('.')
      const lastName = file.name.substring(pos, file.name.length)
      const supportTypes = ['.gif', '.jpeg', '.png', '.bmp', '.jpg'] // gif、 jpeg、 png、 bmp
      if (supportTypes.indexOf(lastName.toLowerCase()) <= -1) {
        this.$message.error('商品图片仅支持 gif、 jpeg、 png、jpg、bmp 5种格式！')
        return false
      }
      if (file.size / (1024 * 1024) > 3) {
        this.$message.error('上传商品图片大小应小于3Mb')
        return false
      }
      return true
    },
    handUploadone(e) {
      const type = this.beforeUpload(e.file)
      if (type) {
        this.loading = true
        var formdata = new FormData()
        formdata.append('file', e.file)
        uploadMedia(formdata).then(res => {
          this.companyForm.wechatQrAttachmentId = res.data.attachmentInfoId
          this.companyForm.wechatQrAttachmentUrl = res.data.attachmentUrl
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
    handUploadtwo(e) {
      const type = this.beforeUpload(e.file)
      if (type) {
        this.loading = true
        var formdata = new FormData()
        formdata.append('file', e.file)
        uploadMedia(formdata).then(res => {
          this.companyForm.enterpriseLogoAttachmentId = res.data.attachmentInfoId
          this.companyForm.enterpriseLogoAttachmentUrl = res.data.attachmentUrl
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
    // 添加提交表单
    handleSubmit(companyForm) {
      const that = this
      this.$refs[companyForm].validate(valid => {
        if (valid) {
          editEnterpriseBasicInfo(that.companyForm).then(res => {
            that.$message.success('提交成功！')
            that.$refs[companyForm].resetFields()
            that.getSetting()
          })
        } else {
          return false
        }
      })
    }, cancelForm(companyForm) {
      this.$refs[companyForm].resetFields()
    }
  }
}
</script>
<style lang='scss'>
  .corporate {
        padding: 55px 30px;
  .el-form {
    width: 80%;
  }

      .avatar-uploader {
                .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 160px;
                height: 160px;
                line-height: 160px;
                text-align: center;
            }
            .avatar {
                width:160px;
                height: 160px;
                display: block;
            }
    }
        .avatar-uploader-max {
                .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 265px;
                height: 130px;
                line-height: 130px;
                text-align: center;
            }
            .avatar-max {
                  width: 265px;
                height: 130px;
                display: block;
            }
    }
  }
</style>
