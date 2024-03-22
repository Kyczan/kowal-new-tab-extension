import Bulb from './Bulb'
import { useSwitch } from '../../api/hooks'

import styles from './FloorPlan.module.css'

interface ILightButton {
  entity_id: string
  style: React.CSSProperties
}

const LightButton = ({ entity_id, style }: ILightButton) => {
  const { busy, state, toggle } = useSwitch(entity_id)
  return (
    <button
      onClick={toggle}
      className={styles.button}
      disabled={busy}
      style={style}
    >
      <Bulb state={state as 'on' | 'off' | undefined} busy={busy} />
    </button>
  )
}

export default LightButton
