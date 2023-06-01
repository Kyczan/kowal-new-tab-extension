import { useEffect, useState } from 'react'

import BookmarksBar from './components/BookmarksBar'
import { dev } from '../../utils/utils'
import bookmarksMock from './bookmarksMock.json'

import styles from './Bookmarks.module.css'

export interface IBookmarkItem {
  id: string
  title: string
  url?: string
  index?: number
  parentId?: string
  children?: IBookmarkItem[]
}

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<IBookmarkItem[]>([])

  useEffect(() => {
    const runEffect = async () => {
      const data: IBookmarkItem[] = dev
        ? bookmarksMock
        : await chrome.bookmarks?.getTree()

      const bookmarksBarData = data?.[0]?.children?.[0]?.children || []
      setBookmarks(bookmarksBarData)
    }

    runEffect()
  }, [])

  const renderTree = (data: IBookmarkItem[]): JSX.Element => (
    <>
      {data.map((item) => {
        if (!item.children) {
          return (
            <>
              <a href={item.url}>{item.title}</a>
              <br />
            </>
          )
        } else {
          return (
            <>
              {item.title} <br />
              {renderTree(item.children)}
            </>
          )
        }
      })}
    </>
  )

  return (
    <div className={styles.bookmarks}>
      <BookmarksBar data={bookmarks} />
    </div>
  )
}

export default Bookmarks
