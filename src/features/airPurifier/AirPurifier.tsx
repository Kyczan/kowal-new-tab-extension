import PresetButton from './PresetButton'
import { HAFanMainPresetModes, fanLevels } from '../../api/api'
import { useAirPurifier } from '../../api/hooks'

import styles from './AirPurifier.module.css'

const mainPresetModes = Object.values(HAFanMainPresetModes)

interface IAirPurifier {
  entity_id: string
  style: React.CSSProperties
}

const AirPurifier = ({ entity_id, style }: IAirPurifier) => {
  const { busy, handleClick, preset, presetModes, show, toggleButtonList } =
    useAirPurifier(entity_id)
  const intersection = mainPresetModes.filter(
    (value) => presetModes?.includes(value),
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
