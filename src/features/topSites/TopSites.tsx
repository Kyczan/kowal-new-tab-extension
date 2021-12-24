import { useEffect, useState } from 'react'

import { dev } from '../../utils/utils'
import topSitesMockData from './topSitesMock.json'

import styles from './TopSites.module.css'

interface ISitesItem {
  url: string
  title: string
}

const TopSites = () => {
  const [sites, setSites] = useState<ISitesItem[]>([])
  useEffect(() => {
    if (dev) return setSites(topSitesMockData as ISitesItem[])

    chrome.topSites?.get((data: ISitesItem[]) => {
      setSites(data)
    })
  }, [])

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
