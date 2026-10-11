import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { loginSchema, type LoginFormData } from '@/utils/validation'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ROUTES } from '@/router/routes'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? ROUTES.DASHBOARD

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch {
      toast.error('Invalid email or password. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-secondary-900">Sign in</h2>
        <p className="mt-1 text-sm text-secondary-500">Enter your credentials to continue</p>
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        leftIcon={<Mail size={16} />}
        error={errors.email?.message}
        required
        {...register('email')}
      />

      <Input
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        leftIcon={<Lock size={16} />}
        rightIcon={
          <button type="button" onClick={() => setShowPassword(p => !p)}>
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
        error={errors.password?.message}
        required
        {...register('password')}
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-secondary-600 cursor-pointer">
          <input type="checkbox" className="rounded-sm" {...register('rememberMe')} />
          Remember me
        </label>
        <Link to="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Sign in
      </Button>

      <p className="text-center text-sm text-secondary-500">
        Don't have an account?{' '}
        <Link to={ROUTES.REGISTER} className="text-primary-600 hover:text-primary-700 font-medium">
          Sign up
        </Link>
      </p>
    </form>
  )
}

export default LoginPage
