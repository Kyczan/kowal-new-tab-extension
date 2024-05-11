import { create } from 'zustand'

import { IConfig, IFeatures } from '../types'
import { initialConfig } from './initialConfig'

const STORAGE_KEY = 'newTabConfig'

type ConfigStore = {
  status: 'idle' | 'loading' | 'success' | 'error'
  config?: IConfig
  actions: {
    fetchConfig: () => void
    updateConfig: (config: IConfig) => void
  }
}

const useConfigStore = create<ConfigStore>()((set) => ({
  status: 'idle',
  config: undefined,
  actions: {
    fetchConfig: async () => {
      try {
        set({ status: 'loading' })
        const result = await chrome.storage?.local?.get([STORAGE_KEY])
        const config = result?.[STORAGE_KEY] || initialConfig

        if (!result?.[STORAGE_KEY]) {
          // first ever reading store or in dev mode
          await chrome.storage?.local?.set({ [STORAGE_KEY]: initialConfig })
        }

        set({ config, status: 'success' })
      } catch (e) {
        console.log('Error during reading chrome store: ' + e)
        set({ status: 'error' })
      }
    },
    updateConfig: async (config) => {
      try {
        set({ status: 'loading' })
        await chrome.storage?.local?.set({ [STORAGE_KEY]: config })
        set({ config, status: 'success' })
      } catch (e) {
        console.log('Error during writing chrome store: ' + e)
        set({ status: 'error' })
      }
    },
  },
}))

export const useConfig = () => useConfigStore((state) => state.config)
export const useFeature = (feature: IFeatures) =>
  useConfigStore((state) => state.config?.[feature])
export const useStatus = () => useConfigStore((state) => state.status)
export const useConfigActions = () => useConfigStore((state) => state.actions)
