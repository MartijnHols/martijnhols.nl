import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Fragment, ReactNode } from 'react'
import { breakpoints } from '../theme'
import * as theme from '../theme'
import ReactLogo from './assets/ReactLogo.svg'
import ContactButtonClipped from './ContactButtonClipped'
import Container from './Container'
import UspBar from './UspBar'

const Section = styled.header`
  position: relative;
  color: var(--black);
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
const Kicker = styled.div`
  ${theme.headings.h4}
  margin-bottom: 0.25em;

  @media (min-width: ${breakpoints.TABLET}px) {
    font-size: 1.75em;
  }
`
const slideInAnimation = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
`
// Progressive enhancement; if a browser doesn't support animations (eg for
// accessibility or more likely search engine spiders), the text will be visible
// right away. If it does support this, the text will appear with the animation.
const mainTextAnimation = keyframes`
  from {
    color: transparent;
  }
  to {
    color: transparent;
  }
`
const Word = styled.span`
  white-space: nowrap;
`
const IntroTitle = styled.h1`
  margin: 0;

  /* @media (prefers-reduced-motion: no-preference) {
    animation: ${mainTextAnimation} forwards;

    *::selection {
      color: var(--black);
    }

    ${Word} {
      position: relative;
      z-index: 0;
      clip-path: polygon(
        0 0,
        100% 0,
        100% calc(50% + 0.528em),
        0 calc(50% + 0.528em)
      );

      ::after {
        content: attr(data-word);
        display: block;
        position: absolute;
        inset: 0;
        align-self: center;
        z-index: -1;
        color: var(--black);
        transform: translateY(100%);
        animation: ${slideInAnimation} 0.5s ease-out forwards;
        // Not really necessary, but just in case some browser is being weird
        text-decoration: none;
      }
    }
    > span:nth-child(2)::after {
      animation-delay: 0.12s;
    }
    > span:nth-child(3)::after {
      animation-delay: 0.24s;
    }
  } */
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

const reactLogoAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const StyledReactLogo = styled(ReactLogo)`
  height: 0.8em;
  margin-top: -0.1em;
  color: var(--black);

  @media (prefers-reduced-motion: no-preference) {
    animation: ${reactLogoAnimation} infinite 20s linear;
  }

  ${IntroTitle} & {
    // It hides the element *after* the scale transition is done, so this should
    // do a good job of informing browsers the element and animation are
    // inactive without affecting the user
    visibility: hidden;
    @media (prefers-reduced-motion: no-preference) {
      transition: visibility 600ms ease-out;
    }

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

interface Props {
  kicker?: ReactNode
  title: string
  subText?: ReactNode
}

const HeroSection = ({ kicker, title, subText }: Props) => (
  <Section>
    <StyledContainer>
      <Intro>
        {kicker && <Kicker>{kicker}</Kicker>}
        {/** This is setup so the h1 has normal HTML to make it as readable as possible to search engines, and the animation is in pseudo elements. */}
        <IntroTitle>
          {title.split(' ').map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <Word data-word={word}>
                {word === 'React' ? (
                  <>
                    React <StyledReactLogo aria-hidden />
                  </>
                ) : (
                  word
                )}
              </Word>{' '}
            </Fragment>
          ))}
        </IntroTitle>
      </Intro>
      {subText && <SubText>{subText}</SubText>}

      <StyledUspBar />
    </StyledContainer>

    <ContactButtonClipped />
  </Section>
)

export default HeroSection
