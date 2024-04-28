import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Angle from '../../components/Angle'
import BaseHead from '../../components/BaseHead'
import Container from '../../components/Container'
import {
  GistMeta,
  GistTag,
  PublicationDate as PublicationDateType,
} from '../../components/Gist'
import Link from '../../components/Link'
import PageWrapper from '../../components/PageWrapper'
import PublicationDate from '../../components/PublicationDate'
import Tag from '../../components/Tag'
import absoluteUrl from '../../utils/absoluteUrl'

// TODO: topLevelAwait
export const gists = [
  require('./intro'),
  require('./license'),
  require('./how-to-detect-the-on-screen-keyboard-in-ios-safari'),
  require('./how-to-get-document-height-ios-safari-osk'),
  require('./the-security-implications-of-packages-in-frontend-apps'),
  require('./how-to-handle-array-values-in-react-hook-form'),
  require('./how-to-detect-google-translate-and-other-machine-translation'),
  require('./keeping-dependencies-up-to-date'),
] as Array<Promise<{ meta: GistMeta }>>

const filterUnpublished = (
  gist: GistMeta,
): gist is typeof gist & { publishedAt: PublicationDateType } =>
  gist.publishedAt !== undefined
// We do this client-side so we can avoid the hassle of having to generate new
// pages. We'll do that when we get enough articles to warrant it.
const makeFilterByTag = (tag: GistTag | undefined) => (gist: GistMeta) =>
  tag === undefined || gist.tags.includes(tag)

type SerializableGistMeta = Omit<GistMeta, 'titleReact'>

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    gists: (await Promise.all(gists))
      .map((gist) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { titleReact, ...serializableGistMeta } = gist.meta

        return serializableGistMeta
      })
      .filter(filterUnpublished),
  },
})

const Main = styled.main`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
`
const StyledContainer = styled(Container)`
  flex-grow: 1;
  padding-top: 100px;
  padding-bottom: 100px;
`
const Title = styled.h1``
const ArticleList = styled.ul`
  list-style: none;
  padding: 0;
`
const ArticleTitle = styled.h2(
  ({ theme }) => css`
    color: ${theme.colors.black};
    text-decoration: none;
    border-bottom: ${theme.spacing.x2}px solid ${theme.colors.black};
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
    padding-top: ${theme.spacing.x1}px;
    margin-top: -${theme.spacing.x1}px;
    hyphens: auto;
    font-size: 32px;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      hyphens: manual;
      font-size: 54px;
    }
  `,
)
const Article = styled.article<{ howTo?: boolean }>(({ theme, howTo }) => [
  css`
    margin-top: ${theme.spacing.x8}px;
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
  howTo &&
    css`
      border: 10px solid ${theme.colors.black};
      max-width: 90%;
      margin-left: auto;
      margin-right: auto;
      padding: ${theme.spacing.x2}px;
      font-size: 14px;
      margin-top: ${theme.spacing.x6}px;
      margin-bottom: ${theme.spacing.x6}px;

      @media (min-width: ${theme.breakpoints.TABLET}px) {
        padding: ${theme.spacing.x2}px ${theme.spacing.x3}px;
        font-size: 16px;

        ${ArticleTitle} {
          font-size: 32px;
          border-bottom: ${theme.spacing.x1}px solid ${theme.colors.black};
        }
      }
    `,
])
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
  gists: SerializableGistMeta[]
}

const GistsIndex = ({ gists }: Props) => {
  const { pathname, query } = useRouter()

  const tagToFilter = query.tag as GistTag | undefined
  const filteredGists = gists.filter(makeFilterByTag(tagToFilter)).reverse()

  return (
    <PageWrapper>
      <BaseHead
        title={`Gists by ${process.env.NEXT_PUBLIC_SITE_NAME_FALLBACK}`}
        description="Martijn Hols's gists are brief code snippets, opinions and answers to common questions and problems. Mostly about React and closely related things."
        absoluteUrl={absoluteUrl(pathname)}
      />

      <Main role="main">
        <Angle />

        <StyledContainer>
          <Title>Just the gists</Title>

          <ArticleList>
            {filteredGists.map((gist) => (
              <li key={gist.slug}>
                <ArticleLink href={`/gists/${gist.slug}`} className="plain">
                  <Article howTo={gist.tags.includes(GistTag.HowTo)}>
                    <ArticleTitle>{gist.title}</ArticleTitle>
                    <p>{gist.description}</p>
                    <ArticleMetadata>
                      <PublishedAt>
                        Published <PublicationDate date={gist.publishedAt} />
                      </PublishedAt>
                      <Tags>
                        {gist.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </Tags>
                    </ArticleMetadata>
                  </Article>
                </ArticleLink>
              </li>
            ))}
          </ArticleList>

          {tagToFilter && (
            <div>
              {filteredGists.length}{' '}
              {filteredGists.length === 1 ? 'result' : 'results'} for{' '}
              <Tag>{tagToFilter}</Tag> (<Link href={pathname}>show all</Link>)
            </div>
          )}
        </StyledContainer>

        <Angle inverted />
      </Main>

      {/** TODO: Custom gist footer (don't want phone number in there) */}
    </PageWrapper>
  )
}

export default GistsIndex
