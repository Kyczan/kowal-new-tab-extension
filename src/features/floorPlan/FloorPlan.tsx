import { useLights } from '../../api/hooks'
import { featureEnabled } from '../../utils/utils'
import LightButton from './LightButton'
import AirPurifier from '../airPurifier/AirPurifier'
// import Vacuum from '../vacuum/Vacuum'

import styles from './FloorPlan.module.css'

const FloorPlan = () => {
  const lights = useLights()

  return (
    <div className={styles.floorPlan}>
      <div className={styles.wrapper}>
        <img src="/plan.svg" alt="Floor Plan" className={styles.planIcon} />
        {lights.map(({ name, busy, type, state, toggle, top, left }) => (
          <LightButton
            key={name}
            busy={busy}
            type={type}
            state={state}
            onClick={toggle}
            style={{ top, left }}
          />
        ))}
        {/* <Vacuum className={styles.vacuum} /> */}
        {featureEnabled('airPurifier') && (
          <AirPurifier className={styles.airPurifier} />
        )}
      </div>
    </div>
  )
}

export default FloorPlan
