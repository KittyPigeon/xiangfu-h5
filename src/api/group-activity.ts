import { post, get } from './service'
import { API_ENDPOINTS } from './config'

// 创建拼约活动
export const createGroupActivity = (data) => {
    return post(`${API_ENDPOINTS.GROUP_ACTIVITY}`, data)
}

// 报名活动
export const signUpActivity = (id) => {
    return post(`${API_ENDPOINTS.GROUP_ACTIVITY}/${id}/signup`, {})
}

// 获取活动详情
export const fetchGoupActivityDetail = (id) => {
    return get(`${API_ENDPOINTS.GROUP_ACTIVITY}/${id}`)
}

// 查询活动列表
export const queryActivityList = (data) => {
    return get(`${API_ENDPOINTS.GROUP_ACTIVITY}/by-date`, data)
}
// 搜索活动列表
export const searchActivityList = (data) => {
    return get(`/api/group-activity/search`,data)
}

// 活动日期
export const queryActivityDate = (data) => {
    return get(`${API_ENDPOINTS.GROUP_ACTIVITY}/dates`, data)
}

