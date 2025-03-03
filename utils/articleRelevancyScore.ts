import BlogArticleMeta, {
  BlogArticleTag,
  priorityTags,
} from '../components/BlogArticleMeta'

const articleRelevancyScore = (
  baseArticle: BlogArticleMeta,
  alternativeArticle: BlogArticleMeta,
) => {
  let score = 0

  baseArticle.tags.forEach((tag) => {
    if (alternativeArticle.tags.includes(tag)) {
      score += 10
    }
  })

  priorityTags.forEach((tag) => {
    if (alternativeArticle.tags.includes(tag)) {
      score += 10
    }
  })

  if (
    !baseArticle.tags.includes(BlogArticleTag.Meta) &&
    alternativeArticle.tags.includes(BlogArticleTag.Meta)
  ) {
    score -= 100
  }
  if (
    alternativeArticle.tags.includes(BlogArticleTag.Extra) ||
    alternativeArticle.tags.includes(BlogArticleTag.HowTo)
  ) {
    score -= 1
  }
  if (alternativeArticle.image) {
    score += 10
  }

  return score
}

export default articleRelevancyScore
