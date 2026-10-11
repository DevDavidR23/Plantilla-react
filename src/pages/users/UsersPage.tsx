import { useState } from 'react'
import { Search, Plus, Pencil, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useDebounce } from '@/hooks/useDebounce'
import { getInitials, formatDate } from '@/utils/format'
import type { User } from '@/types/user'

// Mock data – replace with real API call via userService
const MOCK_USERS: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'admin', status: 'active', createdAt: '2024-01-10T10:00:00Z', updatedAt: '2024-01-10T10:00:00Z' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'manager', status: 'active', createdAt: '2024-02-15T10:00:00Z', updatedAt: '2024-02-15T10:00:00Z' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'user', status: 'inactive', createdAt: '2024-03-01T10:00:00Z', updatedAt: '2024-03-01T10:00:00Z' },
  { id: '4', name: 'David Lee', email: 'david@example.com', role: 'user', status: 'pending', createdAt: '2024-03-20T10:00:00Z', updatedAt: '2024-03-20T10:00:00Z' },
  { id: '5', name: 'Eva Green', email: 'eva@example.com', role: 'manager', status: 'active', createdAt: '2024-04-05T10:00:00Z', updatedAt: '2024-04-05T10:00:00Z' },
]

const statusVariant: Record<string, 'success' | 'warning' | 'danger' | 'default'> = {
  active: 'success',
  inactive: 'danger',
  pending: 'warning',
}

const roleVariant: Record<string, 'info' | 'default' | 'warning'> = {
  admin: 'info',
  manager: 'warning',
  user: 'default',
}

const UsersPage = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  const filtered = MOCK_USERS.filter(
    u =>
      u.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Users</h1>
          <p className="mt-1 text-sm text-secondary-500">Manage all users and their roles.</p>
        </div>
        <Button leftIcon={<Plus size={16} />}>Add User</Button>
      </div>

      <Card>
        {/* Toolbar */}
        <div className="mb-4 flex items-center gap-3">
          <Input
            placeholder="Search users..."
            leftIcon={<Search size={16} />}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <span className="ml-auto text-sm text-secondary-500">{filtered.length} users</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-secondary-200 text-left text-xs font-semibold uppercase tracking-wide text-secondary-500">
                <th className="pb-3 pr-4">User</th>
                <th className="pb-3 pr-4">Role</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Joined</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900">{user.name}</p>
                        <p className="text-xs text-secondary-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={roleVariant[user.role] as 'info' | 'default' | 'warning'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={statusVariant[user.status]}>{user.status}</Badge>
                  </td>
                  <td className="py-3 pr-4 text-secondary-500">{formatDate(user.createdAt)}</td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-secondary-400">No users found.</p>
          )}
        </div>
      </Card>
    </div>
  )
}

export default UsersPage
