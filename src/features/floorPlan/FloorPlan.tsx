import svgToMiniDataURI from 'mini-svg-data-uri'

import { IConfig } from '../../types'
import { useFeature } from '../../store/store'
import LightButton from './LightButton'
import AirPurifier from '../airPurifier/AirPurifier'
// import Vacuum from '../vacuum/Vacuum'

import styles from './FloorPlan.module.css'

const FloorPlan = () => {
  const lights = useFeature('lights') as IConfig['lights']
  const { list: lightsList } = lights || {}
  const airPurifiers = useFeature('airPurifiers') as IConfig['airPurifiers']
  const { list: airPurifiersList } = airPurifiers || {}
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
          lightsList.map(({ entity_id, name, left, top }) => (
            <LightButton
              key={name}
              entity_id={entity_id}
              style={{ top, left }}
            />
          ))}
        {/* <Vacuum className={styles.vacuum} /> */}
        {airPurifiersConfig?.enabled &&
          airPurifiersList.map(({ entity_id, name, top, left }) => (
            <AirPurifier
              key={name}
              entity_id={entity_id}
              style={{ top, left }}
            />
          ))}
      </div>
    </div>
  )
}

export default FloorPlan
