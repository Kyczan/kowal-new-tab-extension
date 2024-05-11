import { useEffect, useState } from 'react'
import useSWR from 'swr'

import Rating from './Rating'
import { allergensFetcher } from '../../api/api'
import { useFeature } from '../../store/store'
import { IConfig } from '../../types'

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

interface IAllergensHourlyForecast {
  allergens: number[]
}

interface IAllergensForecasts {
  hourly: IAllergensHourlyForecast[]
}

interface IAllergensData {
  forecasts: IAllergensForecasts
}

interface IAllergen {
  name: string
  value: number
}

const Allergens = () => {
  const { api } = useFeature('allergens') as IConfig['allergens']
  const { baseUrl, cityId } = api || {}
  const { data } = useSWR<IAllergensData>(
    `${baseUrl}${cityId}`,
    allergensFetcher,
  )
  const [allergens, setAllergens] = useState<IAllergen[]>([])

  useEffect(() => {
    const allergenIndexes = data?.forecasts.hourly[0].allergens
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
