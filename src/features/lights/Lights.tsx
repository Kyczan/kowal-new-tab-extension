import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { BsLightbulbFill, BsLightbulb } from 'react-icons/bs'

import { toggleSwitch, switchesStateFetcher } from './haService'

import styles from './Lights.module.css'

interface IHAAttributes {
  friendly_name: string
}

interface IHAStateItem {
  entity_id: string
  state: 'on' | 'off' | 'unavailable'
  attributes: IHAAttributes
}

const Lights = () => {
  const { data, mutate } = useSWR<IHAStateItem[]>(
    `${process.env.REACT_APP_HA_URL}/api/states`,
    switchesStateFetcher
  )
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
      <h2>Światła</h2>
      <hr />
      {switches.map((item) => (
        <button
          key={item.entity_id}
          onClick={() => handleClick(item.entity_id)}
          className={styles.button}
        >
          {item.attributes?.friendly_name}
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
