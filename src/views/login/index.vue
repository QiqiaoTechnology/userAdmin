<template>
  <div id="app">
    <div class="content">
      <div class="login-container">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="title">
            <p>七巧云管理系统</p>
          </div>
          <el-form-item prop="userAccount">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="userAccount"
              v-model.trim="loginForm.userAccount"
              placeholder="请输入用户名"
              name="userAccount"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="userPassword">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="userPasswordType"
              ref="password"
              v-model.trim="loginForm.userPassword"
              :type="userPasswordType"
              placeholder="请输入密码"
              name="userPassword"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="userPasswordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
          <div class="yan">
            <div @click="refreshCode">
              <sidentify :identify-code="identifyCode" title="点击换一张验证数字" style="cursor: pointer;height: 40px;" />
            </div>

            <el-form-item prop="yanzhengma">
              <el-input
                v-model.trim="loginForm.yanzhengma"
                placeholder="请输入验证码"
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>
          </div>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import '@/utils/ribbon.js'
import Sidentify from '@/components/yanzheng'
export default {
  name: 'Login',
  components: { Sidentify },
  data() {
    const validateuserPassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('密码不能少于八位'))
      } else {
        callback()
      }
    }
    const validateNum = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入验证码'))
      } else if (value !== this.identifyCode) {
        callback(new Error('验证码错误请重新输入'))
      } else {
        callback()
      }
    }

    return {
      yanzhengma: '',
      identifyCode: '',
      identifyCodes: '1234567890',
      loginForm: {
        userAccount: 'admin',
        userPassword: '',
        yanzhengma: ''
      },
      loginRules: {
        userAccount: [
          { required: true, trigger: 'blur', message: '请输入用户名!' }
        ],
        userPassword: [
          { required: true, trigger: 'blur', validator: validateuserPassword }
        ],
        yanzhengma: [
          { required: true, trigger: 'blur', validator: validateNum }
        ]
      },
      loading: false,
      userPasswordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    showPwd() {
      if (this.userPasswordType === 'password') {
        this.userPasswordType = ''
      } else {
        this.userPasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.userPassword.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('提交失败!!')
          return false
        }
      })
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
    }
  }
}
</script>

<style lang="scss">

$bg: rgba(0, 0, 0, 0.1);
$light_gray: #303133;
$cursor: #303133;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.yan{
  display: flex;
    .el-form-item{
        margin-left: 20px;
        width: 100%;
        .el-input {
            height: 35px;
            input{
                height: 35px;
            }
        }
    }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    margin: 0px;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
          -webkit-text-fill-color: $cursor;
    transition: background-color 5000s ease-out 0.5s

      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;

.content {
	width: 500px;
	box-sizing: border-box;
	padding: 0 50px;
	border-radius: 5px;
	box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
	background: rgba(255, 255, 255, 0.5);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	// animation: mymove 1s ease-in-out  alternate;
	overflow: hidden;
	transition: 1.5s;
}

.title {
	text-align: center;
	font-size: 24px;
	margin-bottom: 30px;
	font-weight: bold;
	color: #606266;
}
.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    margin: 38px auto 20px auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
