import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FilledContentRelationshipField } from '@prismicio/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePrismicConfig } from '../utils/prismicConfig'
import Container from './Container'

const Bar = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.yellow};
    padding: ${theme.spacing.x3}px 0;

    *::selection {
      background-color: ${theme.colors.black};
      color: ${theme.colors.yellow};
    }

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 1.25em;
    }
  `,
)
const MainText = styled.div(
  ({ theme }) => css`
    font-weight: 800;
    margin-bottom: 0.75em;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 1.25em;
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
const Action = styled.div(
  ({ theme }) => css`
    padding: ${theme.spacing.x2}px;
    flex: 1 1 50%;
    border: 1px solid ${theme.colors.black};
    border-radius: 6px;
  `,
)

const LanguageBar = () => {
  const config = usePrismicConfig()
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(!navigator.languages.some((lang) => lang.startsWith('nl')))
  }, [])

  if (
    (config.defaultLayout as FilledContentRelationshipField).lang !== 'nl-nl'
  ) {
    return
  }
  if (!show) {
    return null
  }

  return (
    <Bar lang="en">
      <Container>
        <MainText>
          This page is only available in Dutch, as I'm only looking for clients
          in my area at this time. You can however:
        </MainText>
        <Actions>
          <Action>
            <a href="https://martijnhols-nl.translate.goog/?_x_tr_sl=nl&_x_tr_tl=en&_x_tr_hl=en-US&_x_tr_pto=wapp&_x_tr_hist=true">
              Open this page with Google Translate.
            </a>
            <br />
            Note: Google Translate{' '}
            <Link href="/blog/everything-about-google-translate-crashing-react">
              may be error-prone in React apps
            </Link>
            .
          </Action>
          <Action>
            Alternatively, you may be interested in my{' '}
            <Link href="/blog">blog</Link>, which is fully English.
          </Action>
        </Actions>
      </Container>
    </Bar>
  )
}

export default LanguageBar
