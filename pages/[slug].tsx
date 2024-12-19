import { Client as PrismicClient, Content } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import { GetStaticProps, PreviewData } from 'next'
import getConfig from 'next/config'
import { useMemo } from 'react'
import { dehydrate, QueryClient, DehydratedState } from 'react-query'
import BaseHead from '../components/BaseHead'
import HrefLangHead from '../components/HrefLangHead'
import PageWrapper from '../components/PageWrapper'
import PrismicProvider from '../components/PrismicProvider'
import { components } from '../slices'
import absoluteUrl from '../utils/absoluteUrl'
import convertPrismicImage from '../utils/convertPrismicImage'
import { toPrismicLocale } from '../utils/locales'
import prefetchSliceSubQueries from '../utils/prefetchSliceSubQueries'
import {
  createClient,
  getByUid,
  getLayoutById,
  getPages,
  PrismicLayout,
  PrismicPage,
} from '../utils/prismic'
import prismicLinkResolver, { slugResolver } from '../utils/prismicLinkResolver'
import stripUndefined from '../utils/stripUndefined'

const isFileDownloadPage = (page: PrismicPage<false>) => {
  const fileDownloadSlice = page.data.slices.find(
    (slice): slice is Content.FileDownloadSlice =>
      slice.slice_type === 'file_download',
  )
  const isFileDownload =
    fileDownloadSlice && 'url' in fileDownloadSlice.primary.file

  return !isFileDownload
}

export const getStaticPaths = async () => {
  const client = createClient()
  const pages = await getPages(client)

  return {
    paths: pages.filter(isFileDownloadPage).map((page) => ({
      params: { slug: slugResolver(page) },
      // locale: toUserLocale(page.lang),
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
  const page = await getByUid<PrismicPage<true>>(
    prismicClient,
    'page',
    slug,
    locale,
  )
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
  page: PrismicPage<true>
  layout: PrismicLayout
  previewData?: PreviewData
  dehydratedState: DehydratedState
}

export const getStaticProps: GetStaticProps<
  StaticProps,
  { slug: string }
> = async ({ previewData, params, locale = 'nl' }) => {
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

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const page = await getCmsPage(
    prismicClient,
    params!.slug,
    prismicLocale,
    queryClient,
  )

  const layout = await getLayoutById(
    prismicClient,
    'Y9wvsxIAACAAj3uQ',
    prismicLocale,
  )

  if (!page) {
    return {
      notFound: true,
      revalidate: serverRuntimeConfig.pageRevalidateInterval,
    }
  }

  const fileDownloadSlice = page.data.slices.find(
    (slice): slice is Content.FileDownloadSlice =>
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
      page,
      layout,
      previewData,
      dehydratedState: dehydrate(queryClient),
    }),
    revalidate: serverRuntimeConfig.pageRevalidateInterval,
  }
}

const Page = ({ page, layout, previewData }: StaticProps) => {
  const PageContentSlice = useMemo(
    () =>
      function PageContentDynamicComponent() {
        return (
          <main role="main">
            <SliceZone slices={page.data.slices} components={components} />
          </main>
        )
      },
    [page.data.slices],
  )

  return (
    <PageWrapper>
      <BaseHead
        title={
          page.data.headTitle || process.env.NEXT_PUBLIC_SITE_NAME_FALLBACK
        }
        description={page.data.description || undefined}
        absoluteUrl={absoluteUrl(prismicLinkResolver(page))}
        image={convertPrismicImage(page.data.ogImage)}
      />
      <HrefLangHead page={page} />

      <PrismicProvider previewData={previewData}>
        <SliceZone
          slices={layout.data.slices}
          components={{
            ...components,
            page_content: PageContentSlice,
          }}
        />
      </PrismicProvider>
    </PageWrapper>
  )
}

export default Page
