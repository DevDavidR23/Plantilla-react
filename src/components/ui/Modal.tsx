import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  className,
}: ModalProps) => {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full rounded-xl bg-white shadow-xl animate-slide-in',
          sizeClasses[size],
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        {(title || description) && (
          <div className="border-b border-secondary-200 p-6 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                {title && (
                  <h2 className="text-lg font-semibold text-secondary-900">{title}</h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-secondary-500">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="shrink-0 rounded-lg p-1 text-secondary-400 hover:bg-secondary-100 hover:text-secondary-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
