import PresetButton from './PresetButton'
import { HAFanMainPresetModes, HAFanLevels, fanLevels } from '../../api/api'

import styles from './AirPurifier.module.css'

const mainPresetModes = Object.values(HAFanMainPresetModes)

interface IAirPurifier {
  preset: HAFanMainPresetModes | HAFanLevels | undefined
  preset_modes: string[]
  busy: boolean
  show: boolean
  handleClick: (type: HAFanMainPresetModes | HAFanLevels) => void
  toggleButtonList: () => void
  style: React.CSSProperties
}

const AirPurifier = ({
  preset,
  preset_modes,
  busy,
  show,
  handleClick,
  toggleButtonList,
  style,
}: IAirPurifier) => {
  const intersection = mainPresetModes.filter((value) =>
    preset_modes.includes(value),
  )
  const purifierStates = [...intersection, ...fanLevels]

  return (
    <div className={styles.airPurifier} style={style}>
      <PresetButton
        onClick={toggleButtonList}
        type={preset}
        state={preset}
        busy={busy}
      />
      {show && (
        <div className={styles.buttons}>
          {purifierStates.map((type, index) => (
            <PresetButton
              key={type}
              onClick={() => handleClick(type)}
              type={type}
              state={preset}
              busy={busy}
              id={index}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default AirPurifier
