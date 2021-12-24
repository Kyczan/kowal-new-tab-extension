export const dev = process.env.NODE_ENV !== 'production'

const randomNumber = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getWallpaperUrl = () => {
  const NUMBER_OF_PHOTOS = 8

  const nr = randomNumber(1, NUMBER_OF_PHOTOS)
  const prefix = dev ? './' : '../../'

  return `url("${prefix}wallpapers/${nr}.webp")`
}
