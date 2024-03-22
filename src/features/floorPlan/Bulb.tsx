import { PiLightbulbFill, PiLightbulbDuotone } from 'react-icons/pi'

import styles from './FloorPlan.module.css'

interface IBulb {
  state?: 'on' | 'off'
  busy: boolean
}

const buttonsMap = { on: PiLightbulbFill, off: PiLightbulbDuotone }

const Bulb = ({ state = 'off', busy = false }: IBulb) => {
  const Icon = buttonsMap[state]

  const primaryClass = styles[`bulb-${state}`]
  const busyClass = busy ? styles.busy : ''

  return <Icon className={`${primaryClass} ${busyClass}`} />
}

export default Bulb
