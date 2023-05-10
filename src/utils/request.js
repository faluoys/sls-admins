//1.引入axios依赖包
import axios from 'axios'
import qs from 'qs'
//2.axios创建对象
const request = axios.create({
    // baseURL: 'http://10.11.8.134:9999/api/',// 管理后台要使用的接口的基地址
    // baseURL: 'http://192.168.43.26:9999/api/',
    baseURL: 'http://localhost:9999/api/',
    // baseURL: 'http://10.11.8.237:9999/api/',
    // baseURL: 'http://10.11.8.181:9999/api/',
    timeout: 8000,// 超时时间
    // header: { //头信息
    //     post:{"content-type": "application/json"}
    // }
    // headers: { "Content-Type": "application/x-www-form-urlencoded" },
    // header: {
    //     'Content-Type': 'application/json;charset=utf-8'
    // },
})

//3,定义前置拦截器，请求拦截器，请求发出之前触发的
request.interceptors.request.use((config) => {
// config 接口请求的配置信息
//     if(config.method  === 'post'){
//         config.data = qs.stringify(config.data);
//     }

    return config;
}, error => {
    // 报错的是定义前置拦截器时候抛出一个错误信息
    return Promise.reject(error);
});

request.interceptors.response.use((response) => {
    // 响应回来的数据操作
    return response.data;
},error => {
    // 报错的时候抛出一个报错信息
    return Promise.reject(error)
})

// 抛出对象的信息
export default request;
