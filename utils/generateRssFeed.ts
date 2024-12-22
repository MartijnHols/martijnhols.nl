import fs from 'fs/promises'
import RSS from 'rss'
import { getPublishedArticles } from '../pages/blog'

export default async function generateRssFeed() {
  const baseUrl = process.env.NEXT_PUBLIC_PRIMARY_HOST

  const publishedArticles = await getPublishedArticles()

  const feed = new RSS({
    title: 'Blog by Martijn Hols',
    description:
      'My blog where I post articles on React, TypeScript, JavaScript and related subjects. I post deep dives, brief code snippets, opinions, etc..',
    generator:
      'https://github.com/MartijnHols/martijnhols.nl/tree/main/utils/generateRssFeed.ts',
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

  await fs.writeFile(
    './public/rss.xml',
    feed.xml({
      indent: true,
    }),
  )
}
