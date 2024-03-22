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

interface ICalendar {
  enabled: boolean
}

interface IClock {
  enabled: boolean
}

interface IFloorPlan {
  enabled: boolean
  width: string
  svg: string
}

interface IAirPurifier {
  name: string
  entity_id: string
  preset_modes: string[]
  temp: string
  humid: string
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
}

export interface IConfig {
  homeAssistant: IHomeAssistant
  allergens: IAllergens
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
