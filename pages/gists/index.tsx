import styled from '@emotion/styled'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Angle from '../../components/Angle'
import BaseHead from '../../components/BaseHead'
import Container from '../../components/Container'
import GistCard from '../../components/GistCard'
import GistMeta, {
  GistTag,
  PublicationDate as PublicationDateType,
  SerializableGistMeta,
} from '../../components/GistMeta'
import Link from '../../components/Link'
import PageWrapper from '../../components/PageWrapper'
import Tag from '../../components/Tag'
import TopBar from '../../components/TopBar'
import absoluteUrl from '../../utils/absoluteUrl'
import generateRssFeed from '../../utils/generateRssFeed'

// TODO: topLevelAwait
export const gists = [
  import('./intro'),
  import('./license'),
  import('./how-to-detect-the-on-screen-keyboard-in-ios-safari'),
  import('./how-to-get-document-height-ios-safari-osk'),
  import('./the-security-implications-of-packages-in-frontend-apps'),
  import('./how-to-detect-google-translate-and-other-machine-translation'),
  import('./keeping-dependencies-up-to-date'),
  import('./how-to-handle-array-values-in-react-hook-form'),
  import('./everything-about-google-translate-crashing-react'),
  import('./how-to-write-a-good-git-commit-message'),
  import('./you-dont-need-lodash'),
] as Array<Promise<{ meta: GistMeta }>>

export const filterUnpublished = (
  gist: GistMeta,
): gist is typeof gist & { publishedAt: PublicationDateType } =>
  gist.publishedAt !== undefined
// We do this client-side so we can avoid the hassle of having to generate new
// pages. We'll do that when we get enough articles to warrant it.
const makeFilterByTag = (tag: GistTag | undefined) => (gist: GistMeta) =>
  tag === undefined || gist.tags.includes(tag)

export const getStaticProps: GetStaticProps<Props> = async () => {
  await generateRssFeed()

  return {
    props: {
      gists: (await Promise.all(gists))
        .map((gist) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { titleReact, relatedGist, ...serializableGistMeta } = gist.meta

          return serializableGistMeta
        })
        .filter(filterUnpublished),
    },
  }
}

const Main = styled.main`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
`
const StyledContainer = styled(Container)`
  flex-grow: 1;
  padding-top: 100px;
  padding-bottom: 100px;
  overflow: hidden;
`
const Title = styled.h1``
const ArticleList = styled.ul`
  list-style: none;
  padding: 0;
`

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
        <TopBar>
          By <Link href="/">Martijn Hols</Link>
        </TopBar>

        <StyledContainer>
          <Title>Just the gists</Title>

          <ArticleList>
            {filteredGists.map((gist) => (
              <li key={gist.slug}>
                <GistCard gist={gist} />
              </li>
            ))}
          </ArticleList>

          {tagToFilter && (
            <div key={filteredGists.length}>
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
