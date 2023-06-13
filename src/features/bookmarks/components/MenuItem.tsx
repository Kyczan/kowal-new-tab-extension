import { useState, useEffect, useRef } from 'react'
import { FaFolder } from 'react-icons/fa'

import { IBookmarkItem } from '../Bookmarks'
import Dropdown from './Dropdown'
import { getFavicon } from '../../../utils/utils'

import styles from '../Bookmarks.module.css'

export enum DropdownState {
  OPENED = 'opened',
  CLOSED = 'closed',
}

interface IMenuItemProps {
  item: IBookmarkItem
  depthLevel: number
}

const MenuItem = ({ item, depthLevel }: IMenuItemProps) => {
  const btnClass =
    depthLevel > 0 ? `${styles.btn} ${styles.btnSubmenu}` : styles.btn
  const ref = useRef<HTMLLIElement>(null)
  const [dropdownState, setDropdownState] = useState<DropdownState>(
    DropdownState.CLOSED
  )

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownState === DropdownState.OPENED &&
        ref.current &&
        !ref.current?.contains(event.target as HTMLLIElement)
      ) {
        setDropdownState(DropdownState.CLOSED)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [dropdownState, ref])

  const handleButtonClick = () => {
    setDropdownState((state) =>
      state === DropdownState.CLOSED
        ? DropdownState.OPENED
        : DropdownState.CLOSED
    )
  }

  return (
    <li className={styles.menuItem} ref={ref}>
      {item.children && (
        <>
          <button
            type="button"
            key={item.id}
            onClick={handleButtonClick}
            className={btnClass}
          >
            <FaFolder /> {item.title}
          </button>
          {dropdownState === DropdownState.OPENED && (
            <Dropdown submenu={item.children} depthLevel={depthLevel} />
          )}
        </>
      )}

      {item.url && (
        <a key={item.id} href={item.url}>
          <img className={styles.img} src={getFavicon(item.url, 32)} alt="" />{' '}
          <span>{item.title}</span>
        </a>
      )}
    </li>
  )
}

export default MenuItem
