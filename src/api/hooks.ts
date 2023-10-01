import { useState, useEffect } from 'react'
import useSWR from 'swr'

import { dev } from '../utils/utils'
import { IHAStateItem, haFetcher, toggleSwitch } from './api'
import { IBookmarkItem } from '../features/bookmarks/Bookmarks'
import bookmarksMock from '../features/bookmarks/bookmarksMock.json'

export const useHAStateItems = () => {
  const { data, error, mutate } = useSWR<IHAStateItem[]>(
    `/api/states`,
    haFetcher
  )

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export const useHAStateValue = (entity_id: IHAStateItem['entity_id']) => {
  const { data } = useHAStateItems()
  const value = data?.find((item) => item.entity_id === entity_id)?.state

  if (!value || value === 'unavailable') {
    return localStorage.getItem(entity_id) || ''
  }

  localStorage.setItem(entity_id, value)

  return value
}

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<IBookmarkItem[]>([])

  useEffect(() => {
    const runEffect = async () => {
      const data: IBookmarkItem[] = dev
        ? bookmarksMock
        : await chrome.bookmarks?.getTree()

      const bookmarksBarData = data?.[0]?.children?.[0]?.children || []
      setBookmarks(bookmarksBarData)
    }

    runEffect()
  }, [])

  return bookmarks
}

export const useSwitch = (
  entity_id: IHAStateItem['entity_id'],
  name: string,
  isLamp: boolean = false
) => {
  const [busy, setBusy] = useState(false)
  const { data, mutate } = useHAStateItems()

  const lightSwitch = data?.find?.((item) => item.entity_id === entity_id)

  const toggle = async () => {
    setBusy(true)
    await toggleSwitch(entity_id)
    setTimeout(async () => {
      await mutate()
      setBusy(false)
    }, 250)
  }

  return {
    state: lightSwitch?.state,
    busy,
    toggle,
    name,
    isLamp,
  }
}

export const useLights = () => {
  const bedroom = useSwitch('switch.sonoff_10003b5b2d', 'bedroom')
  const bedroomLamp = useSwitch('switch.sonoff_10005f1750', 'bedroomLamp', true)
  const hall = useSwitch('switch.sonoff_10003b644f', 'hall')
  const living1 = useSwitch('switch.sonoff_1000504672_1', 'living1')
  const living2 = useSwitch('switch.sonoff_1000504672_2', 'living2')
  const kitchen = useSwitch('switch.sonoff_10003b66b9', 'kitchen')
  const bathroom1 = useSwitch('switch.sonoff_10005741b6_1', 'bathroom1')
  const bathroom2 = useSwitch('switch.sonoff_10005741b6_2', 'bathroom2')

  return [
    bedroom,
    bedroomLamp,
    hall,
    living1,
    living2,
    kitchen,
    bathroom1,
    bathroom2,
  ]
}
