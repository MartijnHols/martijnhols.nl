import { Client as PrismicClient } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import { GetStaticProps, PreviewData } from 'next'
import getConfig from 'next/config'
import { dehydrate, QueryClient, DehydratedState } from 'react-query'

import BaseHead from '../components/BaseHead'
import HrefLangHead from '../components/HrefLangHead'
import PageWrapper from '../components/PageWrapper'
import PrismicProvider from '../components/PrismicProvider'
import { components } from '../slices'
import { PrismicFileDownloadSlice } from '../slices/FileDownload'
import absoluteUrl from '../utils/absoluteUrl'
import convertPrismicImage from '../utils/convertPrismicImage'
import { toPrismicLocale, toUserLocale } from '../utils/locales'
import prefetchSliceSubQueries from '../utils/prefetchSliceSubQueries'
import { createClient, getByUid, getPages, PrismicPage } from '../utils/prismic'
import {
  getPrismicConfig,
  PrismicConfig,
  PrismicConfigProvider,
} from '../utils/prismicConfig'
import prismicLinkResolver from '../utils/prismicLinkResolver'
import stripUndefined from '../utils/stripUndefined'

export const getStaticPaths = async () => {
  const client = createClient()
  const pages = await getPages(client)

  return {
    paths: pages
      .filter((page) => {
        const fileDownloadSlice = page.data.slices.find(
          (slice): slice is PrismicFileDownloadSlice =>
            slice.slice_type === 'file_download',
        )
        const isFileDownload =
          fileDownloadSlice && 'url' in fileDownloadSlice.primary.file

        return !isFileDownload
      })
      .map((page) => ({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        params: { slug: page.uid! },
        locale: toUserLocale(page.lang),
      })),
    fallback: 'blocking',
  }
}

const getCmsPage = async (
  prismicClient: PrismicClient,
  slug: string,
  locale: string,
  queryClient: QueryClient,
) => {
  const page = await getByUid<PrismicPage>(prismicClient, 'page', slug, locale)
  if (!page) {
    return
  }

  await prefetchSliceSubQueries({
    prismicClient,
    prismicLocale: locale,
    queryClient,
    slices: page.data.slices,
    components,
  })

  return page
}

const { serverRuntimeConfig } = getConfig()

interface StaticProps {
  config: PrismicConfig['data']
  page: PrismicPage
  previewData?: PreviewData
  dehydratedState: DehydratedState
}

export const getStaticProps: GetStaticProps<
  StaticProps,
  { slug: string }
> = async ({ previewData, params, locale }) => {
  const prismicClient = createClient({ previewData })
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const prismicLocale = toPrismicLocale(locale!)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  })

  const [config, page] = await Promise.all([
    getPrismicConfig(prismicClient, prismicLocale),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    getCmsPage(prismicClient, params!.slug, prismicLocale, queryClient),
  ])

  if (!config || !page) {
    return {
      notFound: true,
      revalidate: serverRuntimeConfig.pageRevalidateInterval,
    }
  }

  const fileDownloadSlice = page.data.slices.find(
    (slice): slice is PrismicFileDownloadSlice =>
      slice.slice_type === 'file_download',
  )
  if (fileDownloadSlice && 'url' in fileDownloadSlice.primary.file) {
    return {
      redirect: {
        destination: fileDownloadSlice.primary.file.url,
        permanent: false,
      },
      revalidate: serverRuntimeConfig.pageRevalidateInterval,
    }
  }

  return {
    props: stripUndefined({
      config: config.data,
      page,
      previewData,
      dehydratedState: dehydrate(queryClient),
    }),
    revalidate: serverRuntimeConfig.pageRevalidateInterval,
  }
}

const Page = ({ config, page, previewData }: StaticProps) => (
  <PageWrapper>
    <BaseHead
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      title={page.data.headTitle || process.env.NEXT_PUBLIC_SITE_NAME_FALLBACK!}
      description={page.data.description || undefined}
      absoluteUrl={absoluteUrl(prismicLinkResolver(page))}
      image={convertPrismicImage(page.data.ogImage)}
    />
    {/** TODO: Move to sitemap */}
    <HrefLangHead page={page} />

    <PrismicProvider previewData={previewData}>
      <PrismicConfigProvider value={config}>
        <SliceZone slices={page.data.slices} components={components} />
      </PrismicConfigProvider>
    </PrismicProvider>
  </PageWrapper>
)

export default Page
