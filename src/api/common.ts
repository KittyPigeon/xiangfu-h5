// 获取
import { post, get, uploadFile } from './service'
import { API_ENDPOINTS } from './config'

// 获取IP位置信息
export const queryWxConfig = () => {
    return get(`${API_ENDPOINTS.MAP}/ip-location`)
}

// 获取微信授权URL
export const querywechatWebAuthUrl = (data) => {
    return get(`${API_ENDPOINTS.WECHAT}/web/auth-url`, data)
}

// 微信登录
export const wechatWebLogin = (data) => {
    return post(`${API_ENDPOINTS.WECHAT}/web/login`, data)
}

// 上传文件
export const uploadFileApi = (data) => {
    return uploadFile(`${API_ENDPOINTS.UPLOAD}/image`, data)
}


