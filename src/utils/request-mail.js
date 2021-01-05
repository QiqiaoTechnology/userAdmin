import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import { Message } from 'element-ui'

import Qs from 'qs'
// create an axios instance
const service = axios.create({
  baseURL: 'http://202.104.182.70:5439/', // url = base url + request url
  timeout: 500000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.data = Qs.stringify(config.data)
    if (config.method.toLowerCase() === 'post' || config.method.toLowerCase() === 'PUT') {
      config.headers['Content-Type'] =
      'application/x-www-form-urlencoded; charset=UTF-8'
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
