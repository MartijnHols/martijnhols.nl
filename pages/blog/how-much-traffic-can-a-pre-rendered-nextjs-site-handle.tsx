import Addendum from '../../articles/nextjs-traffic-benchmarks/addendum.mdx'
import ArticleContent, {
  meta,
} from '../../articles/nextjs-traffic-benchmarks/article.mdx'
import BlogArticle from '../../components/BlogArticle'
import BlogArticleMeta from '../../components/BlogArticleMeta'
import {
  ArticleStaticProps,
  makeArticleGetStaticProps,
} from '../../utils/articleMeta'

// Works around a bug in SWC where meta would be undefined
export { meta } from '../../articles/nextjs-traffic-benchmarks/article.mdx'
export const getStaticProps = makeArticleGetStaticProps(meta as BlogArticleMeta)

const BlogArticleNextjsPerformance = (props: ArticleStaticProps) => (
  <BlogArticle {...props} addendum={<Addendum />}>
    <ArticleContent />
  </BlogArticle>
)

export default BlogArticleNextjsPerformance
