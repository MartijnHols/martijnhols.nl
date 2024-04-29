import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ComponentProps } from 'react'
import { usePrismicConfig } from '../utils/prismicConfig'
import ChatIcon from './icons/chat.svg'
import Link from './Link'

const Positioner = styled.div(
  ({ theme }) => css`
    position: fixed;
    z-index: ${theme.zIndex.topBar};
    bottom: 0;
    right: 30px;

    @media (min-width: ${theme.breakpoints.DESKTOP_LARGE}px) {
      bottom: auto;
      // We can't use transform since the rotation messes that up. It doesn't need
      // to be perfectly centered anyway.
      top: 30%;
      right: 0;
      transform: rotate(-90deg) translateY(-50%);
      transform-origin: right;
    }
  `,
)
const Container = styled('div', {
  shouldForwardProp: (prop) => prop !== 'inverted' && prop !== 'hovering',
})<{ inverted?: boolean; hovering?: boolean }>(
  ({ theme, inverted, hovering }) => [
    css`
      display: flex;
      padding: 7px 14px 17px;
      background: ${theme.colors.black};
      color: ${theme.colors.white};
      --background-color: ${theme.colors.black};
      border-radius: 3px 3px 0 0;
      text-transform: uppercase;
      font-weight: 600;
      font-size: ${theme.fontSizes.tertiaryText}px;

      transition: transform 120ms ease-out;
      transform: translateY(10px);
      :hover {
        transform: translateY(1px);
      }

      @media (min-width: ${theme.breakpoints.DESKTOP_LARGE}px) {
        font-size: ${theme.fontSizes.mainText}px;
      }
    `,
    hovering &&
      css`
        transform: translateY(1px);
      `,
    inverted &&
      css`
        background: ${theme.colors.white};
        color: ${theme.colors.black};
        --background-color: ${theme.colors.white};
      `,
  ],
)
const ChatIconContainer = styled.div``
const StyledChatIcon = styled(ChatIcon)`
  height: 1em;
`
const Divider = styled.div`
  margin: 0 10px;
  width: 2px;
  background: currentColor;
`

interface Props
  extends Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'> {
  inverted?: boolean
  hovering?: boolean
}

const ContactButton = ({ inverted, hovering, ...others }: Props) => {
  const config = usePrismicConfig()

  return (
    <Positioner>
      <Link className="plain" href="#footer" {...others}>
        <Container inverted={inverted} hovering={hovering}>
          <ChatIconContainer>
            <StyledChatIcon aria-label="" />
          </ChatIconContainer>
          <Divider />
          {config?.contact}
        </Container>
      </Link>
    </Positioner>
  )
}

export default ContactButton
