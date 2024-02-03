import {
  WiWindBeaufort0,
  WiWindBeaufort1,
  WiWindBeaufort2,
  WiWindBeaufort3,
  WiWindBeaufort4,
  WiWindBeaufort5,
  WiWindBeaufort6,
  WiWindBeaufort7,
  WiWindBeaufort8,
  WiWindBeaufort9,
  WiWindBeaufort10,
  WiWindBeaufort11,
  WiWindBeaufort12,
} from 'react-icons/wi'

type BeaufortIconProps = {
  wind: number
}

const BeaufortIcon = ({ wind }: BeaufortIconProps) => {
  // see https://en.wikipedia.org/wiki/Beaufort_scale
  if (wind < 2) return <WiWindBeaufort0 />
  if (wind < 6) return <WiWindBeaufort1 />
  if (wind < 12) return <WiWindBeaufort2 />
  if (wind < 20) return <WiWindBeaufort3 />
  if (wind < 29) return <WiWindBeaufort4 />
  if (wind < 39) return <WiWindBeaufort5 />
  if (wind < 50) return <WiWindBeaufort6 />
  if (wind < 62) return <WiWindBeaufort7 />
  if (wind < 75) return <WiWindBeaufort8 />
  if (wind < 89) return <WiWindBeaufort9 />
  if (wind < 103) return <WiWindBeaufort10 />
  if (wind < 118) return <WiWindBeaufort11 />

  return <WiWindBeaufort12 />
}

export default BeaufortIcon
