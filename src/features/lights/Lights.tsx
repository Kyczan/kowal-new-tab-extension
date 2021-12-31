import { useEffect, useState } from 'react'

import Bulb from './Bulb'
import { toggleSwitch, useHAStateItems, IHAStateItem } from '../../api/api'

import styles from './Lights.module.css'

const Lights = () => {
  const { data, mutate } = useHAStateItems()
  const [switches, setSwitches] = useState<IHAStateItem[]>([])
  const [busyList, setBusyList] = useState<string[]>([])

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
    if (!busyList.includes(entity_id))
      setBusyList((list) => [...list, entity_id])

    await toggleSwitch(entity_id)
    setTimeout(async () => {
      await mutate()
      setBusyList((list) => list.filter((item) => item !== entity_id))
    }, 250)
  }

  return (
    <div className={styles.lights}>
      {switches.map((item) => (
        <button
          key={item.entity_id}
          onClick={() => handleClick(item.entity_id)}
          className={styles.button}
          disabled={busyList.includes(item.entity_id)}
        >
          {item.attributes?.friendly_name.replace(' światło', '')}
          <Bulb state={item.state} busy={busyList.includes(item.entity_id)} />
        </button>
      ))}
    </div>
  )
}

export default Lights
