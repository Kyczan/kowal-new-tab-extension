import { BsTree } from 'react-icons/bs'
import { GoHome } from 'react-icons/go'

import { IConfig } from '../../types'
import { useHAStateValue } from '../../api/hooks'
import { getConfig } from '../../utils/utils'
import CurrentWeatherIcon from './CurrentWeatherIcon'

import styles from './Weather.module.css'

const Weather = () => {
  const { name, entity_id } = getConfig('weather') as IConfig['weather']

  const description = useHAStateValue(`${entity_id}_weather`)
  const temperature = useHAStateValue(`${entity_id}_temperature`)
  const pressure = useHAStateValue(`${entity_id}_pressure`)
  const humidity = useHAStateValue(`${entity_id}_humidity`)
  const homeTemp = useHAStateValue(
    'sensor.mi_air_purifier_3_3h_temperature',
    true,
  )
  const homeHumid = useHAStateValue(
    'sensor.mi_air_purifier_3_3h_humidity',
    true,
  )

  return (
    <div className={styles.weather}>
      {description && temperature && (
        <>
          <div className={styles.header}>
            <div className={styles.name}>{name}</div>
            <div className={styles.name}>|</div>
            <div className={styles.desc}>{description}</div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.icon}>
              <CurrentWeatherIcon />
            </div>
            <div>
              <div className={styles.temp}>
                {(+temperature).toFixed(1)}
                °C
              </div>
              <div className={styles.info}>
                {pressure && (
                  <div className={styles.infoElement}>{pressure} hPa</div>
                )}
                {humidity && (
                  <div className={styles.infoElement}>{humidity}%</div>
                )}
                <div className={styles.infoIcon}>
                  <BsTree />
                </div>
              </div>
              <div className={styles.info}>
                {homeTemp && (
                  <div className={styles.infoElement}>{homeTemp}°C</div>
                )}
                {homeHumid && (
                  <div className={styles.infoElement}>{homeHumid}%</div>
                )}
                <div className={styles.infoIcon}>
                  <GoHome />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Weather
