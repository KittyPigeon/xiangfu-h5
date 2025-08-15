import { post, get } from './service'


// 查询活动列表
export const queryUserActivity = (data) => {
    return get(`/api/activity/hot`, data)
}



