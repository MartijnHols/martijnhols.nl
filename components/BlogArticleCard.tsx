import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { BlogArticleTag, SerializableBlogArticleMeta } from './BlogArticleMeta'
import Link from './Link'
import Panel from './Panel'
import RelativeDate from './RelativeDate'
import Tag from './Tag'

const ArticleTitle = styled.h2(
  ({ theme }) => css`
    color: ${theme.colors.black};
    text-decoration: none;
    border-bottom: 10px solid ${theme.colors.black};
    transition: all 120ms ease-out;
    // It is not possible to animate a linear-gradient (yet), so we need to do
    // some background-positioning trickery to get the effect we want.
    background-image: linear-gradient(
      0deg,
      ${theme.colors.black} 50%,
      transparent 50%
    );
    background-size: 100% 200%;
    background-position-y: 0px;
    margin-top: 0;
    border-top: 0;
    transform: none;
    // Add some extra space on top so the hover state background's top isn't too
    // close to the text.
    padding-top: 0.1em;
    margin-top: -0.5em;
    margin-bottom: 0;
    hyphens: auto;
    font-size: 2em;

    ::before {
      content: none;
    }

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      hyphens: manual;
      font-size: 3em;
    }
  `,
)
const ArticleLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'howTo',
})<{ howTo?: boolean }>(({ theme, howTo }) => [
  css`
    display: block;
    margin-top: ${theme.spacing.x6}px;
    margin-bottom: ${theme.spacing.x6}px;
    margin-left: auto;
    margin-right: auto;
    color: ${theme.colors.black};

    :hover {
      ${ArticleTitle} {
        color: ${theme.colors.white};
        background-position-y: 100%;
      }
    }
  `,
  howTo &&
    css`
      max-width: 90%;
    `,
])
const Article = styled(Panel, {
  shouldForwardProp: (prop) => prop !== 'howTo',
})<{ howTo?: boolean }>(({ theme, howTo }) => [
  css`
    --background: ${theme.colors.yellow50};
    color: ${theme.colors.black};
    // Top and bottom margins are not equal since the angle changes the visual
    // margin. I believe the left-most column is most important to appear
    // visually aligned.
    margin-top: ${theme.spacing.x5}px;
    margin-bottom: ${theme.spacing.x7}px;
    // Offset the padding so the code text aligns with the rest of the text
    margin-left: -${theme.spacing.x4}px;
    margin-right: -${theme.spacing.x4}px;
    padding: ${theme.spacing.x3}px ${theme.spacing.x4}px ${theme.spacing.x2}px;
    display: flex;
    gap: 1em;
    flex-flow: column;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      flex-direction: row;
      gap: 2em;
    }
  `,
  howTo &&
    css`
      padding: ${theme.spacing.x2}px;
      font-size: 90%;

      @media (min-width: ${theme.breakpoints.TABLET}px) {
        padding: ${theme.spacing.x2}px ${theme.spacing.x3}px;

        ${ArticleTitle} {
          font-size: 2em;
          border-bottom: ${theme.spacing.x1}px solid ${theme.colors.black};
        }
      }
    `,
])
const ArticleTextContainer = styled.div`
  flex: 1 1 auto;
`
const ArticleMetadata = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: ${theme.spacing.x2}px;
  `,
)
const PublishedAt = styled.div`
  opacity: 0.6;
`
const Tags = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.x1}px;
    flex-wrap: wrap;
  `,
)

interface Props {
  article: SerializableBlogArticleMeta
}

const BlogArticleCard = ({ article }: Props) => (
  <ArticleLink
    href={`/blog/${article.slug}`}
    className="plain"
    howTo={article.tags.includes(BlogArticleTag.HowTo)}
  >
    <Article
      as="article"
      boxShadow={false}
      howTo={article.tags.includes(BlogArticleTag.HowTo)}
    >
      {article.image && <Image src={article.image} width={200} alt="" />}
      <ArticleTextContainer>
        <ArticleTitle>{article.title}</ArticleTitle>
        <p>{article.description}</p>
        <ArticleMetadata>
          <Tags>
            {article.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
          <PublishedAt>
            {article.republishedAt ? 'Republished' : 'Published'}{' '}
            <RelativeDate date={article.republishedAt ?? article.publishedAt} />
          </PublishedAt>
        </ArticleMetadata>
      </ArticleTextContainer>
    </Article>
  </ArticleLink>
)

export default BlogArticleCard
