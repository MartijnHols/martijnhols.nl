import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Content } from '@prismicio/client'
import Image from 'next/image'

import ContactButtonClipped from '../../components/ContactButtonClipped'
import Container from '../../components/Container'
import PrismicRichText from '../../components/PrismicRichText'
import convertPrismicImage from '../../utils/convertPrismicImage'
import SliceContext from '../../utils/SliceContext'
import ArticleAside from './ArticleAside'

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
    width: 100%;
    max-width: none;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      max-width: 400px;
    }
    @media (min-width: ${theme.breakpoints.DESKTOP_LARGE}px) {
      max-width: 500px;
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
const ArticleAsideContainer = styled.div(
  ({ theme }) => css`
    flex: 0 0 auto;
    @media screen and (min-width: ${theme.breakpoints.DESKTOP}px) {
      width: 330px;
    }
  `,
)

interface Props {
  slice: Content.ContentSliceSlice
  context: SliceContext
}

const ContentSlice = ({
  slice,
  context: { isArticle, recentArticles },
}: Props) => {
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
              alt={image.alt}
              layout="responsive"
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

        {isArticle && (
          <ArticleAsideContainer>
            {slice.variation === 'articleMain' && (
              <ArticleAside recentArticles={recentArticles} />
            )}
          </ArticleAsideContainer>
        )}
      </StyledContainer>

      <ContactButtonClipped inverted={inverted} />
    </Section>
  )
}

export default ContentSlice
