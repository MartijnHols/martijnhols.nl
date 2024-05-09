import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Tippy from '@tippyjs/react'
import { cloneElement, ReactElement, ReactNode, useState } from 'react'
import { usePortalTarget } from './PortalTarget'
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
    // A tooltip should not be main content, in other words it should be less
    // important. Make the font size smaller to further de-emphasize it and
    // create a hierarchy.
    font-size: 90%;
    color: ${theme.colors.white};
    pointer-events: all;
    text-align: left;
    padding: 4px 10px 5px;
    border-radius: 0;
    filter: drop-shadow(-4px 4px 0 ${theme.colors.yellow});
    // If the tooltip is over a codeblock, these borders give the tooltip a
    // proper outline. They're meant to appear invisible.
    border-top: 1px solid ${theme.colors.white};
    border-right: 1px solid ${theme.colors.white};

    .tippy-content {
      padding: 0;
    }
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

  const portalTarget = usePortalTarget()

  return (
    <StyledTippy
      content={content}
      animation="shift-away"
      onMount={() => setIsTooltipOpen(true)}
      onHide={() => setIsTooltipOpen(false)}
      className={className}
      appendTo={() => portalTarget ?? document.body}
      // Make it look like the VSCode tooltip
      maxWidth={450}
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
  )
}

export default Tooltip
