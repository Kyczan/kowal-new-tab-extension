import useSWR from 'swr'

interface IHAAttributes {
  friendly_name: string
}

export interface IHAStateItem {
  entity_id: string
  state: 'on' | 'off' | 'unavailable'
  attributes: IHAAttributes
}

export const useHAStateItems = () => {
  const { data, error, mutate } = useSWR<IHAStateItem[]>(
    `/api/states`,
    haFetcher
  )

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export const haFetcher = (url: string) =>
  fetch(`${process.env.REACT_APP_HA_URL}${url}`, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${process.env.REACT_APP_HA_TOKEN}`,
      'Content-Type': 'application/json',
    }),
  }).then((response) => response.json())

export const fetchCalEvents = (
  calId: string,
  timeMin: string,
  timeMax: string
) =>
  fetch(
    `${process.env.REACT_APP_HA_URL}/api/calendars/${calId}?start=${timeMin}&end=${timeMax}`,
    {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${process.env.REACT_APP_HA_TOKEN}`,
        'Content-Type': 'application/json',
      }),
    }
  )

export const toggleSwitch = async (entity_id: string) => {
  try {
    await fetch(`${process.env.REACT_APP_HA_URL}/api/services/switch/toggle`, {
      method: 'post',
      headers: new Headers({
        Authorization: `Bearer ${process.env.REACT_APP_HA_TOKEN}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        entity_id,
      }),
    })
  } catch (e) {
    console.log(e)
  }
}
