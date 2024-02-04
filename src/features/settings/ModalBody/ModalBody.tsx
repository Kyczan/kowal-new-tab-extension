import Switch from '../Switch/Switch'
import { useConfig, useConfigActions } from '../../../store/store'

import styles from './ModalBody.module.css'

function ModalBody() {
  const config = useConfig()
  const { updateConfig } = useConfigActions()

  const toggleFeature = (
    feature:
      | 'clock'
      | 'topSites'
      | 'weather'
      | 'calendar'
      | 'floorPlan'
      | 'allergens'
      | 'lights'
      | 'airPurifiers',
  ) => {
    if (config) {
      const clonedConfig = structuredClone(config)
      const currentState = config[feature].enabled
      clonedConfig[feature].enabled = !currentState
      updateConfig(clonedConfig)
    }
  }

  return config ? (
    <div className={styles.body}>
      <div className={styles.feature}>
        <div className={styles.item}>Clock</div>
        <Switch
          isOn={config.clock.enabled}
          onChange={() => toggleFeature('clock')}
          id="clock"
        />
      </div>
      <div className={styles.feature}>
        <div className={styles.item}>Top sites</div>
        <Switch
          isOn={config.topSites.enabled}
          onChange={() => toggleFeature('topSites')}
          id="topSites"
        />
      </div>
      <div className={styles.feature}>
        <div className={styles.item}>Weather</div>
        <Switch
          isOn={config.weather.enabled}
          onChange={() => toggleFeature('weather')}
          id="weather"
        />
      </div>
      <div className={styles.feature}>
        <div className={styles.item}>Calendar</div>
        <Switch
          isOn={config.calendar.enabled}
          onChange={() => toggleFeature('calendar')}
          id="calendar"
        />
      </div>
      <div className={styles.feature}>
        <div className={styles.item}>Floor plan</div>
        <Switch
          isOn={config.floorPlan.enabled}
          onChange={() => toggleFeature('floorPlan')}
          id="floorPlan"
        />
      </div>
      <div className={styles.feature}>
        <div className={styles.item}>Lights</div>
        <Switch
          isOn={config.lights.enabled}
          onChange={() => toggleFeature('lights')}
          id="lights"
        />
      </div>
      <div className={styles.feature}>
        <div className={styles.item}>Air purifiers</div>
        <Switch
          isOn={config.airPurifiers.enabled}
          onChange={() => toggleFeature('airPurifiers')}
          id="airPurifiers"
        />
      </div>
      <div className={styles.feature}>
        <div className={styles.item}>Allergens</div>
        <Switch
          isOn={config.allergens.enabled}
          onChange={() => toggleFeature('allergens')}
          id="allergens"
        />
      </div>
    </div>
  ) : null
}
export default ModalBody
