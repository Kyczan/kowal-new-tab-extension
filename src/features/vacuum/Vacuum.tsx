import { TbVacuumCleaner } from 'react-icons/tb'

import styles from './Vacuum.module.css'

interface IVacuum {
  className?: string
}

const Vacuum = ({ className = '' }: IVacuum) => {
  return (
    <div className={`${styles.vacuum} ${className}`}>
      <TbVacuumCleaner />
    </div>
  )
}

export default Vacuum
