import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Content } from '@prismicio/client'
import Image from 'next/image'

import ContactButtonClipped from '../../components/ContactButtonClipped'
import Container from '../../components/Container'
import Link from '../../components/Link'
import PrismicRichText from '../../components/PrismicRichText'
import mePhoto from '../../static/metemp.png'
import convertPrismicImage from '../../utils/convertPrismicImage'
import SliceContext from '../../utils/SliceContext'

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
const Aside = styled.aside`
  flex: 0 0 auto;
  width: 330px;
`
const StickyContainer = styled.div(
  ({ theme }) => css`
    position: sticky;
    top: ${theme.spacing.x5}px;
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
const PhotoContainer = styled.div(
  ({ theme }) => css`
    width: 120px;
    margin-bottom: ${theme.spacing.x2}px;
  `,
)
const Photo = styled(Image)`
  clip-path: polygon(100% 0%, 100% calc(100% - 12px), 0% 100%, 0% 12px);
`
const Name = styled.div`
  font-weight: bold;
`
const About = styled.div(
  ({ theme }) => css`
    opacity: 0.8;
    margin: ${theme.spacing.x2}px 0;
  `,
)
const Links = styled.div(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing.x2}px;
  `,
)

interface Props {
  slice: Content.ContentSliceSlice
  context: SliceContext
}

const ContentSlice = ({ slice, context }: Props) => {
  const image =
    (slice.variation === 'imageLeft' ||
      slice.variation === 'imageLeftInverted') &&
    convertPrismicImage(slice.primary.image)

  const inverted =
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
              alt={image.alt}
              layout="responsive"
              sizes={`(max-width: ${theme.breakpoints.MOBILE_MAX}px) 100vw, (max-width: ${theme.breakpoints.DESKTOP_MAX}px) 400px, 500px`}
            />
          </ImageContainer>
        )}

        <ContentContainer
          className={inverted ? 'inverted' : undefined}
          // TODO twoColumnsText={
          //   slice.variation === 'twoColumnsText' ||
          //   slice.variation === 'twoColumnsTextInverted'
          // }
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

        {context.isArticle && (
          <Aside>
            <StickyContainer>
              <PhotoContainer>
                <Photo
                  src={mePhoto}
                  alt="Martijn Hols"
                  width={120}
                  height={(120 / mePhoto.width) * mePhoto.height}
                  layout="intrinsic"
                />
              </PhotoContainer>

              <Name>Martijn Hols</Name>

              <About>
                I'm a freelance React Tech Lead juggling React components for
                over 7 years
              </About>

              <Links>
                <Link href="/">About me</Link> /{' '}
                <Link href="#footer">Contact</Link>
              </Links>

              <div>More articles</div>
              <div>[other article 1]</div>
              <div>[other article 2]</div>
              <div>[other article 3]</div>
            </StickyContainer>
          </Aside>
        )}
      </StyledContainer>

      <ContactButtonClipped inverted={inverted} />
    </Section>
  )
}

export default ContentSlice
