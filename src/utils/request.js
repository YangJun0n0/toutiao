// 1. yarn add axios
// 2. 引入axios
// 3. 配置 axios
import axios from 'axios'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 3000

// const requset = axios.create() 克隆axios
// 防止项目有其他接口耦合

const requset = axios.create({
  timeout: 3000,
  baseURL: 'http://toutiao.itheima.net'
})
export default requset
