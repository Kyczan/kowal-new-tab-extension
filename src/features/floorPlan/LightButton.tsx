import Bulb from './Bulb'
import { LightType } from '../../types'

import styles from './FloorPlan.module.css'

interface ILightButton {
  onClick: () => void
  busy: boolean
  type: LightType
  state?: 'on' | 'off'
  style: React.CSSProperties
}

const LightButton = ({ onClick, busy, type, state, style }: ILightButton) => {
  return (
    <button
      onClick={onClick}
      className={styles.button}
      disabled={busy}
      style={style}
    >
      <Bulb type={type} state={state} busy={busy} />
    </button>
  )
}

export default LightButton
