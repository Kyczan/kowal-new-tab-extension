import svgToMiniDataURI from 'mini-svg-data-uri'

import { IConfig } from '../../types'
import { useAirPurifiers } from '../../api/hooks'
import { useFeature } from '../../store/store'
import LightButton from './LightButton'
import AirPurifier from '../airPurifier/AirPurifier'
// import Vacuum from '../vacuum/Vacuum'

import styles from './FloorPlan.module.css'

const FloorPlan = () => {
  const lights = useFeature('lights') as IConfig['lights']
  const { list } = lights || {}
  const purifiers = useAirPurifiers()
  const floorPlanConfig = useFeature('floorPlan') as IConfig['floorPlan']
  const lightsConfig = useFeature('lights') as IConfig['lights']
  const airPurifiersConfig = useFeature(
    'airPurifiers',
  ) as IConfig['airPurifiers']

  return (
    <div className={styles.floorPlan}>
      <div className={styles.wrapper} style={{ width: floorPlanConfig?.width }}>
        <img
          src={svgToMiniDataURI(floorPlanConfig?.svg)}
          alt="Floor Plan"
          className={styles.planIcon}
        />
        {lightsConfig?.enabled &&
          list.map(({ entity_id, name, left, top }) => (
            <LightButton
              key={name}
              entity_id={entity_id}
              style={{ top, left }}
            />
          ))}
        {/* <Vacuum className={styles.vacuum} /> */}
        {airPurifiersConfig?.enabled &&
          purifiers.map(
            ({
              preset,
              preset_modes,
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
                preset_modes={preset_modes}
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
