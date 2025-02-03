import { GetStaticProps } from 'next'
import BlogArticleMeta from '../components/BlogArticleMeta'
import { getPublishedArticles } from '../pages/blog'
import articleRelevancyScore from './articleRelevancyScore'

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
          articleRelevancyScore(article, b) - articleRelevancyScore(article, a),
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
