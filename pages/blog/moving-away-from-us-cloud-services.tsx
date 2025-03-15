import ArticleContent, {
  meta,
} from '../../articles/moving-off-us-cloud/article.mdx'
import BlogArticle from '../../components/BlogArticle'
import BlogArticleMeta from '../../components/BlogArticleMeta'
import {
  ArticleStaticProps,
  makeArticleGetStaticProps,
} from '../../utils/articleMeta'

// Works around a bug in SWC where meta would be undefined
export { meta } from '../../articles/moving-off-us-cloud/article.mdx'
export const getStaticProps = makeArticleGetStaticProps(meta as BlogArticleMeta)

const BlogArticleMovingOffUsCloud = (props: ArticleStaticProps) => (
  <BlogArticle {...props}>
    <ArticleContent />
  </BlogArticle>
)

export default BlogArticleMovingOffUsCloud
