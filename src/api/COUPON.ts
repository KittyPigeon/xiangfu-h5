import { post, get } from './service'
import { API_ENDPOINTS } from './config'
// 获取商户详情
export const getMerchantCouponData = (merchantId) => {
    return get(`${API_ENDPOINTS.COUPON}/merchant/${merchantId}`)
}

// 搜索商户
export const searchMerchant = (data) => {
    return get(`${API_ENDPOINTS.COUPON}/receive`, data)
}

// 获取热门商户
export const queryHotMerchant = (data) => {
    return get(`${API_ENDPOINTS.MERCHANT}/hot`, data)
}

// 获取启用分类商户数量统计
export const queryHotMerchantCategory = () => {
    return get(`${API_ENDPOINTS.MERCHANT}/category/count/enabled`)
}

// 获取商户分页列表
export const queryMerchatPage = (data) => {
    return get(`${API_ENDPOINTS.MERCHANT}/page`, data)
}

// 获取商户首页搜索
export const queryMerchantHomeSearch = (data) => {
    return get(`${API_ENDPOINTS.MERCHANT}/homeSearch`, data)
}
