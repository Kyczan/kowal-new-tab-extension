export const switchesStateFetcher = (url: string) =>
  fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${process.env.REACT_APP_HA_TOKEN}`,
      'Content-Type': 'application/json',
    }),
    // mode: 'cors',
  }).then((response) => response.json())

export const toggleSwitch = async (entity_id: string) => {
  try {
    await fetch(`${process.env.REACT_APP_HA_URL}/api/services/switch/toggle`, {
      method: 'post',
      headers: new Headers({
        Authorization: `Bearer ${process.env.REACT_APP_HA_TOKEN}`,
        'Content-Type': 'application/json',
      }),
      // mode: 'cors',
      body: JSON.stringify({
        entity_id,
      }),
    })
  } catch (e) {
    console.log(e)
  }
}
