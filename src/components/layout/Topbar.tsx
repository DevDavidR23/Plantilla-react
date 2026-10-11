import { Bell, Sun, Moon, Search } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore'
import { toggleDarkMode } from '@/store/slices/uiSlice'
import { getInitials } from '@/utils/format'

export const Topbar = () => {
  const dispatch = useAppDispatch()
  const { isDarkMode } = useAppSelector(state => state.ui)
  const { user } = useAppSelector(state => state.auth)

  return (
    <header className="flex h-16 items-center justify-between border-b border-secondary-200 bg-white px-6 shadow-xs">
      {/* Search */}
      <div className="relative w-72">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
        <input
          type="text"
          placeholder="Search..."
          className="input pl-9 py-1.5 text-sm"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Dark mode toggle */}
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="btn-ghost rounded-lg p-2"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button className="relative btn-ghost rounded-lg p-2" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">
            {user?.name ? getInitials(user.name) : 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-secondary-900 leading-tight">{user?.name ?? 'User'}</p>
            <p className="text-xs text-secondary-500 leading-tight">{user?.role ?? 'member'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
