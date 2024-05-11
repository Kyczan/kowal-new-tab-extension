import { useState } from 'react'
import useSWR from 'swr'

import { IConfig } from '../types'
import {
  IHAStateItem,
  haFetcher,
  toggleSwitch,
  setFanPresetMode,
  setFanLevel,
  HAFanLevels,
  HAFanMainPresetModes,
  HAFanOnlyPresetMode,
} from './api'
import { useFeature } from '../store/store'
import { delay } from '../utils/utils'

export const useHAStateItems = () => {
  const ha = useFeature('homeAssistant') as IConfig['homeAssistant']
  const { haToken, haUrl } = ha || {}
  const { data, error, mutate } = useSWR<IHAStateItem[]>(
    [`${haUrl}/api/states`, haToken],
    haFetcher,
  )

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    haToken,
    haUrl,
  }
}

export const useHAStateValue = (
  entity_id: IHAStateItem['entity_id'],
  useLocalStorage: boolean = false,
) => {
  const { data } = useHAStateItems()

  if (!entity_id) return ''

  const value = data?.find((item) => item.entity_id === entity_id)?.state

  if (useLocalStorage) {
    if (!value || value === 'unavailable') {
      return localStorage.getItem(entity_id) || ''
    }
    localStorage.setItem(entity_id, value)
  }

  return value
}

export const useHAStateValues = (
  entity_ids: IHAStateItem['entity_id'][],
  useLocalStorage: boolean = false,
) => {
  const { data } = useHAStateItems()

  if (!entity_ids || entity_ids.length === 0) return []

  const results = entity_ids.map((entity_id) => {
    const value = data?.find((item) => item.entity_id === entity_id)?.state

    if (useLocalStorage) {
      if (!value || value === 'unavailable') {
        return {
          entity_id,
          value: localStorage.getItem(entity_id) || '',
        }
      }
      localStorage.setItem(entity_id, value)
    }

    return { entity_id, value }
  })

  return results
}

export const useSwitch = (entity_id: IHAStateItem['entity_id']) => {
  const [busy, setBusy] = useState(false)
  const { data, mutate, haToken, haUrl } = useHAStateItems()

  const lightSwitch = data?.find?.((item) => item.entity_id === entity_id)

  const toggle = async () => {
    setBusy(true)
    await toggleSwitch(entity_id, haToken, haUrl)
    setTimeout(async () => {
      await mutate()
      setBusy(false)
    }, 250)
  }

  return {
    state: lightSwitch?.state,
    busy,
    toggle,
  }
}

export const useAirPurifier = (entity_id: IHAStateItem['entity_id']) => {
  const { data, mutate, haToken, haUrl } = useHAStateItems()
  const [busy, setBusy] = useState(false)
  const [show, setShow] = useState(false)

  const purifier = data?.find((item) => item.entity_id === entity_id)
  const presetModes = purifier?.attributes?.preset_modes
  const presetMode = purifier?.attributes?.preset_mode
  const fanLevel = purifier?.attributes?.percentage || ''
  const preset =
    presetMode === HAFanOnlyPresetMode.FAN ||
    presetMode === HAFanOnlyPresetMode.MANUAL
      ? (+fanLevel as HAFanLevels)
      : presetMode

  const toggleButtonList = () => {
    setShow((show) => !show)
  }

  const handleClickPreset = async (newPreset: HAFanMainPresetModes) => {
    setBusy(true)

    await setFanPresetMode(entity_id, newPreset, haToken, haUrl)
    await mutate()
    setBusy(false)
    toggleButtonList()
  }

  const handleClickFan = async (newLevel: HAFanLevels) => {
    setBusy(true)

    await setFanLevel(entity_id, newLevel, haToken, haUrl)
    await delay(100)

    await mutate()
    setBusy(false)
    toggleButtonList()
  }

  const handleClick = (type: HAFanMainPresetModes | HAFanLevels) => {
    if (typeof type === 'string') {
      handleClickPreset(type)
    } else {
      handleClickFan(type)
    }
  }

  return {
    preset,
    presetModes,
    busy,
    show,
    handleClick,
    toggleButtonList,
  }
}

export const useIndoorData = () => {
  const airPurifiers = useFeature('airPurifiers') as IConfig['airPurifiers']
  const { list } = airPurifiers || {}
  const data = []

  for (let i = 0; i < list.length; i++) {
    const { temp, humid, name } = list[i]
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const homeTemp = useHAStateValue(temp, true)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const homeHumid = useHAStateValue(humid, true)
    data.push({ temp: homeTemp, humid: homeHumid, name })
  }

  return data
}
