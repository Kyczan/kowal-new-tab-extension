export enum LightType {
  BULB = 'bulb',
  LAMP = 'lamp',
}

interface IHomeAssistant {
  haUrl: string
  haToken: string
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

interface IFloorPlan {
  enabled: boolean
  width: string
}

interface IAirPurifier {
  name: string
  main_entity_id: string
  fan_level_entity_id: string
  top: string
  left: string
}

interface IAirPurifiers {
  enabled: boolean
  list: IAirPurifier[]
}

interface ILight {
  name: string
  entity_id: string
  type: LightType
  top: string
  left: string
}

interface ILights {
  enabled: boolean
  list: ILight[]
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
  allergens: IAllergens
  bookmarks: IBookmarks
  calendar: ICalendar
  clock: IClock
  floorPlan: IFloorPlan
  airPurifiers: IAirPurifiers
  lights: ILights
  topSites: ITopSites
  weather: IWeather
  wallpapers: IWallpapers
}

export type IFeatures = keyof IConfig
