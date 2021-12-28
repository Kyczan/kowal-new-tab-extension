import { useEffect, useState } from 'react'

import { useHAStateItems, fetchCalEvents, IHAStateItem } from '../../api/api'
import { getRange, sameDay, formatDate } from '../../utils/utils'

import styles from './Calendar.module.css'

type IEventDate = {
  dateTime: string
  date: string
}

interface IEventOrganizer {
  displayName: string
}

interface IEventItem {
  id: string
  description: string
  end: IEventDate
  organizer: IEventOrganizer
  start: IEventDate
  summary: string
}

interface IAgendaItem {
  day: string
  events: IEventItem[]
}

const { timeMin, timeMax, allDays } = getRange()

const Calendar = () => {
  const { data } = useHAStateItems()
  const [calendars, setCalendars] = useState<IHAStateItem[]>([])
  const [agenda, setAgenda] = useState<IAgendaItem[]>([])

  useEffect(() => {
    if (Array.isArray(data)) {
      const filtered = data.filter((item) =>
        item.entity_id.startsWith('calendar.')
      )
      setCalendars(filtered)
    }
  }, [data])

  useEffect(() => {
    const getAgenda = async () => {
      const requests = calendars.map((item) =>
        fetchCalEvents(item.entity_id, timeMin, timeMax)
      )
      const calData: IEventItem[][] = await Promise.all(requests).then(
        (responses) => Promise.all(responses.map((r) => r.json()))
      )
      const agendaData: IEventItem[] = calData.flat()

      const agendaByDays: IAgendaItem[] = allDays.map((day) => {
        const events = agendaData.filter((event) =>
          sameDay(day, event.start.dateTime || event.start.date)
        )
        events.sort((a, b) => {
          const startA = a.start.dateTime || a.start.date
          const startB = b.start.dateTime || b.start.date
          return startA < startB ? -1 : startA > startB ? 1 : 0
        })
        return { day, events }
      })

      setAgenda(agendaByDays)
    }

    if (calendars.length > 0) {
      getAgenda()
    }
  }, [calendars])

  const getDay = (date: string | Date) => {
    const today = new Date()
    const weekday = formatDate(date, {
      weekday: 'long',
    })

    if (sameDay(today, date)) return `dzisiaj (${weekday})`

    today.setHours(24)
    if (sameDay(today, date)) return `jutro (${weekday})`

    return weekday
  }

  const getTime = (time: string | undefined) => {
    if (time)
      return formatDate(time, {
        timeStyle: 'short',
      })

    return ''
  }

  return (
    <div className={styles.calendar}>
      {agenda.map((item) => (
        <div key={item.day} className={styles['day-container']}>
          <div className={styles.day}>
            <span>{getDay(item.day)}</span>
            <span className={styles.date}>
              {formatDate(item.day, {
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className={`divider ${styles.divider}`} />

          {item.events.map((event) => (
            <div key={event.id} className={styles.event}>
              <span className={styles.time}>
                {getTime(event.start.dateTime)}
              </span>
              <span className={styles.summary}>{event.summary}</span>
              <span className={styles.cal}>
                [{event.organizer.displayName}]
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Calendar
