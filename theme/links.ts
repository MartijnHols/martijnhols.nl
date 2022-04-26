import { css } from "@emotion/react";

import { colors } from ".";

export const globalStyles = css`
  a {
    color: ${colors.complementary};
    text-decoration: none;
    border-bottom: 3px solid ${colors.complementary}; // TODO: Prettify

    :hover {
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-decoration-style: double;
    }
  }
`;
