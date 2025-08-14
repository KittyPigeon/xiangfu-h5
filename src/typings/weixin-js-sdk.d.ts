declare namespace WeixinJSBridge {
  interface LocationResult {
    latitude: number
    longitude: number
    speed: number
    accuracy: number
  }
  
  interface GetLocationOptions {
    type?: 'wgs84' | 'gcj02'
    success?: (res: LocationResult) => void
    fail?: (err: any) => void
    complete?: () => void
  }
  
  function getLocation(options: GetLocationOptions): void
}

declare const wx: {
  config: (config: {
    debug?: boolean
    appId: string
    timestamp: number | string
    nonceStr: string
    signature: string
    jsApiList: string[]
  }) => void
  ready: (callback: () => void) => void
  error: (callback: (err: any) => void) => void
  getLocation: (options: WeixinJSBridge.GetLocationOptions) => void
  // 其他微信JS-SDK方法...
}