import axios, {AxiosInstance} from "axios";
import { myAddress } from './myAddress';
// const isDev = process.env.NODE_ENV === 'development';
const baseURL = `http://${myAddress}:8080/api`;
const myAxios: AxiosInstance = axios.create({
    baseURL:  baseURL,
});
myAxios.defaults.withCredentials = true; // 配置为true

// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    console.log('我要发请求啦', config)
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    console.log('我收到你的响应啦', response)
    // 未登录则跳转到登录页
    if (response?.data?.code === 40100) {
        console.log(111)
        const redirectUrl = window.location.href;
        console.log("url",redirectUrl)
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default myAxios;
