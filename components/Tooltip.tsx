import { Global, css } from '@emotion/react'
import Tippy from '@tippyjs/react'
import { ReactElement, ReactNode, cloneElement, useState } from 'react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'

interface Props {
  children:
    | ReactElement
    | ((props: { tabIndex: number; 'aria-expanded': boolean }) => ReactElement)
  content: ReactNode
}

const Tooltip = ({ children, content }: Props) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  return (
    <>
      <Tippy
        content={content}
        animation="shift-away"
        onMount={() => setIsTooltipOpen(true)}
        onHide={() => setIsTooltipOpen(false)}
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

export default Tooltip
