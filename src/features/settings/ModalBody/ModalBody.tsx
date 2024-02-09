import { useState } from 'react'

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

  const onHomeAssistantInputChange =
    (target: 'haUrl' | 'haToken') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (form) {
        const clonedForm = structuredClone(form)
        clonedForm.homeAssistant[target] = e.target.value
        setForm(clonedForm)
      }
    }

  const onAllergensInputChange =
    (target: 'cityId') => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (form) {
        const clonedForm = structuredClone(form)
        clonedForm.allergens.api[target] = e.target.value
        setForm(clonedForm)
      }
    }

  return form ? (
    <div className={styles.body}>
      <div className={styles.item}>Home Assistant</div>
      <div className={styles.group}>
        <div className={styles.feature}>
          <label htmlFor="haUrl" className={styles.item}>
            HA url
          </label>
          <input
            type="text"
            id="haUrl"
            name="haUrl"
            className={styles.input}
            value={form.homeAssistant.haUrl}
            onChange={onHomeAssistantInputChange('haUrl')}
            onBlur={save}
          />
        </div>
        <div className={styles.feature}>
          <label htmlFor="haToken" className={styles.item}>
            HA token
          </label>
          <input
            type="text"
            id="haToken"
            name="haToken"
            className={styles.input}
            value={form.homeAssistant.haToken}
            onChange={onHomeAssistantInputChange('haToken')}
            onBlur={save}
          />
        </div>
      </div>

      <div className={styles.spacer} />

      <div className={styles.feature}>
        <div className={styles.item}>Allergens</div>
        <Switch
          isOn={form.allergens.enabled}
          onChange={() => toggleFeature('allergens')}
          id="allergens"
        />
      </div>
      <div className={styles.group}>
        <div className={styles.feature}>
          <label htmlFor="cityId" className={styles.item}>
            City id
          </label>
          <input
            type="text"
            id="cityId"
            name="cityId"
            className={`${styles.input} ${styles.short}`}
            value={form.allergens.api.cityId}
            onChange={onAllergensInputChange('cityId')}
            onBlur={save}
          />
        </div>
      </div>

      <div className={styles.spacer} />

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
