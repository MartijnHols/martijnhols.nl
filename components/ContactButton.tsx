import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ComponentProps } from 'react'
import { breakpoints } from '../theme'
import ChatIcon from './assets/chat.svg'
import Link from './Link'

const Positioner = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 0;
  right: 30px;

  @media (min-width: ${breakpoints.TABLET}px) {
    bottom: auto;
    // We can't use transform since the rotation messes that up. It doesn't need
    // to be perfectly centered anyway.
    top: 30%;
    right: 0;
    transform: rotate(-90deg) translateY(-50%);
    transform-origin: right;
  }
`
const Container = styled('div', {
  shouldForwardProp: (prop) => prop !== 'inverted' && prop !== 'hovering',
})<{ inverted?: boolean; hovering?: boolean }>(({ inverted, hovering }) => [
  css`
    display: flex;
    padding: 0.5em 0.8em 1em;
    background: var(--black);
    color: var(--white);
    --background-color: var(--black);
    border-radius: 0.2em 0.2em 0 0;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 1rem;

    transition: transform 120ms ease-out;
    transform: translateY(0.5em);
    :hover {
      transform: translateY(0em);
    }

    @media (min-width: ${breakpoints.DESKTOP}px) {
      font-size: 1.125rem;
    }
    @media (min-width: ${breakpoints.DESKTOP_LARGE}px) {
      font-size: 1.3rem;
    }
  `,
  hovering &&
    css`
      transform: translateY(1px);
    `,
  inverted &&
    css`
      background: var(--yellow);
      color: var(--black);
      --background-color: var(--yellow);
    `,
])
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

const ContactButton = ({ inverted, hovering, ...others }: Props) => (
  <Positioner>
    <Link className="plain" href="#footer" {...others}>
      <Container inverted={inverted} hovering={hovering}>
        <ChatIconContainer>
          <StyledChatIcon aria-hidden />
        </ChatIconContainer>
        <Divider />
        Contact
      </Container>
    </Link>
  </Positioner>
)

export default ContactButton
