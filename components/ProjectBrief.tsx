import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { Fragment, ReactNode } from 'react'

import { ImageInfo } from '../utils/convertPrismicImage'
import { usePrismicConfig } from '../utils/prismicConfig'
import Link from './Link'

const Container = styled('article', {
  shouldForwardProp: (prop) =>
    prop !== 'highlighted' && prop !== 'isPlaceholder',
})<{
  highlighted?: boolean
  isPlaceholder?: boolean
}>(({ theme, highlighted, isPlaceholder }) => [
  css`
    transform: rotate(-0.85deg);
    border: ${theme.spacing.x2}px solid #000;
    margin: ${theme.spacing.x6}px -${theme.spacing.x2}px;
    padding: ${theme.spacing.x3}px;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      transform: rotate(-1deg);
      padding: ${theme.spacing.x3}px ${theme.spacing.x4}px;
    }
  `,
  highlighted &&
    css`
      @media (min-width: ${theme.breakpoints.TABLET}px) {
        margin-top: ${theme.spacing.x1 * 10}px;
        margin-bottom: ${theme.spacing.x1 * 10}px;
        transform: rotate(-1deg) scale(1.1);

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
  text-transform: uppercase;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.3px;
`
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
    overflow: hidden;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      max-width: 200px;
    }
  `,
)
const Name = styled.span``
const Period = styled.span``
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
const Tech = styled.div`
  font-size: 16px;
`
const ContactLinks = styled.div(
  ({ theme }) => css`
    margin-top: ${theme.spacing.x2}px;
  `,
)
const TechItem = styled.div(
  ({ theme }) => css`
    display: inline-block;
    background: ${theme.colors.black};
    color: ${theme.colors.yellow};
    padding: 4px 6px;
    border: 2px solid ${theme.colors.yellow};
    margin-left: -2px;
    margin-bottom: 2px;

    // I purposefully used both variations for SEO and since iirc it was more commonly called "React.js" long back
    &[data-value='React'],
    &[data-value='React.js'] {
      color: #61dafb;
    }
    &[data-value='Open Source'] {
      color: #fff;
    }

    transition: transform 120ms ease-out;
    :hover {
      transform: scale(1.4) rotate(-1deg);
    }
  `,
)
const InvisibleText = styled.span`
  font-size: 0;
`

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
              alt={thumbnail.alt}
              layout="fixed"
              width={200}
              height={200}
              objectFit="contain"
            />
          </Thumbnail>
        )}
        <ProjectExplanation>
          <ProjectAbout>{about}</ProjectAbout>
          <Tech>
            {tech.map((item, index) => (
              <Fragment key={item}>
                <TechItem data-value={item}>{item}</TechItem>
                {/* Add hidden text to make copy-pasting more convenient */}
                {index !== tech.length - 1 && <InvisibleText>, </InvisibleText>}
              </Fragment>
            ))}
          </Tech>
          {(url || sourceCode) && (
            <ContactLinks>
              {url && <Link href={url}>{config?.visit}</Link>}
              {url && sourceCode && ' | '}
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
