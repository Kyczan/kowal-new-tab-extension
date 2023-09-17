import { useState, useEffect } from 'react'
import useSWR from 'swr'

import { dev } from '../utils/utils'
import { IHAStateItem, haFetcher } from './api'
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
