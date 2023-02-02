import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { asText } from '@prismicio/helpers'
import {
  BooleanField,
  RichTextField,
  SharedSlice,
  SharedSliceVariation,
} from '@prismicio/types'

import Angle from '../../components/Angle'
import ContactButtonClipped from '../../components/ContactButtonClipped'
import Container from '../../components/Container'
import LanguageSwitcher from '../../components/LanguageSwitcher'
import PrismicRichText from '../../components/PrismicRichText'
import reactStringReplace from '../../utils/reactStringReplace'
import ReactLogo from './ReactLogo.svg'

const Section = styled.header(
  ({ theme }) => css`
    position: relative;
    background: ${theme.colors.yellow};
    color: ${theme.colors.black};
  `,
)
const TopBar = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.black};
    color: ${theme.colors.yellow};
    height: 1em;
  `,
)
const Content = styled.div(
  ({ theme }) => css`
    position: relative;
    overflow: hidden; // fixes rotation overflow increasing body width
    background: ${theme.colors.yellow};
  `,
)
const StyledContainer = styled(Container)(
  ({ theme }) => css`
    padding-top: 100px;
    padding-bottom: 100px;
    // TODO: Math it out (we want to show we're precise and smart, so REALLY SHOW IT)
    transform: rotate(-2deg);

    @media (min-width: ${theme.breakpoints.DESKTOP}px) {
      padding-top: 150px;
      padding-bottom: 150px;
    }
  `,
)
const ReactLogoAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const React = styled.span`
  white-space: nowrap;
`
const StyledReactLogo = styled(ReactLogo)`
  height: 1em;
  /* color: #61DAFB; */

  @media (prefers-reduced-motion: no-preference) {
    animation: ${ReactLogoAnimation} infinite 20s linear;
  }
`
const Intro = styled.h1(
  ({ theme }) => css`
    line-height: 1.1;
    font-weight: 800;
    margin-bottom: ${theme.spacing.x2}px;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      margin-bottom: ${theme.spacing.x4}px;
    }
  `,
)
const IntroSubText = styled.span(
  ({ theme }) => css`
    display: block;
    ${theme.headings.h3}
    margin-bottom: ${theme.spacing.x1}px;
  `,
)
const IntroTitle = styled.span`
  ${StyledReactLogo} {
    // It hides the element *after* the scale transition is done, so this should
    // do a good job of informing browsers the element and animation are
    // inactive without affecting the user
    visibility: hidden;
    transition: visibility 600ms ease-out;

    path {
      transform: scale(0);
      transition: transform 300ms ease-in-out;
      transform-origin: center center;
    }
  }

  :hover {
    ${StyledReactLogo} {
      visibility: visible;

      path {
        transform: scale(1);
      }
    }
  }

  @media (prefers-reduced-motion) {
    ${StyledReactLogo} {
      display: none;
    }
  }
`
const SubText = styled.div(
  ({ theme }) => css`
    font-weight: 500;
    ${theme.headings.h5}
  `,
)

export type PrismicHeroSlice = SharedSlice<
  'hero_slice',
  SharedSliceVariation<
    'default',
    {
      intro: RichTextField
      title: RichTextField
      subText: RichTextField
      reactifyTitle: BooleanField
    }
  >
>

const reactifyTitle = (title: string) =>
  reactStringReplace(
    title,
    'React',
    <React>
      React <StyledReactLogo aria-label="" />
    </React>,
  )

const Sticky = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`
const TopBarContent = styled.div(
  ({ theme }) => css`
    position: relative;
    z-index: 1;
    color: ${theme.colors.yellow};
    // Fallbacks
    padding: 6px 7px 0 8px;
    font-size: 14px;
    // Resize at the same rate as Angle so it fits perfectly
    padding: calc(5px + 100vw / 2000 * 6) 7px 0 calc(7px + 100vw / 2000 * 7);
    font-size: calc(10px + 100vw / 2000 * 12);
    font-weight: 500;
    transform: rotate(-1.15deg);
    transform-origin: left;
  `,
)

interface Props {
  slice: PrismicHeroSlice
}

const HeroSlice = ({ slice }: Props) => (
  <Section>
    <Sticky>
      <TopBar className="inverted">
        <TopBarContent>
          <LanguageSwitcher />
        </TopBarContent>
      </TopBar>

      <Angle />
    </Sticky>

    <Content>
      <StyledContainer>
        <Intro>
          <PrismicRichText
            field={slice.primary.intro}
            components={{
              paragraph: ({ children, key }) => (
                <IntroSubText key={key}>{children}</IntroSubText>
              ),
            }}
            multiline
          />
          <IntroTitle>
            {slice.primary.reactifyTitle
              ? reactifyTitle(asText(slice.primary.title))
              : asText(slice.primary.title)}
          </IntroTitle>
        </Intro>
        <SubText>
          <PrismicRichText field={slice.primary.subText} />
        </SubText>
      </StyledContainer>
    </Content>

    <ContactButtonClipped />
  </Section>
)

export default HeroSlice
