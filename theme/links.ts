import { css } from "@emotion/react";

import { colors } from ".";

export const globalStyles = css`
  a {
    color: ${colors.text};
    border-bottom: 3px solid ${colors.text}; // TODO: Prettify

    :hover {
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-decoration-style: double;
    }
  }
`;
