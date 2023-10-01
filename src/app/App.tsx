import { CSSProperties } from 'react'

import Lights from '../features/lights/Lights'
import TopSites from '../features/topSites/TopSites'
import Clock from '../features/clock/Clock'
import Calendar from '../features/calendar/Calendar'
import Weather from '../features/weather/Weather'
import Allergens from '../features/allergens/Allergens'
import Bookmarks from '../features/bookmarks/Bookmarks'
import FloorPlan from '../features/floorPlan/FloorPlan'
import { randomItem, dev } from '../utils/utils'
import wallpapersData from './wallpapersData.json'

import styles from './App.module.css'

const getWallpaperUrl = () => {
  const prefix = dev ? './' : '../../'
  return `url("${prefix}wallpapers/${randomItem(wallpapersData)}")`
}

const App = () => {
  const wallpaperCssVar = {
    '--wallpaper': getWallpaperUrl(),
  } as CSSProperties

  return (
    <>
      <Bookmarks />
      <div className={styles.container} style={wallpaperCssVar}>
        <Clock />
        {/* <Lights /> */}
        <TopSites />
        <Calendar />
        <Weather />
        <Allergens />
        <FloorPlan />
      </div>
    </>
  )
}

export default App
