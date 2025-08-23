import { post, get } from './service'


// 创建拼约活动
export const createGroupActivity = (data) => {
    return post(`/api/group-activity`, data)
}

// 报名活动
export const signUpActivity = (id) => {
    return post(`/api/group-activity/${id}/signup`,{})
}


// 获取活动详情
export const fetchGoupActivityDetail = (id) => {
    return get(`/api/group-activity/${id}`)
}

// 查询活动列表
export const queryActivityList = (data) => {
    return get(`/api/group-activity/by-date`,data)
}
// 搜索活动列表
export const searchActivityList = (data) => {
    return get(`/api/group-activity/search`,data)
}

// 活动日期
export const queryActivityDate = (data) => {
    return get(`/api/group-activity/dates`,data)
}

