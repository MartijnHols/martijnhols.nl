import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import Head from 'next/head'
import { useId } from 'react'
import StartpageLogo from './StartpageLogo.svg'
import StartpageSearchIcon from './StartpageSearchIcon.svg'

// transform is much more performant than animating background-position
const glowAnimation = keyframes`
  0% {
    transform: translate(-25%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-25%, -50%) rotate(360deg);
  }
`
const WayOverengineeredGlowAnimation = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    position: absolute;
    inset: -5px;
    border-radius: 2em;
    overflow: hidden;
    z-index: -1;

    ::before {
      content: '';
      position: absolute;
      inset: 0;
      transform: translate(0%, -50%);
      width: 200%;
      aspect-ratio: 1 / 1;
      --color1: #6677fb;
      --color2: #2bdccc;
      // The gradient is a bit random because I just went with what looked good.
      // Mainly based on there being some white space between colors, and colors
      // appearing to move left to right.
      background:
        linear-gradient(
          -45deg,
          var(--color2) 0%,
          color-mix(in srgb, var(--color2) 0%, transparent) 10%,
          color-mix(in srgb, var(--color2) 0%, transparent) 23%,
          var(--color2) 33%,
          color-mix(in srgb, var(--color2) 0%, transparent) 43%,
          color-mix(in srgb, var(--color2) 0%, transparent) 56%,
          var(--color2) 66%,
          color-mix(in srgb, var(--color2) 0%, transparent) 76%,
          color-mix(in srgb, var(--color2) 0%, transparent) 90%,
          var(--color2) 100%
        ),
        linear-gradient(
          -15deg,
          var(--color1) 0%,
          color-mix(in srgb, var(--color1) 0%, transparent) 10%,
          color-mix(in srgb, var(--color1) 0%, transparent) 40%,
          var(--color1) 50%,
          color-mix(in srgb, var(--color1) 0%, transparent) 60%,
          color-mix(in srgb, var(--color1) 0%, transparent) 90%,
          var(--color1) 100%
        );
      animation: ${glowAnimation} 7s infinite linear;
      filter: blur(5px);
    }
    ::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 2em;
      box-shadow: inset 0 0 5px 3px white;
    }
  }
`

let sentEvent = false

const StartpageSearch = () => {
  const id = useId()

  const handleKeyDown = () => {
    if (sentEvent) {
      return
    }

    window.plausible?.('Tried Searchpage')
    sentEvent = true
  }

  return (
    <form
      method="get"
      action="https://www.startpage.com/sp/search"
      css={css`
        text-align: center;
      `}
    >
      <Head>
        <link rel="preconnect" href="https://www.startpage.com" />
      </Head>

      <label
        htmlFor={id}
        css={css`
          display: block;
        `}
      >
        <StartpageLogo
          aria-hidden
          css={css`
            width: 13.3335em;
            margin-bottom: 1.34em;
          `}
        />

        <div>
          <div
            css={[
              css`
                position: relative;
                z-index: 0;
                display: inline-block;
              `,
            ]}
          >
            <input
              type="text"
              name="query"
              id={id}
              aria-haspopup="false"
              aria-label="search"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              maxLength={2048}
              placeholder="Search privately"
              role="searchbox"
              spellCheck="false"
              title="Search"
              onKeyDown={handleKeyDown}
              css={css`
                border-radius: 2em;
                border: 1px solid #6573ff;
                padding: 0.6317em 1em;
                width: 32em;
                color: #202945;
                background: white;
                padding-right: 3em;
                font-size: 16px;

                :focus {
                  outline: none;
                  box-shadow: 0 0 2px 2px #6573ff;
                }
              `}
            />
            <button
              type="submit"
              css={css`
                border: 0;
                position: absolute;
                right: 0;
                height: 100%;
                width: 3em;
                cursor: pointer;
              `}
            >
              <StartpageSearchIcon
                css={css`
                  width: 1em;
                  height: 1em;
                  margin-top: -0.25em;

                  button:hover & {
                    transform: scale(75%);
                  }
                `}
              />
            </button>

            <WayOverengineeredGlowAnimation />
          </div>
        </div>
      </label>
    </form>
  )
}

export default StartpageSearch
