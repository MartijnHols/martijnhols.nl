import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { Fragment, ReactNode, useState } from 'react'
import { breakpoints } from '../theme'
import ImageInfo from '../utils/ImageInfo'
import CopyPasteOnly from './CopyPasteOnly'
import Link from './Link'
import Panel from './Panel'
import Tag from './Tag'

const Container = styled(Panel)`
  --background: var(--yellow50);
  color: var(--black);
  // Top and bottom margins are not equal since the angle changes the visual
  // margin. I believe the left-most column is most important to appear
  // visually aligned.
  margin-top: var(--spacing5);
  margin-bottom: var(--spacing7);
  // Offset the padding so the code text aligns with the rest of the text
  margin-left: calc(var(--spacing2) * -1);
  margin-right: calc(var(--spacing2) * -1);
  padding: var(--spacing3) var(--spacing4) var(--spacing2);

  @media (min-width: ${breakpoints.TABLET}px) {
    display: flex;
    gap: var(--spacing4);
    margin-left: 0;
    margin-right: 0;
  }
  @media (min-width: ${breakpoints.DESKTOP_LARGE}px) {
    display: flex;
    gap: var(--spacing4);
    // Offset the padding so the code text aligns with the rest of the text
    margin-left: calc(var(--spacing4) * -1);
    margin-right: calc(var(--spacing4) * -1);
  }
`
const highlightedCss = css`
  @media (min-width: ${breakpoints.TABLET}px) {
    margin-top: calc(var(--spacing1) * 10);
    margin-bottom: calc(var(--spacing1) * 10);
    transform: scale(1.1);

    & + & {
      margin-top: calc(var(--spacing1) * 14);
    }
  }
`
const placeholderCss = css`
  opacity: 0.6;
  max-width: 750px;
  margin: 0 auto;
`
const Header = styled.h3`
  margin-top: 0;
  margin-bottom: 0.5em;
`
const Title = styled.div`
  display: grid;
  margin-top: 0;
  margin-bottom: 0.1em;
`
const TitleText = styled.span`
  grid-area: 1 / 1;

  &[aria-hidden='true'] {
    visibility: hidden;
  }
`
const Period = styled.div`
  @media (min-width: ${breakpoints.TABLET}px) {
    margin-top: 0.3em;
    margin-bottom: 1em;
  }
`
const Main = styled.div`
  display: flex;
  flex-flow: column;
  gap: var(--spacing2);

  @media (min-width: ${breakpoints.TABLET}px) {
    flex-flow: row;
    gap: var(--spacing4);
  }
`
const Thumbnail = styled.div`
  flex: 0 0 auto;

  @media (min-width: ${breakpoints.TABLET}px) {
    max-width: 200px;
  }
`
const ThumbnailDesktop = styled(Thumbnail)`
  display: none;

  @media (min-width: ${breakpoints.TABLET}px) {
    display: block;
  }
`
const ThumbnailMobile = styled(Thumbnail)`
  @media (min-width: ${breakpoints.TABLET}px) {
    display: none;
  }
`
const ThumbnailImage = styled(Image)`
  object-fit: contain;
`
const ThumbnailPlaceholder = styled.span`
  display: inline-block;
  width: 100px;
  height: 100px;
`
const ProjectExplanation = styled.div`
  flex: 1 1 auto;
`
const ProjectAbout = styled.div`
  // Cancel out paragraph margin
  margin-top: -1.25em;
  margin-bottom: -0.5em;
`
const Tech = styled.div`
  display: flex;
  gap: var(--spacing1);
  flex-wrap: wrap;
  font-size: 0.8125em;
`
const ContactLinks = styled.div`
  margin-top: var(--spacing2);
`

interface Props {
  thumbnail?: ImageInfo
  thumbnailOnInteraction?: boolean
  functionTitle: string
  companyName: string
  companyNameOnInteraction?: string
  started?: number
  ended?: string
  url?: string
  onVisit?: () => void
  sourceCode?: string
  about: ReactNode
  aside?: ReactNode
  tech: string[]
  highlighted?: boolean
  placeholder?: boolean
}

const ProjectBrief = ({
  thumbnail,
  thumbnailOnInteraction,
  functionTitle,
  companyName,
  companyNameOnInteraction,
  started,
  ended,
  url,
  onVisit,
  sourceCode,
  about,
  aside,
  tech,
  highlighted,
  placeholder,
}: Props) => {
  const [hasInteracted, setHasInteracted] = useState(false)
  const revealDetails =
    (thumbnailOnInteraction || companyNameOnInteraction) && !hasInteracted
      ? () => {
          setHasInteracted(true)
        }
      : undefined
  const displayedCompanyName =
    hasInteracted && companyNameOnInteraction
      ? companyNameOnInteraction
      : companyName

  // Keep image URLs out of the HTML and hydrated DOM until interaction.
  const thumbnailContent =
    thumbnail &&
    (!thumbnailOnInteraction || hasInteracted ? (
      <ThumbnailImage
        src={thumbnail}
        alt={thumbnail.alt ?? displayedCompanyName}
        width={100}
        height={100}
      />
    ) : (
      <ThumbnailPlaceholder aria-hidden />
    ))

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
      css={[highlighted && highlightedCss, placeholder && placeholderCss]}
      onPointerEnter={revealDetails}
      onPointerDown={revealDetails}
      onFocus={revealDetails}
    >
      <div>
        <Period>{formatPeriod(String(started), ended)}</Period>
        {thumbnail && <ThumbnailDesktop>{thumbnailContent}</ThumbnailDesktop>}
      </div>
      <div>
        <Header>
          <Title>
            {companyNameOnInteraction && (
              <TitleText aria-hidden>
                {functionTitle} @ {companyName}
              </TitleText>
            )}
            <TitleText>
              {functionTitle} @ {displayedCompanyName}
            </TitleText>
          </Title>
        </Header>
        <Main>
          {thumbnail && <ThumbnailMobile>{thumbnailContent}</ThumbnailMobile>}
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
            {aside}
            {(url ?? onVisit ?? sourceCode) && (
              <ContactLinks>
                {url && <Link href={url}>Bezoeken</Link>}
                {!url && onVisit && (
                  <button type="button" className="link" onClick={onVisit}>
                    Bezoeken
                  </button>
                )}
                {(url ?? onVisit) && sourceCode && <span>{' | '}</span>}
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
