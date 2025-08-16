import { post, get } from './service'

// 距离计算
export const calDistance = (data) => {
    return get(`/api/map/distance`, data)
}
// 路径规划
export const calDirection = (data) => {
    return get(`/api/map/direction`, data)
}

// 获取活动地图标记
export const queryMapActivities = (data) => {
    return get(`/api/map/activities`, data)
}

// 根据js-sdk获取地理位置权限
export const querymapIplocation = (data) => {
    return get(`/api/map/ip-location`, data)
}


