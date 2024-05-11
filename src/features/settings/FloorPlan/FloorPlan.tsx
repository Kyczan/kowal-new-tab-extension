import { IConfig } from '../../../types'
import Switch from '../Switch/Switch'

import styles from '../ModalBody/ModalBody.module.css'

type FloorPlanProps = {
  form: IConfig
  setForm: (form: IConfig) => void
  save: () => void
  toggleFeature: (type: 'floorPlan') => void
}

function FloorPlan({ form, setForm, save, toggleFeature }: FloorPlanProps) {
  const onInputChange =
    (target: 'width') => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (form) {
        const clonedForm = structuredClone(form)
        clonedForm.floorPlan.width = e.target.value
        setForm(clonedForm)
      }
    }

  const onSvgInputChange =
    (target: 'svg') => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (form) {
        const clonedForm = structuredClone(form)
        clonedForm.floorPlan.svg = e.target.value
        setForm(clonedForm)
      }
    }

  return (
    <>
      <div className={styles.feature}>
        <div className={styles.item}>Floor plan</div>
        <Switch
          isOn={form.floorPlan.enabled}
          onChange={() => toggleFeature('floorPlan')}
          id="floorPlan"
        />
      </div>
      <div className={styles.group}>
        <div className={styles.feature}>
          <label htmlFor="width" className={styles.item}>
            Width
          </label>
          <input
            type="text"
            id="width"
            name="width"
            className={`${styles.input} ${styles.short}`}
            value={form.floorPlan.width}
            onChange={onInputChange('width')}
            onBlur={save}
          />
        </div>
        <div className={styles.feature}>
          <label htmlFor="svg" className={styles.item}>
            Plan in SVG format
          </label>
          <textarea
            id="svg"
            name="svg"
            className={`${styles.input} ${styles.svg}`}
            value={form.floorPlan.svg}
            onChange={onSvgInputChange('svg')}
            onBlur={save}
          />
        </div>
      </div>

      <div className={styles.spacer} />
    </>
  )
}
export default FloorPlan
