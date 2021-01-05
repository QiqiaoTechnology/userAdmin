import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'
// import Qs from 'qs'
// baseURL: 'http://47.106.200.106:80',
// create an axios instance
const formalApi = 'http://81.69.18.147/wisdom/'
export const baseurl = formalApi
const service = axios.create({
  baseURL: formalApi, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    console.log(config)
    return config
  },
  error => {
    Message({
      message: '网络请求失败，请稍后再试',
      type: 'error',
      duration: 5 * 1000
    })
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    const headtoken = response.headers['authorization']
    if (headtoken) {
      res.token = headtoken
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200 && res.code !== '200') {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 401) {
        // to re-login
        MessageBox.confirm('您已经登出，您可以取消以停留在此页面，或再次登录', '确认注销', {
          confirmButtonText: '重新登入',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    const res = error.response.data.msg
    console.log('err' + res) // for debug
    Message({
      message: res,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
