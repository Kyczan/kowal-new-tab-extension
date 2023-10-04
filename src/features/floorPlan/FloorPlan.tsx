import { useLights } from '../../api/hooks'
import LightButton from './LightButton'
import AirPurifier from '../airPurifier/AirPurifier'
// import Vacuum from '../vacuum/Vacuum'
import PlanIcon from './assets/plan.svg?react'

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
        {/* <Vacuum className={styles.vacuum} /> */}
        <AirPurifier className={styles.airPurifier} />
      </div>
    </div>
  )
}

export default FloorPlan
