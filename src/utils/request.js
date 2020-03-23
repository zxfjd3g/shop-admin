import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个新的axios
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 20000 //请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 如果有token, 通过token请求头携带token
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000或200是抛错 可结合自己业务进行修改
     */
    const result = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (result.code !== 20000 && result.code !== 200) {
      Message({
        message: result.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(result.message || 'Error'))
    } else {
      return result
    }
  },

  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message || '请求出错了',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
