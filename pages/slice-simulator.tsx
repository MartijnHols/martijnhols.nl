import { Content } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import { SliceSimulator } from '@prismicio/slice-simulator-react'
import { useEffect, useState } from 'react'
import state from '../.slicemachine/libraries-state.json'
import { components } from '../slices'
import { toPrismicLocale } from '../utils/locales'
import { createClient } from '../utils/prismic'
import { getPrismicConfig, PrismicConfigProvider } from '../utils/prismicConfig'

const SliceSimulatorPage = () => {
  const [config, setConfig] = useState<
    Content.ConfigDocument['data'] | undefined
  >(undefined)
  useEffect(() => {
    ;(async () => {
      const prismicClient = createClient()
      const config = await getPrismicConfig(
        prismicClient,
        toPrismicLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE),
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
