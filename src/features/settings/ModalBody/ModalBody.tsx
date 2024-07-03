import { useState } from 'react'

import HomeAssistant from '../HomeAssistant/HomeAssistant'
import Allergens from '../Allergens/Allergens'
import FloorPlan from '../FloorPlan/FloorPlan'
import Lights from '../Lights/Lights'
import AirPurifiers from '../AirPurifiers/AirPurifiers'
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
      | 'stocks'
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
    <div className={styles.wrapper}>
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
          <div className={styles.item}>Stocks</div>
          <Switch
            isOn={form.stocks.enabled}
            onChange={() => toggleFeature('stocks')}
            id="stocks"
          />
        </div>

        <div className={styles.spacer} />

        <FloorPlan
          form={form}
          setForm={setForm}
          save={save}
          toggleFeature={toggleFeature}
        />
        <Lights
          form={form}
          setForm={setForm}
          save={save}
          toggleFeature={toggleFeature}
        />
        <AirPurifiers
          form={form}
          setForm={setForm}
          save={save}
          toggleFeature={toggleFeature}
        />
      </div>
    </div>
  ) : null
}
export default ModalBody
