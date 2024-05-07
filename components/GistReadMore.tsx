import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { GistMeta } from './Gist'
import Link from './Link'

const Container = styled.article(
  ({ theme }) => css`
    border: 0.5em solid ${theme.colors.black};
    box-shadow: -0.5em 0.5em 0 0 ${theme.colors.yellow};
    padding: 0.5em;
    color: ${theme.colors.black};
    max-width: 600px;
    transform: rotate(-1deg);

    // It is not possible to animate a linear-gradient (yet), so we need to do
    // some background-positioning trickery to get the effect we want.
    background-image: linear-gradient(
      0deg,
      ${theme.colors.black} 50%,
      transparent 50%
    );
    background-size: 100% 200.5%;
    background-position-y: 0px;

    transition: all 200ms ease-out;
    :hover {
      color: ${theme.colors.white};
      background-position-y: 100%;
    }
  `,
)
const ReadMoreTitle = styled.div`
  margin-bottom: 0.2em;
`
const ArticleTitle = styled.h1(
  ({ theme }) => css`
    font-size: 1.3em;
    text-shadow: none;
    transform: none;
    margin-bottom: 0;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 1.8em;
    }
  `,
)

interface Props {
  gist: GistMeta
  className?: string
}

const GistReadMore = ({ gist, className }: Props) => (
  <Link href={`/gists/${gist.slug}`} className="plain">
    <Container className={className}>
      <ReadMoreTitle>More like this</ReadMoreTitle>
      <ArticleTitle>{gist.title}</ArticleTitle>
    </Container>
  </Link>
)

export default GistReadMore
