import { EXITED, TransitionStatus } from 'react-transition-group/Transition'

const repaintOnMount =
  (transitionState: TransitionStatus) => (elem: HTMLElement | null) => {
    if (!elem) {
      return
    }
    if (transitionState === EXITED) {
      // This is to force a repaint so CSS transitions are applied.
      // See: https://github.com/reactjs/react-transition-group/blob/85016bfddd3831e6d7bb27926f9f178d25502913/src/CSSTransition.js#L197
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      elem.scrollTop
    }
  }

export default repaintOnMount
