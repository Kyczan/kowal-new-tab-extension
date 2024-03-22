import { GoHome } from 'react-icons/go'

import { useHAStateValues } from '../../api/hooks'
import { useFeature } from '../../store/store'
import { IConfig } from '../../types'

import styles from './Weather.module.css'

const Indoor = () => {
  const airPurifiers = useFeature('airPurifiers') as IConfig['airPurifiers']
  const { list } = airPurifiers || {}
  const tempEntities = list.map((item) => item.temp)
  const humidEntities = list.map((item) => item.humid)
  const temps = useHAStateValues(tempEntities, true)
  const humids = useHAStateValues(humidEntities, true)

  return (
    <>
      {list.map(({ temp, humid, name }, index) => {
        const { value: tempValue } =
          temps.find((item) => item.entity_id === temp) || {}
        const { value: humidValue } =
          humids.find((item) => item.entity_id === humid) || {}
        return tempValue || humidValue ? (
          <div className={styles.info} key={index}>
            <div className={styles.infoElement}>
              <span className={styles.infoUnit}>{name}:</span>
            </div>
            {tempValue && (
              <div className={styles.infoElement} title="Home temperature">
                {tempValue}
                <span className={styles.infoUnit}>°C</span>
              </div>
            )}
            {humidValue && (
              <div className={styles.infoElement} title="Home humidity">
                {(+humidValue).toFixed(0)}
                <span className={styles.infoUnit}>%</span>
              </div>
            )}
            <div className={styles.infoIcon} title="Home">
              <GoHome />
            </div>
          </div>
        ) : null
      })}
    </>
  )
}

export default Indoor
