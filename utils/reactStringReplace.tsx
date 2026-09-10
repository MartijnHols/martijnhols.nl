import { ReactElement } from 'react'

/**
 * Replaces a part of a string with a React element.
 */
const reactStringReplace = (
  string: string,
  replacements: Record<string, ReactElement>,
): ReactElement => {
  const existingKey = Object.keys(replacements).find((key) =>
    string.includes(key),
  )
  if (!existingKey) {
    return <>{string}</>
  }

  const index = string.indexOf(existingKey)
  const before = string.substring(0, index)
  const after = string.substring(index + existingKey.length)

  return (
    <>
      {reactStringReplace(before, replacements)}
      {replacements[existingKey]}
      {reactStringReplace(after, replacements)}
    </>
  )
}

export default reactStringReplace
