import { http } from '@/utils/http/index'

export const post = (url, data) => {
    return http.request({
        method: 'post',
        data: data,
        url: url,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const get = (url, data = {}) => {
    return http.request({
        url: url,
        method: 'get',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
export const put = (url, data) => {
    return http.request({
        url: url,
        method: 'put',
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
export const del = (url, data) => {
    return http.request({
        url: url,
        method: 'delete',
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const uploadFile = (url, formData) => {
    return http.request({
        url: url,
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}