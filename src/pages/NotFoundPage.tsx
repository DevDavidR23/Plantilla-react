import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/router/routes'

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center text-center">
    <p className="text-8xl font-extrabold text-primary-600">404</p>
    <h1 className="mt-4 text-2xl font-bold text-secondary-900">Page not found</h1>
    <p className="mt-2 text-secondary-500">
      Oops! The page you're looking for doesn't exist or has been moved.
    </p>
    <Link to={ROUTES.DASHBOARD} className="mt-6">
      <Button leftIcon={<Home size={16} />}>Back to Dashboard</Button>
    </Link>
  </div>
)

export default NotFoundPage
