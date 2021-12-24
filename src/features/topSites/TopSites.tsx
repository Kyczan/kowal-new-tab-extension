import { useEffect, useState } from 'react'

import styles from './TopSites.module.css'

interface ISitesItem {
  url: string
  title: string
}

const devData: ISitesItem[] = [
  { url: 'https://google.com/#1', title: 'Google' },
  { url: 'https://google.com/#2', title: 'Google' },
  { url: 'https://google.com/#3', title: 'Google' },
  { url: 'https://google.com/#4', title: 'Google' },
  { url: 'https://google.com/#5', title: 'Google' },
  { url: 'https://google.com/#6', title: 'Google' },
  { url: 'https://google.com/#7', title: 'Google' },
  { url: 'https://google.com/#8', title: 'Google' },
  { url: 'https://google.com/#9', title: 'Google' },
  { url: 'https://google.com/#10', title: 'Google' },
  { url: 'https://google.com/#11', title: 'Google' },
  { url: 'https://google.com/#12', title: 'Google' },
]

const TopSites = () => {
  const dev = process.env.NODE_ENV !== 'production'
  const [sites, setSites] = useState<ISitesItem[]>([])
  useEffect(() => {
    if (dev) return setSites(devData)

    chrome.topSites?.get((data: ISitesItem[]) => {
      setSites(data)
    })
  }, [dev])

  const getFavicon = (url: ISitesItem['url']): string => {
    if (dev) return 'https://via.placeholder.com/64'

    return `chrome://favicon/size/64@1x/${url}`
  }

  return (
    <div className={styles.container}>
      {sites.map((item) => (
        <a
          key={item.url}
          href={item.url}
          className={styles.link}
          title={item.title}
        >
          <img
            className={styles.img}
            src={getFavicon(item.url)}
            alt={item.title}
          />
          <p className={styles.title}>{item.title}</p>
        </a>
      ))}
    </div>
  )
}

export default TopSites
