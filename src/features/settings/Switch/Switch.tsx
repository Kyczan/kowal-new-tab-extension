import styles from './Switch.module.css'

type SwitchProps = {
  isOn: boolean
  onChange: () => void
  id: string
}

function Switch({ isOn, onChange, id }: SwitchProps) {
  return (
    <div>
      <input
        checked={isOn}
        onChange={onChange}
        className={styles.checkbox}
        id={id}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? '#7bb342' : undefined }}
        className={styles.label}
        htmlFor={id}
      >
        <span className={styles.button} />
      </label>
    </div>
  )
}

export default Switch
