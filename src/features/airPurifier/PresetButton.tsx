import { MouseEventHandler } from 'react'
import {
  MdHdrAuto,
  MdOutlineHdrAuto,
  MdFavoriteBorder,
  MdFavorite,
} from 'react-icons/md'
import { IoMoonSharp, IoMoonOutline } from 'react-icons/io5'
import {
  PiNumberCircleOne,
  PiNumberCircleOneFill,
  PiNumberCircleTwo,
  PiNumberCircleTwoFill,
  PiNumberCircleThree,
  PiNumberCircleThreeFill,
  PiWarningBold,
} from 'react-icons/pi'

import { HAFanMainPresetModes, HAFanLevels } from '../../api/api'

import styles from './AirPurifier.module.css'

interface IButton {
  onClick: MouseEventHandler<HTMLButtonElement>
  type: HAFanMainPresetModes | HAFanLevels | undefined
  state: HAFanMainPresetModes | HAFanLevels | undefined
  busy: boolean
  id?: number
}

const buttonsMap = {
  [HAFanMainPresetModes.AUTO]: { On: MdHdrAuto, Off: MdOutlineHdrAuto },
  [HAFanMainPresetModes.FAVORITE]: { On: MdFavorite, Off: MdFavoriteBorder },
  [HAFanMainPresetModes.SILENT]: { On: IoMoonSharp, Off: IoMoonOutline },
  [HAFanMainPresetModes.SLEEP]: { On: IoMoonSharp, Off: IoMoonOutline },
  33: { On: PiNumberCircleOneFill, Off: PiNumberCircleOne },
  66: { On: PiNumberCircleTwoFill, Off: PiNumberCircleTwo },
  100: { On: PiNumberCircleThreeFill, Off: PiNumberCircleThree },
  undefined: { On: PiWarningBold, Off: PiWarningBold },
}

const PresetButton = ({ onClick, type, state, busy, id }: IButton) => {
  const Icon = type ? buttonsMap[type] : buttonsMap.undefined

  return (
    <button
      onClick={onClick}
      className={styles.button}
      disabled={busy}
      data-id={id}
    >
      {busy && <Icon.Off className={`${styles['btn-off']} ${styles.busy}`} />}
      {!busy && state === type && <Icon.On className={styles['btn-on']} />}
      {!busy && state !== type && <Icon.Off className={styles['btn-off']} />}
    </button>
  )
}

export default PresetButton
