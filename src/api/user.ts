import { post, get } from './service'
import { API_ENDPOINTS } from './config'

// 使用优惠券
export const userUseCoupon = (data) => {
    return post(`${API_ENDPOINTS.USER}/coupon/use`, data)
}

// 领取优惠券
export const userReceiveCoupon = (data) => {
    return post(`${API_ENDPOINTS.USER}/coupon/receive`, data)
}

// 获取用户优惠券详情
export const queryUserCouponDetail = (userCouponId) => {
    return get(`${API_ENDPOINTS.USER}/coupon/${userCouponId}`)
}

// 分页查询用户优惠券
export const queryUserCoupons = (data) => {
    return get(`${API_ENDPOINTS.USER}/coupon/page`, data)
}

// 检查是否已领取
export const checkUserCoupon = (data) => {
    return get(`${API_ENDPOINTS.USER}/coupon/check/`, data)
}
// 检查是否已收藏
export const checkUseFavorite = (data) => {
    return get(`${API_ENDPOINTS.USER}/favorite/check/`, data)
}

// 获取用户信息
export const getUserData = () => {
    return get(`${API_ENDPOINTS.USER}/info`)
}

