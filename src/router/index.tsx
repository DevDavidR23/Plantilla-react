import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { RootLayout } from '@/components/layout/RootLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { ProtectedRoute } from '@/components/common/ProtectedRoute'
import { PageLoader } from '@/components/common/PageLoader'
import { ROUTES } from './routes'

// Lazy-loaded pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const UsersPage = lazy(() => import('@/pages/users/UsersPage'))
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: withSuspense(DashboardPage),
          },
          {
            path: ROUTES.USERS,
            element: withSuspense(UsersPage),
          },
          {
            path: ROUTES.SETTINGS,
            element: withSuspense(SettingsPage),
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: withSuspense(LoginPage),
      },
      {
        path: ROUTES.REGISTER,
        element: withSuspense(RegisterPage),
      },
    ],
  },
  {
    path: '*',
    element: withSuspense(NotFoundPage),
  },
])
