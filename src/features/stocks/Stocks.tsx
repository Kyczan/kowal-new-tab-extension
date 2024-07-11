import { useGoldPrice } from '../../api/hooks'

import styles from './Stocks.module.css'

const Stocks = () => {
  const { gold, euro } = useGoldPrice()

  return (
    <div className={styles.stocks}>
      {gold?.map((item) => (
        <div className={styles.stock}>
          {item.name}
          <div className={styles.prices}>
            <span>
              {item.buy} <span className={styles.infoUnit}>zł</span>
            </span>
            <span>
              {item.sell} <span className={styles.infoUnit}>zł</span>
            </span>
          </div>
        </div>
      ))}

      {euro && (
        <div className={styles.stock}>
          {euro.name}
          <div className={styles.prices}>
            <span>
              {euro.buy} <span className={styles.infoUnit}>zł</span>
            </span>
            <span>
              {euro.sell} <span className={styles.infoUnit}>zł</span>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Stocks
