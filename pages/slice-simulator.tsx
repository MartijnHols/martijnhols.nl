import { SliceZone } from '@prismicio/react'
import { SliceSimulator } from '@prismicio/slice-simulator-react'
import getConfig from 'next/config'
import { useEffect, useState } from 'react'

import state from '../.slicemachine/libraries-state.json'
import { components } from '../slices'
import { toPrismicLocale } from '../utils/locales'
import { createClient } from '../utils/prismic'
import {
  getPrismicConfig,
  PrismicConfig,
  PrismicConfigProvider,
} from '../utils/prismicConfig'

const { publicRuntimeConfig } = getConfig()

const SliceSimulatorPage = () => {
  const [config, setConfig] = useState<PrismicConfig['data'] | undefined>(
    undefined,
  )
  useEffect(() => {
    ;(async () => {
      const prismicClient = createClient()
      const config = await getPrismicConfig(
        prismicClient,
        toPrismicLocale(publicRuntimeConfig.defaultUserLocale),
      )

      setConfig(config.data)
    })()
  }, [])

  if (!config) {
    return null
  }

  return (
    <PrismicConfigProvider value={config}>
      <SliceSimulator
        sliceZone={(props) => (
          <SliceZone
            {...props}
            // Typing this is hard, any it doesn't really matter so long as the SliceZone in [slug].tsx is valid
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            components={components as any}
          />
        )}
        state={state}
      />
    </PrismicConfigProvider>
  )
}

export default SliceSimulatorPage
