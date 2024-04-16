import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Content } from '@prismicio/client'
import Image from 'next/image'

import ContactButtonClipped from '../../components/ContactButtonClipped'
import Container from '../../components/Container'
import PrismicRichText from '../../components/PrismicRichText'
import convertPrismicImage from '../../utils/convertPrismicImage'

const Section = styled.section`
  position: relative;
`
const StyledContainer = styled(Container)(
  ({ theme }) => css`
    padding-top: 100px;
    padding-bottom: 100px;
    display: flex;
    flex-flow: column;
    gap: ${theme.spacing.x6}px;

    @media (min-width: ${theme.breakpoints.DESKTOP}px) {
      flex-flow: row;
    }
    @media (min-width: ${theme.breakpoints.DESKTOP_LARGE}px) {
      gap: ${theme.spacing.x10}px;
    }
  `,
)
const ImageContainer = styled.div(
  ({ theme }) => css`
    flex: 0 0 auto;
  `,
)
const SideImage = styled(Image)(
  ({ theme }) => css`
    clip-path: polygon(100% 0%, 100% calc(100% - 16px), 0% 100%, 0% 16px);
    width: 100%;
    height: auto;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      max-width: 400px;
    }
    @media (min-width: ${theme.breakpoints.DESKTOP_LARGE}px) {
      max-width: 500px;
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
const Title = styled.h2`
  margin: 0;
`

interface Props {
  slice: Content.ContentSliceSlice
}

const ContentSlice = ({ slice }: Props) => {
  const image =
    (slice.variation === 'imageLeft' ||
      slice.variation === 'imageLeftInverted') &&
    convertPrismicImage(slice.primary.image)

  const inverted =
    slice.variation === 'inverted' ||
    slice.variation === 'articleMain' ||
    slice.variation === 'imageLeftInverted' ||
    slice.variation === 'twoColumnsTextInverted'

  const theme = useTheme()

  return (
    <Section
      style={{
        // TODO: Move this to the styled component
        background: inverted ? theme.colors.black : theme.colors.yellow,
        color: inverted ? theme.colors.yellow : theme.colors.black,
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
          className={inverted ? 'inverted' : undefined}
          twoColumnsText={
            slice.variation === 'twoColumnsText' ||
            slice.variation === 'twoColumnsTextInverted'
          }
        >
          <PrismicRichText
            field={slice.primary.content}
            multiline
            components={{
              heading1: ({ key, children }) => (
                <Title key={key}>{children}</Title>
              ),
            }}
          />
        </ContentContainer>
      </StyledContainer>

      <ContactButtonClipped inverted={inverted} />
    </Section>
  )
}

export default ContentSlice
