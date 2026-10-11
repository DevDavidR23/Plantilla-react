import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore'
import { toggleSidebar } from '@/store/slices/uiSlice'
import { logout } from '@/store/slices/authSlice'
import { ROUTES } from '@/router/routes'
import { cn } from '@/utils/cn'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: ROUTES.DASHBOARD },
  { label: 'Users', icon: Users, to: ROUTES.USERS },
  { label: 'Settings', icon: Settings, to: ROUTES.SETTINGS },
]

export const Sidebar = () => {
  const dispatch = useAppDispatch()
  const isSidebarOpen = useAppSelector(state => state.ui.isSidebarOpen)

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col bg-secondary-900 text-white transition-all duration-300',
        isSidebarOpen ? 'w-64' : 'w-16'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-secondary-700">
        {isSidebarOpen && (
          <span className="text-lg font-bold text-white truncate">ReactBoilerplateApp</span>
        )}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="ml-auto rounded-lg p-1.5 text-secondary-400 hover:bg-secondary-700 hover:text-white transition-colors"
        >
          {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-secondary-400 hover:bg-secondary-700 hover:text-white'
              )
            }
          >
            <Icon size={18} className="shrink-0" />
            {isSidebarOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-secondary-700 p-3">
        <button
          onClick={() => dispatch(logout())}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-secondary-400 hover:bg-secondary-700 hover:text-white transition-colors"
        >
          <LogOut size={18} className="shrink-0" />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
