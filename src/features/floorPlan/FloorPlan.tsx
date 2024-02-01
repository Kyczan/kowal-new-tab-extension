import { IConfig } from '../../types'
import { useLights, useAirPurifiers } from '../../api/hooks'
import { useFeature } from '../../store/store'
import LightButton from './LightButton'
import AirPurifier from '../airPurifier/AirPurifier'
// import Vacuum from '../vacuum/Vacuum'

import styles from './FloorPlan.module.css'

const FloorPlan = () => {
  const lights = useLights()
  const purifiers = useAirPurifiers()
  const floorPlanConfig = useFeature('floorPlan') as IConfig['floorPlan']
  const lightsConfig = useFeature('lights') as IConfig['lights']
  const airPurifiersConfig = useFeature(
    'airPurifiers',
  ) as IConfig['airPurifiers']

  return (
    <div className={styles.floorPlan}>
      <div className={styles.wrapper} style={{ width: floorPlanConfig?.width }}>
        <img src="/plan.svg" alt="Floor Plan" className={styles.planIcon} />
        {lightsConfig?.enabled &&
          lights.map(({ name, busy, type, state, toggle, top, left }) => (
            <LightButton
              key={name}
              busy={busy}
              type={type}
              state={state as 'on' | 'off' | undefined}
              onClick={toggle}
              style={{ top, left }}
            />
          ))}
        {/* <Vacuum className={styles.vacuum} /> */}
        {airPurifiersConfig?.enabled &&
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
