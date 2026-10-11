import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/types/user'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY ?? 'auth_token'),
  isAuthenticated: !!localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY ?? 'auth_token'),
  isLoading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      localStorage.setItem(
        import.meta.env.VITE_AUTH_TOKEN_KEY ?? 'auth_token',
        action.payload.token
      )
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    logout: state => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_KEY ?? 'auth_token')
      localStorage.removeItem(import.meta.env.VITE_AUTH_REFRESH_KEY ?? 'refresh_token')
    },
  },
})

export const { setCredentials, setUser, setLoading, logout } = authSlice.actions
export default authSlice.reducer
