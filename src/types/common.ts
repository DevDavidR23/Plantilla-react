export interface PaginationParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ApiError {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}

export type Status = 'idle' | 'loading' | 'success' | 'error'

export interface SelectOption<T = string> {
  label: string
  value: T
  disabled?: boolean
}
