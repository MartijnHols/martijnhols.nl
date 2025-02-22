import styled from '@emotion/styled'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import AboutMeBriefPanel from '../../components/AboutMeBriefPanel'
import AngleTop from '../../components/AngleTop'
import BaseHead from '../../components/BaseHead'
import BlogArticleMeta, {
  BlogArticleTag,
  PublicationDate,
  SerializableBlogArticleMeta,
} from '../../components/BlogArticleMeta'
import BlogListArticleCard from '../../components/BlogListArticleCard'
import Container from '../../components/Container'
import Link from '../../components/Link'
import PageWrapper from '../../components/PageWrapper'
import Tag from '../../components/Tag'
import Tooltip from '../../components/Tooltip'
import TopBar from '../../components/TopBar'
import { breakpoints } from '../../theme'
import absoluteUrl from '../../utils/absoluteUrl'
import openGraphImage from './assets/ogimage-blog.png'
import RssFeedIcon from './assets/rss.svg'

const articles = [
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
  import('./accessibility-essentials-every-front-end-developer-should-know'),
  import('./the-european-accessibility-act-for-websites-and-apps'),
] as Promise<{ meta: BlogArticleMeta }>[]

export const getArticles = async () =>
  await Promise.all(
    articles.map((promise) => promise.then((file) => file.meta)),
  )
export const getPublishedArticles = async () =>
  (await getArticles()).filter(publishedFilter)

export type PublishedArticle = BlogArticleMeta & {
  publishedAt: PublicationDate
}
export const publishedFilter = (
  article: BlogArticleMeta,
): article is PublishedArticle => article.publishedAt !== undefined

// We do this client-side so we can avoid the hassle of having to generate new
// pages. We'll do that when we get enough articles to warrant it.
const makeFilterByTag =
  (tag: BlogArticleTag | undefined) => (article: BlogArticleMeta) =>
    tag === undefined || article.tags.includes(tag)

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    articles: (await getPublishedArticles()).sort((a, b) =>
      (a.republishedAt ?? a.publishedAt).localeCompare(
        b.republishedAt ?? b.publishedAt,
      ),
    ),
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
const ArticleListFooter = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: column;
  gap: 1em;

  @media (min-width: ${breakpoints.TABLET}px) {
    flex-flow: row;
  }
`
const StyledAboutMeBriefPanel = styled(AboutMeBriefPanel)`
  flex: 1 1 auto;

  @media (min-width: ${breakpoints.TABLET}px) {
    max-width: 700px;
    margin-right: 0;
    margin-top: 0;
  }
`
const StyledRssFeedLink = styled(Link)`
  display: inline-block;
`
const StyledRssFeedIcon = styled(RssFeedIcon)`
  width: 2em;
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
        image={{
          ...openGraphImage,
          alt: "Martijn's blog about React, TypeScript and front-end (by Martijn Hols)",
        }}
        absoluteUrl={absoluteUrl(
          tagToFilter ? `${pathname}?tag=${tagToFilter}` : pathname,
        )}
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
                <BlogListArticleCard article={article} />
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

          <ArticleListFooter>
            <StyledAboutMeBriefPanel />
            <Tooltip content="RSS Feed">
              {({ props }) => (
                <StyledRssFeedLink
                  {...props}
                  href="/rss.xml"
                  className="plain"
                  aria-label="RSS Feed"
                >
                  <StyledRssFeedIcon aria-hidden />
                </StyledRssFeedLink>
              )}
            </Tooltip>
          </ArticleListFooter>
        </StyledContainer>

        <AngleTop />
      </Main>

      {/** TODO: Custom blog footer (don't want phone number in there) */}
    </PageWrapper>
  )
}

export default BlogIndex
