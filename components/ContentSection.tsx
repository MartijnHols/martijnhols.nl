import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { ReactNode } from 'react'
import ImageInfo from '../utils/ImageInfo'
import AngleWithContactButton from './AngleWithContactButton'
import ContactButtonClipped from './ContactButtonClipped'
import Container from './Container'

const Section = styled.section``
const BackgroundWrapper = styled.div`
  position: relative;
`
const StyledContainer = styled(Container)(
  ({ theme }) => css`
    padding-top: 40px;
    padding-bottom: 60px;
    display: flex;
    flex-flow: column;
    gap: ${theme.spacing.x6}px;

    @media (min-width: ${theme.breakpoints.DESKTOP}px) {
      padding-top: 100px;
      padding-bottom: 100px;
      flex-flow: row;
    }
    @media (min-width: ${theme.breakpoints.DESKTOP_LARGE}px) {
      gap: ${theme.spacing.x10}px;
    }
  `,
)
const ImageContainer = styled.div`
  flex: 0 0 auto;
`
const SideImage = styled(Image)(
  ({ theme }) => css`
    clip-path: polygon(100% 0%, 100% calc(100% - 16px), 0% 100%, 0% 16px);
    display: block;
    width: 100%;
    height: auto;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      width: 400px;
    }
    @media (min-width: ${theme.breakpoints.DESKTOP_LARGE}px) {
      width: 500px;
    }
  `,
)
const ContentContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'twoColumnsText',
})<{ twoColumnsText?: boolean }>(({ theme, twoColumnsText }) => [
  css`
    flex: 1 1 auto;
    // Cancels out p-margins
    margin: -${theme.spacing.x2}px 0;
    hyphens: auto;
    text-align: justify;
  `,
  twoColumnsText &&
    css`
      column-count: 2;
      column-gap: ${theme.spacing.x5}px;
      line-height: 1.6;
      hyphens: manual;
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

  const theme = useTheme()

  return (
    <Section>
      <AngleWithContactButton inverted />

      <BackgroundWrapper
        style={{
          // TODO: Move this to the styled component
          background: inverted ? theme.colors.black : theme.colors.white,
          color: inverted ? theme.colors.white : theme.colors.black,
        }}
        className={inverted ? 'inverted' : undefined}
      >
        <StyledContainer>
          {image && (
            <ImageContainer>
              <SideImage
                src={image}
                alt={image.alt ?? ''}
                sizes={`(min-width: ${theme.breakpoints.DESKTOP_LARGE}px) 500px, (min-width: ${theme.breakpoints.TABLET}px) 400px, 100vw`}
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

      <AngleWithContactButton />
    </Section>
  )
}

export default ContentSection
