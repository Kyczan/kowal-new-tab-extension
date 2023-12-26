import { IConfig } from '../../types'
import { useLights, useAirPurifiers } from '../../api/hooks'
import { featureEnabled, getConfig } from '../../utils/utils'
import LightButton from './LightButton'
import AirPurifier from '../airPurifier/AirPurifier'
// import Vacuum from '../vacuum/Vacuum'

import styles from './FloorPlan.module.css'

const FloorPlan = () => {
  const lights = useLights()
  const purifiers = useAirPurifiers()
  const { width } = getConfig('floorPlan') as IConfig['floorPlan']

  return (
    <div className={styles.floorPlan}>
      <div className={styles.wrapper} style={{ width }}>
        <img src="/plan.svg" alt="Floor Plan" className={styles.planIcon} />
        {featureEnabled('lights') &&
          lights.map(({ name, busy, type, state, toggle, top, left }) => (
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
        {featureEnabled('airPurifiers') &&
          purifiers.map(
            ({
              preset,
              busy,
              show,
              handleClick,
              toggleButtonList,
              name,
              top,
              left,
            }) => (
              <AirPurifier
                key={name}
                preset={preset}
                busy={busy}
                show={show}
                handleClick={handleClick}
                toggleButtonList={toggleButtonList}
                style={{ top, left }}
              />
            ),
          )}
      </div>
    </div>
  )
}

export default FloorPlan
