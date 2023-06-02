import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { dev } from '../utils/utils'
import weatherMockData from '../features/weather/weatherMock.json'
import allergensMockData from '../features/allergens/allergensMock.json'
import bookmarksMock from '../features/bookmarks/bookmarksMock.json'
import { IBookmarkItem } from '../features/bookmarks/Bookmarks'

interface IHAAttributes {
  friendly_name: string
  preset_mode?: HAFanPresetModes
}

export interface IHAStateItem {
  entity_id: string
  state: any
  attributes: IHAAttributes
}

export enum HAFanPresetModes {
  AUTO = 'Auto',
  SILENT = 'Silent',
  FAVORITE = 'Favorite',
  FAN = 'Fan',
}

export type HAFanLevels = 1 | 2 | 3

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

export const haFetcher = (url: string) =>
  fetch(`${process.env.REACT_APP_HA_URL}${url}`, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${process.env.REACT_APP_HA_TOKEN}`,
      'Content-Type': 'application/json',
    }),
  }).then((response) => response.json())

export const weatherFetcher = (url: string) => {
  if (dev) return Promise.resolve(weatherMockData)

  return fetch(`${process.env.REACT_APP_OPENWEATHER_API_URL}`, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then((response) => response.json())
}

export const allergensFetcher = () => {
  if (dev) return Promise.resolve(allergensMockData)

  return fetch(`${process.env.REACT_APP_ALLERGENS_API_URL}`, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then((response) => response.json())
}

export const fetchCalEvents = (
  calId: string,
  timeMin: string,
  timeMax: string
) =>
  fetch(
    `${process.env.REACT_APP_HA_URL}/api/calendars/${calId}?start=${timeMin}&end=${timeMax}`,
    {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${process.env.REACT_APP_HA_TOKEN}`,
        'Content-Type': 'application/json',
      }),
    }
  )

export const toggleSwitch = async (entity_id: string) => {
  try {
    await fetch(`${process.env.REACT_APP_HA_URL}/api/services/switch/toggle`, {
      method: 'post',
      headers: new Headers({
        Authorization: `Bearer ${process.env.REACT_APP_HA_TOKEN}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        entity_id,
      }),
    })
  } catch (e) {
    console.log(e)
  }
}

export const setFanPresetMode = async (presetMode: HAFanPresetModes) => {
  try {
    await fetch(
      `${process.env.REACT_APP_HA_URL}/api/services/fan/set_preset_mode`,
      {
        method: 'post',
        headers: new Headers({
          Authorization: `Bearer ${process.env.REACT_APP_HA_TOKEN}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          entity_id: 'fan.mi_air_purifier_3_3h',
          preset_mode: presetMode,
        }),
      }
    )
  } catch (e) {
    console.log(e)
  }
}

export const setFanLevel = async (level: HAFanLevels) => {
  try {
    await fetch(
      `${process.env.REACT_APP_HA_URL}/api/services/number/set_value`,
      {
        method: 'post',
        headers: new Headers({
          Authorization: `Bearer ${process.env.REACT_APP_HA_TOKEN}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          entity_id: 'number.mi_air_purifier_3_3h_fan_level',
          value: level,
        }),
      }
    )
  } catch (e) {
    console.log(e)
  }
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
