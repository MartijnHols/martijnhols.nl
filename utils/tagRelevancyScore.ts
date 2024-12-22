import { BlogArticleTag, priorityTags } from '../components/BlogArticleMeta'

const tagRelevancyScore = (
  base: BlogArticleTag[],
  alternative: BlogArticleTag[],
) => {
  let score = 0
  base.forEach((tag) => {
    if (alternative.includes(tag)) {
      score += 10
    }
  })
  if (alternative.includes(BlogArticleTag.HowTo)) {
    score -= 1
  }
  priorityTags.forEach((tag) => {
    if (alternative.includes(tag)) {
      score += 10
    }
  })
  if (
    !base.includes(BlogArticleTag.Meta) &&
    alternative.includes(BlogArticleTag.Meta)
  ) {
    score -= 100
  }

  return score
}

export default tagRelevancyScore
