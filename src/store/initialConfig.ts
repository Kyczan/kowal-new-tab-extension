export const initialConfig = {
  homeAssistant: {
    haUrl: 'http://homeassistant.local:8123',
    haToken: 'yourToken',
  },
  allergens: {
    enabled: true,
    api: {
      baseUrl:
        'https://data.twojapogoda.pl/forecasts/themed/allergies/default/',
      cityId: '2517',
    },
  },
  calendar: {
    enabled: false,
  },
  clock: {
    enabled: true,
  },
  floorPlan: {
    enabled: false,
    width: '340px',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="447.107" height="370.389" viewBox="0 0 118.297 97.999">
  <g>
    <path d="m50.28 105.458 109.048.147-.127 95.748-116.067-.156.127-95.74 7.018.01z" style="fill:none;stroke:#d3d3d3;stroke-width:2.1;stroke-dasharray:none" transform="translate(-42.082 -104.406)"/>
    <path d="M63.439 193.08v7.984H43.322V179.19H63.44v3.533M70.795 166.302v12.823h-27.46v-35.987h27.46v12.808" style="fill:none;stroke:#d3d3d3;stroke-width:1.5;stroke-dasharray:none" transform="translate(-42.082 -104.406)"/>
    <path d="M74.759 143.2H43.445v-37.475h45.461V143.2h-3.288M88.915 146.252v-40.475h70.023v54.45H88.915v-3.62M88.926 163.61v-3.354h70.001v41.055h-70v-27.346" style="fill:none;stroke:#d3d3d3;stroke-width:1.5;stroke-dasharray:none" transform="translate(-42.082 -104.406)"/>
  </g>
  <path d="M88.312 146.086h1.202v10.731h-1.202z" style="fill:none;stroke:#d3d3d3;stroke-width:.3;stroke-dasharray:none" transform="translate(-42.082 -104.406)"/>
  <path d="M-143.802 74.862h1.202v10.731h-1.202z" style="fill:none;stroke:#d3d3d3;stroke-width:.3;stroke-dasharray:none" transform="rotate(-90 -73.244 -31.162)"/>
  <path d="M70.19 155.728h1.208v10.73H70.19zM88.326 163.425h1.202v10.731h-1.202zM62.844 182.53h1.192v10.732h-1.192z" style="fill:none;stroke:#d3d3d3;stroke-width:.3;stroke-dasharray:none" transform="translate(-42.082 -104.406)"/>
</svg>`,
  },
  airPurifiers: {
    enabled: false,
    list: [
      {
        name: 'Xiaomi 3H',
        entity_id: 'fan.mi_air_purifier_3_3h',
        preset_modes: ['Auto', 'Silent', 'Favorite', 'Fan'].join(','),
        temp: 'sensor.mi_air_purifier_3_3h_temperature',
        humid: 'sensor.mi_air_purifier_3_3h_humidity',
        top: '23%',
        left: '82%',
      },
      {
        name: 'Xiaomi 4',
        entity_id: 'fan.zhimi_mb5a_2808_air_purifier',
        preset_modes: ['Auto', 'Sleep', 'Favorite', 'Manual'].join(','),
        temp: 'sensor.zhimi_mb5a_2808_temperature',
        humid: 'sensor.zhimi_mb5a_2808_relative_humidity',
        top: '82%',
        left: '71%',
      },
    ],
  },
  lights: {
    enabled: false,
    list: [
      {
        name: 'bedroom',
        entity_id: 'switch.sonoff_10003b5dcc',
        top: '73%',
        left: '65%',
      },
      {
        name: 'bedroomLamp',
        entity_id: 'switch.sonoff_10005f10dd',
        top: '58%',
        left: '52%',
      },
    ],
  },
  topSites: {
    enabled: true,
  },
  weather: {
    enabled: false,
  },
  wallpapers: {
    list: [
      '1-chris-kursikowski-unsplash.webp',
      '2-geran-de-klerk-unsplash.webp',
      '3-ivan-bandura-unsplash.webp',
      '4-mauro-lima-unsplash.webp',
      '5-max-okhrimenko-unsplash.webp',
      '6-vitalii-khodzinskyi-unsplash.webp',
      '7-wolfgang-hasselmann-unsplash.webp',
    ],
  },
}
