import { useEffect, useState } from 'react'
import Link from '../../../components/Link'

const GoogleTranslateCrashesMonkeyPatchRepro = () => {
  const [lightsOn, setLightsOn] = useState(true)

  const [simulateGoogleTranslate, setSimulateGoogleTranslate] = useState(true)
  useEffect(() => {
    if (!simulateGoogleTranslate) {
      return
    }

    // Not using ref because I want to eliminate all magic and any suggestion
    // that React might be doing something funny
    document
      .getElementById('GoogleTranslateCrashesMonkeyPatchRepro-translateme')
      ?.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          const fontElem = document.createElement('font')
          fontElem.textContent = `[${child.textContent ?? ''}]`

          child.parentElement?.insertBefore(fontElem, child)
          child.parentElement?.removeChild(child)
        }
      })
  })

  // I only want to monkey patch the element that I'm simulating Google
  // Translate on, and not on the entire page.
  // See https://martijnhols.nl/blog/demo/react-translation-reproduction if you
  // want to see the monkey patching running on an entire page exactly as it
  // was suggested in the React issue.
  useEffect(() => {
    const elem = document.getElementById(
      'GoogleTranslateCrashesMonkeyPatchRepro-translateme',
    )

    if (!elem || elem.getAttribute('data-monkey-patched')) {
      return
    }

    // Source: https://github.com/facebook/react/issues/11538#issuecomment-417504600
    /* eslint-disable */
    const originalRemoveChild = elem.removeChild
    // @ts-expect-error Omitting types to make it exactly the same as the original MonkeyPatch
    elem.removeChild = function (child) {
      if (child.parentNode !== this) {
        if (console) {
          console.error(
            'Cannot remove a child from a different parent',
            child,
            this,
          )
        }
        return child
      }
      // @ts-expect-error Omitting types to make it exactly the same as the original MonkeyPatch
      return originalRemoveChild.apply(this, arguments)
    }

    const originalInsertBefore = elem.insertBefore
    // @ts-expect-error Omitting types to make it exactly the same as the original MonkeyPatch
    elem.insertBefore = function (newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) {
        if (console) {
          console.error(
            'Cannot insert before a reference node from a different parent',
            referenceNode,
            this,
          )
        }
        return newNode
      }
      // @ts-expect-error Omitting types to make it exactly the same as the original MonkeyPatch
      return originalInsertBefore.apply(this, arguments)
    }
    /* eslint-enable */
    elem.setAttribute('data-monkey-patched', '')
  })

  return (
    <div
      // Trigger a full remount of the DOM when the checkbox is toggled
      key={String(simulateGoogleTranslate)}
      // Just a little something to show current state
      style={
        lightsOn
          ? {}
          : {
              backgroundColor: '#333',
              color: 'white',
              padding: '1em',
              margin: '-1em',
            }
      }
    >
      <div style={{ marginBottom: '1em' }}>
        <label>
          <input
            type="checkbox"
            checked={simulateGoogleTranslate}
            onChange={() => {
              setSimulateGoogleTranslate(!simulateGoogleTranslate)
            }}
          />{' '}
          Simulate Google Translate
        </label>
      </div>

      <div id="GoogleTranslateCrashesMonkeyPatchRepro-translateme">
        <button
          type="button"
          onClick={() => {
            setLightsOn(!lightsOn)
          }}
          style={{
            marginRight: '0.5em',
          }}
        >
          Toggle lights
        </button>
        {lightsOn && 'There are 4 lights!'}
      </div>

      <div style={{ marginTop: '1em' }}>
        <a
          href="/blog/demo/google-translate-crashes-monkey-patch-repro"
          target="_blank"
        >
          Open in new window
        </a>
        {' | '}
        <a href="https://github.com/MartijnHols/martijnhols.nl/tree/main/pages/blog/demo/google-translate-crashes-monkey-patch-repro.tsx">
          Source
        </a>
        {' | '}
        <Link href="/blog/everything-about-google-translate-crashing-react#monkey-patching-removechild-and-insertbefore">
          More info
        </Link>
      </div>
    </div>
  )
}

export default GoogleTranslateCrashesMonkeyPatchRepro
