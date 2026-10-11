export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  SETTINGS: '/settings',
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = (typeof ROUTES)[RouteKey]
