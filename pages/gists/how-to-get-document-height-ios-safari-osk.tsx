import Image from 'next/image'

import { GistMeta, GistTag } from '.'
import Code from '../../components/Code'
import CodeSnippet from '../../components/CodeSnippet'
import Gist from '../../components/Gist'
import Link from '../../components/Link'
import iosSafariUseViewportSize from './assets/ios-safari-useviewportsize.gif'

export const meta: GistMeta = {
  slug: 'how-to-get-document-height-ios-safari-osk',
  title:
    'How to get the document height in iOS Safari when the on-screen keyboard is open',
  description:
    'In this gist I share a React hook to get an accurate document height that correctly accounts for the on-screen keyboard on iOS Safari.',
  publishedAt: '2024-04-04',
  tags: [GistTag.HowTo, GistTag.Ios, GistTag.Safari, GistTag.React],
}

const GistHowToGetDocumentHeightIosSafariOsk = () => (
  <Gist {...meta}>
    <p>
      When it comes to the on-screen keyboard (OSK), Safari on iOS{' '}
      <Link href="./how-to-detect-the-on-screen-keyboard-in-ios-safari#ios-safari-behavior">
        behaves weirdly
      </Link>
      . The normal ways of getting the screen size do not work as expected. When
      the keyboard is opened in Safari, it moves part of the viewport out of
      sight instead of simply resizing it. This leads to getting the old values
      (i.e. the screen size), despite the keyboard taking a large chunk of the
      screen.
    </p>
    <p>
      We can get the real viewport size using the in 2019 introduced{' '}
      <Code>window.visualViewport</Code> property. This is the only value{' '}
      <a href="./demo/document-height">I found</a> that accounts for the
      on-screen keyboard.
    </p>
    <p>
      This is an essential part that allows us to make layouts with a fixed
      header and footer, even when the keyboard is open or changes sizes. An
      example of this in one of my apps is shown in the GIF below.
    </p>
    <div style={{ textAlign: 'center' }}>
      <Image src={iosSafariUseViewportSize} alt="" width={400} />
    </div>
    <p>
      To achieve this, I set up a <Code>div</Code> with the height from the{' '}
      <Code>useViewportSize</Code> hook below. I also needed to prevent Safari
      from scrolling when the input is selected, for that I used a{' '}
      <a href="https://gist.github.com/MartijnHols/e9f4f787efa9190885a708468f63c5bb#file-useonscreenkeyboardscrollfix-ts">
        separate fix
      </a>
      .
    </p>
    <CodeSnippet>{`import { useCallback, useEffect, useState, useLayoutEffect } from 'react'

const useBrowserLayoutEffect =
  typeof window !== 'undefined'
    ? useLayoutEffect
    : // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {}

type Width = number
type Height = number
type Size = [Width, Height]

/**
 * Get the current size of the Viewport. Do not call this excessively, as it may
 * cause performance issues in WebKit. Querying innerWidth/height triggers a
 * relayout of the page.
 */
export const getViewportSize = (): Size => {
  if (window.visualViewport) {
    // visualViewport is a new prop intended for this exact behavior, prefer it
    // over all else when available
    // https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API
    return [window.visualViewport.width, window.visualViewport.height] as const
  }

  return [
    window.innerWidth,
    // window.innerHeight gets updated when a user opens the soft keyboard, so
    // it should be preferred over documentElement.clientHeight
    // Want more? https://blog.opendigerati.com/the-eccentric-ways-of-ios-safari-with-the-keyboard-b5aa3f34228d
    window.innerHeight,
  ] as const
}

/**
 * Returns the viewport size. This can also be used as a dependency in a
 * useEffect to trigger an update when the browser resizes.
 */
const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState<Size | undefined>()
  const updateViewportSize = useCallback(() => {
    const viewportSize = getViewportSize()

    setViewportSize((oldViewportSize) => {
      if (
        oldViewportSize &&
        oldViewportSize[0] === viewportSize[0] &&
        oldViewportSize[1] === viewportSize[1]
      ) {
        // Maintain old instance to prevent unnecessary updates
        return oldViewportSize
      }

      return viewportSize
    })
  }, [])
  useBrowserLayoutEffect(updateViewportSize, [updateViewportSize])

  useEffect(() => {
    const effectTwice = () => {
      updateViewportSize()
      // Closing the OSK in iOS does not immediately update the visual viewport
      // size :<
      setTimeout(updateViewportSize, 1000)
    }

    window.addEventListener('resize', effectTwice)
    // From the top of my head this used to be required for older browsers since
    // this didn't trigger a resize event. Keeping it in to be safe.
    window.addEventListener('orientationchange', effectTwice)
    // This is needed on iOS to resize the viewport when the Virtual/OnScreen
    // Keyboard opens. This does not trigger any other event, or the standard
    // resize event.
    window.visualViewport?.addEventListener('resize', effectTwice)

    return () => {
      window.removeEventListener('resize', effectTwice)
      window.removeEventListener('orientationchange', effectTwice)
      window.visualViewport?.removeEventListener('resize', effectTwice)
    }
  }, [updateViewportSize])

  return viewportSize
}

export default useViewportSize
`}</CodeSnippet>
    <p>
      While this is made to be compatible with Server Side Rendering / Static
      Site Generation, it is not possible to get the size of a client's screen
      on the server-side. This will always return 0 on the server.
    </p>
    <p>
      I hope this helps. If you need help, let me know on{' '}
      <a href="https://twitter.com/MartijnHols">Twitter</a>.
    </p>
    <p>
      <strong>Update 2024-04-04:</strong> After some testing I found that unlike
      the <Code>window</Code> <Code>resize</Code> event,{' '}
      <Code>window.visualViewport</Code>
      's <Code>resize</Code> event is also triggered for the scrollbar appearing
      and disappearing in regular browsers. That might come in handy.
    </p>
  </Gist>
)

export default GistHowToGetDocumentHeightIosSafariOsk
