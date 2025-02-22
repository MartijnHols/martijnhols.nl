import generateRobots from './generateRobots'
import generateRssFeed from './generateRssFeed'
import generateSitemap from './generateSitemap'

export default async function generateAll() {
  await Promise.all([generateSitemap(), generateRobots(), generateRssFeed()])
}
