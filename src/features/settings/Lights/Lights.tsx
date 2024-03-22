import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io'

import { IConfig } from '../../../types'
import Switch from '../Switch/Switch'
import { useConfigActions } from '../../../store/store'

import styles from '../ModalBody/ModalBody.module.css'

type LightsProps = {
  form: IConfig
  setForm: (form: IConfig) => void
  save: () => void
  toggleFeature: (type: 'lights') => void
}

function Lights({ form, setForm, save, toggleFeature }: LightsProps) {
  const { updateConfig } = useConfigActions()
  const onInputChange =
    (target: 'name' | 'entity_id' | 'top' | 'left', index: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (form) {
        const clonedForm = structuredClone(form)
        clonedForm.lights.list[index][target] = e.target.value
        setForm(clonedForm)
      }
    }

  const addLight = () => {
    if (form) {
      const clonedForm = structuredClone(form)
      clonedForm.lights.list.push({
        name: 'new light',
        entity_id: 'some_entity',
        top: '50%',
        left: '50%',
      })
      setForm(clonedForm)
      updateConfig(clonedForm)
    }
  }

  const removeLight = (index: number) => {
    if (form) {
      const clonedForm = structuredClone(form)
      clonedForm.lights.list.splice(index, 1)
      setForm(clonedForm)
      updateConfig(clonedForm)
    }
  }

  return (
    <>
      <div className={styles.feature}>
        <div className={styles.item}>
          Lights ({form?.lights?.list?.length || 0})
        </div>
        <Switch
          isOn={form.lights.enabled}
          onChange={() => toggleFeature('lights')}
          id="lights"
        />
        <button onClick={addLight} className={styles.button}>
          <IoIosAddCircleOutline />
          Add switch
        </button>
      </div>

      {form.lights.list.map((item, index) => (
        <div className={styles.group} key={index}>
          <div className={styles.feature}>
            <label htmlFor={`light-entity-id-${index}`} className={styles.item}>
              Entity id
            </label>
            <input
              type="text"
              id={`light-entity-id-${index}`}
              name={`light-entity-id-${index}`}
              className={`${styles.input}`}
              value={item.entity_id}
              onChange={onInputChange('entity_id', index)}
              onBlur={save}
            />
          </div>
          <div className={styles.feature}>
            <label htmlFor={`light-name-${index}`} className={styles.item}>
              Name
            </label>
            <input
              type="text"
              id={`light-name-${index}`}
              name={`light-name-${index}`}
              className={`${styles.input} ${styles.short}`}
              value={item.name}
              onChange={onInputChange('name', index)}
              onBlur={save}
            />
          </div>
          <div className={styles.feature}>
            <label htmlFor={`light-top-${index}`} className={styles.item}>
              Top
            </label>
            <input
              type="text"
              id={`light-top-${index}`}
              name={`light-top-${index}`}
              className={`${styles.input} ${styles.short}`}
              value={item.top}
              onChange={onInputChange('top', index)}
              onBlur={save}
            />
          </div>
          <div className={styles.feature}>
            <label htmlFor={`light-left-${index}`} className={styles.item}>
              Left
            </label>
            <input
              type="text"
              id={`light-left-${index}`}
              name={`light-left-${index}`}
              className={`${styles.input} ${styles.short}`}
              value={item.left}
              onChange={onInputChange('left', index)}
              onBlur={save}
            />
          </div>
          <button onClick={() => removeLight(index)} className={styles.button}>
            <IoIosRemoveCircleOutline />
            Remove switch
          </button>
        </div>
      ))}

      <div className={styles.spacer} />
    </>
  )
}
export default Lights
