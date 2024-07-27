import { RxDot } from 'react-icons/rx'

import styles from './Rating.module.css'

interface IRating {
  val: number
}

const getColor = (val: number) => {
  if (val === 1) return 'fullDot--light'
  if (val > 3) return 'fullDot--heavy'
  return 'fullDot--medium'
}

const Rating = ({ val }: IRating) => {
  const rating: number[] = new Array(4).fill(0)
  const fullDotClass = `${styles.fullDot} ${styles[getColor(val)]}`

  return (
    <div className={styles.rating}>
      {rating.map((_, index) =>
        index < val ? (
          <div key={index} className={fullDotClass} />
        ) : (
          <RxDot key={index} className={styles.emptyDot} />
        ),
      )}
    </div>
  )
}

export default Rating
