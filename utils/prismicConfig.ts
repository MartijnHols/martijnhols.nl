import { Client } from '@prismicio/client'
import { KeyTextField, PrismicDocument } from '@prismicio/types'
import { createContext, useContext } from 'react'

/**
 * Config is a Single type in Prismic where non-content strings can be placed
 * for translation. This keeps all l10n in a single system (Prismic).
 */

export type PrismicConfig = PrismicDocument<
  {
    visit: KeyTextField
    sourceCode: KeyTextField
    languageToggle: KeyTextField
    contact: KeyTextField
  },
  'config'
>
export const getPrismicConfig = async (client: Client, locale: string) =>
  (
    await client.getByType<PrismicConfig>('config', {
      lang: locale,
    })
  ).results[0]

const PrismicConfigContext = createContext<PrismicConfig['data'] | undefined>(
  undefined,
)
export const PrismicConfigProvider = PrismicConfigContext.Provider
export const usePrismicConfig = () => {
  const config = useContext(PrismicConfigContext)
  if (!config) {
    throw new Error('Config is not available outside a PrismicConfigProvider')
  }

  return config
}
