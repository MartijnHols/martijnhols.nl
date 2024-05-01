import { css } from '@emotion/react'
import { colors } from '.'

const background = colors.black
const text = colors.white

export const buttonCss = css`
  display: inline-block;
  background: transparent;
  padding: 10px 28px; // height margin is more in practice due to line-height
  border-radius: 5px;
  color: ${text};
  font-weight: 500;
  border: 2px solid ${background};
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
    background: ${background};
    transition: height 400ms ease-out;
  }

  :hover {
    background: ${background};
    color: ${text};
    text-decoration: none; // in case of putting this on a link

    ::before {
      height: 0;
    }
  }
`
export const buttonInvertedCss = css`
  background: transparent;
  border: 2px solid ${background};

  ::before {
    height: 0;
    background: ${background};
  }

  :hover {
    background: transparent;

    ::before {
      height: 300%;
    }
  }
`
// TODO export const buttonOutlineGrayCss = css`
//   background: transparent;
//   color: ${colors.neutral800};
//   border-color: ${colors.neutral600};

//   ::before {
//     height: 0;
//     background: ${background};
//   }

//   :hover {
//     background: transparent;
//     color: ${colors.neutral800};

//     ::before {
//       height: 300%;
//     }
//   }
// `
