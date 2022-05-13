import { useEffect, useState } from 'react'

import PresetButton from './PresetButton'
import {
  setFanPresetMode,
  useHAStateItems,
  HAFanPresetModes,
} from '../../api/api'

import styles from './AirPurifier.module.css'

const AirPurifier = () => {
  const { data, mutate } = useHAStateItems()
  const [preset, setPreset] = useState<HAFanPresetModes | undefined>(undefined)
  const [busy, setBusy] = useState<boolean>(false)

  useEffect(() => {
    if (Array.isArray(data)) {
      const filtered = data.find(
        (item) => item.entity_id === 'fan.mi_air_purifier_3_3h'
      )
      setPreset(filtered?.attributes?.preset_mode)
    }
  }, [data])

  const handleClick = async (newPreset: HAFanPresetModes) => {
    setBusy(true)

    await setFanPresetMode(newPreset)
    setTimeout(async () => {
      await mutate()
      setBusy(false)
    }, 250)
  }

  return preset ? (
    <div className={styles.airPurifier}>
      <div>Oczyszczacz</div>
      <div className={styles.buttons}>
        <PresetButton
          onClick={() => handleClick(HAFanPresetModes.AUTO)}
          type={HAFanPresetModes.AUTO}
          state={preset}
          busy={busy}
        />
        <PresetButton
          onClick={() => handleClick(HAFanPresetModes.FAVORITE)}
          type={HAFanPresetModes.FAVORITE}
          state={preset}
          busy={busy}
        />
      </div>
    </div>
  ) : null
}

export default AirPurifier
