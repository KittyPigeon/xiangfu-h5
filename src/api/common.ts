// 获取
import { post, get } from './service'


// 获取微信JS-SDK签名参数
export const queryWxConfig = () => {
    return get(`/api/map/ip-location`)
}


