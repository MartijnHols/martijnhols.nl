import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { ComponentProps } from 'react'
import BlogArticleMeta from './BlogArticleMeta'
import Container from './Container'
import Link from './Link'
import Tag from './Tag'

const PageOverflowContainer = styled.div`
  overflow: hidden;
`
const StyledContainer = styled(Container)`
  max-width: 57em;
  font-size: 112.5%;
  padding-bottom: 4em;

  @media print {
    display: none;
  }
`
const StyledTag = styled(Tag)``
const Article = styled.article(
  ({ theme }) => css`
    border: 0.5em solid var(--black);
    box-shadow: -0.5em 0.5em 0 0 var(--yellow);
    padding: 0.5em;
    color: var(--black);
    width: 100%;
    transform: rotate(-1deg);

    // It is not possible to animate a linear-gradient (yet), so we need to do
    // some background-positioning trickery to get the effect we want.
    background-image: linear-gradient(0deg, var(--black) 50%, transparent 50%);
    background-size: 100% 200.5%;
    background-position-y: 0%;

    transition: all 200ms ease-out;
    ${StyledTag} {
      transition: all 200ms ease-out;
    }
    display: flex;
    flex-flow: column;
    gap: 0.5em;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      flex-direction: row;
      gap: 1em;
    }

    :hover {
      color: var(--white);
      background-position-y: 100%;

      ${StyledTag} {
        background: var(--yellow);
        color: var(--black);
        box-shadow: none;
      }
    }
  `,
)
const ArticleImage = styled(Image)(
  ({ theme }) => css`
    margin: 0 auto;
    height: 5em;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      margin: 0;
      height: 6.5em;
    }
  `,
)
const ArticleTextContainer = styled.div`
  flex: 1 1 auto;
`
const ArticleTitle = styled.h1(
  ({ theme }) => css`
    font-size: 1.3em;
    text-shadow: none;
    transform: none;
    margin-bottom: 0.5em;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 1.8em;
    }
  `,
)
const TextLine = styled.div`
  transform: rotate(-1deg);
  font-weight: 1000;
  position: relative;
  display: inline-block;
  margin-top: 1em;
  margin-bottom: 1em;
  line-height: 1;

  ::before {
    content: '';
    position: absolute;
    top: calc(50% - 0.1em);
    left: calc(-100vw - 0.25em);
    width: 100vw;
    height: 0.25em;
    background: var(--black);
  }
  ::after {
    content: '';
    position: absolute;
    top: calc(50% - 0.1em);
    right: calc(-100vw - 0.25em);
    width: 100vw;
    height: 0.25em;
    background: var(--black);
  }
`
const MoreLikeThisLink = styled(Link)`
  border-bottom: 0;
`
const RelatedArticles = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1em;
`
const StyledLink = styled(Link)`
  display: block;
  width: 100%;
`
const Tags = styled.div`
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
  font-size: 0.75em;
`

interface Props extends ComponentProps<typeof PageOverflowContainer> {
  relatedArticles: BlogArticleMeta[]
}

const BlogRelatedArticles = ({ relatedArticles, ...others }: Props) => (
  <PageOverflowContainer {...others}>
    <StyledContainer>
      <TextLine>
        <MoreLikeThisLink href="/blog">More like this</MoreLikeThisLink>
      </TextLine>
      <RelatedArticles>
        {relatedArticles?.slice(0, 2).map((article) => (
          <StyledLink
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="plain"
          >
            <Article>
              {article.image && (
                <ArticleImage
                  src={article.image}
                  width={140}
                  height={126}
                  style={{
                    objectFit: 'contain',
                  }}
                  alt=""
                />
              )}
              <ArticleTextContainer>
                <ArticleTitle>{article.title}</ArticleTitle>

                <Tags>
                  {article.tags.map((tag) => (
                    <StyledTag key={tag}>{tag}</StyledTag>
                  ))}
                </Tags>
              </ArticleTextContainer>
            </Article>
          </StyledLink>
        ))}
      </RelatedArticles>
    </StyledContainer>
  </PageOverflowContainer>
)

export default BlogRelatedArticles
