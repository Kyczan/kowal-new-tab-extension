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
            <span>{item.buy} zł</span>
            <span>{item.sell} zł</span>
          </div>
        </div>
      ))}

      {euro && (
        <div className={styles.stock}>
          {euro.name}
          <div className={styles.prices}>
            <span>{euro.buy} zł</span>
            <span>{euro.sell} zł</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Stocks
