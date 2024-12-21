import { GetServerSideProps } from 'next'
import { PublicationDate } from '../components/BlogArticleMeta'
import absoluteUrl from '../utils/absoluteUrl'
import { articles as articlesPromise } from './blog'

interface SiteMapUrl {
  loc: string
  lastmod?: string
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority?: number
}

const createUrlXml = (url: SiteMapUrl) => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>
`
const createSiteMapXml = (urls: SiteMapUrl[]) =>
  `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((url) => createUrlXml(url)).join('')}
  </urlset>
`.trim()

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const articles = (await Promise.all(articlesPromise))
    .map((file) => file.meta)
    .filter(
      (article): article is typeof article & { publishedAt: PublicationDate } =>
        article.publishedAt !== undefined,
    )

  const sitemap = createSiteMapXml([
    {
      loc: absoluteUrl(''),
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 1,
    },
    {
      loc: absoluteUrl('/freelance-react-architect'),
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 1,
    },
    {
      loc: absoluteUrl('/blog'),
      lastmod: articles.reduce((latest, article) => {
        const updatedAt =
          article.updatedAt ?? article.republishedAt ?? article.publishedAt
        return updatedAt > latest ? updatedAt : latest
      }, '2024-04-01'),
      changefreq: 'daily',
      priority: 1,
    },
    ...articles.map((article) => ({
      loc: absoluteUrl(`/blog/${article.slug}`),
      lastmod:
        article.updatedAt ?? article.republishedAt ?? article.publishedAt,
      priority: 0.4,
    })),
  ])

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate=600',
  )
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

const SiteMap = () => null

export default SiteMap
