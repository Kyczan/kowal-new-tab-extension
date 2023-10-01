import { useLights } from '../../api/hooks'
import LightButton from './LightButton'
import AirPurifier from '../airPurifier/AirPurifier'
import { ReactComponent as PlanIcon } from './assets/plan.svg'

import styles from './FloorPlan.module.css'

const FloorPlan = () => {
  const lights = useLights()

  return (
    <div className={styles.floorPlan}>
      <div className={styles.wrapper}>
        <PlanIcon className={styles.planIcon} />
        {lights.map(({ name, busy, isLamp, state, toggle }) => (
          <LightButton
            key={name}
            className={styles[name]}
            busy={busy}
            isLamp={isLamp}
            state={state}
            onClick={toggle}
          />
        ))}
      </div>

      <AirPurifier />
    </div>
  )
}

export default FloorPlan
