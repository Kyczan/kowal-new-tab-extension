import { useEffect, useState } from 'react'
import { BsLightbulbFill, BsLightbulb } from 'react-icons/bs'

import { toggleSwitch, useHAStateItems, IHAStateItem } from '../../api/api'

import styles from './Lights.module.css'

const Lights = () => {
  const { data, mutate } = useHAStateItems()
  const [switches, setSwitches] = useState<IHAStateItem[]>([])

  useEffect(() => {
    if (Array.isArray(data)) {
      const filtered = data.filter(
        (item) =>
          item.entity_id.startsWith('switch.sonoff_') &&
          item.state !== 'unavailable'
      )
      setSwitches(filtered)
    }
  }, [data])

  const handleClick = async (entity_id: string) => {
    await toggleSwitch(entity_id)
    setTimeout(() => {
      mutate()
    }, 250)
  }

  return (
    <div className={styles.lights}>
      {switches.map((item) => (
        <button
          key={item.entity_id}
          onClick={() => handleClick(item.entity_id)}
          className={styles.button}
        >
          {item.attributes?.friendly_name.replace(' światło', '')}
          {item.state === 'on' && (
            <BsLightbulbFill className={styles['bulb-on']} />
          )}
          {item.state !== 'on' && (
            <BsLightbulb className={styles['bulb-off']} />
          )}
        </button>
      ))}
    </div>
  )
}

export default Lights
