import { useEffect, useState } from 'react'

import Bulb from './Bulb'
import AirPurifier from '../airPurifier/AirPurifier'
import { toggleSwitch, IHAStateItem } from '../../api/api'
import { useHAStateItems } from '../../api/hooks'

import styles from './Lights.module.css'

type GroupedLights = Record<string, IHAStateItem[]>

const Lights = () => {
  const { data, mutate } = useHAStateItems()
  const [switches, setSwitches] = useState<GroupedLights>({})
  const [busyList, setBusyList] = useState<string[]>([])

  useEffect(() => {
    if (Array.isArray(data)) {
      const filtered = data.filter(
        (item) =>
          item.entity_id.startsWith('switch.sonoff_') &&
          item.state !== 'unavailable'
      )

      const grouped = filtered.reduce((group: GroupedLights, item) => {
        const {
          attributes: { friendly_name },
        } = item
        const name = friendly_name
          .replace(' światło', '')
          .replace(' lampka', '')
        group[name] = group[name] ?? []
        group[name].push(item)
        return group
      }, {})

      setSwitches(grouped)
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
      <AirPurifier />
      {Object.keys(switches).map((groupName) => (
        <div key={groupName} className={styles.group}>
          <span>{groupName}</span>

          <div className={styles.buttonGroup}>
            {switches[groupName].map((lightSwitch) => {
              const isLamp =
                lightSwitch.attributes.friendly_name.includes('lampka')

              return (
                <button
                  key={lightSwitch.entity_id}
                  onClick={() => handleClick(lightSwitch.entity_id)}
                  className={styles.button}
                  style={{ order: isLamp ? '-1' : '0' }} // show lamp first
                  disabled={busyList.includes(lightSwitch.entity_id)}
                >
                  <Bulb
                    type={isLamp ? 'lamp' : 'bulb'}
                    state={lightSwitch.state}
                    busy={busyList.includes(lightSwitch.entity_id)}
                  />
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Lights
