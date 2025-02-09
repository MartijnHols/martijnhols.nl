import { css } from '@emotion/react'

export const buttonCss = css`
  display: inline-block;
  background: transparent;
  padding: 10px 28px; // height margin is more in practice due to line-height
  border-radius: 5px;
  color: var(--white);
  font-weight: 500;
  border: 2px solid var(--black);
  position: relative;
  z-index: 1;
  overflow: hidden;

  transition: all 400ms ease-out;

  ::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    height: 300%;
    border-radius: 50% 50% 0 0;
    background: var(--black);
    transition: height 400ms ease-out;
  }

  :hover {
    background: var(--black);
    color: var(--white);
    text-decoration: none; // in case of putting this on a link

    ::before {
      height: 0;
    }
  }
`
export const buttonInvertedCss = css`
  background: transparent;
  border: 2px solid var(--black);

  ::before {
    height: 0;
    background: var(--black);
  }

  :hover {
    background: transparent;

    ::before {
      height: 300%;
    }
  }
`
