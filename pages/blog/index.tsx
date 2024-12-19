import styled from '@emotion/styled'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Angle from '../../components/Angle'
import BaseHead from '../../components/BaseHead'
import BlogArticleCard from '../../components/BlogArticleCard'
import BlogArticleMeta, {
  BlogArticleTag,
  PublicationDate as PublicationDateType,
  SerializableBlogArticleMeta,
} from '../../components/BlogArticleMeta'
import Container from '../../components/Container'
import Link from '../../components/Link'
import PageWrapper from '../../components/PageWrapper'
import Tag from '../../components/Tag'
import TopBar from '../../components/TopBar'
import absoluteUrl from '../../utils/absoluteUrl'
import generateRssFeed from '../../utils/generateRssFeed'

// TODO: topLevelAwait
export const articles = [
  import('./intro'),
  import('./license'),
  import('./how-to-detect-the-on-screen-keyboard-in-ios-safari'),
  import('./how-to-get-document-height-ios-safari-osk'),
  import('./the-security-risks-of-front-end-dependencies'),
  import('./how-to-detect-google-translate-and-other-machine-translation'),
  import('./keeping-dependencies-up-to-date'),
  import('./how-to-handle-array-values-in-react-hook-form'),
  import('./everything-about-google-translate-crashing-react'),
  import('./how-to-write-a-good-git-commit-message'),
  import('./you-dont-need-lodash'),
  import('./how-to-add-copy-paste-only-text-in-html-react'),
] as Array<Promise<{ meta: BlogArticleMeta }>>

export const filterUnpublished = (
  article: BlogArticleMeta,
): article is typeof article & { publishedAt: PublicationDateType } =>
  article.publishedAt !== undefined
// We do this client-side so we can avoid the hassle of having to generate new
// pages. We'll do that when we get enough articles to warrant it.
const makeFilterByTag =
  (tag: BlogArticleTag | undefined) => (article: BlogArticleMeta) =>
    tag === undefined || article.tags.includes(tag)

export const getStaticProps: GetStaticProps<Props> = async () => {
  await generateRssFeed()

  return {
    props: {
      articles: (await Promise.all(articles))
        .map((file) => file.meta)
        .filter(filterUnpublished)
        .map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ titleReact, relatedArticle, ...serializableArticleMeta }) =>
            serializableArticleMeta,
        )
        .sort((a, b) =>
          (a.republishedAt ?? a.publishedAt).localeCompare(
            b.republishedAt ?? b.publishedAt,
          ),
        ),
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
  articles: SerializableBlogArticleMeta[]
}

const BlogIndex = ({ articles }: Props) => {
  const { pathname, query } = useRouter()

  const tagToFilter = query.tag as BlogArticleTag | undefined
  const filteredArticles = articles
    .filter(makeFilterByTag(tagToFilter))
    .reverse()

  return (
    <PageWrapper>
      <BaseHead
        title={`Blog by ${process.env.NEXT_PUBLIC_SITE_NAME_FALLBACK}`}
        description="My blog where I post articles on React, TypeScript, JavaScript and related subjects. I post deep dives, brief code snippets, opinions, etc.."
        absoluteUrl={absoluteUrl(pathname)}
      />

      <Main role="main">
        <TopBar>
          By <Link href="/">Martijn Hols</Link>
        </TopBar>

        <StyledContainer>
          <Title>Blog.</Title>

          <ArticleList>
            {filteredArticles.map((article) => (
              <li key={article.slug}>
                <BlogArticleCard article={article} />
              </li>
            ))}
          </ArticleList>

          {tagToFilter && (
            <div key={filteredArticles.length}>
              {filteredArticles.length}{' '}
              {filteredArticles.length === 1 ? 'result' : 'results'} for{' '}
              <Tag>{tagToFilter}</Tag> (<Link href={pathname}>show all</Link>)
            </div>
          )}
        </StyledContainer>

        <Angle inverted />
      </Main>

      {/** TODO: Custom blog footer (don't want phone number in there) */}
    </PageWrapper>
  )
}

export default BlogIndex