export const dev = process.env.NODE_ENV !== 'production'

export const randomItem = <T>(arr: T[]): T => {
  // it uses bitwise operator `| 0` that does nothing,
  // but before operation float is converted to integer
  // and this is much faster than `Math.floor()`
  return arr[(Math.random() * arr.length) | 0]
}
