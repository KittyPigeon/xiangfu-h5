import { post, get, del } from './service'
import { API_ENDPOINTS } from './config'

// 添加收藏
/* {
  "targetType": 1,
  "targetId": 1
}
targetType 收藏类型（1:商户, 2:活动）,示例值(1)	
targetId	目标ID,示例值(1)	 */
export const addCollect = (data) => {
    return post(`${API_ENDPOINTS.FAVORITE}`, data)
}

// 取消收藏
export const delColloect = (data) => {
    return del(`${API_ENDPOINTS.FAVORITE}`, data)
}

// 分页查询收藏列表
export const queryCollectList = (data) => {
    return get(`${API_ENDPOINTS.FAVORITE}/page`, data)
}


