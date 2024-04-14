import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'
import Tippy from '@tippyjs/react'
import { ReactNode, useState } from 'react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'

const Container = styled.span(
  ({ theme }) => css`
    font-style: italic;
    border-bottom: 1px dashed ${theme.colors.black};
    cursor: help;
    // cancel out attr default styling
    text-decoration: none;
  `,
)

interface Props {
  children: ReactNode
  annotation: string
  element?: 'dfn' | 'abbr'
}

const Annotation = ({ children, annotation, element }: Props) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  return (
    <>
      <Tippy
        content={annotation}
        animation="shift-away"
        onMount={() => setIsTooltipOpen(true)}
        onHide={() => setIsTooltipOpen(false)}
      >
        <Container as={element} tabIndex={0} aria-expanded={isTooltipOpen}>
          {children}
        </Container>
      </Tippy>
      <Global
        styles={(theme) => css`
          .tippy-box {
            background: ${theme.colors.black};
            color: ${theme.colors.yellow};
            pointer-events: all;
            text-align: center;
            font-size: 16px;
            padding: ${theme.spacing.x1}px;
          }
          .tippy-arrow {
            color: ${theme.colors.black};
          }
        `}
      />
    </>
  )
}

export default Annotation
