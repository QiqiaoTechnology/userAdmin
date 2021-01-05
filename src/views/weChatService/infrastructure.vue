<template>
  <div class="app-container site">
    <el-form ref="settingForm" v-loading="loading" :model="settingForm" :rules="rules" label-width="100px">
      <el-form-item label="AppId" prop="appid">
        <el-input
          v-model.trim="settingForm.appid"
          placeholder="请输入AppID"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="AppSecret" prop="secret">
        <el-input
          v-model.trim="settingForm.secret"
          placeholder="请输入AppSecret"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="AesKey" prop="aesKey">
        <el-input
          v-model.trim="settingForm.aesKey"
          placeholder="请输入aesKey"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="Token" prop="token">
        <el-input
          v-model.trim="settingForm.token"
          placeholder="请输入token"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="cancelForm('settingForm')">重 置</el-button>
        <el-button
          type="primary"
          :loading="btnload"
          @click="handleSubmit('settingForm')"
        >立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getWechatUser, setWechatUserInfo } from '@/api/wechat'
import { setAppID } from '@/utils/auth'
export default {
  data() {
    return {
      loading: false,
      // 新增企业表单
      settingForm: {
        appid: '',
        secret: '',
        token: '',
        aesKey: ''
      },
      btnload: false,
      // 图片拼接地址
      rules: {
        aesKey: {
          required: true,
          message: '请输入aesKey!',
          trigger: 'blur'
        },
        appid: {
          required: true,
          message: '请输入appID!',
          trigger: 'blur'
        },
        secret: {
          required: true,
          message: '消息加密密钥由43位字符组成，可随机修改，字符范围为A-Z，a-z，0-9。',
          trigger: 'blur'
        },
        token: {
          required: true,
          message: '请输入token',
          trigger: 'blur'
        }

      }
    }
  },
  created() {
    this.getSettings()
  },
  methods: {
    getSettings() {
      getWechatUser().then(res => {
        if (res.list.length > 0) {
          this.settingForm = res.list[0]
          setAppID(this.settingForm.appid)
        }
      })
    },

    // 添加提交表单
    handleSubmit(settingForm) {
      const that = this
      this.$refs[settingForm].validate(valid => {
        if (valid) {
          that.btnload = true
          setWechatUserInfo(that.settingForm).then(res => {
            that.$message.success('公众号绑定成功！')
            that.getSettings()
            that.btnload = false
          })
        } else {
          return false
        }
      })
    },
    cancelForm(settingForm) {
      this.getSettings()
    }
  }
}
</script>

