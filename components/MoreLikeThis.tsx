import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { gists } from '../pages/gists'
import Container from './Container'
import GistMeta, { GistTag } from './GistMeta'
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

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      margin-top: 5em;
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

const tagRelevancyScore = (base: GistTag[], alternative: GistTag[]) => {
  let score = 0
  base.forEach((tag) => {
    if (alternative.includes(tag)) {
      score += 1
    }
  })
  if (alternative.includes(GistTag.HowTo)) {
    score -= 1
  }
  if (!base.includes(GistTag.Meta) && alternative.includes(GistTag.Meta)) {
    score -= 10
  }

  return score
}

interface Props {
  gist: GistMeta
  className?: string
}

const MoreLikeThis = ({ gist, className }: Props) => {
  const [alternativeGists, setAlternativeGists] = useState<GistMeta[]>()
  useEffect(() => {
    // TODO: Move this into getStaticProps. Probably going to have to move gists out of the pages folder for that
    Promise.all(gists).then((gists) =>
      setAlternativeGists(
        gists
          .map((g) => g.meta)
          ?.filter((item) => item.slug !== gist.slug)
          .sort(
            (a, b) =>
              tagRelevancyScore(gist.tags, b.tags) -
              tagRelevancyScore(gist.tags, a.tags),
          ),
      ),
    )
  }, [])

  return (
    <PageOverflowContainer>
      <StyledContainer>
        <TextLine>
          <MoreLikeThisLink href="/gists">More like this</MoreLikeThisLink>
        </TextLine>
        {alternativeGists?.slice(0, 1).map((item) => (
          <StyledLink
            key={item.slug}
            href={`/gists/${item.slug}`}
            className="plain"
          >
            <Article className={className}>
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
}

export default MoreLikeThis
