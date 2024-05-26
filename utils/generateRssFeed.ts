import fs from 'fs'
import RSS from 'rss'
import { filterUnpublished, gists } from '../pages/gists'

export default async function generateRssFeed() {
  const baseUrl = process.env.NEXT_PUBLIC_PRIMARY_HOST

  const publishedGists = (await Promise.all(gists))
    .map((gist) => gist.meta)
    .filter(filterUnpublished)

  const feed = new RSS({
    title: 'Gists by Martijn Hols',
    description:
      "Martijn Hols's gists are brief code snippets, opinions and answers to common questions and problems. Mostly about React and closely related things.",
    generator:
      'https://github.com/MartijnHols/martijnhols.nl/tree/main/utils/generateRssFeed.ts',
    feed_url: `${baseUrl}/rss.xml`,
    site_url: baseUrl,
    pubDate: new Date(
      publishedGists.reduce((latest, gist) => {
        const updatedAt = gist.updatedAt ?? gist.publishedAt
        return updatedAt > latest ? updatedAt : latest
      }, '2024-04-01'),
    ),
    managingEditor: 'Martijn Hols',
    copyright: `${baseUrl}/gists/license`,
    language: 'en-US',
    categories: ['Web', 'Programming', 'React', 'JavaScript'],
    ttl: 120,
  })

  publishedGists.toReversed().map((gist) => {
    feed.item({
      title: gist.title,
      description: gist.description,
      url: `${baseUrl}/gists/${gist.slug}`,
      date: new Date(gist.publishedAt),
      author: 'Martijn Hols',
      categories: gist.tags,
    })
  })

  fs.writeFileSync(
    './public/rss.xml',
    feed.xml({
      indent: true,
    }),
  )
}
