import { BsTree } from 'react-icons/bs'
import { GoHome } from 'react-icons/go'

import { IConfig } from '../../types'
import { useHAStateValue } from '../../api/hooks'
import { useFeature } from '../../store/store'
import CurrentWeatherIcon from './CurrentWeatherIcon'
import BeaufortIcon from './BeaufortIcon'

import styles from './Weather.module.css'

const Weather = () => {
  const { entity_id } = useFeature('weather') as IConfig['weather']

  const description = useHAStateValue(`${entity_id}_weather`)
  const temperature = useHAStateValue(`${entity_id}_temperature`)
  const pressure = useHAStateValue(`${entity_id}_pressure`)
  const humidity = useHAStateValue(`${entity_id}_humidity`)
  const wind = Math.round(+(useHAStateValue(`${entity_id}_wind_speed`) || ''))
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
            <div className={styles.desc}>{description}</div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.icon}>
              <CurrentWeatherIcon />
              <div className={styles.windIcon} title="Beaufort scale">
                <BeaufortIcon wind={wind} />
              </div>
            </div>

            <div>
              <div className={styles.temp} title="Outdoor temperature">
                {(+temperature).toFixed(1)}
                <span className={styles.infoUnit}>°C</span>
              </div>
              <div className={styles.info}>
                {wind && (
                  <div className={styles.infoElement} title="Wind speed">
                    {wind}&nbsp;
                    <span className={styles.infoUnit}>km/h</span>
                  </div>
                )}
                {pressure && (
                  <div className={styles.infoElement} title="Pressure">
                    {pressure}&nbsp;<span className={styles.infoUnit}>hPa</span>
                  </div>
                )}
                {humidity && (
                  <div className={styles.infoElement} title="Outdoor humidity">
                    {humidity}
                    <span className={styles.infoUnit}>%</span>
                  </div>
                )}
                <div className={styles.infoIcon} title="Outdoor">
                  <BsTree />
                </div>
              </div>
              <div className={styles.info}>
                {homeTemp && (
                  <div className={styles.infoElement} title="Home temperature">
                    {homeTemp}
                    <span className={styles.infoUnit}>°C</span>
                  </div>
                )}
                {homeHumid && (
                  <div className={styles.infoElement} title="Home humidity">
                    {homeHumid}
                    <span className={styles.infoUnit}>%</span>
                  </div>
                )}
                <div className={styles.infoIcon} title="Home">
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
