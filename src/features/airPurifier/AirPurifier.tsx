import { useEffect, useState } from 'react'

import PresetButton from './PresetButton'
import {
  setFanPresetMode,
  setFanLevel,
  useHAStateItems,
  HAFanPresetModes,
  HAFanLevels,
} from '../../api/api'

import styles from './AirPurifier.module.css'

const AirPurifier = () => {
  const { data, mutate } = useHAStateItems()
  const [preset, setPreset] = useState<
    HAFanPresetModes | HAFanLevels | undefined
  >(undefined)
  const [busy, setBusy] = useState<boolean>(false)

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
        presetMode === HAFanPresetModes.FAN
          ? (+fanLevel as HAFanLevels)
          : presetMode

      setPreset(currentPreset)
    }
  }, [data])

  const handleClickPreset = async (newPreset: HAFanPresetModes) => {
    setBusy(true)

    await setFanPresetMode(newPreset)
    await mutate()
    setBusy(false)
  }

  const handleClickFan = async (newLevel: HAFanLevels) => {
    setBusy(true)

    await setFanLevel(newLevel)
    await setFanPresetMode(HAFanPresetModes.FAN)
    await mutate()
    setBusy(false)
  }

  return preset ? (
    <div className={styles.airPurifier}>
      <div>Oczyszczacz</div>
      <div className={styles.buttonsWrapper}>
        <div className={styles.buttons}>
          <PresetButton
            onClick={() => handleClickPreset(HAFanPresetModes.AUTO)}
            type={HAFanPresetModes.AUTO}
            state={preset}
            busy={busy}
          />
          <PresetButton
            onClick={() => handleClickPreset(HAFanPresetModes.FAVORITE)}
            type={HAFanPresetModes.FAVORITE}
            state={preset}
            busy={busy}
          />
          <PresetButton
            onClick={() => handleClickPreset(HAFanPresetModes.SILENT)}
            type={HAFanPresetModes.SILENT}
            state={preset}
            busy={busy}
          />
        </div>
        <div className={styles.buttons}>
          <PresetButton
            onClick={() => handleClickFan(1)}
            type={1}
            state={preset}
            busy={busy}
          />
          <PresetButton
            onClick={() => handleClickFan(2)}
            type={2}
            state={preset}
            busy={busy}
          />
          <PresetButton
            onClick={() => handleClickFan(3)}
            type={3}
            state={preset}
            busy={busy}
          />
        </div>
      </div>
    </div>
  ) : null
}

export default AirPurifier
