import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface UIState {
  isDarkMode: boolean
  isSidebarOpen: boolean
  toasts: Toast[]
}

const initialState: UIState = {
  isDarkMode: localStorage.getItem('theme') === 'dark',
  isSidebarOpen: true,
  toasts: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.isDarkMode = !state.isDarkMode
      localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', state.isDarkMode)
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload
      localStorage.setItem('theme', action.payload ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', action.payload)
    },
    toggleSidebar: state => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload
    },
    addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      state.toasts.push({
        ...action.payload,
        id: Date.now().toString(),
      })
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(t => t.id !== action.payload)
    },
  },
})

export const { toggleDarkMode, setDarkMode, toggleSidebar, setSidebarOpen, addToast, removeToast } =
  uiSlice.actions
export default uiSlice.reducer
