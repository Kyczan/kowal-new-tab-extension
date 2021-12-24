import Lights from '../features/lights/Lights'
import TopSites from '../features/topSites/TopSites'
import Clock from '../features/clock/Clock'

import styles from './App.module.css'

function App() {
  return (
    <div className={styles.container}>
      <Clock />
      <Lights />
      <TopSites />
    </div>
  )
}

export default App
