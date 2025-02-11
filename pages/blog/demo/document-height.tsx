import { css, Global } from '@emotion/react'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'

const position = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  border: '3px solid blue',
} as const
const safeArea = {
  ...position,
  background: '#fff',
  border: 0,
  opacity: 0.5,
} as const

const DocumentHeight = () => {
  const [, setRenderCount] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => {
      setRenderCount((i) => i + 1)
    }

    window.addEventListener('resize', handleResize)
    // From the top of my head this used to be required for older browsers since
    // this didn't trigger a resize event. Keeping it in to be safe.
    window.addEventListener('orientationchange', handleResize)
    // This is needed on iOS to resize the viewport when the Virtual/OnScreen
    // Keyboard opens. This does not trigger any other event, or the standard
    // resize event.
    window.visualViewport?.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [setRenderCount])

  // Prevent scrolling/overscrolling
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const elem = container.current
    if (!elem) {
      return
    }

    const preventDefault = (e: Event | SyntheticEvent) => {
      e.preventDefault()
    }

    elem.addEventListener('pointermove', preventDefault)
    elem.addEventListener('touchmove', preventDefault)
    return () => {
      elem.removeEventListener('pointermove', preventDefault)
      elem.removeEventListener('touchmove', preventDefault)
    }
  }, [container])

  const [valueIndex, setValueIndex] = useState<number>(0)

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  if (!isClient) {
    return null
  }

  const values: [string, number | string][] = [
    // safari=OK ios homescreen=NAY
    [
      'document?.documentElement?.clientHeight',
      document.documentElement.clientHeight,
    ],
    [
      'document?.documentElement?.clientHeight - 1',
      document.documentElement.clientHeight - 1,
    ],
    // safari=NAY ios homescreen=OK
    [
      'document.documentElement.getBoundingClientRect().height',
      document.documentElement.getBoundingClientRect().height,
    ],
    // safari=OK ios homescreen=OK
    ['window.innerHeight', window.innerHeight],
    // safari=NAY ios homescreen=OK
    ['document.body.clientHeight', document.body.clientHeight],
    // safari=OK ios homescreen=OK
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ['window.visualViewport.height', window.visualViewport!.height],
    // safari=OK ios homescreen=NAY
    ['100%', '100%'],
    ['100vh', '100vh'],
    ['-webkit-fill-available', '-webkit-fill-available'],
    ['stretch', 'stretch'],
    ['100svh', '100svh'],
    ['100lvh', '100lvh'],
    ['100dvh', '100dvh'],
  ]
  const handleClick = () => {
    // First reset to ensure the layout is updated with the new value
    setValueIndex(-1)
    requestAnimationFrame(() => {
      setValueIndex(valueIndex + 1 === values.length ? 0 : valueIndex + 1)
    })
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        style={{
          ...position,
          background: 'red',
          height: values[valueIndex] ? values[valueIndex][1] : 0,
          padding: '50px 10px',
        }}
        onClick={handleClick}
        ref={container}
      >
        {values[valueIndex] ? values[valueIndex][0] : 'reset'}=
        {values[valueIndex] ? values[valueIndex][1] : 0}
        <br />
        <br />
        <input
          onChange={handleClick}
          onClick={(e) => {
            e.stopPropagation()
          }}
          style={{ background: '#fff' }}
        />
        <div
          style={{
            ...safeArea,
            height: 'env(safe-area-inset-top)',
          }}
        />
        <div
          style={{
            ...safeArea,
            height: 'env(safe-area-inset-bottom)',
            top: 'auto',
            bottom: 0,
          }}
        />
        <div
          style={{
            ...safeArea,
            width: 'env(safe-area-inset-left)',
            left: 0,
            height: '100%',
          }}
        />
        <div
          style={{
            ...safeArea,
            width: 'env(safe-area-inset-right)',
            right: 0,
            height: '100%',
          }}
        />
      </div>

      <Global
        styles={css`
          html,
          body {
            height: 100%;
          }
        `}
      />
    </>
  )
}

export default DocumentHeight
