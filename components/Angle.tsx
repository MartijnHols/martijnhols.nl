import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Angle = styled.div`
  width: 100%;
  height: calc(10px + 100vw / 2000 * 30);
  // This fixes a rendering bug in Chrome where an invisible line appears when the content is scaled
  margin-top: -0.5px;
  margin-bottom: -0.5px;
  backface-visibility: hidden;
  clip-path: polygon(0 0, 100% 0, 0 100%);
`;

export const inverse = css`
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
`;

export default Angle;
