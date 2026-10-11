import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { store } from '@/store'
import { logout } from '@/store/slices/authSlice'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1'
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT ?? 10000)
const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY ?? 'auth_token'
const REFRESH_KEY = import.meta.env.VITE_AUTH_REFRESH_KEY ?? 'refresh_token'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — attach token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor — handle 401 + token refresh
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return apiClient(originalRequest)
          })
          .catch(err => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = localStorage.getItem(REFRESH_KEY)

      if (!refreshToken) {
        store.dispatch(logout())
        return Promise.reject(error)
      }

      try {
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken })
        localStorage.setItem(TOKEN_KEY, data.token)
        apiClient.defaults.headers.common.Authorization = `Bearer ${data.token}`
        processQueue(null, data.token)
        return apiClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null)
        store.dispatch(logout())
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
