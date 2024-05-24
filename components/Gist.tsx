import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode, useRef, useState } from 'react'
import absoluteUrl from '../utils/absoluteUrl'
import Angle from './Angle'
import BaseHead from './BaseHead'
import Container from './Container'
import GistMeta from './GistMeta'
import useIntersectionObserver from './IntersectionObserver'
import Link from './Link'
import MoreLikeThis from './MoreLikeThis'
import PageWrapper from './PageWrapper'
import PortalTarget from './PortalTarget'
import PublicationDateComponent from './PublicationDate'
import Tag from './Tag'
import TopBar from './TopBar'

const ArticleContent = styled(Container)(
  ({ theme }) => css`
    padding-top: ${theme.spacing.x10}px;
    padding-bottom: ${theme.spacing.x10}px;
    // This width makes code snippet width match the column width I use in my
    // IDE perfectly
    max-width: 57em;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 112.5%;
    }

    img {
      max-width: 100%;
      height: auto;
    }

    p,
    ul {
      list-style: none;

      > li {
        margin: 0.5em 0;
        position: relative;

        ::before {
          content: '';
          display: block;
          position: absolute;
          top: 0.7em;
          height: 4px;
          width: 20px;
          background: ${theme.colors.black};
          transform: skew(-15deg);
          margin-right: 1em;
          margin-left: -2em;
        }
      }
    }
  `,
)
const MainArticleContent = styled(ArticleContent)(
  ({ theme }) => css`
    @media (min-width: ${theme.breakpoints.TABLET}px) {
      padding-top: ${theme.spacing.x1 * 20}px;
    }
  `,
)
const Addendum = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.black};
    color: ${theme.colors.white};

    ${ArticleContent} {
      > h2:first-of-type {
        margin-top: 0;
      }
    }
  `,
)
const Title = styled.h1(
  ({ theme }) => css`
    font-size: 2.9em;
    margin-top: 0.05em;
    margin-bottom: 0.5em;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 3.5em;
    }
    @media (min-width: ${theme.breakpoints.DESKTOP}px) {
      font-size: 4em;
    }
  `,
)
const ArticleHeader = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.x2}px;
    align-items: flex-end;
  `,
)
const ArticleMetadata = styled.div`
  flex-grow: 1;
  text-align: right;
`
const Tags = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.x1}px;
    flex-wrap: wrap;
    margin-top: ${theme.spacing.x4}px;
  `,
)
const Footer = styled.footer(
  ({ theme }) => css`
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    text-align: right;
    padding-bottom: ${theme.spacing.x4}px;
  `,
)

interface Props {
  gist: GistMeta
  // Async to avoid circular reference issues
  relatedGist?: Promise<{ meta: GistMeta }>
  children: ReactNode
  addendum?: ReactNode
}

const Gist = ({ gist, children, addendum }: Props) => {
  const {
    title,
    titleReact,
    description,
    image,
    publishedAt,
    updatedAt,
    tags,
  } = gist
  const { pathname } = useRouter()

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

  return (
    <PageWrapper>
      <BaseHead
        title={`${title} by ${process.env.NEXT_PUBLIC_SITE_NAME_FALLBACK}`}
        description={description}
        image={image}
        absoluteUrl={absoluteUrl(pathname)}
        type="article"
      />
      <Head>
        <meta property="article:published_time" content={publishedAt} />
        <meta
          property="article:modified_time"
          content={updatedAt ?? publishedAt}
        />
      </Head>

      <TopBar>
        <Link href="/gists">Gists</Link> by <Link href="/">Martijn Hols</Link>
      </TopBar>

      <article>
        <MainArticleContent>
          <ArticleHeader>
            <div>
              <Link href="/gists">← More gists</Link>
            </div>
            <ArticleMetadata>
              Published{' '}
              {publishedAt ? (
                <PublicationDateComponent date={publishedAt} />
              ) : (
                'N/A'
              )}
            </ArticleMetadata>
          </ArticleHeader>

          <Title>{titleReact ?? title}</Title>

          {/** Portal target so tooltips can share base article styling (mostly font-size) */}
          <PortalTarget>{children}</PortalTarget>

          <div ref={intersectionObserverRef} />

          <Tags>
            {tags.map((tag) => (
              <Link key={tag} href={`/gists?tag=${tag}`} className="plain">
                <Tag>{tag}</Tag>
              </Link>
            ))}
          </Tags>
        </MainArticleContent>

        {addendum && (
          <>
            <Angle inverted />
            <Addendum className="inverted" id="addendum">
              <ArticleContent>{addendum}</ArticleContent>
            </Addendum>
            <Angle />
          </>
        )}
      </article>

      <MoreLikeThis gist={gist} />

      <Angle inverted />

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

export default Gist
