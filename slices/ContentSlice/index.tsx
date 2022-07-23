import styled from '@emotion/styled'
import {
  ImageField,
  RichTextField,
  SharedSlice,
  SharedSliceVariation,
} from '@prismicio/types'
import Image from 'next/image'

import ContactButton from '../../components/ContactButton'
import Container from '../../components/Container'
import PrismicRichText from '../../components/PrismicRichText'
import { breakpoints, colors, spacing } from '../../theme'
import convertPrismicImage from '../../utils/convertPrismicImage'

const ContactButtonClipper = styled.div`
  clip-path: inset(0 0 0 0);
`
const Section = styled.section``
const StyledContainer = styled(Container)`
  padding-top: 100px;
  padding-bottom: 100px;
  display: flex;
  gap: ${spacing.x10}px;

  @media (max-width: ${breakpoints.DESKTOP_MAX}px) {
    gap: ${spacing.x6}px;
  }
  @media (max-width: ${breakpoints.MOBILE_MAX}px) {
    flex-flow: column;
    gap: ${spacing.x6}px;
  }
`
const ImageContainer = styled.div`
  flex: 0 0 auto;
  width: 100%;
  max-width: 500px;

  @media (max-width: ${breakpoints.DESKTOP_MAX}px) {
    max-width: 400px;
  }
  @media (max-width: ${breakpoints.MOBILE_MAX}px) {
    max-width: none;
  }
`
const SideImage = styled(Image)`
  clip-path: polygon(100% 0%, 100% calc(100% - 16px), 0% 100%, 0% 16px);
`
const Content = styled.div`
  flex: 1 1 0;
  // Cancels out p-margins
  margin: -${spacing.x2}px 0;
`
const Title = styled.h2`
  text-transform: uppercase;
  font-weight: 800;
  transform: rotate(-2deg);
  border-top: ${spacing.x2}px solid currentColor;
  display: inline-block;
  margin: 0;
`

export type PrismicContentSlice = SharedSlice<
  'content_slice',
  | SharedSliceVariation<
      'default',
      {
        image: ImageField
        content: RichTextField
      }
    >
  | SharedSliceVariation<
      'inverted',
      {
        image: ImageField
        content: RichTextField
      }
    >
>

interface Props {
  slice: PrismicContentSlice
}

const ContentSlice = ({ slice }: Props) => {
  const image = convertPrismicImage(slice.primary.image)

  const inverted = slice.variation === 'inverted'

  return (
    <ContactButtonClipper>
      <Section
        style={{
          background: inverted ? colors.complementary : colors.dominant,
          color: inverted ? colors.dominant : colors.complementary,
        }}
      >
        <StyledContainer>
          {image && (
            <ImageContainer>
              <SideImage
                src={image}
                alt={image.alt}
                layout="responsive"
                sizes={`(max-width: ${breakpoints.MOBILE_MAX}px) 100vw, (max-width: ${breakpoints.DESKTOP_MAX}px) 400px, 500px`}
              />
            </ImageContainer>
          )}

          <Content className={inverted ? 'inverted' : undefined}>
            <PrismicRichText
              field={slice.primary.content}
              multiline
              components={{
                heading1: ({ key, children }) => (
                  <Title key={key}>{children}</Title>
                ),
              }}
            />
          </Content>
        </StyledContainer>
      </Section>

      <ContactButton inverted={inverted} />
    </ContactButtonClipper>
  )
}

export default ContentSlice
