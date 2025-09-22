import type { ApiResponse } from '@/shared/types'

// 请求配置
const BASE_URL = '/api' // 连接到现有的后端API

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: Record<string, string>
  timeout?: number
}

// 封装请求函数
export function request<T = any>(url: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  return new Promise((resolve, reject) => {
    const {
      method = 'GET',
      data,
      header = {},
      timeout = 10000
    } = options

    // 设置默认请求头
    const defaultHeader = {
      'Content-Type': 'application/json',
      ...header
    }

    // 发起请求
    uni.request({
      url: BASE_URL + url,
      method,
      data,
      header: defaultHeader,
      timeout,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data as ApiResponse<T>)
        } else {
          reject(new Error(`请求失败: ${res.statusCode}`))
        }
      },
      fail: (err) => {
        console.error('请求失败:', err)
        reject(new Error('网络请求失败'))
      }
    })
  })
}

// GET 请求
export function get<T = any>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
  let queryString = ''
  if (params) {
    queryString = '?' + Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&')
  }
  
  return request<T>(url + queryString, { method: 'GET' })
}

// POST 请求
export function post<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
  return request<T>(url, { method: 'POST', data })
}

// PUT 请求
export function put<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
  return request<T>(url, { method: 'PUT', data })
}

// DELETE 请求
export function del<T = any>(url: string): Promise<ApiResponse<T>> {
  return request<T>(url, { method: 'DELETE' })
}

// 文件上传
export function uploadFile(filePath: string, name: string = 'file'): Promise<ApiResponse<{ url: string }>> {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: BASE_URL + '/upload',
      filePath,
      name,
      success: (res) => {
        try {
          const data = JSON.parse(res.data)
          resolve(data)
        } catch (err) {
          reject(new Error('上传响应解析失败'))
        }
      },
      fail: (err) => {
        console.error('文件上传失败:', err)
        reject(new Error('文件上传失败'))
      }
    })
  })
}