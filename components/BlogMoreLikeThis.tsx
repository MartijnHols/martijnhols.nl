import { css } from '@emotion/react'
import styled from '@emotion/styled'
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
`
const StyledTag = styled(Tag)``
const Article = styled.article(
  ({ theme }) => css`
    border: 0.5em solid ${theme.colors.black};
    box-shadow: -0.5em 0.5em 0 0 ${theme.colors.yellow};
    padding: 0.5em;
    color: ${theme.colors.black};
    width: 100%;
    transform: rotate(-1deg);

    // It is not possible to animate a linear-gradient (yet), so we need to do
    // some background-positioning trickery to get the effect we want.
    background-image: linear-gradient(
      0deg,
      ${theme.colors.black} 50%,
      transparent 50%
    );
    background-size: 100% 200.5%;
    background-position-y: 0%;

    transition: all 200ms ease-out;
    ${StyledTag} {
      transition: all 200ms ease-out;
    }

    :hover {
      color: ${theme.colors.white};
      background-position-y: 100%;

      ${StyledTag} {
        background: ${theme.colors.yellow};
        color: ${theme.colors.black};
        box-shadow: none;
      }
    }
  `,
)
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
const TextLine = styled.div(
  ({ theme }) => css`
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
      background: ${theme.colors.black};
    }
    ::after {
      content: '';
      position: absolute;
      top: calc(50% - 0.1em);
      right: calc(-100vw - 0.25em);
      width: 100vw;
      height: 0.25em;
      background: ${theme.colors.black};
    }
  `,
)
const MoreLikeThisLink = styled(Link)`
  border-bottom: 0;
`
const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  max-width: 32em;
`
const Tags = styled.div`
  display: flex;
  gap: 0.375em;
  flex-wrap: wrap;
`

interface Props extends ComponentProps<typeof PageOverflowContainer> {
  relatedArticles: BlogArticleMeta[]
}

const BlogMoreLikeThis = ({ relatedArticles, ...others }: Props) => (
  <PageOverflowContainer {...others}>
    <StyledContainer>
      <TextLine>
        <MoreLikeThisLink href="/blog">More like this</MoreLikeThisLink>
      </TextLine>
      {relatedArticles?.slice(0, 1).map((item) => (
        <StyledLink
          key={item.slug}
          href={`/blog/${item.slug}`}
          className="plain"
        >
          <Article>
            <ArticleTitle>{item.title}</ArticleTitle>

            <Tags>
              {item.tags.map((tag) => (
                <StyledTag key={tag}>{tag}</StyledTag>
              ))}
            </Tags>
          </Article>
        </StyledLink>
      ))}
    </StyledContainer>
  </PageOverflowContainer>
)

export default BlogMoreLikeThis
