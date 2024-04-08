import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import Angle from '../../components/Angle'
import BaseHead from '../../components/BaseHead'
import Container from '../../components/Container'
import { PublicationDate as PublicationDateType } from '../../components/Gist'
import Link from '../../components/Link'
import PageWrapper from '../../components/PageWrapper'
import PublicationDate from '../../components/PublicationDate'
import absoluteUrl from '../../utils/absoluteUrl'

export const gists = [
  require('./intro'),
  require('./license'),
  require('./how-to-detect-the-on-screen-keyboard-in-ios-safari'),
  require('./how-to-get-document-height-ios-safari-osk'),
] as Array<Promise<{ meta: GistMeta }>>

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    gists: (await Promise.all(gists)).map((gist) => gist.meta),
  },
})

export interface GistMeta {
  slug: string
  title: string
  description: string
  publishedAt: PublicationDateType
  updatedAt?: PublicationDateType
  tags: string[] // I plan to use these later, and will probably change this type significantly. Still I think it's good to already start filling the data.
}

const StyledContainer = styled(Container)(
  ({ theme }) => css`
    padding-top: 100px;
    padding-bottom: 100px;
  `,
)
const Title = styled.h1(
  ({ theme }) => css`
    font-size: ${theme.headings.h1};
  `,
)
const ArticleList = styled.ul(
  ({ theme }) => css`
    list-style: none;
    padding: 0;
  `,
)
const Article = styled.article(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing.x8}px;
    color: ${theme.colors.black};
    border: ${theme.spacing.x2}px solid ${theme.colors.black};
    padding: ${theme.spacing.x4}px;
    font-size: 16px;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      transform: rotate(-0.85deg);
      padding: ${theme.spacing.x3}px ${theme.spacing.x4}px;
      font-size: 18px;
    }
  `,
)
const ArticleTitle = styled.h2(
  ({ theme }) => css`
    color: ${theme.colors.black};
    text-decoration: none;
    border-bottom: 6px solid ${theme.colors.black};
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
    font-size: 32px;
    hyphens: auto;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      hyphens: manual;
      font-size: 45px;
    }
  `,
)
const ArticleLink = styled(Link)(
  ({ theme }) => css`
    :hover {
      ${ArticleTitle} {
        color: ${theme.colors.yellow};
        background-position-y: 100%;
      }
    }
  `,
)
const ArticleMetadata = styled.div(
  ({ theme }) => css`
    opacity: 0.6;
  `,
)

interface Props {
  gists: GistMeta[]
}

const GistsIndex = ({ gists }: Props) => {
  const { pathname } = useRouter()

  return (
    <PageWrapper>
      <BaseHead
        title={`Gists by ${process.env.NEXT_PUBLIC_SITE_NAME_FALLBACK}`}
        description="Martijn Hols's gists are brief code snippets, opinions and answers to common questions and problems. Mostly about React and closely related things."
        absoluteUrl={absoluteUrl(pathname)}
      />

      <main role="main">
        <Angle />

        <StyledContainer>
          <Title>Just the gists</Title>

          <ArticleList>
            {[...gists].reverse().map((gist) => (
              <li key={gist.slug}>
                <ArticleLink href={`/gists/${gist.slug}`} className="plain">
                  <Article>
                    <ArticleTitle>{gist.title}</ArticleTitle>
                    <p>{gist.description}</p>
                    <ArticleMetadata>
                      Published <PublicationDate date={gist.publishedAt} />
                    </ArticleMetadata>
                  </Article>
                </ArticleLink>
              </li>
            ))}
          </ArticleList>
        </StyledContainer>

        <Angle inverted />
      </main>

      {/** TODO: Custom gist footer (don't want phone number in there) */}
    </PageWrapper>
  )
}

export default GistsIndex
