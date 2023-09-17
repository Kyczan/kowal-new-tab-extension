import { dev } from '../utils/utils'
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
export type HAFanLevels = typeof fanLevels[number]

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
