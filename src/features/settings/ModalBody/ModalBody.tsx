import { useState } from 'react'

import HomeAssistant from '../HomeAssistant/HomeAssistant'
import Allergens from '../Allergens/Allergens'
import Switch from '../Switch/Switch'
import { useConfig, useConfigActions } from '../../../store/store'

import styles from './ModalBody.module.css'

function ModalBody() {
  const config = useConfig()
  const { updateConfig } = useConfigActions()
  const [form, setForm] = useState(structuredClone(config))

  const save = () => {
    if (form) {
      updateConfig(form)
    }
  }

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
    if (form) {
      const clonedForm = structuredClone(form)
      const currentState = form[feature].enabled
      clonedForm[feature].enabled = !currentState
      setForm(clonedForm)
      updateConfig(clonedForm)
    }
  }

  return form ? (
    <div className={styles.body}>
      <HomeAssistant form={form} setForm={setForm} save={save} />
      <Allergens
        form={form}
        setForm={setForm}
        save={save}
        toggleFeature={toggleFeature}
      />

      <div className={styles.feature}>
        <div className={styles.item}>Clock</div>
        <Switch
          isOn={form.clock.enabled}
          onChange={() => toggleFeature('clock')}
          id="clock"
        />
      </div>
      <div className={styles.feature}>
        <div className={styles.item}>Top sites</div>
        <Switch
          isOn={form.topSites.enabled}
          onChange={() => toggleFeature('topSites')}
          id="topSites"
        />
      </div>
      <div className={styles.feature}>
        <div className={styles.item}>Weather</div>
        <Switch
          isOn={form.weather.enabled}
          onChange={() => toggleFeature('weather')}
          id="weather"
        />
      </div>
      <div className={styles.feature}>
        <div className={styles.item}>Calendar</div>
        <Switch
          isOn={form.calendar.enabled}
          onChange={() => toggleFeature('calendar')}
          id="calendar"
        />
      </div>
      <div className={styles.feature}>
        <div className={styles.item}>Floor plan</div>
        <Switch
          isOn={form.floorPlan.enabled}
          onChange={() => toggleFeature('floorPlan')}
          id="floorPlan"
        />
      </div>
      <div className={styles.feature}>
        <div className={styles.item}>Lights</div>
        <Switch
          isOn={form.lights.enabled}
          onChange={() => toggleFeature('lights')}
          id="lights"
        />
      </div>
      <div className={styles.feature}>
        <div className={styles.item}>Air purifiers</div>
        <Switch
          isOn={form.airPurifiers.enabled}
          onChange={() => toggleFeature('airPurifiers')}
          id="airPurifiers"
        />
      </div>
    </div>
  ) : null
}
export default ModalBody
