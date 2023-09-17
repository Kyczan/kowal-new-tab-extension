import { useEffect, useState } from 'react'

import PresetButton from './PresetButton'
import {
  setFanPresetMode,
  setFanLevel,
  HAFanLevels,
  HAFanMainPresetModes,
  HAFanOnlyPresetMode,
  fanLevels,
} from '../../api/api'
import { useHAStateItems } from '../../api/hooks'

import styles from './AirPurifier.module.css'

const purifierStates = [...Object.values(HAFanMainPresetModes), ...fanLevels]

const AirPurifier = () => {
  const { data, mutate } = useHAStateItems()
  const [preset, setPreset] = useState<
    HAFanMainPresetModes | HAFanLevels | undefined
  >(undefined)
  const [busy, setBusy] = useState<boolean>(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (Array.isArray(data)) {
      const filteredPresets = data.find(
        (item) => item.entity_id === 'fan.mi_air_purifier_3_3h'
      )
      const filteredLevels = data.find(
        (item) => item.entity_id === 'number.mi_air_purifier_3_3h_fan_level'
      )
      const presetMode = filteredPresets?.attributes?.preset_mode
      const fanLevel = filteredLevels?.state
      const currentPreset =
        presetMode === HAFanOnlyPresetMode.FAN
          ? (+fanLevel as HAFanLevels)
          : presetMode

      setPreset(currentPreset)
    }
  }, [data])

  const toggleButtonList = () => {
    setShow((show) => !show)
  }

  const handleClickPreset = async (newPreset: HAFanMainPresetModes) => {
    setBusy(true)

    await setFanPresetMode(newPreset)
    await mutate()
    setBusy(false)
    toggleButtonList()
  }

  const handleClickFan = async (newLevel: HAFanLevels) => {
    setBusy(true)

    await setFanLevel(newLevel)
    await setFanPresetMode(HAFanOnlyPresetMode.FAN)
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

  return (
    <div className={styles.airPurifier}>
      {!show && <div>Oczyszczacz</div>}
      {show && (
        <div className={styles.buttons}>
          {purifierStates.map((type) => (
            <PresetButton
              key={type}
              onClick={() => handleClick(type)}
              type={type}
              state={preset}
              busy={busy}
            />
          ))}
        </div>
      )}
      <PresetButton
        onClick={toggleButtonList}
        type={preset}
        state={preset}
        busy={busy}
      />
    </div>
  )
}

export default AirPurifier
