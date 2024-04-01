import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import absoluteUrl from '../utils/absoluteUrl'
import BaseHead from './BaseHead'
import Container from './Container'
import PageWrapper from './PageWrapper'
import PublicationDateComponent from './PublicationDate'

const StyledContainer = styled(Container)(
  ({ theme }) => css`
    padding-top: 100px;
    padding-bottom: 100px;
    // This width makes code snippet width match the column width I use in my
    // IDE perfectly
    max-width: 1010px;
    font-size: 16px;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 18px;
    }

    // I kind of want to make this global, but I reckon "bolder" is safer
    p strong {
      font-weight: 800;
    }
  `,
)
const Title = styled.h1(
  ({ theme }) => css`
    font-size: ${theme.headings.h2};
    font-size: 42px;
    font-weight: 1000;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 64px;
    }
    @media (min-width: ${theme.breakpoints.DESKTOP}px) {
      font-size: 80px;
      line-height: 1.2;
    }
  `,
)
const ArticleHeader = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.x2}px;
    flex-flow: column;
    align-items: flex-start;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      flex-flow: row;
      align-items: flex-end;
    }
  `,
)
const ArticleMetadata = styled.div(
  ({ theme }) => css`
    @media (min-width: ${theme.breakpoints.TABLET}px) {
      flex-grow: 1;
      text-align: right;
    }
  `,
)

type PublishedAtYear = `20${number}${number}`
type PublishedAtMonth = `${0 | 1}${number}`
type PublishedAtDay = `${0 | 1 | 2 | 3}${number}`
// Overcomplicated type to avoid publishing with an invalid date
export type PublicationDate =
  `${PublishedAtYear}-${PublishedAtMonth}-${PublishedAtDay}`

interface Props {
  title: string
  description: string
  publishedAt: PublicationDate
  children: ReactNode
}

const Gist = ({ title, description, publishedAt, children }: Props) => {
  const { pathname } = useRouter()

  return (
    <PageWrapper>
      <BaseHead
        title={`${title} by ${process.env.NEXT_PUBLIC_SITE_NAME_FALLBACK}`}
        description={description}
        absoluteUrl={absoluteUrl(pathname)}
      />

      <StyledContainer as="article">
        <ArticleHeader>
          <div>
            <Link href="/gists">← More gists</Link>
          </div>
          <ArticleMetadata>
            Published <PublicationDateComponent date={publishedAt} /> by{' '}
            <Link href="/">Martijn Hols</Link>
          </ArticleMetadata>
        </ArticleHeader>
        <Title>{title}</Title>
        {children}
      </StyledContainer>

      {/** TODO: Custom gist footer (don't want phone number in there) */}
    </PageWrapper>
  )
}

export default Gist
