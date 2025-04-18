import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { breakpoints } from '../theme'
import { BlogArticleTag, SerializableBlogArticleMeta } from './BlogArticleMeta'
import BlogArticlePublicationDate from './BlogArticlePublicationDate'
import Link from './Link'
import Panel from './Panel'
import Tag from './Tag'

const ArticleTitle = styled.h1`
  color: var(--black);
  transition: all 120ms ease-out;
  // It is not possible to animate a linear-gradient (yet), so we need to do
  // some background-positioning trickery to get the effect we want.
  background-image: linear-gradient(0deg, var(--black) 50%, transparent 50%);
  background-size: 100% 200%;
  background-position-y: 0px;
  // Add some extra space on top so the hover state background's top isn't too
  // close to the text.
  padding: 0.1em 0;
  margin-top: -0.25em;
  margin-bottom: 0.175em;
  font-size: 2em;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 2.75em;
  }
`
const ArticleLink = styled(Link)`
  display: block;
  margin-top: var(--spacing6);
  margin-bottom: var(--spacing6);
  margin-left: auto;
  margin-right: auto;
  color: var(--black);

  :hover {
    ${ArticleTitle} {
      color: var(--white);
      background-position-y: 100%;
    }
  }
`
const extraArticleLinkCss = css`
  max-width: 90%;
`
const Tags = styled.div`
  display: flex;
  gap: var(--spacing1);
  flex-wrap: wrap;
`
const Article = styled(Panel)`
  --background: var(--yellow50);
  color: var(--black);
  // Top and bottom margins are not equal since the angle changes the visual
  // margin. I believe the left-most column is most important to appear
  // visually aligned.
  margin-top: var(--spacing5);
  margin-bottom: var(--spacing7);
  display: flex;
  gap: 1em;
  flex-flow: column;

  @media (min-width: ${breakpoints.TABLET}px) {
    flex-direction: row;
    gap: 2em;
    padding: var(--spacing3) var(--spacing4) var(--spacing2);
    // Offset the padding so the code text aligns with the rest of the text
    margin-left: calc(var(--spacing4) * -1);
    margin-right: calc(var(--spacing4) * -1);
  }
`
const extraArticleCss = css`
  padding: var(--spacing2);
  font-size: 90%;

  @media (min-width: ${breakpoints.TABLET}px) {
    padding: var(--spacing2) var(--spacing3);

    ${ArticleTitle} {
      font-size: 2em;
    }
    ${Tags} {
      font-size: 90%;
    }
  }
`

const ArticleTextContainer = styled.div`
  flex: 1 1 auto;
`
const ArticleDescription = styled.p`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`
const ArticleMetadata = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing2);
`
const PublishedAt = styled.div`
  opacity: 0.6;
`

interface Props {
  article: SerializableBlogArticleMeta
}

const BlogListArticleCard = ({ article }: Props) => (
  <ArticleLink
    href={`/blog/${article.slug}`}
    className="plain"
    css={
      (article.tags.includes(BlogArticleTag.Extra) ||
        article.tags.includes(BlogArticleTag.HowTo)) &&
      extraArticleLinkCss
    }
  >
    <Article
      as="article"
      boxShadow={false}
      css={
        (article.tags.includes(BlogArticleTag.Extra) ||
          article.tags.includes(BlogArticleTag.HowTo)) &&
        extraArticleCss
      }
    >
      {article.image && (
        <Image
          src={article.image}
          width={180}
          css={css`
            width: 180px;
            height: auto;
            max-height: 180px;
            object-fit: contain;
            object-position: top;
            flex: 0 0 auto;
          `}
          alt=""
        />
      )}

      <ArticleTextContainer>
        <ArticleTitle>{article.title}</ArticleTitle>
        <ArticleDescription>{article.description}</ArticleDescription>
        <ArticleMetadata>
          <Tags>
            {article.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
          <PublishedAt>
            <BlogArticlePublicationDate
              date={article.republishedAt ?? article.publishedAt}
            />
          </PublishedAt>
        </ArticleMetadata>
      </ArticleTextContainer>
    </Article>
  </ArticleLink>
)

export default BlogListArticleCard
