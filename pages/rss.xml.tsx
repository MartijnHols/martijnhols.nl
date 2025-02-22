import { GetServerSideProps } from 'next'
import RSS from 'rss'
import { getPublishedArticles } from './blog'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const publishedArticles = await getPublishedArticles()
  const baseUrl = process.env.NEXT_PUBLIC_PRIMARY_HOST

  const feed = new RSS({
    title: 'Blog by Martijn Hols',
    description:
      'My blog where I post articles on React, TypeScript, JavaScript and related subjects. I post deep dives, brief code snippets, opinions, etc..',
    generator:
      'https://github.com/MartijnHols/martijnhols.nl/blob/ssr/pages/rss.xml.tsx',
    feed_url: `${baseUrl}/rss.xml`,
    site_url: baseUrl,
    pubDate: new Date(
      publishedArticles.reduce((latest, article) => {
        const publishedAt = article.republishedAt ?? article.publishedAt
        return publishedAt > latest ? publishedAt : latest
      }, '2024-04-01'),
    ),
    managingEditor: 'Martijn Hols',
    copyright: `${baseUrl}/blog/license`,
    language: 'en-US',
    categories: ['Web', 'Programming', 'React', 'JavaScript'],
    ttl: 120,
  })

  publishedArticles.toReversed().map((article) => {
    feed.item({
      title: article.title,
      description: article.description,
      url: `${baseUrl}/blog/${article.slug}`,
      date: new Date(article.republishedAt ?? article.publishedAt),
      author: 'Martijn Hols',
      categories: article.tags,
    })
  })
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate=600',
  )
  res.write(
    feed.xml({
      indent: true,
    }),
  )
  res.end()

  return {
    props: {},
  }
}

export default function RSSPage() {
  return null
}
