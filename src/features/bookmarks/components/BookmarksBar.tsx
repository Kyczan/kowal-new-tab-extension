import { IBookmarkItem } from '../Bookmarks'
import MenuItem from './MenuItem'

import styles from '../Bookmarks.module.css'

interface IBookmarksBarProps {
  data: IBookmarkItem[]
}

const BookmarksBar = ({ data }: IBookmarksBarProps) => {
  return (
    <ul className={styles.bookmarksBar}>
      {data.map((item) => (
        <MenuItem item={item} key={item.id} depthLevel={0} />
      ))}
    </ul>
  )
}

export default BookmarksBar
