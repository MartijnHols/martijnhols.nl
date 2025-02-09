import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { Fragment, ReactNode } from 'react'
import ImageInfo from '../utils/ImageInfo'
import CopyPasteOnly from './CopyPasteOnly'
import Link from './Link'
import Panel from './Panel'
import Tag from './Tag'

const Container = styled(Panel, {
  shouldForwardProp: (prop) =>
    prop !== 'highlighted' && prop !== 'isPlaceholder',
})<{
  highlighted?: boolean
  isPlaceholder?: boolean
}>(({ theme, highlighted, isPlaceholder }) => [
  css`
    --background: var(--yellow50);
    color: var(--black);
    // Top and bottom margins are not equal since the angle changes the visual
    // margin. I believe the left-most column is most important to appear
    // visually aligned.
    margin-top: ${theme.spacing.x5}px;
    margin-bottom: ${theme.spacing.x7}px;
    // Offset the padding so the code text aligns with the rest of the text
    margin-left: -${theme.spacing.x4}px;
    margin-right: -${theme.spacing.x4}px;
    padding: ${theme.spacing.x3}px ${theme.spacing.x4}px ${theme.spacing.x2}px;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      display: flex;
      gap: ${theme.spacing.x4}px;
    }
  `,
  highlighted &&
    css`
      @media (min-width: ${theme.breakpoints.TABLET}px) {
        margin-top: ${theme.spacing.x1 * 10}px;
        margin-bottom: ${theme.spacing.x1 * 10}px;
        transform: scale(1.1);

        & + & {
          margin-top: ${theme.spacing.x1 * 14}px;
        }
      }
    `,
  isPlaceholder &&
    css`
      opacity: 0.6;
      max-width: 750px;
      margin: 0 auto;
    `,
])
const Header = styled.h3`
  margin-top: 0;
  margin-bottom: 0.5em;
`
const Title = styled.div`
  margin-top: 0;
  margin-bottom: 0.1em;
`
const Period = styled.div(
  ({ theme }) => css`
    @media (min-width: ${theme.breakpoints.TABLET}px) {
      margin-top: 0.3em;
      margin-bottom: 1em;
    }
  `,
)
const Main = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-flow: column;
    gap: ${theme.spacing.x2}px;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      flex-flow: row;
      gap: ${theme.spacing.x4}px;
    }
  `,
)
const Thumbnail = styled.div(
  ({ theme }) => css`
    flex: 0 0 auto;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      max-width: 200px;
    }
  `,
)
const ThumbnailDesktop = styled(Thumbnail)(
  ({ theme }) => css`
    display: none;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      display: block;
    }
  `,
)
const ThumbnailMobile = styled(Thumbnail)(
  ({ theme }) => css`
    @media (min-width: ${theme.breakpoints.TABLET}px) {
      display: none;
    }
  `,
)
const ThumbnailImage = styled(Image)`
  object-fit: contain;
`
const ProjectExplanation = styled.div`
  flex: 1 1 auto;
`
const ProjectAbout = styled.div`
  // Cancel out paragraph margin
  margin-top: -1.25em;
  margin-bottom: 1.25em;
`
const Tech = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.x1}px;
    flex-wrap: wrap;
  `,
)
const ContactLinks = styled.div(
  ({ theme }) => css`
    margin-top: ${theme.spacing.x2}px;
  `,
)

interface Props {
  thumbnail?: ImageInfo
  functionTitle: string
  companyName: string
  started?: number
  ended?: string
  url?: string
  sourceCode?: string
  about: ReactNode
  tech: string[]
  highlighted?: boolean
  placeholder?: boolean
}

const ProjectBrief = ({
  thumbnail,
  functionTitle,
  companyName,
  started,
  ended,
  url,
  sourceCode,
  about,
  tech,
  highlighted,
  placeholder,
}: Props) => {
  const formatPeriod = (
    started: string | undefined,
    ended: string | undefined,
  ) => {
    if (!started) {
      return ended
    }
    if (!ended) {
      return started
    }
    if (started === ended) {
      return ended
    }
    return `${started} - ${ended}`
  }

  return (
    <Container
      as="article"
      boxShadow={false}
      highlighted={highlighted}
      isPlaceholder={placeholder}
    >
      <div>
        <Period>{formatPeriod(String(started), ended)}</Period>
        {thumbnail && (
          <ThumbnailDesktop>
            <ThumbnailImage
              src={thumbnail}
              alt={thumbnail.alt ?? companyName}
              width={100}
              height={100}
            />
          </ThumbnailDesktop>
        )}
      </div>
      <div>
        <Header>
          <Title>
            {functionTitle} @ {companyName}
          </Title>
        </Header>
        <Main>
          {thumbnail && (
            <ThumbnailMobile>
              <ThumbnailImage
                src={thumbnail}
                alt={thumbnail.alt ?? companyName}
                width={100}
                height={100}
              />
            </ThumbnailMobile>
          )}
          <ProjectExplanation>
            <ProjectAbout>{about}</ProjectAbout>
            <Tech>
              {tech.map((item, index) => (
                <Fragment key={item}>
                  <Tag>{item}</Tag>
                  {index !== tech.length - 1 && (
                    <CopyPasteOnly>, </CopyPasteOnly>
                  )}
                </Fragment>
              ))}
            </Tech>
            {(url || sourceCode) && (
              <ContactLinks>
                {url && <Link href={url}>Bezoeken</Link>}
                {url && sourceCode && <span>{' | '}</span>}
                {sourceCode && <Link href={sourceCode}>Broncode</Link>}
              </ContactLinks>
            )}
          </ProjectExplanation>
        </Main>
      </div>
    </Container>
  )
}

export default ProjectBrief
