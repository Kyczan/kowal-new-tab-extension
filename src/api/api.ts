import { dev } from '../utils/utils'
import allergensMockData from '../features/allergens/allergensMock.json'

interface IHAAttributes {
  friendly_name: string
  preset_mode?: HAFanPresetModes
  percentage?: number
}

export interface IHAStateItem {
  entity_id: string
  state: string
  attributes: IHAAttributes
}

export enum HAFanMainPresetModes {
  AUTO = 'Auto',
  SILENT = 'Silent',
  SLEEP = 'Sleep',
  FAVORITE = 'Favorite',
}

export enum HAFanOnlyPresetMode {
  FAN = 'Fan',
  MANUAL = 'Manual',
}

export type HAFanPresetModes = HAFanMainPresetModes | HAFanOnlyPresetMode

export const fanLevels = [33, 66, 100] as const
export type HAFanLevels = (typeof fanLevels)[number]

export const haFetcher = (url: string, token: string) => {
  return fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
  }).then((response) => response.json())
}

export const allergensFetcher = (url: string) => {
  if (dev) return Promise.resolve(allergensMockData)

  return fetch(url, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then((response) => response.json())
}

export const fetchCalEvents = (
  calId: string,
  timeMin: string,
  timeMax: string,
  haToken: string,
  haUrl: string,
) => {
  return fetch(
    `${haUrl}/api/calendars/${calId}?start=${timeMin}&end=${timeMax}`,
    {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${haToken}`,
        'Content-Type': 'application/json',
      }),
    },
  )
}

export const toggleSwitch = async (
  entity_id: string,
  haToken: string,
  haUrl: string,
) => {
  try {
    await fetch(`${haUrl}/api/services/switch/toggle`, {
      method: 'post',
      headers: new Headers({
        Authorization: `Bearer ${haToken}`,
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

export const setFanPresetMode = async (
  entity_id: string,
  presetMode: HAFanPresetModes,
  haToken: string,
  haUrl: string,
) => {
  try {
    await fetch(`${haUrl}/api/services/fan/set_preset_mode`, {
      method: 'post',
      headers: new Headers({
        Authorization: `Bearer ${haToken}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        entity_id,
        preset_mode: presetMode,
      }),
    })
  } catch (e) {
    console.log(e)
  }
}

export const setFanLevel = async (
  entity_id: string,
  percentage: HAFanLevels,
  haToken: string,
  haUrl: string,
) => {
  try {
    await fetch(`${haUrl}/api/services/fan/set_percentage`, {
      method: 'post',
      headers: new Headers({
        Authorization: `Bearer ${haToken}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        entity_id,
        percentage,
      }),
    })
  } catch (e) {
    console.log(e)
  }
}
