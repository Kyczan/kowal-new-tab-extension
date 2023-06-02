import { useEffect, useState } from 'react'

import { dev, getFavicon } from '../../utils/utils'
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

  return (
    <div className={styles.sites}>
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
        </a>
      ))}
    </div>
  )
}

export default TopSites
