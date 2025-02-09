import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { ReactNode } from 'react'
import { breakpoints } from '../theme'
import ImageInfo from '../utils/ImageInfo'
import AngleBottom from './AngleBottom'
import AngleTop from './AngleTop'
import AngleWithContactButton from './AngleWithContactButton'
import ContactButtonClipped from './ContactButtonClipped'
import Container from './Container'

const Section = styled.section``
const BackgroundWrapper = styled.div`
  position: relative;
  background: var(--white);
  color: var(--black);

  &.inverted {
    background: var(--black);
    color: var(--white);
  }
`
const StyledContainer = styled(Container)`
  padding-top: 40px;
  padding-bottom: 60px;
  display: flex;
  flex-flow: column;
  gap: var(--spacing6);

  @media (min-width: ${breakpoints.DESKTOP}px) {
    padding-top: 100px;
    padding-bottom: 100px;
    flex-flow: row;
  }
  @media (min-width: ${breakpoints.DESKTOP_LARGE}px) {
    gap: var(--spacing10);
  }
`
const ImageContainer = styled.div`
  flex: 0 0 auto;
`
const SideImage = styled(Image)`
  clip-path: polygon(100% 0%, 100% calc(100% - 16px), 0% 100%, 0% 16px);
  display: block;
  width: 100%;
  height: auto;

  @media (min-width: ${breakpoints.TABLET}px) {
    width: 400px;
  }
  @media (min-width: ${breakpoints.DESKTOP_LARGE}px) {
    width: 500px;
  }
`
const ContentContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'twoColumnsText',
})<{ twoColumnsText?: boolean }>(({ twoColumnsText }) => [
  css`
    flex: 1 1 auto;
    // Cancels out p-margins
    margin: calc(var(--spacing2) * -1) 0;
    text-wrap: pretty;
  `,
  twoColumnsText &&
    css`
      column-count: 2;
      column-gap: var(--spacing5);
      line-height: 1.6;
      text-align: left;
    `,
])

interface Props {
  variant?:
    | 'default'
    | 'imageLeft'
    | 'imageLeftInverted'
    | 'inverted'
    | 'articleMain'
    | 'twoColumnsText'
    | 'twoColumnsTextInverted'
  image?: ImageInfo
  content: ReactNode
}

const ContentSection = ({ variant = 'default', image, content }: Props) => {
  const inverted =
    variant === 'inverted' ||
    variant === 'articleMain' ||
    variant === 'imageLeftInverted' ||
    variant === 'twoColumnsTextInverted'

  return (
    <Section>
      <AngleWithContactButton angle={AngleTop} />

      <BackgroundWrapper className={inverted ? 'inverted' : undefined}>
        <StyledContainer>
          {image && (
            <ImageContainer>
              <SideImage
                src={image}
                alt={image.alt ?? ''}
                sizes={`(min-width: ${breakpoints.DESKTOP_LARGE}px) 500px, (min-width: ${breakpoints.TABLET}px) 400px, 100vw`}
              />
            </ImageContainer>
          )}
          <ContentContainer
            className={`content ${inverted ? 'inverted' : ''}`}
            twoColumnsText={
              variant === 'twoColumnsText' ||
              variant === 'twoColumnsTextInverted'
            }
          >
            {content}
          </ContentContainer>
        </StyledContainer>

        <ContactButtonClipped inverted={inverted} />
      </BackgroundWrapper>

      <AngleWithContactButton angle={AngleBottom} />
    </Section>
  )
}

export default ContentSection
