import { useState, useEffect } from 'react'
import useSWR from 'swr'

import { IConfig, LightType } from '../types'
import { dev, getConfig } from '../utils/utils'
import { IHAStateItem, haFetcher, toggleSwitch } from './api'
import { IBookmarkItem } from '../features/bookmarks/Bookmarks'
import bookmarksMock from '../features/bookmarks/bookmarksMock.json'

export const useHAStateItems = () => {
  const { data, error, mutate } = useSWR<IHAStateItem[]>(
    `/api/states`,
    haFetcher,
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
  type: LightType,
  top: string,
  left: string,
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
    type,
    top,
    left,
  }
}

export const useLights = () => {
  const { lights } = getConfig('floorPlan') as IConfig['floorPlan']
  const switches = []

  for (let i = 0; i < lights.length; i++) {
    const { entity_id, name, type, left, top } = lights[i]
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const item = useSwitch(entity_id, name, type, top, left)
    switches.push(item)
  }

  return switches
}
