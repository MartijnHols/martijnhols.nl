import Image from 'next/image'

import { GistMeta } from '.'
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
  publishedAt: '2024-04-01',
  tags: ['react', 'ios', 'safari'],
}

const GistHowToGetDocumentHeightIosSafariOsk = () => (
  <Gist {...meta}>
    <p>
      When it comes to the on-screen keyboard (OSK), Safari on iOS{' '}
      <Link href="./how-to-detect-the-on-screen-keyboard-in-ios-safari#ios-safari-behavior">
        behaves weirdly
      </Link>
      . The normal ways of getting the screen size do not work as expected, as
      the keyboard in Safari moves the viewport out of sight instead of resizing
      it. This leads to getting the old values (i.e. the screen size), despite
      the keyboard taking a large chunk of the screen.
    </p>
    <p>
      Using the in 2019 introduced <Code>window.visualViewport</Code> property,
      we can get a screen size that does account for the on-screen keyboard.
      This allows us to make layouts which dynamically resize when the keyboard
      opens or changes sizes as shown in the GIF below.
    </p>
    <div style={{ textAlign: 'center' }}>
      <Image
        src={iosSafariUseViewportSize}
        alt=""
        width={400}
        height={700}
        objectFit="contain"
      />
    </div>
    <p>The code to achieve this is below.</p>
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
    <h2>Bonus: installing on the homescreen</h2>
    <p>
      When your app will be installed on the homescreen, you will also need the
      following snippet in order to account for the notch.{' '}
    </p>
    <CodeSnippet language="css">{`
html,
body {
  // Necessary for iOS when installed on homescreen, otherwise useViewportSize 
  // does not include the notch height.
  // This must be vh not % due to a bug in iOS 15.1 where the address bar 
  // sometimes minimizes after the OSK closes. When this happens, only 100vh 
  // seems to have the correct value.
  height: 100vh;
}
`}</CodeSnippet>
    <p>
      Ping me at <a href="https://twitter.com/MartijnHols">Twitter</a> if you
      have any questions, or want to know more about this or something related.
    </p>
  </Gist>
)

export default GistHowToGetDocumentHeightIosSafariOsk
