import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode, useRef, useState } from 'react'
import { breakpoints } from '../theme'
import absoluteUrl from '../utils/absoluteUrl'
import getRelativeTimeStringDays from '../utils/getRelativeTimeStringDays'
import AngleBottom from './AngleBottom'
import AngleTop from './AngleTop'
import Annotation from './Annotation'
import BaseHead from './BaseHead'
import BlogArticleMeta from './BlogArticleMeta'
import BlogRelatedArticles from './BlogRelatedArticles'
import Container from './Container'
import CopyPasteOnly from './CopyPasteOnly'
import useIntersectionObserver from './IntersectionObserver'
import Link from './Link'
import PageWrapper from './PageWrapper'
import PortalTarget from './PortalTarget'
import RelativeDate from './RelativeDate'
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
  text-wrap: balance;

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
const Tags = styled.div`
  display: flex;
  gap: var(--spacing1);
  flex-wrap: wrap;
  margin-top: var(--spacing4);
`
const StyledBlogMoreLikeThis = styled(BlogRelatedArticles)`
  margin-top: 5em;
`
const Footer = styled.footer`
  background: var(--black);
  color: var(--white);
  text-align: right;
  padding-bottom: var(--spacing4);
`

interface Props {
  article: BlogArticleMeta
  relatedArticles: BlogArticleMeta[]
  /** An optional alternative rendering of the title-string. */
  titleReact?: ReactNode
  children: ReactNode
  addendum?: ReactNode
}

const a = window.navigator.userAgent.includes('bot')

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
  } = article
  const { pathname } = useRouter()

  if (a) {
    return null
  }

  const [startReading] = useState(() => Date.now())
  const hasFinishedReading = useRef(false)
  const intersectionObserverRef = useIntersectionObserver((isIntersecting) => {
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
  })

  const shownPublishedAt = republishedAt ?? publishedAt
  const isUpdatedAtDifferent =
    shownPublishedAt &&
    updatedAt &&
    getRelativeTimeStringDays(new Date(updatedAt)) !==
      getRelativeTimeStringDays(new Date(shownPublishedAt))

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
                    Republished
                  </Annotation>{' '}
                  <RelativeDate date={republishedAt} />
                </>
              ) : (
                <>
                  Published{' '}
                  {publishedAt ? <RelativeDate date={publishedAt} /> : 'N/A'}
                </>
              )}
              {updatedAt && isUpdatedAtDifferent && (
                <>
                  ,{' '}
                  <span
                    css={css`
                      white-space: nowrap;
                    `}
                  >
                    updated <RelativeDate date={updatedAt} />
                  </span>
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

          <Tags>
            {tags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${tag}`} className="plain">
                <Tag>{tag}</Tag>
              </Link>
            ))}
          </Tags>
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
