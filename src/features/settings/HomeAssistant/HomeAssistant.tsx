import { IConfig } from '../../../types'

import styles from '../ModalBody/ModalBody.module.css'

type HomeAssistantProps = {
  form: IConfig
  setForm: (form: IConfig) => void
  save: () => void
}

function HomeAssistant({ form, setForm, save }: HomeAssistantProps) {
  const onHomeAssistantInputChange =
    (target: 'haUrl' | 'haToken') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (form) {
        const clonedForm = structuredClone(form)
        clonedForm.homeAssistant[target] = e.target.value
        setForm(clonedForm)
      }
    }
  return (
    <>
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
    </>
  )
}
export default HomeAssistant
