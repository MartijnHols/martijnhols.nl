import { css } from '@emotion/react'
import Container from '../components/Container'
import PageWrapper from '../components/PageWrapper'

const ColorsPage = () => (
  <PageWrapper>
    <Container>
      <h1>Colors</h1>
      <h2>Yellows</h2>
      <div
        css={css`
          display: flex;
          gap: 1em;
          margin-top: 2em;
        `}
      >
        <div
          css={css`
            background: var(--yellow50);
            padding: 2em;
          `}
        >
          yellow50
        </div>
        <div
          css={css`
            background: var(--yellow);
            padding: 2em;
          `}
        >
          yellow
        </div>
      </div>
      <h2>Blacks</h2>
      <div
        css={css`
          display: flex;
          gap: 1em;
          margin-top: 2em;
        `}
      >
        <div
          css={css`
            background: var(--white);
            padding: 2em;
          `}
        >
          white
        </div>
        <div
          css={css`
            background: var(--white200);
            padding: 2em;
          `}
        >
          white200
        </div>
        <div
          css={css`
            background: var(--white400);
            padding: 2em;
          `}
        >
          white400
        </div>
        <div
          css={css`
            background: var(--white500);
            padding: 2em;
          `}
        >
          white500
        </div>
        <div
          css={css`
            background: var(--black700);
            padding: 2em;
            color: var(--white);
          `}
        >
          black700
        </div>
        <div
          css={css`
            background: var(--black800);
            padding: 2em;
            color: var(--white);
          `}
        >
          black800
        </div>
        <div
          css={css`
            background: var(--black);
            padding: 2em;
            color: var(--white);
          `}
        >
          black
        </div>
      </div>
    </Container>
  </PageWrapper>
)

export default ColorsPage
