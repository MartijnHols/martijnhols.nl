'use client'

import { ComponentProps } from 'react'
import { makeVar, useReactiveVar } from '../utils/reactiveVar'
import ContactButton from './ContactButton'

export const isHoveringContactButtonVar = makeVar(false)

type Props = ComponentProps<typeof ContactButton>

const ContactButtonGlobalHover = (props: Props) => {
  const isHoveringContactButton = useReactiveVar(isHoveringContactButtonVar)

  const handleMouseEnter = () => {
    isHoveringContactButtonVar(true)
  }
  const handleMouseLeave = () => {
    isHoveringContactButtonVar(false)
  }

  return (
    <ContactButton
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      hovering={isHoveringContactButton}
    />
  )
}

export default ContactButtonGlobalHover
