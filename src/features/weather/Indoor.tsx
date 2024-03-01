import { GoHome } from 'react-icons/go'

import { useIndoorData } from '../../api/hooks'

import styles from './Weather.module.css'

const Indoor = () => {
  const data = useIndoorData()

  return (
    <>
      {data.map(({ temp, humid, name }, index) =>
        temp || humid ? (
          <div className={styles.info} key={index}>
            <div className={styles.infoElement}>
              <span className={styles.infoUnit}>{name}:</span>
            </div>
            {temp && (
              <div className={styles.infoElement} title="Home temperature">
                {temp}
                <span className={styles.infoUnit}>°C</span>
              </div>
            )}
            {humid && (
              <div className={styles.infoElement} title="Home humidity">
                {(+humid).toFixed(0)}
                <span className={styles.infoUnit}>%</span>
              </div>
            )}
            <div className={styles.infoIcon} title="Home">
              <GoHome />
            </div>
          </div>
        ) : null,
      )}
    </>
  )
}

export default Indoor
