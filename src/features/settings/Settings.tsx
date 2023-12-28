import { useState } from 'react'
import Modal from 'react-modal'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'

import styles from './Settings.module.css'

Modal.setAppElement('#root')

function Settings() {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.settings}>
      <button className={styles.button} onClick={() => setOpen(true)}>
        <HiOutlineCog6Tooth />
      </button>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <h1>Settings</h1>
        </Modal>
      )}
    </div>
  )
}
export default Settings
