import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { breakpoints } from '../theme'
import * as theme from '../theme'
import reactStringReplace from '../utils/reactStringReplace'
import ReactLogo from './assets/ReactLogo.svg'
import ContactButtonClipped from './ContactButtonClipped'
import Container from './Container'
import UspBar from './UspBar'

const Section = styled.header`
  position: relative;
  color: var(--black);
  overflow: hidden;
`
const StyledContainer = styled(Container)`
  padding-top: 100px;
  padding-bottom: 100px;

  @media (min-width: ${breakpoints.DESKTOP}px) {
    padding-top: 110px;
    padding-bottom: 110px;
  }
`
const Intro = styled.div`
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 0;
`
const Kicker = styled.span`
  display: block;
  ${theme.headings.h4}
  margin-bottom: 0.25em;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 1.75em;
  }
`
const IntroTitle = styled.h1`
  margin: 0;
  text-wrap: balance;
`
const SubText = styled.div`
  font-weight: 500;
  ${theme.headings.h4}
  margin-top: var(--spacing2);
  margin-bottom: 0;

  @media (min-width: ${breakpoints.TABLET}px) {
    margin-top: var(--spacing4);
  }
`
const StyledUspBar = styled(UspBar)`
  margin-top: 2em;

  @media (min-width: ${breakpoints.TABLET}px) {
    margin-top: 3em;
  }
`

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

export const reactifyTitle = (title: string) =>
  reactStringReplace(
    title,
    'React',
    <React>
      React <StyledReactLogo aria-hidden />
    </React>,
  )

interface Props {
  kicker?: ReactNode
  title: ReactNode
  subText?: ReactNode
}

const HeroSection = ({ kicker, title, subText }: Props) => (
  <Section>
    <StyledContainer>
      <Intro>
        {kicker && <Kicker>{kicker}</Kicker>}
        <IntroTitle>{title}</IntroTitle>
      </Intro>
      {subText && <SubText>{subText}</SubText>}

      <StyledUspBar />
    </StyledContainer>

    <ContactButtonClipped />
  </Section>
)

export default HeroSection
