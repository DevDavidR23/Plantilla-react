import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { registerSchema, type RegisterFormData } from '@/utils/validation'
import { useToast } from '@/hooks/useToast'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ROUTES } from '@/router/routes'
import { authService } from '@/services/authService'

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await authService.register(data)
      toast.success('Account created! Please sign in.')
      navigate(ROUTES.LOGIN)
    } catch {
      toast.error('Registration failed. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-secondary-900">Create account</h2>
        <p className="mt-1 text-sm text-secondary-500">Fill in the details below to get started</p>
      </div>

      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        leftIcon={<User size={16} />}
        error={errors.name?.message}
        required
        {...register('name')}
      />

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
        placeholder="Min. 8 characters"
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

      <Input
        label="Confirm Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Repeat password"
        leftIcon={<Lock size={16} />}
        error={errors.confirmPassword?.message}
        required
        {...register('confirmPassword')}
      />

      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Create account
      </Button>

      <p className="text-center text-sm text-secondary-500">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-primary-600 hover:text-primary-700 font-medium">
          Sign in
        </Link>
      </p>
    </form>
  )
}

export default RegisterPage
