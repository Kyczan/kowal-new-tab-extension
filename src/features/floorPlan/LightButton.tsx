import Bulb from './Bulb'

import styles from './FloorPlan.module.css'

interface ILightButton {
  onClick: () => void
  busy: boolean
  isLamp: boolean
  state?: 'on' | 'off'
  className: string
}

const LightButton = ({
  onClick,
  busy,
  isLamp,
  state,
  className,
}: ILightButton) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className}`}
      disabled={busy}
    >
      <Bulb type={isLamp ? 'lamp' : 'bulb'} state={state} busy={busy} />
    </button>
  )
}

export default LightButton
