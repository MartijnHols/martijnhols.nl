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
    gap: ${theme.spacing.x10}px;

    @media (max-width: ${theme.breakpoints.DESKTOP_MAX}px) {
      gap: ${theme.spacing.x6}px;
    }
    @media (max-width: ${theme.breakpoints.MOBILE_MAX}px) {
      flex-flow: column;
      gap: ${theme.spacing.x6}px;
    }
  `,
)
const ImageContainer = styled.div(
  ({ theme }) => css`
    flex: 0 0 auto;
    width: 100%;
    max-width: 500px;

    @media (max-width: ${theme.breakpoints.DESKTOP_MAX}px) {
      max-width: 400px;
    }
    @media (max-width: ${theme.breakpoints.MOBILE_MAX}px) {
      max-width: none;
    }
  `,
)
const SideImage = styled(Image)`
  clip-path: polygon(100% 0%, 100% calc(100% - 16px), 0% 100%, 0% 16px);
`
const ContentContainer = styled.div(
  ({ theme }) => css`
    flex: 1 1 0;
    // Cancels out p-margins
    margin: -${theme.spacing.x2}px 0;
    hyphens: auto;
    text-align: justify;
  `,
)
const Title = styled.h2(
  ({ theme }) => css`
    text-transform: uppercase;
    font-weight: 800;
    transform: rotate(-2deg);
    border-top: ${theme.spacing.x2}px solid currentColor;
    display: inline-block;
    margin: 0;
  `,
)

interface Props {
  slice: Content.ContentSliceSlice
}

const ContentSlice = ({ slice }: Props) => {
  const image = convertPrismicImage(slice.primary.image)

  const inverted = slice.variation === 'inverted'

  const theme = useTheme()

  return (
    <Section
      style={{
        // TODO: Move this to the styled component
        background: inverted ? theme.colors.black : theme.colors.yellow,
        color: inverted ? theme.colors.yellow : theme.colors.black,
      }}
    >
      <StyledContainer>
        {image && (
          <ImageContainer>
            <SideImage
              src={image}
              alt={image.alt}
              layout="responsive"
              sizes={`(max-width: ${theme.breakpoints.MOBILE_MAX}px) 100vw, (max-width: ${theme.breakpoints.DESKTOP_MAX}px) 400px, 500px`}
            />
          </ImageContainer>
        )}

        <ContentContainer className={inverted ? 'inverted' : undefined}>
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
