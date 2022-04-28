import styled from "@emotion/styled";

import { breakpoints, spacing } from "../theme";

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1300px;
  padding-left: ${spacing.x10}px;
  padding-right: ${spacing.x10}px;

  @media (max-width: ${breakpoints.DESKTOP_MAX}px) {
    padding-left: ${spacing.x6}px;
    padding-right: ${spacing.x6}px;
  }
  @media (max-width: ${breakpoints.MOBILE_MAX}px) {
    padding-left: ${spacing.x2}px;
    padding-right: ${spacing.x2}px;
  }
`;

export default Container;
