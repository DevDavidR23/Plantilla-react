import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/router/routes'

export const AuthLayout = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary-50 to-secondary-100 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600">
            <span className="text-xl font-bold text-white">IA</span>
          </div>
          <h1 className="text-2xl font-bold text-secondary-900">ReactBoilerplate App</h1>
          <p className="mt-1 text-sm text-secondary-500">Welcome back! Please sign in to continue.</p>
        </div>
        <div className="card">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
