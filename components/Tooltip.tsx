import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Tippy from '@tippyjs/react'
import { cloneElement, ReactElement, ReactNode, useState } from 'react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'

const StyledTippy = styled(Tippy)(
  ({ theme }) => css`
    background: ${theme.colors.black};
    // Inherit all font properties to match parent style since they're presented
    // as related elements.
    font: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    color: ${theme.colors.white};
    pointer-events: all;
    text-align: center;
    font-size: 16px;
    padding: ${theme.spacing.x1}px;

    .tippy-arrow {
      color: ${theme.colors.black};
    }
  `,
)

interface Props {
  children:
    | ReactElement
    | ((props: { tabIndex: number; 'aria-expanded': boolean }) => ReactElement)
  content: ReactNode
  className?: string
}

const Tooltip = ({ children, content, className }: Props) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  return (
    <>
      <StyledTippy
        content={content}
        animation="shift-away"
        onMount={() => setIsTooltipOpen(true)}
        onHide={() => setIsTooltipOpen(false)}
        className={className}
      >
        {typeof children === 'function'
          ? children({
              tabIndex: 0,
              'aria-expanded': isTooltipOpen,
            })
          : cloneElement(children, {
              tabIndex: 0,
              'aria-expanded': isTooltipOpen,
            })}
      </StyledTippy>
    </>
  )
}

export default Tooltip
