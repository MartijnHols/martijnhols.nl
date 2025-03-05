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
  <BlogArticle
    {...props}
    addendum={
      <>
        <h2 id="applicable-websites-and-apps">
          Update February 6, 2025; Added scope
        </h2>
        <p>todo</p>
      </>
    }
  >
    <ArticleContent />
  </BlogArticle>
)

export default BlogArticleNextjsPerformance
