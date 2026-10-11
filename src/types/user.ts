export type UserRole = 'admin' | 'manager' | 'user'
export type UserStatus = 'active' | 'inactive' | 'pending'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface CreateUserPayload {
  name: string
  email: string
  password: string
  role?: UserRole
}

export interface UpdateUserPayload {
  name?: string
  email?: string
  role?: UserRole
  status?: UserStatus
  avatar?: string
}
