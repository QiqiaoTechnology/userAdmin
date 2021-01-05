<template>
  <div class="app-container site">
    <el-form ref="settingForm" v-loading="loading" :model="settingForm" :rules="rules" label-width="120px">

      <el-form-item label="站点标题" prop="settingTitle">
        <el-input
          v-model.trim="settingForm.settingTitle"
          placeholder="请输入站点标题"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="站点副标题" prop="settingSubhead">
        <el-input
          v-model.trim="settingForm.settingSubhead"
          placeholder="请输入站点副标题"
          autocomplete="off"
        />
      </el-form-item>

      <!-- <el-form-item label="站点域名" prop="settingDomain">
        <el-input v-model.trim="settingForm.settingDomain" placeholder="请输入站点域名" autocomplete="off" />
      </el-form-item> -->
      <el-form-item label="站点LOGO" prop="settingLogo">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :http-request="handUpload"
          accept=".jpg, .jpeg, .png, .gif, .bmp"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="站点关键字" prop="settingKeyword">
        <el-input
          v-model.trim="settingForm.settingKeyword"
          placeholder="请输入站点关键字"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="站点描述" prop="settingDescribe">
        <el-input
          v-model.trim="settingForm.settingDescribe"
          type="textarea"
          :rows="2"
          placeholder="请输入站点描述"
        />
      </el-form-item>
      <el-form-item label="站点备案" prop="settingRecords">
        <el-input
          v-model.trim="settingForm.settingRecords"
          placeholder="请输入站点备案"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="版权信息" prop="settingCopyright">
        <el-input
          v-model.trim="settingForm.settingCopyright"
          placeholder="请输入版权信息"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="技术支持" prop="settingInformation">
        <el-input
          v-model.trim="settingForm.settingInformation"
          placeholder="请输入技术支持"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="cancelForm('settingForm')">重 置</el-button>
        <el-button
          type="primary"
          @click="handleSubmit('settingForm')"
        >立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { baseurl } from '@/utils/request'
import { getSetting, editSetting } from '@/api/home'
// import { uploadImg } from '@/api/content'
export default {
  data() {
    return {
      loading: false,
      imageUrl: '',
      // 新增企业表单
      settingForm: {
        settingTitle: '',
        settingSubhead: '',
        // settingDomain: '',
        settingLogo: '',
        settingKeyword: '',
        settingDescribe: '',
        settingRecords: '',
        settingCopyright: '',
        settingInformation: ''
      },
      // 图片拼接地址
      rules: {
        settingTitle: {
          required: true,
          message: '请输入站点标题!',
          trigger: 'blur'
        },
        settingSubhead: {
          required: true,
          message: '请选择站点副标题',
          trigger: 'blur'
        },
        settingCopyright: { required: true, message: '请输入版权信息', trigger: 'blur' },
        settingInformation: { required: true, min: 2, message: '请输入技术支持', trigger: 'blur' },
        settingLogo: { required: true, message: '请上传网站logo', trigger: 'blur' },
        settingRecords: {
          required: true,
          min: 2,
          message: '请输入站点备案号',
          trigger: 'blur'
        }
      }
    }
  },
  created() {
    this.getSetting()
  },
  methods: {
    getSetting() {
      getSetting('siteSetting').then(res => {
        if (res.data.key) {
          this.settingForm = res.data.values
          this.imageUrl = this.settingForm.settingLogo
        }
      })
    },
    // 上传前判断,如果返回false就是取消上传行为
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
    handUpload(e) {
      // const type = this.beforeUpload(e.file)
      // if (type) {
      //   this.loading = true
      //   var formdata = new FormData()
      //   formdata.append('file_upload', e.file)
      //   uploadImg(formdata).then(res => {
      //     this.settingForm.settingLogo = baseurl + res.data.url
      //     this.imageUrl = baseurl + res.data.url
      //     setTimeout(() => {
      //       this.loading = false
      //     }, 2 * 1000)
      //     this.$message.success('图片上传成功！')
      //   }).catch(e => {
      //     this.$message.error('图片上传失败！' + e)
      //     this.loading = false
      //   })
      // }
    },
    // 添加提交表单
    handleSubmit(settingForm) {
      const that = this
      this.$refs[settingForm].validate(valid => {
        if (valid) {
          that.settingForm.__key = 'siteSetting'
          editSetting(that.settingForm).then(res => {
            that.$message.success('提交成功！')
            that.$refs[settingForm].resetFields()
            that.getSetting()
          })
        } else {
          return false
        }
      })
    },
    cancelForm(settingForm) {
      this.$refs[settingForm].resetFields()
    }
  }
}
</script>
<style lang="scss">
.site {
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
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 160px;
      height: 65px;
      line-height: 65px;
      text-align: center;
    }
    .avatar {
      width: 160px;
      height: 65px;
      display: block;
    }
  }
}
</style>
