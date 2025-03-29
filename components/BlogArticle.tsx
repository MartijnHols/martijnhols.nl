import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useRef, useState } from 'react'
import { breakpoints } from '../theme'
import absoluteUrl from '../utils/absoluteUrl'
import AngleBottom from './AngleBottom'
import AngleTop from './AngleTop'
import Annotation from './Annotation'
import BaseHead from './BaseHead'
import BlogArticleMeta from './BlogArticleMeta'
import BlogArticlePublicationDate from './BlogArticlePublicationDate'
import BlogArticleSocials from './BlogArticleSocials'
import BlogRelatedArticles from './BlogRelatedArticles'
import Container from './Container'
import CopyPasteOnly from './CopyPasteOnly'
import useIntersectionObserver from './IntersectionObserver'
import Link from './Link'
import PageWrapper from './PageWrapper'
import PortalTarget from './PortalTarget'
import Tag from './Tag'
import TopBar from './TopBar'

const ArticleContent = styled(Container)`
  padding-top: var(--spacing10);
  padding-bottom: var(--spacing10);
  // This width makes code snippet width match the column width I use in my
  // IDE perfectly
  max-width: 57em;
  text-wrap: pretty;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 112.5%;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`
const MainArticleContent = styled(ArticleContent)`
  @media (min-width: ${breakpoints.TABLET}px) {
    padding-top: calc(var(--spacing1) * 20);
  }
`
const Addendum = styled.div`
  background: var(--black);
  color: var(--white);

  ${ArticleContent} {
    > h2:first-of-type {
      margin-top: 0;
    }
    > p:last-of-type {
      margin-bottom: 0;
    }
  }
`
const Title = styled.h1`
  font-size: 2.9em;
  margin-top: 0.05em;
  margin-bottom: 0.5em;
  text-wrap: pretty;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 3.5em;
  }
  @media (min-width: ${breakpoints.DESKTOP}px) {
    font-size: 4em;
  }
`
const ArticleHeader = styled.div`
  display: flex;
  gap: var(--spacing2);
  align-items: flex-end;
`
const ArticleMetadata = styled.div`
  flex-grow: 1;
  text-align: right;
`
const ArticleFooter = styled.div`
  display: flex;
  flex-flow: column;
  gap: var(--spacing2);
  margin-top: var(--spacing4);

  @media (min-width: ${breakpoints.MOBILE_LARGE}px) {
    flex-flow: row;
  }
`
const Tags = styled.div`
  margin-top: var(--spacing1);
  flex: 1 0 auto;
  display: flex;
  gap: var(--spacing1);
  flex-wrap: wrap;
`
const StyledBlogMoreLikeThis = styled(BlogRelatedArticles)`
  margin-top: 2em;

  @media (min-width: ${breakpoints.TABLET}px) {
    margin-top: 5em;
  }
`
const Footer = styled.footer`
  background: var(--black);
  color: var(--white);
  text-align: right;
  padding-bottom: var(--spacing4);
`

export const articlePublicationDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))

interface Props {
  article: BlogArticleMeta
  relatedArticles: BlogArticleMeta[]
  /** An optional alternative rendering of the title-string. */
  titleReact?: ReactNode
  children: ReactNode
  addendum?: ReactNode
}

const BlogArticle = ({
  article,
  relatedArticles,
  titleReact,
  children,
  addendum,
}: Props) => {
  const {
    title,
    description,
    openGraphImage,
    publishedAt,
    republishedAt,
    republishedReason,
    updatedAt,
    tags,
    socials = [],
  } = article
  const { pathname } = useRouter()

  const [startReading] = useState(() => Date.now())
  const hasFinishedReading = useRef(false)
  const intersectionObserverRef = useIntersectionObserver(
    useCallback(
      (isIntersecting) => {
        if (!isIntersecting) {
          return
        }
        if (hasFinishedReading.current) {
          return
        }
        const readingTime = (Date.now() - startReading) / 1000
        if (readingTime < 15) {
          // Too short to be considered a read
          return
        }
        window.plausible?.('Finished reading')
        hasFinishedReading.current = true
      },
      [startReading],
    ),
  )

  const shownPublishedAt = republishedAt ?? publishedAt

  return (
    <PageWrapper>
      <BaseHead
        title={`${title} by ${process.env.NEXT_PUBLIC_SITE_NAME_FALLBACK}`}
        description={description}
        image={openGraphImage}
        absoluteUrl={absoluteUrl(pathname)}
        type="article"
      />
      <Head>
        <meta property="article:published_time" content={shownPublishedAt} />
        <meta
          property="article:modified_time"
          content={updatedAt ?? shownPublishedAt}
        />
      </Head>

      <TopBar>
        <Link href="/blog">Blog</Link> by <Link href="/">Martijn Hols</Link>
      </TopBar>

      <article>
        <MainArticleContent className="content">
          <ArticleHeader>
            <div>
              <Link
                href="/blog"
                css={css`
                  white-space: nowrap;
                `}
              >
                ← Blog index
              </Link>
            </div>
            <ArticleMetadata>
              {republishedAt && publishedAt ? (
                <>
                  <Annotation
                    annotation={`Originaly published at ${publishedAt}, republished ${republishedAt}. ${republishedReason ?? ''}`}
                  >
                    {articlePublicationDate(republishedAt)}
                  </Annotation>
                </>
              ) : (
                <>
                  {publishedAt && (
                    <BlogArticlePublicationDate date={publishedAt} />
                  )}
                </>
              )}
            </ArticleMetadata>
          </ArticleHeader>

          <Title>{titleReact ?? title}</Title>
          <CopyPasteOnly>
            <br />
          </CopyPasteOnly>

          {/** Portal target so tooltips can share base article styling (mostly font-size) */}
          <PortalTarget>{children}</PortalTarget>

          <div ref={intersectionObserverRef} />

          <ArticleFooter>
            <Tags>
              {tags.map((tag) => (
                <Link key={tag} href={`/blog?tag=${tag}`} className="plain">
                  <Tag>{tag}</Tag>
                </Link>
              ))}
            </Tags>
            <BlogArticleSocials socials={socials} />
          </ArticleFooter>
        </MainArticleContent>

        {addendum && (
          <>
            <AngleTop />
            <Addendum className="inverted" id="addendum">
              <ArticleContent className="content">{addendum}</ArticleContent>
            </Addendum>
            <AngleBottom />
          </>
        )}
      </article>

      <StyledBlogMoreLikeThis relatedArticles={relatedArticles} />

      <AngleTop />

      <Footer>
        <Container className="inverted">
          Feedback:{' '}
          <a href="https://twitter.com/MartijnHols">
            https://twitter.com/MartijnHols
          </a>
        </Container>
      </Footer>
    </PageWrapper>
  )
}

export default BlogArticle
