import useSWR from 'swr'

import { weatherFetcher } from '../../api/api'
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
                <sup>°</sup>C
              </div>
              <div className={styles.pressure}>{data.main.pressure} hPa</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Weather
