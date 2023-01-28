import { MouseEventHandler } from 'react'
import {
  MdHdrAuto,
  MdOutlineHdrAuto,
  MdFavoriteBorder,
  MdFavorite,
} from 'react-icons/md'
import { IoMoonSharp, IoMoonOutline } from 'react-icons/io5'
import {
  TbWindmillOff,
  TbWindmill,
  TbNumber1,
  TbNumber2,
  TbNumber3,
} from 'react-icons/tb'

import { HAFanPresetModes, HAFanLevels } from '../../api/api'

import styles from './AirPurifier.module.css'

interface IButton {
  onClick: MouseEventHandler<HTMLButtonElement>
  type: HAFanPresetModes | HAFanLevels
  state: HAFanPresetModes | HAFanLevels | undefined
  busy: boolean
}

const buttonsMap = {
  [HAFanPresetModes.AUTO]: { On: MdHdrAuto, Off: MdOutlineHdrAuto },
  [HAFanPresetModes.FAVORITE]: { On: MdFavorite, Off: MdFavoriteBorder },
  [HAFanPresetModes.SILENT]: { On: IoMoonSharp, Off: IoMoonOutline },
  [HAFanPresetModes.FAN]: { On: TbWindmill, Off: TbWindmillOff },
  1: { On: TbNumber1, Off: TbNumber1 },
  2: { On: TbNumber2, Off: TbNumber2 },
  3: { On: TbNumber3, Off: TbNumber3 },
}

const PresetButton = ({ onClick, type, state, busy }: IButton) => {
  const Icon = buttonsMap[type]

  return (
    <button onClick={onClick} className={styles.button} disabled={busy}>
      {busy && <Icon.Off className={`${styles['btn-off']} ${styles.busy}`} />}
      {!busy && state === type && <Icon.On className={styles['btn-on']} />}
      {!busy && state !== type && <Icon.Off className={styles['btn-off']} />}
    </button>
  )
}

export default PresetButton
