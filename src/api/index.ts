// api/index.ts
import axios from 'axios'
import { redirect } from 'next/navigation'
import { message } from 'antd'
import { useApiStore } from '@/stores/api'
import { ROUTES } from '@/utils/routes'
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import type { ApiResponse } from '@/api/types'

const request: AxiosInstance = axios.create({
    baseURL: '/app',
    timeout: 10000,
})

// 请求拦截器 - 自动设置 Loading
request.interceptors.request.use(config => {
    const key = config.url || 'default'
    useApiStore.getState().setLoading(key, true)

    // 注入认证和路由参数
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token')
        if (token) config.headers.Authorization = `Bearer ${token}`

        const path = window.location.pathname
        const [, projectId] = path.match(/^\/project\/([^/]+)/) || []
        const [, teamId] = path.match(/^\/main\/teams\/([^/]+)/) || []

        if (projectId) config.headers['X-Project-Id'] = projectId
        if (teamId) config.headers['X-Team-Id'] = teamId
    }

    return config
})

// 响应拦截器 - 自动清除 Loading
request.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        const key = response.config.url || 'default'
        useApiStore.getState().setLoading(key, false)

        if (!response.data.success) {
            message.error(response.data.message || '请求失败')
            return Promise.reject(response)
        }
        return response
    },
    (error: AxiosError<ApiResponse>) => {
        const key = error.config?.url || 'default'
        useApiStore.getState().setLoading(key, false)

        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            redirect(ROUTES.LOGIN)
        }

        const msg = error.response?.data?.message ||
            error.message ||
            '网络错误，请稍后重试'
        message.error(msg)

        return Promise.reject(error)
    }
)

export default request