import { useEffect, useState } from 'react'
import useSWR from 'swr'

import Rating from './Rating'
import { allergensFetcher } from '../../api/api'

import styles from './Allergens.module.css'

const allergenNames = [
  'Trawy',
  'Bylica',
  'Brzoza',
  'Alternaria',
  'Olcha',
  'Dąb',
  'Komosa',
  'Cladosporium',
  'Babka',
  'Szczaw',
  'Pokrzywa',
  'Leszczyna',
  'Wierzba',
  'Topola',
]

interface IAllergensForecast {
  name: string
  date: string
  allergens: number[]
}

interface IAllergensData {
  forecasts: IAllergensForecast[]
}

interface IAllergen {
  name: string
  value: number
}

const Allergens = () => {
  const { data } = useSWR<IAllergensData>('allergens', allergensFetcher)
  const [allergens, setAllergens] = useState<IAllergen[]>([])

  useEffect(() => {
    const allergenIndexes = data?.forecasts[0].allergens
    if (allergenIndexes) {
      const mapped = allergenIndexes.map((item, index) => ({
        name: allergenNames[index],
        value: item,
      }))
      const filtered = mapped.filter((item) => item.value > 0)
      setAllergens(filtered)
    }
  }, [data])

  return (
    <div className={styles.allergens}>
      {allergens.map(({ name, value }) => (
        <div key={name} className={styles.allergen}>
          {name} <Rating val={value} />
        </div>
      ))}
    </div>
  )
}

export default Allergens
