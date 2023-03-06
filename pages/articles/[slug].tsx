import { isFilled } from '@prismicio/helpers'
import { SliceZone } from '@prismicio/react'
import { GetStaticProps, PreviewData } from 'next'
import getConfig from 'next/config'
import { useMemo } from 'react'
import { dehydrate, QueryClient, DehydratedState } from 'react-query'

import Angle from '../../components/Angle'
import BaseHead from '../../components/BaseHead'
import HrefLangHead from '../../components/HrefLangHead'
import PageWrapper from '../../components/PageWrapper'
import PrismicProvider from '../../components/PrismicProvider'
import PrismicRichText from '../../components/PrismicRichText'
import { components } from '../../slices'
import Hero from '../../slices/HeroSlice/Hero'
import TopBar from '../../slices/HeroSlice/TopBar'
import absoluteUrl from '../../utils/absoluteUrl'
import { toPrismicLocale, toUserLocale } from '../../utils/locales'
import {
  createClient,
  getArticle,
  getArticles,
  getLayoutById,
  PrismicArticle,
  PrismicLayout,
} from '../../utils/prismic'
import {
  getPrismicConfig,
  PrismicConfig,
  PrismicConfigProvider,
} from '../../utils/prismicConfig'
import prismicLinkResolver, {
  slugResolver,
} from '../../utils/prismicLinkResolver'
import SliceContext from '../../utils/SliceContext'
import stripUndefined from '../../utils/stripUndefined'

export const getStaticPaths = async () => {
  const client = createClient()
  const articles = await getArticles(client)

  return {
    paths: articles.map((page) => ({
      params: { slug: slugResolver(page) },
      locale: toUserLocale(page.lang),
    })),
    fallback: 'blocking',
  }
}

const { serverRuntimeConfig } = getConfig()

interface StaticProps {
  config: PrismicConfig
  article: PrismicArticle
  recentArticles: PrismicArticle[]
  layout: PrismicLayout
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

  const [config, article] = await Promise.all([
    getPrismicConfig(prismicClient, prismicLocale),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    getArticle(prismicClient, params!.slug, prismicLocale),
  ])

  if (!isFilled.contentRelationship(config.data.articlesLayout)) {
    throw new Error('articlesLayout is not set in Config')
  }
  const layout = await getLayoutById(
    prismicClient,
    config.data.articlesLayout.id,
    prismicLocale,
  )

  if (!config || !article) {
    return {
      notFound: true,
      revalidate: serverRuntimeConfig.pageRevalidateInterval,
    }
  }

  const recentArticles = await prismicClient.getAllByType('article', {
    lang: prismicLocale,
    limit: 3,
    predicates: [`[not(document.id, "${article.id}")]`],
  })

  return {
    props: stripUndefined({
      config: config.data,
      article,
      recentArticles,
      layout,
      previewData,
      dehydratedState: dehydrate(queryClient),
    }),
    revalidate: serverRuntimeConfig.pageRevalidateInterval,
  }
}

const Page = ({
  config,
  article,
  layout,
  previewData,
  recentArticles,
}: StaticProps) => {
  const PageContentSlice = useMemo(
    () =>
      function PageContentDynamicComponent() {
        return (
          <SliceZone
            slices={article.data.slices}
            components={components}
            context={{
              isArticle: true,
              recentArticles,
            }}
          />
        )
      },
    [article.data.slices, recentArticles],
  )

  return (
    <PageWrapper>
      <BaseHead
        title={
          article.data.title
            ? `${article.data.title} | ${process.env.NEXT_PUBLIC_SITE_NAME_FALLBACK}`
            : process.env.NEXT_PUBLIC_SITE_NAME_FALLBACK
        }
        description={article.data.description || undefined}
        absoluteUrl={absoluteUrl(prismicLinkResolver(article))}
      />
      <HrefLangHead page={article} />

      <PrismicProvider previewData={previewData}>
        <PrismicConfigProvider value={config}>
          <TopBar />
          <Hero
            title={article.data.title}
            subText={
              isFilled.richText(article.data.subTitle) && (
                <PrismicRichText field={article.data.subTitle} />
              )
            }
          />
          <Angle inverted />
          <SliceZone<SliceContext>
            // Reminder: this slice zone is only for the layout slices, the content SliceZone is above
            slices={layout.data.slices}
            components={{
              ...components,
              page_content: PageContentSlice,
            }}
          />
        </PrismicConfigProvider>
      </PrismicProvider>
    </PageWrapper>
  )
}

export default Page
