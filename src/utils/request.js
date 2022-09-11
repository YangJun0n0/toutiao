// 1. yarn add axios
// 2. 引入axios
// 3. 配置 axios
import axios from 'axios'
import store from '@/store'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 3000

// const requset = axios.create() 克隆axios
// 防止项目有其他接口耦合

const requset = axios.create({
  timeout: 3000,
  baseURL: 'http://toutiao.itheima.net'
})

// 添加请求拦截器
requset.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store

    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default requset
