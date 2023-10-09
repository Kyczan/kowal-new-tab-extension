import { IConfig } from '../types'
import { getConfig, dev } from '../utils/utils'
import weatherMockData from '../features/weather/weatherMock.json'
import allergensMockData from '../features/allergens/allergensMock.json'

interface IHAAttributes {
  friendly_name: string
  preset_mode?: HAFanPresetModes
}

export interface IHAStateItem {
  entity_id: string
  state: any
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

export const weatherFetcher = () => {
  if (dev) return Promise.resolve(weatherMockData)

  const { api } = getConfig('weather') as IConfig['weather']
  const { baseUrl, cityId, key, lang, units } = api
  const url = new URL(baseUrl)
  url.searchParams.append('lang', lang)
  url.searchParams.append('units', units)
  url.searchParams.append('id', cityId)
  url.searchParams.append('appid', key)

  return fetch(url.href, {
    method: 'get',
    headers: new Headers({
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

export const setFanPresetMode = async (presetMode: HAFanPresetModes) => {
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
        entity_id: 'fan.mi_air_purifier_3_3h',
        preset_mode: presetMode,
      }),
    })
  } catch (e) {
    console.log(e)
  }
}

export const setFanLevel = async (level: HAFanLevels) => {
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
        entity_id: 'number.mi_air_purifier_3_3h_fan_level',
        value: level,
      }),
    })
  } catch (e) {
    console.log(e)
  }
}
