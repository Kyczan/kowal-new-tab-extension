import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiRain,
  WiDayShowers,
  WiNightAltShowers,
  WiStormShowers,
  WiSnow,
  WiFog,
} from 'react-icons/wi'

import { IConfig } from '../../types'
import { useHAStateValue } from '../../api/hooks'
import { getConfig } from '../../utils/utils'

const CurrentWeatherIcon = () => {
  const { entity_id } = getConfig('weather') as IConfig['weather']

  const code = +(useHAStateValue(`${entity_id}_weather_code`) || '')
  const condition = useHAStateValue(`${entity_id}_condition`) || ''
  const isNight = condition.includes('night')

  // see https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
  if (code < 300) return <WiStormShowers />
  if (code < 400) return <WiRain />
  if (code < 505 && !isNight) return <WiDayShowers />
  if (code < 505 && isNight) return <WiNightAltShowers />
  if (code === 511) return <WiSnow />
  if (code < 600) return <WiRain />
  if (code < 700) return <WiSnow />
  if (code < 800) return <WiFog />
  if (code === 800 && !isNight) return <WiDaySunny />
  if (code === 800 && isNight) return <WiNightClear />
  if (code === 801 && !isNight) return <WiDayCloudy />
  if (code === 801 && isNight) return <WiNightAltCloudy />
  if (code === 802) return <WiCloud />

  // code > 802
  return <WiCloudy />
}

export default CurrentWeatherIcon
