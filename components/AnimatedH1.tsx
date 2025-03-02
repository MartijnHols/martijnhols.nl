import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Fragment, HTMLAttributes, ReactNode } from 'react'

const slideInAnimation = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
`
const removeOverlayAnimation = keyframes`
  0% {
    transform: translateY(0em);
    opacity: 1;
  }
  100% {
    transform: translateY(0.2em);
    opacity: 0;
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
      animation: ${removeOverlayAnimation} 0.5s ease-in forwards;
      animation-delay: calc(0.4s + var(--index) * 0.12s);
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

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  children: string
  renderWord?: (word: string) => ReactNode
}

const AnimatedH1 = ({ children, renderWord, ...others }: Props) => (
  // This is setup so the h1 has normal HTML to make it as readable as possible to search engines, and the animation is in pseudo elements.
  <IntroTitle {...others}>
    {children.split(' ').map((word, index) => (
      <Fragment key={`${word}-${index}`}>
        <Word
          style={{
            ['--index' as string]: index,
          }}
        >
          {renderWord ? renderWord(word) : word}

          <SecondWordUnderline aria-hidden data-word={word} />
          <AnimatedWordContainer aria-hidden data-word={word} />
        </Word>{' '}
      </Fragment>
    ))}
  </IntroTitle>
)

export default AnimatedH1
