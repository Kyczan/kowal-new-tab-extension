import { BsTree } from 'react-icons/bs'

import { useHAStateValue } from '../../api/hooks'
import CurrentWeatherIcon from './CurrentWeatherIcon'
import BeaufortIcon from './BeaufortIcon'
import Indoor from './Indoor'

import styles from './Weather.module.css'

const Weather = () => {
  const description = useHAStateValue(`sensor.openweathermap_weather`)
  const temperature = useHAStateValue(`sensor.openweathermap_temperature`)
  const pressure = useHAStateValue(`sensor.openweathermap_pressure`)
  const humidity = useHAStateValue(`sensor.openweathermap_humidity`)
  const wind = Math.round(
    +(useHAStateValue(`sensor.openweathermap_wind_speed`) || ''),
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
              <Indoor />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Weather
