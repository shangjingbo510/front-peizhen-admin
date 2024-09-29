import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({ showSpinner: false }); // NProgress Configuration
import { Message } from "element-ui";
import { getToken } from '@/utils/auth';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 50000, // 超时时间
    withCredentials: true, // 携带cookie
    crossDoMain: true // 跨域
});

service.interceptors.request.use(
    config => {
        // 获取token
        const token = getToken('token')
        token && (config.headers.Authorization = token)
        return config;
    },
    error => {
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        NProgress.done();
        //token失效
        if (response.data.code == -1) {
            // Message({
            //     message: response.data.message,
            //     type: 'warning',
            //     duration: 1500
            // })
            location.href = '/#/login';
            } else {
            return response.data
            }
    },
    error => {
        NProgress.done();
        Message({
          message: '网络请求失败，请重试！',
          type: 'warning',
          duration: 1500
        })
        return Promise.reject(error);
    }
);

export default service;
