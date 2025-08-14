import { post, get } from './service'

// 使用优惠券
export const userUseCoupon = (data) => {
    return post(`/api/user/coupon/use`, data)
}

// 领取优惠券
export const userReceiveCoupon = (data) => {
    return post(`/api/user/coupon/receive`, data)
}

// 获取用户优惠券详情
export const queryMapActivities = (userCouponId) => {
    return get(`/api/user/coupon/${userCouponId}`)
}

// 分页查询用户优惠券
export const getUserCoupons = (data) => {
    return get(`/api/user/coupon/page`, data)
}

// 检查是否已领取
export const checkUserCoupon = (couponId) => {
    return get(`/api/user/coupon/check/${couponId}`)
}

