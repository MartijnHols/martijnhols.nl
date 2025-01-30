import { GetStaticProps } from 'next'
import BlogArticleMeta from '../components/BlogArticleMeta'
import { getPublishedArticles } from '../pages/blog'
import tagRelevancyScore from './tagRelevancyScore'

export interface ArticleStaticProps {
  article: BlogArticleMeta
  relatedArticles: BlogArticleMeta[]
}

const makeArticleGetStaticProps =
  (article: BlogArticleMeta): GetStaticProps<ArticleStaticProps> =>
  async () => {
    const articles = await getPublishedArticles()
    const relatedArticles = articles
      .filter((item) => item.slug !== article.slug)
      .sort(
        (a, b) =>
          tagRelevancyScore(article.tags, b.tags) -
          tagRelevancyScore(article.tags, a.tags),
      )

    return {
      props: {
        article,
        relatedArticles: relatedArticles.slice(0, 3),
      },
    }
  }

const articleMeta = (meta: BlogArticleMeta) => ({
  meta,
  getStaticProps: makeArticleGetStaticProps(meta),
})

export default articleMeta
