import { ref } from 'vue'
import wx from 'weixin-js-sdk-ts'

interface WxConfigParams {
    appId: string
    timestamp: number
    nonceStr: string
    signature: string
}

export function useWechatSDK() {
    const isWxReady = ref(false)
    const location = ref<{ latitude: number; longitude: number } | null>(null)
    const error = ref<string | null>(null)

    // 初始化微信配置
    const initWxConfig = async (params: WxConfigParams) => {
        return new Promise((resolve, reject) => {
            wx.config({
                debug: process.env.NODE_ENV === 'development', // 开发环境开启调试
                appId: params.appId,
                timestamp: params.timestamp,
                nonceStr: params.nonceStr,
                signature: params.signature,
                jsApiList: ['getLocation'] // 需要使用的JS接口列表
            })

            wx.ready(() => {
                isWxReady.value = true
                resolve(true)
            })

            wx.error((err) => {
                error.value = `微信SDK初始化失败: ${JSON.stringify(err)}`
                reject(err)
            })
        })
    }

    // 获取当前位置
    const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
        return new Promise((resolve, reject) => {
            if (!isWxReady.value) {
                reject('微信SDK未初始化完成')
                return
            }

            wx.getLocation({
                type: 'gcj02', // 返回可用于wx.openLocation的坐标
                success: (res) => {
                    location.value = {
                        latitude: res.latitude,
                        longitude: res.longitude
                    }
                    resolve(location.value)
                },
                fail: (err) => {
                    error.value = `获取位置失败: ${JSON.stringify(err)}`
                    reject(err)
                }
            })
        })
    }

    return {
        isWxReady,
        location,
        error,
        initWxConfig,
        getCurrentLocation
    }
}