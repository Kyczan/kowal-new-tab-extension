import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io'

import { IConfig } from '../../../types'
import Switch from '../Switch/Switch'
import { useConfigActions } from '../../../store/store'

import styles from '../ModalBody/ModalBody.module.css'

type AirPurifiersProps = {
  form: IConfig
  setForm: (form: IConfig) => void
  save: () => void
  toggleFeature: (type: 'airPurifiers') => void
}

function AirPurifiers({
  form,
  setForm,
  save,
  toggleFeature,
}: AirPurifiersProps) {
  const { updateConfig } = useConfigActions()
  const onInputChange =
    (
      target: 'name' | 'entity_id' | 'top' | 'left' | 'temp' | 'humid',
      index: number,
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (form) {
        const clonedForm = structuredClone(form)
        clonedForm.airPurifiers.list[index][target] = e.target.value
        setForm(clonedForm)
      }
    }

  const addPurifier = () => {
    if (form) {
      const clonedForm = structuredClone(form)
      clonedForm.airPurifiers.list.push({
        name: 'new purifier',
        entity_id: 'some_entity',
        top: '50%',
        left: '50%',
        temp: 'related_entity',
        humid: 'related_entity',
        preset_modes: ['Auto', 'Sleep', 'Favorite', 'Manual'].join(','),
      })
      setForm(clonedForm)
      updateConfig(clonedForm)
    }
  }

  const removePurifier = (index: number) => {
    if (form) {
      const clonedForm = structuredClone(form)
      clonedForm.airPurifiers.list.splice(index, 1)
      setForm(clonedForm)
      updateConfig(clonedForm)
    }
  }

  return (
    <>
      <div className={styles.feature}>
        <div className={styles.item}>
          Air Purifiers ({form?.airPurifiers?.list?.length || 0})
        </div>
        <Switch
          isOn={form.airPurifiers.enabled}
          onChange={() => toggleFeature('airPurifiers')}
          id="airPurifiers"
        />
        <button onClick={addPurifier} className={styles.button}>
          <IoIosAddCircleOutline />
          Add purifier
        </button>
      </div>

      {form.airPurifiers.list.map((item, index) => (
        <div className={styles.group} key={index}>
          <div className={styles.feature}>
            <label
              htmlFor={`airPurifiers-entity-id-${index}`}
              className={styles.item}
            >
              Entity id
            </label>
            <input
              type="text"
              id={`airPurifiers-entity-id-${index}`}
              name={`airPurifiers-entity-id-${index}`}
              className={`${styles.input}`}
              value={item.entity_id}
              onChange={onInputChange('entity_id', index)}
              onBlur={save}
            />
          </div>
          <div className={styles.feature}>
            <label
              htmlFor={`airPurifiers-name-${index}`}
              className={styles.item}
            >
              Name
            </label>
            <input
              type="text"
              id={`airPurifiers-name-${index}`}
              name={`airPurifiers-name-${index}`}
              className={`${styles.input} ${styles.short}`}
              value={item.name}
              onChange={onInputChange('name', index)}
              onBlur={save}
            />
          </div>
          <div className={styles.feature}>
            <label
              htmlFor={`airPurifiers-top-${index}`}
              className={styles.item}
            >
              Top
            </label>
            <input
              type="text"
              id={`liairPurifiersght-top-${index}`}
              name={`airPurifiers-top-${index}`}
              className={`${styles.input} ${styles.short}`}
              value={item.top}
              onChange={onInputChange('top', index)}
              onBlur={save}
            />
          </div>
          <div className={styles.feature}>
            <label
              htmlFor={`airPurifiers-left-${index}`}
              className={styles.item}
            >
              Left
            </label>
            <input
              type="text"
              id={`airPurifiers-left-${index}`}
              name={`airPurifiers-left-${index}`}
              className={`${styles.input} ${styles.short}`}
              value={item.left}
              onChange={onInputChange('left', index)}
              onBlur={save}
            />
          </div>
          <div className={styles.feature}>
            <label
              htmlFor={`airPurifiers-temp-${index}`}
              className={styles.item}
            >
              Temperature entity
            </label>
            <input
              type="text"
              id={`airPurifiers-temp-${index}`}
              name={`airPurifiers-temp-${index}`}
              className={`${styles.input}`}
              value={item.temp}
              onChange={onInputChange('temp', index)}
              onBlur={save}
            />
          </div>
          <div className={styles.feature}>
            <label
              htmlFor={`airPurifiers-humid-${index}`}
              className={styles.item}
            >
              Humidity entity
            </label>
            <input
              type="text"
              id={`airPurifiers-humid-${index}`}
              name={`airPurifiers-humid-${index}`}
              className={`${styles.input}`}
              value={item.humid}
              onChange={onInputChange('humid', index)}
              onBlur={save}
            />
          </div>
          <button
            onClick={() => removePurifier(index)}
            className={styles.button}
          >
            <IoIosRemoveCircleOutline />
            Remove purifier
          </button>
        </div>
      ))}

      <div className={styles.spacer} />
    </>
  )
}
export default AirPurifiers
