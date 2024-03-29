import { useState } from 'react'
import useSWR from 'swr'

import { IConfig, LightType } from '../types'
import { getConfig } from '../utils/utils'
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

export const useHAStateValue = (
  entity_id: IHAStateItem['entity_id'],
  useLocalStorage: boolean = false,
) => {
  const { data } = useHAStateItems()
  const value = data?.find((item) => item.entity_id === entity_id)?.state

  if (useLocalStorage) {
    if (!value || value === 'unavailable') {
      return localStorage.getItem(entity_id) || ''
    }
    localStorage.setItem(entity_id, value)
  }

  return value
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
  const { list } = getConfig('lights') as IConfig['lights']
  const switches = []

  for (let i = 0; i < list.length; i++) {
    const { entity_id, name, type, left, top } = list[i]
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const item = useSwitch(entity_id, name, type, top, left)
    switches.push(item)
  }

  return switches
}

export const useAirPurifier = (
  main_entity_id: IHAStateItem['entity_id'],
  fan_level_entity_id: IHAStateItem['entity_id'],
  name: string,
  top: string,
  left: string,
) => {
  const { data, mutate } = useHAStateItems()
  const [busy, setBusy] = useState(false)
  const [show, setShow] = useState(false)

  const filteredPresets = data?.find(
    (item) => item.entity_id === main_entity_id,
  )
  const filteredLevels = data?.find(
    (item) => item.entity_id === fan_level_entity_id,
  )
  const presetMode = filteredPresets?.attributes?.preset_mode
  const fanLevel = filteredLevels?.state || ''
  const preset =
    presetMode === HAFanOnlyPresetMode.FAN
      ? (+fanLevel as HAFanLevels)
      : presetMode

  const toggleButtonList = () => {
    setShow((show) => !show)
  }

  const handleClickPreset = async (newPreset: HAFanMainPresetModes) => {
    setBusy(true)

    await setFanPresetMode(main_entity_id, newPreset)
    await mutate()
    setBusy(false)
    toggleButtonList()
  }

  const handleClickFan = async (newLevel: HAFanLevels) => {
    setBusy(true)

    await setFanLevel(fan_level_entity_id, newLevel)
    await setFanPresetMode(main_entity_id, HAFanOnlyPresetMode.FAN)
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
    busy,
    show,
    handleClick,
    toggleButtonList,
    name,
    top,
    left,
  }
}

export const useAirPurifiers = () => {
  const { list } = getConfig('airPurifiers') as IConfig['airPurifiers']
  const purifiers = []

  for (let i = 0; i < list.length; i++) {
    const { main_entity_id, fan_level_entity_id, name, left, top } = list[i]
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const item = useAirPurifier(
      main_entity_id,
      fan_level_entity_id,
      name,
      top,
      left,
    )
    purifiers.push(item)
  }

  return purifiers
}
