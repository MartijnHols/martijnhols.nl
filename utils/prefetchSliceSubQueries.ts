import { Client as PrismicClient, SharedSlice } from '@prismicio/client'
import { FunctionComponent } from 'react'
import { QueryClient } from 'react-query'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PrefetchContext<TSlice = SharedSlice<any, any>> {
  prismicClient: PrismicClient
  queryClient: QueryClient
  prismicLocale: string
  slice: TSlice
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrefetchableSliceComponent = FunctionComponent<any> & {
  prefetch?: (context: PrefetchContext) => Promise<void>
}

/**
 * We need to prefetch data needed by slices. We need to do this in
 * `getStaticProps` in order for this data to be present during SSG. We use
 * react-query to achieve this relatively cleanly.
 * Each slice component can have an optional `prefetch` prop that preloads
 * the data as required by that component. The component itself can use a
 * normal (react-query) hook to load data. This way it works both when
 * prehydrated as well as lazily.
 */
const prefetchSliceSubQueries = async ({
  prismicClient,
  prismicLocale,
  queryClient,
  slices,
  components,
}: {
  prismicClient: PrismicClient
  prismicLocale: string
  queryClient: QueryClient
  slices: SharedSlice[]
  components: Record<string, PrefetchableSliceComponent>
}) => {
  // We don't need to store any return data as it's put in the QueryClient's
  // cache.
  await Promise.all(
    slices.map(async (slice) => {
      const component = components[slice.slice_type]
      if (!('prefetch' in component)) {
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await component.prefetch!({
        prismicClient,
        queryClient,
        prismicLocale,
        slice,
      })
    }),
  )
}

export default prefetchSliceSubQueries
