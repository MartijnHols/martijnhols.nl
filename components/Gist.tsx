import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Head from 'next/head'
import { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import { ReactNode, useRef, useState } from 'react'
import absoluteUrl from '../utils/absoluteUrl'
import Angle from './Angle'
import BaseHead from './BaseHead'
import Container from './Container'
import useIntersectionObserver from './IntersectionObserver'
import Link from './Link'
import PageWrapper from './PageWrapper'
import PortalTarget from './PortalTarget'
import PublicationDateComponent from './PublicationDate'
import Tag from './Tag'
import TopBar from './TopBar'

export const enum GistTag {
  // Types:
  Meta = 'meta',
  HowTo = 'how-to',
  Basics = 'basics',
  // Tags:
  React = 'react',
  ReactHookForm = 'react-hook-form',
  Security = 'security',
  Dependencies = 'dependencies',
  MachineTranslation = 'machine-translation',
  Ios = 'ios',
  Safari = 'safari',
  Javascript = 'javascript',
}

type PublishedAtYear = `20${number}${number}`
type PublishedAtMonth = `${0 | 1}${number}`
type PublishedAtDay = `${0 | 1 | 2 | 3}${number}`
// Overcomplicated type to avoid publishing with an invalid date
export type PublicationDate =
  `${PublishedAtYear}-${PublishedAtMonth}-${PublishedAtDay}`

export interface GistMeta {
  slug: string
  title: string
  /** An optional alternative rendering of the title-string. */
  titleReact?: ReactNode
  description: string
  image?: StaticImageData
  publishedAt?: PublicationDate
  updatedAt?: PublicationDate
  tags: GistTag[]
}

const StyledContainer = styled(Container)(
  ({ theme }) => css`
    padding-top: ${theme.spacing.x10}px;
    padding-bottom: ${theme.spacing.x10}px;
    // This width makes code snippet width match the column width I use in my
    // IDE perfectly
    max-width: 57em;
    overflow: hidden;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 112.5%;
      padding-top: ${theme.spacing.x1 * 20}px;
      padding-bottom: ${theme.spacing.x1 * 20}px;
    }

    img {
      max-width: 100%;
      height: auto;
    }
  `,
)
const Title = styled.h1(
  ({ theme }) => css`
    font-size: 2.9em;
    margin-bottom: ${theme.spacing.x2}px;
    // Move the title a bit to the left so the bottom of the (rotated) text
    // aligns with the first paragraph
    margin-left: -3px;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 3.5em;
    }
    @media (min-width: ${theme.breakpoints.DESKTOP}px) {
      font-size: 4.4em;
      line-height: 1.2;
      margin-left: -4px;
    }
  `,
)
const ArticleHeader = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.x2}px;
    align-items: flex-end;
    transform: rotate(-1deg);
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
  title: string
  titleReact?: ReactNode
  description: string
  image?: StaticImageData
  publishedAt?: PublicationDate
  updatedAt?: PublicationDate
  tags: string[]
  children: ReactNode
}

const Gist = ({
  title,
  titleReact,
  description,
  image,
  publishedAt,
  updatedAt,
  tags,
  children,
}: Props) => {
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

      <StyledContainer as="article">
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
      </StyledContainer>

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
