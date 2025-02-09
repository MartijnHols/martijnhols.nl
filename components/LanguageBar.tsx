import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'
import Container from './Container'

const Bar = styled.div`
  background: var(--black);
  color: var(--white);
  padding: 1em 0 0;
  display: none;

  :not(.dutch &) {
    display: block;
  }
`
const MainText = styled.div(
  ({ theme }) => css`
    font-weight: 800;
    margin-bottom: 0.75em;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 1em;
    }
  `,
)
const Actions = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.x2}px;
    flex-direction: column;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      flex-direction: row;
    }
  `,
)
const Action = styled.div`
  padding: 0.6em 0.75em;
  flex: 1 1 50%;
  border: 1px solid currentColor;
`

const LanguageBar = () => (
  <>
    <script
      // Since this language alert causes a big layout shift, we need to toggle
      // it as soon as possible.
      // We can't use useEffect, as downloading and running the script takes a
      // lot of time on slow mobile devices.
      // Instead, this inline script will run immediately after it's parsed. It
      // executes before the rest of the page is even rendered.
      dangerouslySetInnerHTML={{
        __html: `
          navigator.languages.some(lang => lang.startsWith('nl'))&&document.body.classList.add('dutch');
        `.trim(),
      }}
    />
    <Bar lang="en">
      <Container className="inverted">
        <MainText>
          Hi international visitor! This page is only available in Dutch, as I'm
          only looking for clients in my area. But you can:
        </MainText>
        <Actions>
          <Action>
            <a href="https://martijnhols-nl.translate.goog/?_x_tr_sl=nl&_x_tr_tl=en&_x_tr_hl=en-US&_x_tr_pto=wapp&_x_tr_hist=true">
              Open this page with Google Translate.
            </a>
            <br />
            <small>
              Note: Google Translate{' '}
              <Link href="/blog/everything-about-google-translate-crashing-react">
                is error-prone in React apps
              </Link>
              .
            </small>
          </Action>
          <Action>
            Visit my <Link href="/blog">blog</Link> about React and front-end,
            which is in English.
          </Action>
        </Actions>
      </Container>
    </Bar>
  </>
)

export default LanguageBar
