import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import {
  arrow,
  autoUpdate,
  ExtendedRefs,
  flip,
  FloatingArrow,
  FloatingPortal,
  inline,
  offset,
  ReferenceType,
  safePolygon,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import {
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from 'react'
import { usePortalTarget } from './PortalTarget'

const FloatingTooltip = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    // A tooltip should not be main content, in other words it should be less
    // important. Make the font size smaller to further de-emphasize it and
    // create a hierarchy.
    font-size: 90%;
    padding: 5px 10px;
    filter: drop-shadow(-4px 4px 0 ${theme.colors.yellow})
      // If the tooltip is over a codeblock, these borders give the tooltip a
      // small outline. They're meant to appear invisible.
      drop-shadow(0 0.5px 0 ${theme.colors.white})
      drop-shadow(0 -0.5px 0 ${theme.colors.white})
      drop-shadow(0.5px 0 0 ${theme.colors.white})
      drop-shadow(-0.5px 0 0 ${theme.colors.white});
    // Make it a similar width as the VSCode tooltip
    max-width: 450px;
    z-index: 10;
    text-wrap: pretty;

    p:first-of-type {
      margin-top: 0;
    }
    p:last-of-type {
      margin-bottom: 0;
    }
  `,
)

type TriggerRenderer = (params: {
  state: { isOpen: boolean }
  props: HTMLAttributes<HTMLSpanElement> & {
    ref: ExtendedRefs<ReferenceType>['setReference']
  }
}) => ReactElement

interface Props
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'content'> {
  children: ReactNode | TriggerRenderer
  content: ReactNode
  role?: 'tooltip' | 'label'
}

const Tooltip = ({ children, content, role = 'tooltip', ...others }: Props) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  const portalTarget = usePortalTarget()
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
    whileElementsMounted: autoUpdate,
    placement: 'top',
    middleware: [
      flip({
        padding: 16,
      }),
      arrow({
        element: arrowRef,
      }),
      offset({
        mainAxis: 7,
      }),
      inline(),
    ],
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      // WCAG 2.1/1.4.13 requires tooltips to not close when the tooltip is hovered
      handleClose: safePolygon({
        // Prevents an issue where hovering a second tooltip trigger when moving
        // towards the tooltip would activate two tooltips.
        blockPointerEvents: true,
      }),
    }),
    useFocus(context),
    useDismiss(context),
    useRole(context, {
      role,
    }),
    // Toggle tooltip by click so that if a user clicks without hovering (e.g.
    // by instructing their screen reader to click), the tooltip will still
    // appear. Also enables keyboard confirm (enter/space).
    useClick(context),
  ])

  const triggerProps = {
    role: 'button',
    tabIndex: 0,
    'aria-expanded': isTooltipOpen,
    ...getReferenceProps(),
    ref: refs.setReference,
    ...others,
  }

  const theme = useTheme()

  return (
    <>
      {typeof children === 'function' ? (
        children({
          state: {
            isOpen: isTooltipOpen,
          },
          props: triggerProps,
        })
      ) : (
        // As much as I want to use a button, buttons do not support display:
        // inline, or in other words, it doesn't wrap text across multiple
        // lines. See https://github.com/w3c/csswg-drafts/issues/3226
        <span {...triggerProps}>{children}</span>
      )}

      {isTooltipOpen && (
        <FloatingPortal root={portalTarget}>
          <FloatingTooltip
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="inverted"
          >
            {content}

            <FloatingArrow
              ref={arrowRef}
              context={context}
              fill={theme.colors.black}
            />
          </FloatingTooltip>
        </FloatingPortal>
      )}
    </>
  )
}

export default Tooltip
