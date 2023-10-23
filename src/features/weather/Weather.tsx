import useSWR from 'swr'
import { BsTree } from 'react-icons/bs'
import { GoHome } from 'react-icons/go'

import { weatherFetcher } from '../../api/api'
import { useHAStateValue } from '../../api/hooks'
import weatherIconsMap from './weatherIconsMap'

import styles from './Weather.module.css'

interface IWeatherMain {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

interface IWeatherWeather {
  id: number
  main: string
  description: string
  icon: keyof typeof weatherIconsMap
}

interface IWeatherData {
  weather: IWeatherWeather[]
  main: IWeatherMain
  name: string
}

const Weather = () => {
  const { data } = useSWR<IWeatherData>('weather', weatherFetcher)
  const homeTemp = useHAStateValue('sensor.mi_air_purifier_3_3h_temperature')
  const homeHumid = useHAStateValue('sensor.mi_air_purifier_3_3h_humidity')

  return (
    <div className={styles.weather}>
      {data && (
        <>
          <div className={styles.header}>
            <div className={styles.name}>{data.name}</div>
            <div className={styles.name}>|</div>
            <div className={styles.desc}>{data.weather[0].description}</div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.icon}>
              {weatherIconsMap[data.weather[0].icon]}
            </div>
            <div>
              <div className={styles.temp}>
                {data.main.temp.toFixed(1)}
                °C
              </div>
              <div className={styles.info}>
                <div className={styles.infoElement}>
                  {data.main.pressure} hPa
                </div>
                <div className={styles.infoElement}>{data.main.humidity}%</div>
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
