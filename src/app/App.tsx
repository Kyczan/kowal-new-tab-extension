import { CSSProperties } from 'react'

import TopSites from '../features/topSites/TopSites'
import Clock from '../features/clock/Clock'
import Calendar from '../features/calendar/Calendar'
import Weather from '../features/weather/Weather'
import Allergens from '../features/allergens/Allergens'
import FloorPlan from '../features/floorPlan/FloorPlan'
import { getConfig, featureEnabled, randomItem, dev } from '../utils/utils'
import { IConfig } from '../types'

import styles from './App.module.css'

const getWallpaperUrl = () => {
  const wallpapers = getConfig('wallpapers') as IConfig['wallpapers']
  const prefix = dev ? './' : '../../'
  return `url("${prefix}wallpapers/${randomItem(wallpapers.list)}")`
}

const App = () => {
  const wallpaperCssVar = {
    '--wallpaper': getWallpaperUrl(),
  } as CSSProperties

  return (
    <div className={styles.container} style={wallpaperCssVar}>
      {featureEnabled('clock') && <Clock />}
      {featureEnabled('topSites') && <TopSites />}
      {featureEnabled('calendar') && <Calendar />}
      {featureEnabled('weather') && <Weather />}
      {featureEnabled('allergens') && <Allergens />}
      {featureEnabled('floorPlan') && <FloorPlan />}
    </div>
  )
}

export default App
