import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { Fragment, ReactNode } from 'react'
import { ImageInfo } from '../utils/convertPrismicImage'
import { usePrismicConfig } from '../utils/prismicConfig'
import CopyPasteOnly from './CopyPasteOnly'
import Link from './Link'
import Tag from './Tag'

const Container = styled('article', {
  shouldForwardProp: (prop) =>
    prop !== 'highlighted' && prop !== 'isPlaceholder',
})<{
  highlighted?: boolean
  isPlaceholder?: boolean
}>(({ theme, highlighted, isPlaceholder }) => [
  css`
    transform: rotate(-0.5deg);
    border: ${theme.spacing.x2}px solid ${theme.colors.black};
    box-shadow: -7px 7px 0 0px ${theme.colors.yellow};
    margin: ${theme.spacing.x6}px -${theme.spacing.x2}px;
    padding: ${theme.spacing.x3}px;
    background: ${theme.colors.yellow50};

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      padding: ${theme.spacing.x3}px ${theme.spacing.x4}px;
    }
  `,
  highlighted &&
    css`
      @media (min-width: ${theme.breakpoints.TABLET}px) {
        margin-top: ${theme.spacing.x1 * 10}px;
        margin-bottom: ${theme.spacing.x1 * 10}px;
        transform: rotate(-0.5deg) scale(1.1);

        & + & {
          margin-top: ${theme.spacing.x1 * 14}px;
        }
      }
    `,
  isPlaceholder &&
    css`
      border-color: rgba(0, 0, 0, 0.3);
      opacity: 0.6;
      max-width: 750px;
      margin: 0 auto;
    `,
])
const Header = styled.h3`
  margin-top: 0;
  margin-bottom: 0.5em;
`
const Name = styled.span``
const Period = styled.span``
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
const ProjectExplanation = styled.div`
  flex: 1 1 auto;
`
const ProjectAbout = styled.div(
  ({ theme }) => css`
    // Cancel out paragraph margin
    margin-top: -${theme.spacing.x2}px;
    margin-bottom: ${theme.spacing.x2}px;
    hyphens: auto;
    text-align: justify;
  `,
)
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
  name: string
  started?: string
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
  name,
  started,
  ended,
  url,
  sourceCode,
  about,
  tech,
  highlighted,
  placeholder,
}: Props) => {
  const config = usePrismicConfig()

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
    <Container highlighted={highlighted} isPlaceholder={placeholder}>
      <Header>
        <Name title={name}>{name}</Name> (
        <Period>{formatPeriod(started, ended)}</Period>)
      </Header>
      <Main>
        {thumbnail && (
          <Thumbnail>
            <Image
              src={thumbnail}
              alt={thumbnail.alt ?? name}
              width={200}
              height={200}
            />
          </Thumbnail>
        )}
        <ProjectExplanation>
          <ProjectAbout>{about}</ProjectAbout>
          <Tech>
            {tech.map((item, index) => (
              <Fragment key={item}>
                <Tag>{item}</Tag>
                {index !== tech.length - 1 && <CopyPasteOnly>, </CopyPasteOnly>}
              </Fragment>
            ))}
          </Tech>
          {(url || sourceCode) && (
            <ContactLinks>
              {url && <Link href={url}>{config?.visit}</Link>}
              {url && sourceCode && <span>{' | '}</span>}
              {sourceCode && (
                <Link href={sourceCode}>{config?.sourceCode}</Link>
              )}
            </ContactLinks>
          )}
        </ProjectExplanation>
      </Main>
    </Container>
  )
}

export default ProjectBrief
