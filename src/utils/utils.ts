export const dev = process.env.NODE_ENV !== 'production'

export const randomItem = <T>(arr: T[]): T => {
  // it uses bitwise operator `| 0` that does nothing,
  // but before operation float is converted to integer
  // and this is much faster than `Math.floor()`
  return arr[(Math.random() * arr.length) | 0]
}

export const getRange = () => {
  const NUMBER_OF_DAYS = 5
  const today = new Date()
  const timeMin = today.toISOString()

  const allDays: string[] = []
  allDays.push(timeMin)
  for (let i = 0; i < NUMBER_OF_DAYS; i++) {
    today.setHours(24, 0, 0, 0)
    allDays.push(today.toISOString())
  }

  today.setHours(24, 0, 0, 0)
  const timeMax = today.toISOString()

  return { timeMin, timeMax, allDays }
}

export const sameDay = (date1: string | Date, date2: string | Date) => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  )
}

export const formatDate = (
  date: string | Date,
  options: Intl.DateTimeFormatOptions
) => new Date(date).toLocaleString([], options)