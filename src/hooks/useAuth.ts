import { useAppSelector, useAppDispatch } from './useAppStore'
import { logout, setCredentials } from '@/store/slices/authSlice'
import { authService } from '@/services/authService'
import type { LoginPayload } from '@/types/auth'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { user, token, isAuthenticated, isLoading } = useAppSelector(state => state.auth)

  const login = async (payload: LoginPayload) => {
    const response = await authService.login(payload)
    dispatch(setCredentials({ user: response.user, token: response.token }))
    return response
  }

  const logoutUser = () => {
    dispatch(logout())
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout: logoutUser,
  }
}
