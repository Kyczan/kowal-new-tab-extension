import { IConfig } from '../../../types'
import Switch from '../Switch/Switch'

import styles from '../ModalBody/ModalBody.module.css'

type AllergensProps = {
  form: IConfig
  setForm: (form: IConfig) => void
  save: () => void
  toggleFeature: (type: 'allergens') => void
}

function Allergens({ form, setForm, save, toggleFeature }: AllergensProps) {
  const onAllergensInputChange =
    (target: 'cityId') => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (form) {
        const clonedForm = structuredClone(form)
        clonedForm.allergens.api[target] = e.target.value
        setForm(clonedForm)
      }
    }

  return (
    <>
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
    </>
  )
}
export default Allergens
