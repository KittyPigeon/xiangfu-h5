import { post, get } from './service'
import { API_ENDPOINTS } from './config'

// 查询活动列表
export const queryUserActivity = (data) => {
    return get(`${API_ENDPOINTS.ACTIVITY}/hot`, data)
}

// 获取分类列表
export const queryActivityCategory = () => {
    return get(`${API_ENDPOINTS.ACTIVITY}/category/list`)
}

// 分页查询活动列表
export const queryActivityList = (data) => {
    return post(`${API_ENDPOINTS.ACTIVITY}/page?current=${data.current}&size=${data.size}`, data.queryDTO)
}

// 获取活动详情
export const queryActivityDetail = (activityId) => {
    return get(`${API_ENDPOINTS.ACTIVITY}/${activityId}`)
}


