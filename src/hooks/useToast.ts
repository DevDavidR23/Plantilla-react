import { useAppDispatch } from './useAppStore'
import { addToast, removeToast } from '@/store/slices/uiSlice'

export const useToast = () => {
  const dispatch = useAppDispatch()

  const toast = {
    success: (message: string, duration = 4000) =>
      dispatch(addToast({ type: 'success', message, duration })),
    error: (message: string, duration = 5000) =>
      dispatch(addToast({ type: 'error', message, duration })),
    warning: (message: string, duration = 4000) =>
      dispatch(addToast({ type: 'warning', message, duration })),
    info: (message: string, duration = 4000) =>
      dispatch(addToast({ type: 'info', message, duration })),
    dismiss: (id: string) => dispatch(removeToast(id)),
  }

  return toast
}
