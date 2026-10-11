import apiClient from './apiClient'
import type { User, CreateUserPayload, UpdateUserPayload } from '@/types/user'
import type { PaginatedResponse, PaginationParams } from '@/types/common'

export const userService = {
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<User>> => {
    const { data } = await apiClient.get<PaginatedResponse<User>>('/users', { params })
    return data
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await apiClient.get<User>(`/users/${id}`)
    return data
  },

  create: async (payload: CreateUserPayload): Promise<User> => {
    const { data } = await apiClient.post<User>('/users', payload)
    return data
  },

  update: async (id: string, payload: UpdateUserPayload): Promise<User> => {
    const { data } = await apiClient.put<User>(`/users/${id}`, payload)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`)
  },
}
