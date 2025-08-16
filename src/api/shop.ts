import { post, get } from './service'

// 获取商户详情
export const getMerchantData = (merchantId) => {
    return get(`/api/merchant/${merchantId}`)
}
// 搜索商户
export const searchMerchant = (data) => {
    return get(`/api/merchant/search`, data)
}

// 获取热门商户
export const queryHotMerchant = (data) => {
    return get(`/api/merchant/hot`, data)
}

// 获取启用分类商户数量统计
export const queryHotMerchantCategory = () => {
    return get(`/api/merchant/category/count/enabled`)
}
// 获取启用分类商户数量统计
export const queryMerchatShop = () => {
    return get(`/api/merchant/page`)
}
