import { cn } from '@/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
  action?: React.ReactNode
}

export const Card = ({ children, className, title, description, action }: CardProps) => (
  <div className={cn('card', className)}>
    {(title || action) && (
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          {title && <h3 className="text-base font-semibold text-secondary-900">{title}</h3>}
          {description && <p className="mt-0.5 text-sm text-secondary-500">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    )}
    {children}
  </div>
)
