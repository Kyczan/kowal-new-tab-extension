import { useState } from 'react'
import Modal from 'react-modal'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'
import { IoCloseCircleOutline } from 'react-icons/io5'

import ModalBody from './ModalBody/ModalBody'

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
          <div className={styles.header}>
            <h1 className={styles.title}>Settings</h1>
            <button className={styles.button} onClick={() => setOpen(false)}>
              <IoCloseCircleOutline />
            </button>
          </div>
          <ModalBody />
        </Modal>
      )}
    </div>
  )
}
export default Settings
