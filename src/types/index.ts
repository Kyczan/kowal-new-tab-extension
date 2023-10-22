export enum LightType {
  BULB = 'bulb',
  LAMP = 'lamp',
}

interface IHomeAssistant {
  haUrl: string
  haToken: string
}

interface IAirPurifier {
  enabled: boolean
}

interface IAllergens {
  enabled: boolean
  api: {
    baseUrl: string
    cityId: string
  }
}

interface IBookmarks {
  enabled: boolean
}

interface ICalendar {
  enabled: boolean
}

interface IClock {
  enabled: boolean
}

interface ILight {
  name: string
  entity_id: string
  type: LightType
  top: string
  left: string
}

interface IFloorPlan {
  enabled: boolean
  width: string
  lights: ILight[]
}

interface ITopSites {
  enabled: boolean
}

interface IWallpapers {
  list: string[]
}

interface IWeather {
  enabled: boolean
  api: {
    baseUrl: string
    lang: string
    units: string
    cityId: string
    key: string
  }
}

export interface IConfig {
  homeAssistant: IHomeAssistant
  airPurifier: IAirPurifier
  allergens: IAllergens
  bookmarks: IBookmarks
  calendar: ICalendar
  clock: IClock
  floorPlan: IFloorPlan
  topSites: ITopSites
  weather: IWeather
  wallpapers: IWallpapers
}

export type IFeatures = keyof IConfig
