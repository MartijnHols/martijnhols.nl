import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const toPrismicLocale = (userLocale: string) => {
  const match = Object.keys(publicRuntimeConfig.prismicLocaleMap).find(
    (prismicLocale) =>
      publicRuntimeConfig.prismicLocaleMap[prismicLocale] === userLocale,
  )

  return match || userLocale
}
export const toUserLocale = (prismicLocale: string) =>
  publicRuntimeConfig.prismicLocaleMap[prismicLocale]
