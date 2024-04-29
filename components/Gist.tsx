import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import absoluteUrl from '../utils/absoluteUrl'
import Angle from './Angle'
import BaseHead from './BaseHead'
import Container from './Container'
import Link from './Link'
import PageWrapper from './PageWrapper'
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
    max-width: 1010px;
    font-size: 16px;
    overflow: hidden;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 18px;
      padding-top: ${theme.spacing.x1 * 20}px;
      padding-bottom: ${theme.spacing.x1 * 20}px;
    }

    p strong {
      background: ${theme.colors.yellow};
      padding: 3px 2px;

      &::selection {
        background-color: #bea500;
      }
    }
    img {
      max-width: 100%;
      height: auto;
    }
    figure {
      margin: ${theme.spacing.x2}px;
    }
  `,
)
const Title = styled.h1(
  ({ theme }) => css`
    font-size: 46px;
    margin-bottom: ${theme.spacing.x2}px;
    // Move the title a bit to the left so the bottom of the (rotated) text
    // aligns with the first paragraph
    margin-left: -3px;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 64px;
    }
    @media (min-width: ${theme.breakpoints.DESKTOP}px) {
      font-size: 80px;
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
  tags: string[]
  children: ReactNode
}

const Gist = ({
  title,
  titleReact,
  description,
  image,
  publishedAt,
  tags,
  children,
}: Props) => {
  const { pathname } = useRouter()

  return (
    <PageWrapper>
      <BaseHead
        title={`${title} by ${process.env.NEXT_PUBLIC_SITE_NAME_FALLBACK}`}
        description={description}
        image={image}
        absoluteUrl={absoluteUrl(pathname)}
      />

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

        {children}

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
