import { useGoldPrice } from '../../api/hooks'

import styles from './Stocks.module.css'

const Stocks = () => {
  const { gold, euro } = useGoldPrice()

  return (
    <div className={styles.stocks}>
      <div className={styles.stock}>
        Złoto <span>{gold} zł</span>
      </div>
      <div className={styles.stock}>
        Euro <span>{euro} zł</span>
      </div>
    </div>
  )
}

export default Stocks
