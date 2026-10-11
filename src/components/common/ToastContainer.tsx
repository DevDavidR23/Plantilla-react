import { useEffect } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore'
import { removeToast } from '@/store/slices/uiSlice'
import { cn } from '@/utils/cn'

const icons = {
  success: <CheckCircle size={18} className="text-green-500" />,
  error: <XCircle size={18} className="text-red-500" />,
  warning: <AlertTriangle size={18} className="text-yellow-500" />,
  info: <Info size={18} className="text-blue-500" />,
}

const styles = {
  success: 'border-green-200 bg-green-50',
  error: 'border-red-200 bg-red-50',
  warning: 'border-yellow-200 bg-yellow-50',
  info: 'border-blue-200 bg-blue-50',
}

const AutoDismissToast = ({
  id,
  type,
  message,
  duration = 4000,
}: {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const timer = setTimeout(() => dispatch(removeToast(id)), duration)
    return () => clearTimeout(timer)
  }, [id, duration, dispatch])

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4 shadow-md animate-slide-in',
        styles[type]
      )}
    >
      <span className="mt-0.5 shrink-0">{icons[type]}</span>
      <p className="flex-1 text-sm text-secondary-800">{message}</p>
      <button
        onClick={() => dispatch(removeToast(id))}
        className="shrink-0 text-secondary-400 hover:text-secondary-600"
      >
        <X size={16} />
      </button>
    </div>
  )
}

export const ToastContainer = () => {
  const toasts = useAppSelector(state => state.ui.toasts)

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80">
      {toasts.map(toast => (
        <AutoDismissToast key={toast.id} {...toast} />
      ))}
    </div>
  )
}
