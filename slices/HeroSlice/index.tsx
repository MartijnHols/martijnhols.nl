import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/helpers'
import { asText } from '@prismicio/richtext'

import PrismicRichText from '../../components/PrismicRichText'
import reactStringReplace from '../../utils/reactStringReplace'
import Hero, { IntroTitle } from './Hero'
import ReactLogo from './ReactLogo.svg'
import TopBar from './TopBar'

const React = styled.span`
  white-space: nowrap;
`
const ReactLogoAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
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

const reactifyTitle = (title: string) =>
  reactStringReplace(
    title,
    'React',
    <React>
      React <StyledReactLogo aria-hidden />
    </React>,
  )

interface Props {
  slice: Content.HeroSliceSlice
}

const HeroSlice = ({ slice }: Props) => (
  <>
    <TopBar />

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
