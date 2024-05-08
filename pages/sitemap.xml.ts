import { GetServerSideProps } from 'next'
import { PublicationDate } from '../components/GistMeta'
import absoluteUrl from '../utils/absoluteUrl'
import { createClient, getPages, getProjects } from '../utils/prismic'
import prismicLinkResolver, {
  HOMEPAGE_SLUG,
} from '../utils/prismicLinkResolver'
import { gists as gistsPromise } from './gists'

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
  const client = createClient()
  const pages = await getPages(client)
  const projects = await getProjects(client, '*')

  const gists = (await Promise.all(gistsPromise))
    .map((file) => file.meta)
    .filter(
      (gist): gist is typeof gist & { publishedAt: PublicationDate } =>
        gist.publishedAt !== undefined,
    )

  const sitemap = createSiteMapXml([
    ...pages
      .filter((page) => page.data.sitemap !== false)
      .map((page) => {
        const isHomepage = page.uid === HOMEPAGE_SLUG

        // Only include the date part so its format is equal to that of the gists
        let lastmod = page.last_publication_date.split('T')[0]
        if (isHomepage) {
          lastmod = projects.reduce((latest, project) => {
            const updatedAt = project.last_publication_date.split('T')[0]
            return updatedAt > latest ? updatedAt : latest
          }, lastmod)
        }

        return {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          loc: absoluteUrl(prismicLinkResolver(page)),
          lastmod,
          changefreq: isHomepage ? ('weekly' as const) : undefined,
          priority: isHomepage ? 1 : undefined,
        }
      }),
    {
      loc: absoluteUrl('/gists'),
      lastmod: gists.reduce((latest, gist) => {
        const updatedAt = gist.updatedAt ?? gist.publishedAt
        return updatedAt > latest ? updatedAt : latest
      }, '2024-04-01'),
      changefreq: 'daily',
      priority: 1,
    },
    ...gists.map((gist) => ({
      loc: absoluteUrl(`/gists/${gist.slug}`),
      lastmod: gist.updatedAt ?? gist.publishedAt,
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
