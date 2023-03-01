import { GetServerSideProps } from 'next'

import absoluteUrl from '../utils/absoluteUrl'
import { createClient, getPages } from '../utils/prismic'
import prismicLinkResolver from '../utils/prismicLinkResolver'

interface SiteMapUrl {
  loc: string
  lastmod?: string
}

const createUrlXml = (url: SiteMapUrl) => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
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

  const sitemap = createSiteMapXml(
    pages
      .filter((page) => page.data.sitemap !== false)
      .map((page) => ({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        loc: absoluteUrl(prismicLinkResolver(page)),
        // TODO: lastmod
      })),
  )

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
