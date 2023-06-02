import { IBookmarkItem } from '../Bookmarks'
import MenuItem from './MenuItem'

import styles from '../Bookmarks.module.css'

interface IDropdownProps {
  submenu: IBookmarkItem[]
  depthLevel: number
}

const Dropdown = ({ submenu, depthLevel }: IDropdownProps) => {
  const classes =
    depthLevel > 0
      ? `${styles.dropdown} ${styles.dropdownSubmenu}`
      : styles.dropdown
  return (
    <ul className={classes}>
      {submenu.map((item) => (
        <MenuItem item={item} key={item.id} depthLevel={depthLevel + 1} />
      ))}
    </ul>
  )
}

export default Dropdown
