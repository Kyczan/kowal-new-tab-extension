import { BsLightbulbFill, BsLightbulb } from 'react-icons/bs'

import styles from './Lights.module.css'

interface IBulb {
  state: 'on' | 'off' | 'unavailable'
  busy: boolean
}

const Bulb = ({ state, busy }: IBulb) => {
  const busyClass = busy ? styles.busy : ''
  return (
    <div>
      {state === 'on' && (
        <BsLightbulbFill className={`${styles['bulb-on']} ${busyClass}`} />
      )}
      {state !== 'on' && (
        <BsLightbulb className={`${styles['bulb-off']} ${busyClass}`} />
      )}
    </div>
  )
}

export default Bulb
