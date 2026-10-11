/** Format date to a readable string */
export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  })
}

/** Format date + time */
export const formatDateTime = (date: string | Date): string =>
  formatDate(date, { hour: '2-digit', minute: '2-digit', hour12: true })

/** Truncate a string with ellipsis */
export const truncate = (str: string, length = 50): string =>
  str.length > length ? `${str.slice(0, length)}...` : str

/** Capitalize first letter */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

/** Format number with commas */
export const formatNumber = (num: number): string => num.toLocaleString('en-IN')

/** Get initials from name */
export const getInitials = (name: string): string =>
  name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

/** Sleep utility for async/await */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
