// API配置文件
export const routerPrefix = import.meta.env.VITE_ROUTER_PREFIX || '/cpi'

// 统一的API前缀配置
export const API_ENDPOINTS = {
    // 商户相关
    MERCHANT: `${routerPrefix}/merchant`,
    
    // 活动相关
    ACTIVITY: `${routerPrefix}/activity`,
    
    // 收藏相关
    FAVORITE: `${routerPrefix}/user/favorite`,
    
    // 用户相关
    USER: `${routerPrefix}/user`,
    
    // 地图相关
    MAP: `${routerPrefix}/map`,
    
    // 微信相关
    WECHAT: `${routerPrefix}/wechat`,
    
    // 拼约活动
    GROUP_ACTIVITY: `${routerPrefix}/group-activity`,
    
    // 通用功能
    UPLOAD: `${routerPrefix}/upload`,
    
    COUPON: `${routerPrefix}/coupon`,
}

console.log('API配置加载:', { routerPrefix, API_ENDPOINTS })
