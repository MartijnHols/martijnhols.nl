import { ReactElement } from 'react'

/**
 * Replaces a part of a string with a React element. Stops after 1 match.
 */
const reactStringReplace = (
  string: string,
  searchValue: string,
  replaceValue: ReactElement,
) => {
  const reactIndex = string.indexOf(searchValue)
  if (reactIndex === -1) {
    return string
  }

  const before = string.substring(0, reactIndex)
  const after = string.substring(reactIndex + searchValue.length)

  return (
    <>
      {before}
      {replaceValue}
      {after}
    </>
  )
}

export default reactStringReplace
