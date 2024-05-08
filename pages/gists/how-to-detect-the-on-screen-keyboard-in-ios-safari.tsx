import Image from 'next/image'
import Code from '../../components/Code'
import CodeSnippet from '../../components/CodeSnippet'
import Gist from '../../components/Gist'
import GistMeta, { GistTag } from '../../components/GistMeta'
import iosOskNative from './assets/ios-osk-native.gif'
import iosOskSafari from './assets/ios-osk-safari.gif'

export const meta: GistMeta = {
  slug: 'how-to-detect-the-on-screen-keyboard-in-ios-safari',
  title: 'How to detect the on-screen keyboard in iOS Safari',
  description:
    'A gist about detecting the on-screen keyboard in iOS Safari with an example React hook.',
  publishedAt: '2024-04-01',
  tags: [GistTag.HowTo, GistTag.Ios, GistTag.Safari, GistTag.React],
}

const GistHowToDetectTheOnScreenKeybordInIosSafari = () => (
  <Gist gist={meta}>
    <p>
      When it comes to the on-screen keyboard (OSK), iOS Safari behaves weirdly.
      This gist is just a small part of the things you need to do to deal with
      the intricacies of the on-screen keyboard in iOS Safari and how to
      (mostly) mimic native app behavior in a PWA.
    </p>
    <p>
      If you want more gists about this, ping me at{' '}
      <a href="https://twitter.com/MartijnHols">Twitter</a>.
    </p>
    <p>
      We will explore the behavior of iOS Safari when the on-screen keyboard
      opens and how to detect it using a React hook.
    </p>
    <h2 id="ios-safari-behavior">
      Behavior of iOS Safari when the on-screen keyboard opens
    </h2>
    <p>
      In iOS Safari, when a user taps on a text input of any kind, the on-screen
      keyboard will open. When it opens, Safari effectively pushes up the entire
      viewport, without resizing it, so that only the bottom half remains
      visible, as seen in the image below.
    </p>
    <Image
      src={iosOskSafari}
      alt="iOS Safari on-screen keyboard viewport update behavior"
    />
    <p>
      Source:{' '}
      <a href="https://blog.opendigerati.com/the-eccentric-ways-of-ios-safari-with-the-keyboard-b5aa3f34228d">
        The Eccentric Ways of iOS Safari with the Keyboard
      </a>
    </p>
    <p>
      When the input field isn’t already at the bottom of the screen, the
      webpage may also be scrolled in an attempt to keep the input field in
      view.
    </p>
    <p>
      This all works well enough for regular websites, but it can be very
      troublesome if you’re attempting to make a native-like webapp/PWA as it
      can push important content out of view.
    </p>
    <p>
      Frustratingly, this behavior is considerably different from native apps.
      In native apps, the on-screen keyboard opening resizes the content of the
      app smoothly so both the header and input box locations are maintained as
      shown below. Most Android browsers also work like this, avoiding the issue
      altogether.
    </p>
    <Image
      src={iosOskNative}
      alt="iOS native app on-screen keyboard behavior recording"
    />
    <h2>How to detect the on-screen keyboard opening</h2>
    <p>
      Unfortunately, iOS Safari does not provide any event specifically for the
      on-screen keyboard opening or closing. This means that we need to resort
      to alternatives that merely imply the fact. There are two ways to attempt
      detecting the on-screen keyboard; we can either monitor viewport resizing
      or we can make an educated guess based on the user focussing input fields.
    </p>
    <h3>Option 1: Viewport resizes monitoring</h3>
    <p>
      Monitoring the viewport resizing quickly becomes complicated or
      unreliable, as the viewport can change for various reasons other than the
      on-screen keyboard. The user may rotate their device (change orientation),
      change zoom level, the address bar may collapse or expand, and even when
      the keyboard stays open it can resize when the user changes keyboard
      layouts.
    </p>
    <h3>Option 2: Input field focus monitoring</h3>
    <p>
      Monitoring input field focus is much more straightforward. When a text
      input is focused, it means the user has tapped on it, making the on-screen
      keyboard open. When the field loses focus (i.e. when the user taps
      somewhere else on the page), the keyboard will close. We can use the
      global <Code>focusin</Code> and <Code>focusout</Code> events for this.
    </p>
    <p>
      Since the <Code>focusin</Code> and <Code>focusout</Code> events can be
      triggered for any focusable element, not just elements that open the
      on-screen keyboard, we need to do a little bit of filtering. I found that
      simply checking if the element is an input field of a supported type or a
      contenteditable element is sufficient for my use-case.
    </p>
    <p>
      The below React hook achieves all of this, providing you with a simple
      boolean value that reflects whether the on-screen keyboard is open. This
      example React code should be adaptable to any framework.
    </p>
    <CodeSnippet>{`import { useEffect, useState } from 'react'

const isKeyboardInput = (elem: HTMLElement) =>
  (elem.tagName === 'INPUT' &&
    !['button', 'submit', 'checkbox', 'file', 'image'].includes(
      (elem as HTMLInputElement).type,
    )) ||
  elem.hasAttribute('contenteditable')

const useIsOnScreenKeyboardOpen = () => {
  const [isOpen, setOpen] = useState(false)
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      if (!e.target) {
        return
      }
      const target = e.target as HTMLElement
      if (isKeyboardInput(target)) {
        setOpen(true)
      }
    }
    document.addEventListener('focusin', handleFocusIn)
    const handleFocusOut = (e: FocusEvent) => {
      if (!e.target) {
        return
      }
      const target = e.target as HTMLElement
      if (isKeyboardInput(target)) {
        setOpen(false)
      }
    }
    document.addEventListener('focusout', handleFocusOut)

    return () => {
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
    }
  }, [])

  return isOpen
}

export default useIsOnScreenKeyboardOpen
`}</CodeSnippet>
    <p>
      This solution is a lot simpler than a viewport resize monitor would be.
      It's not flawless though, as this would also return true if a user is
      using an external keyboard. For my use-case this should suffice in almost
      all cases. If you want to tackle this shortcoming, one option would be to
      add a check that the viewport size decreased after the{' '}
      <Code>focusin</Code> event.
    </p>
  </Gist>
)

export default GistHowToDetectTheOnScreenKeybordInIosSafari
