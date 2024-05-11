import { CSSProperties, useEffect } from 'react'

import TopSites from '../features/topSites/TopSites'
import Clock from '../features/clock/Clock'
import Calendar from '../features/calendar/Calendar'
import Weather from '../features/weather/Weather'
import Allergens from '../features/allergens/Allergens'
import FloorPlan from '../features/floorPlan/FloorPlan'
import Settings from '../features/settings/Settings'
import { randomItem, dev } from '../utils/utils'
import { useFeature, useConfigActions } from '../store/store'
import { IConfig } from '../types'

import styles from './App.module.css'

const getWallpaperUrl = (wallpapers: IConfig['wallpapers'] | undefined) => {
  const prefix = dev ? './' : '../../'
  if (!wallpapers) return null
  return `url("${prefix}wallpapers/${randomItem(wallpapers?.list)}")`
}

const App = () => {
  const { fetchConfig } = useConfigActions()

  useEffect(() => {
    fetchConfig()
  }, [fetchConfig])

  const clock = useFeature('clock') as IConfig['clock']
  const topSites = useFeature('topSites') as IConfig['topSites']
  const calendar = useFeature('calendar') as IConfig['calendar']
  const weather = useFeature('weather') as IConfig['weather']
  const allergens = useFeature('allergens') as IConfig['allergens']
  const floorPlan = useFeature('floorPlan') as IConfig['floorPlan']
  const wallpapers = useFeature('wallpapers') as IConfig['wallpapers']

  const wallpaperCssVar = {
    '--wallpaper': getWallpaperUrl(wallpapers),
  } as CSSProperties

  return (
    <>
      <div className={styles.container} style={wallpaperCssVar}>
        {clock?.enabled && <Clock />}
        {topSites?.enabled && <TopSites />}
        {calendar?.enabled && <Calendar />}
        {weather?.enabled && <Weather />}
        {allergens?.enabled && <Allergens />}
        {floorPlan?.enabled && <FloorPlan />}
      </div>
      <Settings />
    </>
  )
}

export default App
