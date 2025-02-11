/**
 * Remove props with undefined value from an object. Useful when JSON.encode-ing
 * an object.
 */
const stripUndefined = <T extends Record<string, unknown>>(obj: T): T => {
  // Source: https://stackoverflow.com/a/38340374/684353
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete obj[key]
    }
  })
  return obj
}

export default stripUndefined
