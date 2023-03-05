import { PrismicArticle } from './prismic'

export default interface SliceContext {
  isArticle: boolean
  recentArticles: PrismicArticle[]
}
