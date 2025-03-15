import ArticleContent, { meta } from '../../articles/actions-cache/article.mdx'
import BlogArticle from '../../components/BlogArticle'
import BlogArticleMeta from '../../components/BlogArticleMeta'
import {
  ArticleStaticProps,
  makeArticleGetStaticProps,
} from '../../utils/articleMeta'

// Works around a bug in SWC where meta would be undefined
export { meta } from '../../articles/actions-cache/article.mdx'
export const getStaticProps = makeArticleGetStaticProps(meta as BlogArticleMeta)

const BlogArticleMigratingAwayFromMartijnholsActionsCache = (
  props: ArticleStaticProps,
) => (
  <BlogArticle {...props}>
    <ArticleContent />
  </BlogArticle>
)

export default BlogArticleMigratingAwayFromMartijnholsActionsCache
