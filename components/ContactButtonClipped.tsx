import styled from '@emotion/styled'
import { ComponentProps } from 'react'

import ContactButton from './ContactButton'
import ContactButtonGlobalHover from './ContactButtonGlobalHover'

const ContactButtonClipper = styled.div`
  position: absolute;
  inset: 0;
  clip-path: inset(0 0 0 0);
  pointer-events: none;

  > * {
    pointer-events: all;
  }
`

type Props = ComponentProps<typeof ContactButton>

const ContactButtonClipped = (props: Props) => (
  <ContactButtonClipper>
    <ContactButtonGlobalHover {...props} />
  </ContactButtonClipper>
)

export default ContactButtonClipped
