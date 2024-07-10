import { GoldConfigItem } from '../types'

export const dev = import.meta.env.DEV

export const randomItem = <T>(arr: T[]): T => {
  // it uses bitwise operator `| 0` that does nothing,
  // but before operation float is converted to integer
  // and this is much faster than `Math.floor()`
  return arr && arr[(Math.random() * arr.length) | 0]
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

export const isMultiDayInRange = (
  today: string | Date,
  start: string | Date | undefined,
  end: string | Date | undefined,
) => {
  if (!start || !end) return false

  const t = new Date(today)
  const s = new Date(start)
  s.setHours(0, 0, 0, 0)
  const e = new Date(end)
  e.setHours(0, 0, 0, 0)

  return t >= s && t < e
}

export const formatDate = (
  date: string | Date,
  options: Intl.DateTimeFormatOptions,
) => new Date(date).toLocaleString([], options)

export const extractColor = (str: string) => {
  const defaultColor = 'darkgray'
  if (str.length < 6) return defaultColor

  const colorCandidate = str.slice(-6)
  return /^[0-9A-F]{6}$/i.test(colorCandidate)
    ? `#${colorCandidate}`
    : defaultColor
}

export const getFavicon = (url: string, size: number = 64): string => {
  if (dev) return `https://via.placeholder.com/${size}`

  // https://stackoverflow.com/a/73213968
  return `chrome-extension://${
    chrome.runtime.id
  }/_favicon/?pageUrl=${encodeURIComponent(url)}&size=${size}`
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const extractGoldPrice = (data: string): GoldConfigItem[] => {
  const goldConfig: GoldConfigItem[] = [
    {
      code: 'GCAtPh1oz',
      name: 'Filharmonik',
    },
    {
      code: 'GCAuKa1oz',
      name: 'Kangur',
    },
    {
      code: 'GCCaML',
      name: 'Klon',
    },
    {
      code: 'GCGbBr1oz',
      name: 'Britannia',
    },
    {
      code: 'GB1ozVa',
      name: 'Valcambi',
    },
  ]

  const parser = new DOMParser()
  const document = parser.parseFromString(data, 'text/html')

  const result = goldConfig.map((item) => {
    const element = document.querySelector(
      `#price-alert-all-products > option[value="${item.code}"]`,
    )
    const attr = element?.getAttribute('data-pricelist')
    const obj = JSON.parse(attr || '{}')

    const sell = obj?.sell?.[0]?.price || 0
    const buy = obj?.buy?.[0]?.price || 0

    return {
      ...item,
      buy,
      sell,
    }
  })

  return result
}

export const extractEuroPrice = (data: string): GoldConfigItem => {
  const parser = new DOMParser()
  const document = parser.parseFromString(data, 'text/html')
  const euroNodes = document.querySelectorAll(
    '.list-table__row.js-filter-search-row:has(a[href="https://tavex.pl/waluta/euro-kurs-eur/"])>*',
  )
  const buy = euroNodes[1]?.textContent || '0'
  const sell = euroNodes[2]?.textContent || '0'

  return {
    code: 'euro',
    name: 'Euro',
    buy,
    sell,
  }
}
