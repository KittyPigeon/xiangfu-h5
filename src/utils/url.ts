/**
 * URL参数处理工具函数
 */

/**
 * 将对象转换为URL查询参数字符串
 * @param obj 要转换的对象
 * @param prefix 是否添加前缀&符号，默认为true
 * @returns 查询参数字符串，例如: "&name=张三&age=25&city=北京"
 */
export function objectToQueryString(obj: Record<string, any>, prefix: boolean = true): string {
  if (!obj || typeof obj !== 'object') {
    return ''
  }

  const params: string[] = []
  
  for (const [key, value] of Object.entries(obj)) {
    // 跳过 undefined、null 和空字符串
    if (value !== undefined && value !== null && value !== '') {
      // 处理数组
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (item !== undefined && item !== null && item !== '') {
            params.push(`${encodeURIComponent(key)}[${index}]=${encodeURIComponent(String(item))}`)
          }
        })
      }
      // 处理对象
      else if (typeof value === 'object') {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`)
      }
      // 处理基本类型
      else {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      }
    }
  }

  if (params.length === 0) {
    return ''
  }

  const queryString = params.join('&')
  return prefix ? `&${queryString}` : queryString
}

/**
 * 将对象转换为URL查询参数字符串（不带前缀&）
 * @param obj 要转换的对象
 * @returns 查询参数字符串，例如: "name=张三&age=25&city=北京"
 */
export function objectToParams(obj: Record<string, any>): string {
  return objectToQueryString(obj, false)
}

/**
 * 将URL查询参数字符串转换为对象
 * @param queryString 查询参数字符串，例如: "name=张三&age=25&city=北京" 或 "&name=张三&age=25"
 * @returns 转换后的对象
 */
export function queryStringToObject(queryString: string): Record<string, any> {
  if (!queryString) {
    return {}
  }

  // 移除开头的 ? 或 &
  const cleanQuery = queryString.replace(/^[?&]/, '')
  
  if (!cleanQuery) {
    return {}
  }

  const params: Record<string, any> = {}
  
  cleanQuery.split('&').forEach(param => {
    const [key, value] = param.split('=')
    if (key) {
      const decodedKey = decodeURIComponent(key)
      const decodedValue = value ? decodeURIComponent(value) : ''
      
      // 处理数组格式 key[0], key[1]
      const arrayMatch = decodedKey.match(/^(.+)\[(\d+)\]$/)
      if (arrayMatch) {
        const [, arrayKey, index] = arrayMatch
        if (!params[arrayKey]) {
          params[arrayKey] = []
        }
        params[arrayKey][parseInt(index)] = decodedValue
      } else {
        // 尝试解析JSON
        try {
          params[decodedKey] = JSON.parse(decodedValue)
        } catch {
          params[decodedKey] = decodedValue
        }
      }
    }
  })

  return params
}

/**
 * 在现有URL上添加查询参数
 * @param url 原始URL
 * @param params 要添加的参数对象
 * @returns 带参数的完整URL
 */
export function addParamsToUrl(url: string, params: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) {
    return url
  }

  const queryString = objectToParams(params)
  if (!queryString) {
    return url
  }

  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}${queryString}`
}

/**
 * 使用示例：
 * 
 * const obj = {
 *   name: '张三',
 *   age: 25,
 *   city: '北京',
 *   tags: ['学生', '程序员'],
 *   info: { level: 'senior', score: 95 }
 * }
 * 
 * // 转换为带&前缀的查询参数
 * const withPrefix = objectToQueryString(obj)
 * // 结果: "&name=张三&age=25&city=北京&tags[0]=学生&tags[1]=程序员&info={"level":"senior","score":95}"
 * 
 * // 转换为不带前缀的查询参数
 * const withoutPrefix = objectToParams(obj)
 * // 结果: "name=张三&age=25&city=北京&tags[0]=学生&tags[1]=程序员&info={"level":"senior","score":95}"
 * 
 * // 添加到URL
 * const url = addParamsToUrl('https://api.example.com/users', obj)
 * // 结果: "https://api.example.com/users?name=张三&age=25&city=北京&tags[0]=学生&tags[1]=程序员&info={"level":"senior","score":95}"
 */
