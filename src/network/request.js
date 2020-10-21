import axios from 'axios'
// import { config } from 'vue/types/umd';
export function request(config) {
  //1.创建axios的实例
  const instance = new axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    // baseURL:"http://152.136.185.210:8000/api/z8",
    baseURL:"http://152.136.185.210:8000/api/w6",
    timeout: 5000
  })

  //2.axios的拦截器
  //2.1请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })
  //2.2响应式拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })
  //发送真正的网络请求
  return instance(config)
}