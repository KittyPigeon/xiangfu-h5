import { post, get } from './service'
import { API_ENDPOINTS } from './config'

// 距离计算
export const calDistance = (data) => {
    return get(`${API_ENDPOINTS.MAP}/distance`, data)
}

// 路径规划
export const calDirection = (data) => {
    return get(`${API_ENDPOINTS.MAP}/direction`, data)
}

// 获取活动地图标记
export const queryMapActivities = (data) => {
    return get(`${API_ENDPOINTS.MAP}/activities`, data)
}

// 根据js-sdk获取地理位置权限
export const querymapIplocation = (data) => {
    return get(`${API_ENDPOINTS.MAP}/ip-location`, data)
}

// 地图key
export const querymapMiniprogramKey = (data) => {
    return get(`${API_ENDPOINTS.MAP}/miniprogram-key`, data)
}
