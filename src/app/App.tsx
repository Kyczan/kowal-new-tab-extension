import { CSSProperties } from 'react'

import Lights from '../features/lights/Lights'
import TopSites from '../features/topSites/TopSites'
import Clock from '../features/clock/Clock'
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
    <div className={styles.container} style={wallpaperCssVar}>
      <Clock />
      <Lights />
      <TopSites />
    </div>
  )
}

export default App
