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

const weatherIconsMap = {
  '01d': <WiDaySunny />,
  '01n': <WiNightClear />,
  '02d': <WiDayCloudy />,
  '02n': <WiNightAltCloudy />,
  '03d': <WiCloud />,
  '03n': <WiCloud />,
  '04d': <WiCloudy />,
  '04n': <WiCloudy />,
  '09d': <WiRain />,
  '09n': <WiRain />,
  '10d': <WiDayShowers />,
  '10n': <WiNightAltShowers />,
  '11d': <WiStormShowers />,
  '11n': <WiStormShowers />,
  '13d': <WiSnow />,
  '13n': <WiSnow />,
  '50d': <WiFog />,
  '50n': <WiFog />,
}

export default weatherIconsMap
