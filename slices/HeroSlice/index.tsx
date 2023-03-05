import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/helpers'
import { asText } from '@prismicio/richtext'

import Angle from '../../components/Angle'
import LanguageSwitcher from '../../components/LanguageSwitcher'
import PrismicRichText from '../../components/PrismicRichText'
import reactStringReplace from '../../utils/reactStringReplace'
import Hero, { IntroTitle } from './Hero'
import ReactLogo from './ReactLogo.svg'

const TopBar = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.black};
    color: ${theme.colors.yellow};
    height: 1em;
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

  ${IntroTitle} & {
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

  ${IntroTitle}:hover & {
    visibility: visible;

    path {
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion) {
    display: none;
  }
`
const StyledAngle = styled(Angle)``
const Sticky = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;

  ${StyledAngle} {
    pointer-events: none;
  }
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

const reactifyTitle = (title: string) =>
  reactStringReplace(
    title,
    'React',
    <React>
      React <StyledReactLogo aria-label="" />
    </React>,
  )

interface Props {
  slice: Content.HeroSliceSlice
}

const HeroSlice = ({ slice }: Props) => (
  <>
    {/** TODO: Move to its own slice */}
    <Sticky>
      <TopBar className="inverted">
        <TopBarContent>
          <LanguageSwitcher />
        </TopBarContent>
      </TopBar>

      <StyledAngle />
    </Sticky>

    <Hero
      intro={
        isFilled.richText(slice.primary.intro) && (
          <PrismicRichText field={slice.primary.intro} multiline />
        )
      }
      title={
        slice.primary.reactifyTitle
          ? reactifyTitle(asText(slice.primary.title))
          : asText(slice.primary.title)
      }
      subText={
        isFilled.richText(slice.primary.subText) && (
          <PrismicRichText field={slice.primary.subText} />
        )
      }
    />
  </>
)

export default HeroSlice
