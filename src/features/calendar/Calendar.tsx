import { CSSProperties, useEffect, useState } from 'react'

import { fetchCalEvents, IHAStateItem } from '../../api/api'
import { useHAStateItems } from '../../api/hooks'
import { getRange, sameDay, formatDate, extractColor } from '../../utils/utils'
import { useFeature } from '../../store/store'
import { IConfig } from '../../types'

import styles from './Calendar.module.css'

interface IEventDate {
  dateTime: string
  date: string
}

interface IEventItem {
  id: string
  end: IEventDate
  start: IEventDate
  summary: string
  color: string
}

interface IAgendaItem {
  day: string
  events: IEventItem[]
}

const { timeMin, timeMax, allDays } = getRange()
const storageKey = {
  AGENDA: 'agenda',
}

const Calendar = () => {
  const ha = useFeature('homeAssistant') as IConfig['homeAssistant']
  const { haToken, haUrl } = ha || {}
  const localAgenda = JSON.parse(
    localStorage.getItem(storageKey.AGENDA) || '[]',
  )
  const { data } = useHAStateItems()
  const [calendars, setCalendars] = useState<IHAStateItem[]>([])
  const [agenda, setAgenda] = useState<IAgendaItem[]>(localAgenda)

  useEffect(() => {
    if (Array.isArray(data)) {
      const filtered = data.filter((item) =>
        item.entity_id.startsWith('calendar.'),
      )
      setCalendars(filtered)
    }
  }, [data])

  useEffect(() => {
    const getAgenda = async () => {
      const requests = calendars.map((item) =>
        fetchCalEvents(item.entity_id, timeMin, timeMax, haToken, haUrl),
      )
      const calData: IEventItem[][] = await Promise.all(requests).then(
        (responses) => Promise.all(responses.map((r) => r.json())),
      )
      calendars.forEach((item, i) => {
        const color = extractColor(item.entity_id)
        // mutate object to add info about calendar color
        calData[i].forEach((calEvent) => {
          calEvent.color = color
        })
      })

      const agendaData: IEventItem[] = calData.flat()

      const agendaByDays: IAgendaItem[] = allDays.map((day) => {
        const events = agendaData.filter((event) =>
          sameDay(day, event.start.dateTime || event.start.date),
        )
        events.sort((a, b) => {
          const startA = a.start.dateTime || a.start.date
          const startB = b.start.dateTime || b.start.date
          return startA < startB ? -1 : startA > startB ? 1 : 0
        })
        return { day, events }
      })

      setAgenda(agendaByDays)
      localStorage.setItem(storageKey.AGENDA, JSON.stringify(agendaByDays))
    }

    if (calendars.length > 0) {
      getAgenda()
    }
  }, [calendars, haToken, haUrl])

  const getTime = (time: string | undefined, day: string) => {
    if (time)
      return formatDate(time, {
        timeStyle: 'short',
      })

    const weekday = formatDate(day, {
      weekday: 'long',
    })
    const lastChar = weekday[weekday.length - 1]

    return 'cał' + (lastChar === 'a' ? 'a' : 'y')
  }

  const getCalStyle = (color: string) => {
    return {
      '--cal-color': color,
    } as CSSProperties
  }

  return (
    <div className={styles.calendar}>
      {agenda.map((item) => (
        <div key={item.day} className={styles['day-container']}>
          <div className={styles.day}>
            {formatDate(item.day, {
              weekday: 'long',
            })}
          </div>

          {item.events.map((event) => (
            <div
              key={event.id}
              className={styles.event}
              style={getCalStyle(event.color)}
            >
              <span className={styles.time}>
                {getTime(event.start.dateTime, item.day)}
              </span>
              <span className={styles.summary}>{event.summary}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Calendar
