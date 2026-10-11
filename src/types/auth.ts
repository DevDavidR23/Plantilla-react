import type { User } from './user'

export interface LoginPayload {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}
