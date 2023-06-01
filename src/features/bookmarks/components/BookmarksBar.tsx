import { IBookmarkItem } from '../Bookmarks'

import styles from '../Bookmarks.module.css'

interface IBookmarksBarProps {
  data: IBookmarkItem[]
}

const BookmarksBar = ({ data }: IBookmarksBarProps) => {
  return (
    <div className={styles.bookmarksBar}>
      {data.map((item) => {
        if (item.children) return <button key={item.id}>{item.title}</button>
        else
          return (
            <a key={item.id} href={item.url}>
              {item.title}
            </a>
          )
      })}
    </div>
  )
}

export default BookmarksBar
