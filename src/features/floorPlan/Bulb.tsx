import {
  PiLightbulbFill,
  PiLightbulbDuotone,
  PiLampDuotone,
  PiLampFill,
} from 'react-icons/pi'

import styles from './FloorPlan.module.css'

interface IBulb {
  type: 'bulb' | 'lamp'
  state?: 'on' | 'off'
  busy: boolean
}

const buttonsMap = {
  bulb: { on: PiLightbulbFill, off: PiLightbulbDuotone },
  lamp: { on: PiLampFill, off: PiLampDuotone },
}

const Bulb = ({ type = 'bulb', state = 'off', busy = false }: IBulb) => {
  const Icon = buttonsMap[type][state]

  const primaryClass = styles[`bulb-${state}`]
  const busyClass = busy ? styles.busy : ''

  return <Icon className={`${primaryClass} ${busyClass}`} />
}

export default Bulb
