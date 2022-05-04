import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ComponentProps, MouseEvent } from "react";

import { breakpoints, colors, fontSizes } from "../theme";
import { usePrismicConfig } from "../utils/prismicConfig";
import ChatIcon from "./icons/chat.svg";
import Link from "./Link";

const Container = styled.div<{ inverse?: boolean }>([
  css`
    position: fixed;
    z-index: 10;
    bottom: 0;
    right: 30px;
    display: flex;
    padding: 7px 14px;
    background: ${colors.complementary};
    color: ${colors.dominant};
    --background-color: ${colors.complementary};
    border-radius: 3px 3px 0 0;
    /* box-shadow: 0px 0px 3px 0 ${colors.dominant};
    border: 2px solid ${colors.dominant};
    border-bottom: 0; */
    text-transform: uppercase;
    font-weight: 600;
    font-size: ${fontSizes.tertiaryText}px;

    @media (min-width: ${breakpoints.DESKTOP_LARGE}px) {
      bottom: auto;
      // We can't use transform since the rotation messes that up. It doesn't need
      // to be perfectly centered anyway.
      top: 30%;
      right: 0;
      transform: rotate(-90deg);
      transform-origin: right bottom;
      font-size: ${fontSizes.mainText}px;
    }
  `,
  (props) =>
    props.inverse &&
    css`
      background: ${colors.dominant};
      color: ${colors.complementary};
      --background-color: ${colors.dominant};
    `,
]);
const ChatIconContainer = styled.div``;
const StyledChatIcon = styled(ChatIcon)`
  height: 1em;
`;
const Divider = styled.div`
  margin: 0 10px;
  width: 2px;
  background: currentColor;
`;

interface Props
  extends Omit<ComponentProps<typeof Link>, "href" | "className" | "children"> {
  inverse?: boolean;
}

const ContactButton = ({ inverse, ...others }: Props) => {
  const config = usePrismicConfig();

  return (
    <Link className="plain" href="#footer" {...others}>
      <Container inverse={inverse}>
        <ChatIconContainer>
          <StyledChatIcon aria-label="" />
        </ChatIconContainer>
        <Divider />
        {config?.contact}
      </Container>
    </Link>
  );
};

export default ContactButton;
