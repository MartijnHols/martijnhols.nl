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

export { meta }
export const getStaticProps = makeArticleGetStaticProps(meta as BlogArticleMeta)

const BlogArticleNextjsPerformance = (props: ArticleStaticProps) => (
  <BlogArticle {...props} addendum={<Addendum />}>
    <ArticleContent />
  </BlogArticle>
)

export default BlogArticleNextjsPerformance
