import { Users, TrendingUp, Activity, ShieldCheck } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useAppSelector } from '@/hooks/useAppStore'

const stats = [
  { label: 'Total Users', value: '1,284', change: '+12%', icon: Users, color: 'bg-blue-500' },
  { label: 'Active Sessions', value: '342', change: '+5%', icon: Activity, color: 'bg-green-500' },
  { label: 'Growth Rate', value: '18.2%', change: '+3.1%', icon: TrendingUp, color: 'bg-purple-500' },
  { label: 'Roles Assigned', value: '98%', change: '+1%', icon: ShieldCheck, color: 'bg-orange-500' },
]

const recentActivity = [
  { user: 'Alice Johnson', action: 'Logged in', time: '2 min ago', status: 'success' as const },
  { user: 'Bob Smith', action: 'Updated profile', time: '15 min ago', status: 'info' as const },
  { user: 'Carol White', action: 'Password reset', time: '1 hr ago', status: 'warning' as const },
  { user: 'David Lee', action: 'Account suspended', time: '3 hr ago', status: 'danger' as const },
]

const DashboardPage = () => {
  const { user } = useAppSelector(state => state.auth)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">
          Welcome back, {user?.name?.split(' ')[0] ?? 'there'} 👋
        </h1>
        <p className="mt-1 text-sm text-secondary-500">
          Here's what's happening with your app today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, change, icon: Icon, color }) => (
          <Card key={label} className="flex items-center gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}>
              <Icon size={22} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">{label}</p>
              <p className="text-2xl font-bold text-secondary-900">{value}</p>
              <p className="text-xs text-green-600 font-medium">{change} this month</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity" description="Latest actions across the platform">
        <div className="divide-y divide-secondary-100">
          {recentActivity.map(({ user: name, action, time, status }) => (
            <div key={name} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-900">{name}</p>
                  <p className="text-xs text-secondary-500">{action}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={status}>{action}</Badge>
                <span className="text-xs text-secondary-400">{time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default DashboardPage
