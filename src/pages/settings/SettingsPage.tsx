import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Moon, Sun, Bell } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore'
import { toggleDarkMode } from '@/store/slices/uiSlice'
import { useToast } from '@/hooks/useToast'

const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
})

type ProfileFormData = z.infer<typeof profileSchema>

const SettingsPage = () => {
  const dispatch = useAppDispatch()
  const toast = useToast()
  const { isDarkMode } = useAppSelector(state => state.ui)
  const { user } = useAppSelector(state => state.auth)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? '', email: user?.email ?? '' },
  })

  const onSubmit = async (_data: ProfileFormData) => {
    await new Promise(r => setTimeout(r, 800)) // simulate API
    toast.success('Profile updated successfully!')
  }

  return (
    <div className="space-y-6 max-w-2xl animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Settings</h1>
        <p className="mt-1 text-sm text-secondary-500">Manage your account and preferences.</p>
      </div>

      {/* Profile */}
      <Card title="Profile" description="Update your personal information">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Full Name" error={errors.name?.message} {...register('name')} />
          <Input label="Email Address" type="email" error={errors.email?.message} {...register('email')} />
          <Button type="submit" isLoading={isSubmitting}>Save Changes</Button>
        </form>
      </Card>

      {/* Appearance */}
      <Card title="Appearance" description="Customize the look and feel of the app">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDarkMode ? <Moon size={20} className="text-secondary-600" /> : <Sun size={20} className="text-secondary-600" />}
            <div>
              <p className="text-sm font-medium text-secondary-900">Dark Mode</p>
              <p className="text-xs text-secondary-500">Toggle between light and dark theme</p>
            </div>
          </div>
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-hidden ${
              isDarkMode ? 'bg-primary-600' : 'bg-secondary-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </Card>

      {/* Notifications */}
      <Card title="Notifications" description="Choose what you want to be notified about">
        {[
          { label: 'Email notifications', description: 'Receive updates via email' },
          { label: 'Push notifications', description: 'Receive push notifications in browser' },
          { label: 'Weekly digest', description: 'Get a weekly summary of activity' },
        ].map(item => (
          <div key={item.label} className="flex items-center justify-between py-3 border-b border-secondary-100 last:border-0">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-secondary-400" />
              <div>
                <p className="text-sm font-medium text-secondary-900">{item.label}</p>
                <p className="text-xs text-secondary-500">{item.description}</p>
              </div>
            </div>
            <input type="checkbox" defaultChecked className="rounded-sm" />
          </div>
        ))}
      </Card>

      {/* Danger Zone */}
      <Card title="Danger Zone" className="border-red-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-secondary-900">Delete Account</p>
            <p className="text-xs text-secondary-500">Permanently delete your account and all data</p>
          </div>
          <Button variant="danger" size="sm">Delete Account</Button>
        </div>
      </Card>
    </div>
  )
}

export default SettingsPage
