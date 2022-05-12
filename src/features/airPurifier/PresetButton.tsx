import { MouseEventHandler } from 'react'
import {
  MdHdrAuto,
  MdOutlineHdrAuto,
  MdFavoriteBorder,
  MdFavorite,
} from 'react-icons/md'

import { HAFanPresetModes } from '../../api/api'

import styles from './AirPurifier.module.css'

interface IButton {
  onClick: MouseEventHandler<HTMLButtonElement>
  type: HAFanPresetModes
  state: HAFanPresetModes | undefined
  busy: boolean
}

const PresetButton = ({ onClick, type, state, busy }: IButton) => {
  const busyClass = busy ? styles.busy : ''
  return (
    <button onClick={onClick} className={styles.button} disabled={busy}>
      {type === HAFanPresetModes.AUTO && state === HAFanPresetModes.AUTO && (
        <MdHdrAuto className={`${styles['btn-on']} ${busyClass}`} />
      )}
      {type === HAFanPresetModes.AUTO && state !== HAFanPresetModes.AUTO && (
        <MdOutlineHdrAuto className={`${styles['btn-off']} ${busyClass}`} />
      )}

      {type === HAFanPresetModes.FAVORITE &&
        state === HAFanPresetModes.FAVORITE && (
          <MdFavorite className={`${styles['btn-on']} ${busyClass}`} />
        )}
      {type === HAFanPresetModes.FAVORITE &&
        state !== HAFanPresetModes.FAVORITE && (
          <MdFavoriteBorder className={`${styles['btn-off']} ${busyClass}`} />
        )}
    </button>
  )
}

export default PresetButton
