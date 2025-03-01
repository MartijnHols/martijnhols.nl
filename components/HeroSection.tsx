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
  position: relative;
`
const SecondWordUnderline = styled.span``
const AnimatedWordContainer = styled.span``
const IntroTitle = styled.h1`
  margin: 0;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${mainTextAnimation} forwards;

    *::selection {
      color: var(--black);
    }

    ${Word} {
      position: relative;
      z-index: 0;
      align-self: center;
    }
    ${SecondWordUnderline}::before {
      content: attr(data-word);
      position: absolute;
      inset: 0;
      z-index: -1;
      align-self: center;
      color: transparent;
      text-decoration: underline;
      text-decoration-color: var(--white);
      text-decoration-thickness: 0.3em;
      // This is the h1 thinkness + offset combined
      text-underline-offset: 0.15em;
      // While I would like to use this so the P isn't cut off when animation is
      // complete, it makes the P appear before it'd supposed to
      text-decoration-skip-ink: none;
    }
    ${AnimatedWordContainer} {
      position: absolute;
      inset: 0;
      clip-path: inset(0 0 0 0);
      z-index: -2;

      ::after {
        content: attr(data-word);
        display: block;
        position: absolute;
        inset: 0;
        align-self: center;
        color: var(--black);
        transform: translateY(100%);
        animation: ${slideInAnimation} 0.5s ease-out forwards;
        // Not really necessary, but just in case some browser wants to be weird
        text-decoration: none;
        animation-delay: calc(var(--index) * 0.12s);
      }
    }
  }
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
              <Word>
                {word === 'React' ? (
                  <>
                    React <StyledReactLogo aria-hidden />
                  </>
                ) : (
                  word
                )}

                <SecondWordUnderline aria-hidden data-word={word} />
                <AnimatedWordContainer
                  aria-hidden
                  data-word={word}
                  style={{
                    ['--index' as string]: index,
                  }}
                />
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
