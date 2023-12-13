import axios from "axios";
import { ElMessage  } from "element-plus";
import { getToken } from "./auth";

// 创建axios实例
const service = axios.create({
  baseURL: "http://127.0.0.1:8080", // api的base_url
  timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] ='Bearer '+ token;
    }
    console.log(config);
    
    return config;
  },
  error => {
    // 请求错误处理
    console.log(error); 
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    if(response.data.code==0){
      ElMessage.error(response.data.msg);
      //如果token过期，跳转到登录页面
      if(response.data.msg=="未登录"){
        window.location.href="/login";
      }
    }else if(response.data.code==1){
      ElMessage({
        message: response.data.msg,
        type: 'success',
      })
      console.log(response.data);
    }
    return response;
  },error => {
    console.log(error);
    ElMessage.error("请求错误");
    return Promise.reject(error)
  }
);

export default service;