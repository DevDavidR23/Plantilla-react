import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { ToastContainer } from '@/components/common/ToastContainer'
import { useAppSelector } from '@/hooks/useAppStore'
import { cn } from '@/utils/cn'

export const RootLayout = () => {
  const isSidebarOpen = useAppSelector(state => state.ui.isSidebarOpen)

  return (
    <div className="flex h-screen overflow-hidden bg-secondary-50">
      <Sidebar />
      <div
        className={cn(
          'flex flex-1 flex-col overflow-hidden transition-all duration-300',
          isSidebarOpen ? 'ml-64' : 'ml-16'
        )}
      >
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  )
}
