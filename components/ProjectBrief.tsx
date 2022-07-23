import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { Fragment, ReactNode } from 'react'

import { breakpoints, colors, spacing } from '../theme'
import { ImageInfo } from '../utils/convertPrismicImage'
import { usePrismicConfig } from '../utils/prismicConfig'
import Link from './Link'

const Container = styled('article', {
  shouldForwardProp: (prop) => prop !== 'highlighted',
})<{ highlighted?: boolean }>(({ highlighted }) => [
  css`
    transform: rotate(-1deg);
    border: ${spacing.x2}px solid #000;
    margin: ${spacing.x6}px -${spacing.x2}px;
    padding: ${spacing.x3}px;

    @media (max-width: ${breakpoints.MOBILE_MAX}px) {
      flex-flow: column;
      gap: ${spacing.x2}px;
    }
  `,
  highlighted &&
    css`
      transform: rotate(-1deg) scale(1.1);

      & + & {
        margin-top: ${spacing.x10}px;
      }
    `,
])
const Header = styled.h3`
  text-transform: uppercase;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.3px;
`
const Main = styled.div`
  display: flex;
  gap: ${spacing.x6}px;
`
const Thumbnail = styled.div`
  flex: 0 0 auto;
  overflow: hidden;

  @media (min-width: ${breakpoints.TABLET}px) {
    max-width: 200px;
  }
`
const Name = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
const Period = styled.span``
const ProjectExplanation = styled.div`
  flex: 1 1 auto;
`
const ProjectAbout = styled.div`
  // Cancel out paragraph margin
  margin-top: -${spacing.x2}px;
  margin-bottom: ${spacing.x2}px;
`
const Tech = styled.div`
  font-size: 16px;
`
const ContactLinks = styled.div`
  margin-top: ${spacing.x2}px;
`
const TechItem = styled.div`
  display: inline-block;
  background: ${colors.complementary};
  color: ${colors.dominant};
  padding: 4px 6px;
  border: 2px solid ${colors.dominant};
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
`
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
    <Container highlighted={highlighted}>
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
