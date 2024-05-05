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
    padding: ${theme.spacing.x2}px 0;

    *::selection {
      background-color: ${theme.colors.black};
      color: ${theme.colors.yellow};
    }
  `,
)
const MainText = styled.div`
  font-weight: 800;
  margin-bottom: 1em;
`
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
    padding: 0.5em;
    flex: 1 1 50%;
    border: 1px solid ${theme.colors.black};
    border-radius: 6px;
  `,
)

const LanguageBar = () => {
  const config = usePrismicConfig()
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(navigator.languages.some((lang) => lang.startsWith('nl')))
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
          Sorry, since I'm only looking for clients inside the Netherlands at
          this time, this page is only available in Dutch.
        </MainText>
        <Actions>
          <Action>
            <a href="https://martijnhols-nl.translate.goog/?_x_tr_sl=nl&_x_tr_tl=en&_x_tr_hl=en-US&_x_tr_pto=wapp&_x_tr_hist=true">
              Click here to open this page in Google Translate.
            </a>
            <br />
            Note: Google Translate is unfortunately{' '}
            <a href="https://github.com/facebook/react/issues/11538">
              error-prone in React apps
            </a>
            .
          </Action>
          <Action>
            You may also be interested in my <Link href="/gists">blog</Link>,
            where I post short articles and share solutions (gists) in English.
          </Action>
        </Actions>
      </Container>
    </Bar>
  )
}

export default LanguageBar
