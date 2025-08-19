// 获取
import { post, get } from './service'


// 获取微信JS-SDK签名参数
export const queryWxConfig = () => {
    return get(`/api/map/ip-location`)
}

// 获取微信JS-SDK签名参数
export const querywechatWebAuthUrl = (data) => {
    return get(`/api/wechat/web/auth-url`, data)
}

// 领取用户id信息
export const wechatWebLogin = (data) => {
    return post(`/api/wechat/web/login`, data)
}


