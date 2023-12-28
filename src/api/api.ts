import { IConfig } from '../types'
import { getConfig, dev } from '../utils/utils'
import allergensMockData from '../features/allergens/allergensMock.json'

interface IHAAttributes {
  friendly_name: string
  preset_mode?: HAFanPresetModes
}

export interface IHAStateItem {
  entity_id: string
  state: string
  attributes: IHAAttributes
}

export enum HAFanMainPresetModes {
  AUTO = 'Auto',
  SILENT = 'Silent',
  FAVORITE = 'Favorite',
}

export enum HAFanOnlyPresetMode {
  FAN = 'Fan',
}

export type HAFanPresetModes = HAFanMainPresetModes | HAFanOnlyPresetMode

export const fanLevels = [1, 2, 3] as const
export type HAFanLevels = (typeof fanLevels)[number]

export const haFetcher = (url: string) => {
  const { haToken, haUrl } = getConfig(
    'homeAssistant',
  ) as IConfig['homeAssistant']

  return fetch(`${haUrl}${url}`, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${haToken}`,
      'Content-Type': 'application/json',
    }),
  }).then((response) => response.json())
}

export const allergensFetcher = () => {
  if (dev) return Promise.resolve(allergensMockData)

  const { api } = getConfig('allergens') as IConfig['allergens']
  const { baseUrl, cityId } = api

  return fetch(`${baseUrl}${cityId}`, {
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
) => {
  const { haToken, haUrl } = getConfig(
    'homeAssistant',
  ) as IConfig['homeAssistant']

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

export const toggleSwitch = async (entity_id: string) => {
  const { haToken, haUrl } = getConfig(
    'homeAssistant',
  ) as IConfig['homeAssistant']

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
  main_entity_id: string,
  presetMode: HAFanPresetModes,
) => {
  const { haToken, haUrl } = getConfig(
    'homeAssistant',
  ) as IConfig['homeAssistant']

  try {
    await fetch(`${haUrl}/api/services/fan/set_preset_mode`, {
      method: 'post',
      headers: new Headers({
        Authorization: `Bearer ${haToken}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        entity_id: main_entity_id,
        preset_mode: presetMode,
      }),
    })
  } catch (e) {
    console.log(e)
  }
}

export const setFanLevel = async (
  fan_level_entity_id: string,
  level: HAFanLevels,
) => {
  const { haToken, haUrl } = getConfig(
    'homeAssistant',
  ) as IConfig['homeAssistant']

  try {
    await fetch(`${haUrl}/api/services/number/set_value`, {
      method: 'post',
      headers: new Headers({
        Authorization: `Bearer ${haToken}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        entity_id: fan_level_entity_id,
        value: level,
      }),
    })
  } catch (e) {
    console.log(e)
  }
}
