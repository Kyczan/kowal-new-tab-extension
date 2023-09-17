import BookmarksBar from './components/BookmarksBar'
import { useBookmarks } from '../../api/hooks'

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
  const bookmarks = useBookmarks()

  return (
    <nav className={styles.bookmarks}>
      <BookmarksBar data={bookmarks} />
    </nav>
  )
}

export default Bookmarks
