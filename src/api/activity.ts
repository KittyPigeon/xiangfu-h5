import { post, get } from './service'


// 查询活动列表
export const queryUserActivity = (data) => {
    return get(`/api/activity/hot`, data)
}

// 获取分类列表
export const queryActivityCategory = () => {
    return get(`/api/activity/category/list`)
}


// 分页查询活动列表
export const queryActivityList = (data) => {
    return get(`/api/activity/page`, data)
}

// 获取活动详情
export const queryActivityDetail = (activityId) => {
    return get(`/api/activity/${activityId}`)
}


