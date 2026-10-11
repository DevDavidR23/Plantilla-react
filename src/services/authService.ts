import apiClient from './apiClient'
import type { LoginPayload, RegisterPayload, AuthResponse } from '@/types/auth'

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', payload)
    return data
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', payload)
    return data
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },

  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    const { data } = await apiClient.post('/auth/refresh', { refreshToken })
    return data
  },

  getMe: async () => {
    const { data } = await apiClient.get('/auth/me')
    return data
  },
}
