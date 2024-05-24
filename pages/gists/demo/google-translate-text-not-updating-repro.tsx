import { useEffect, useState } from 'react'
import Link from '../../../components/Link'

const GoogleTranslateTextNotUpdatingRepro = () => {
  const [lights, setLights] = useState(4)

  const [simulateGoogleTranslate, setSimulateGoogleTranslate] = useState(true)
  useEffect(() => {
    if (!simulateGoogleTranslate) {
      return
    }

    // Not using ref because I want to eliminate all magic and any suggestion
    // that React might be doing something funny
    document
      .getElementById('GoogleTranslateTextNotUpdatingRepro-translateme')
      ?.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const fontElem = document.createElement('font')
          fontElem.textContent = `[${child.textContent}]`

          child.parentElement?.insertBefore(fontElem, child)
          child.parentElement?.removeChild(child)
        }
      })
  })

  return (
    <div
      // Trigger a full remount of the DOM when the checkbox is toggled
      key={`${simulateGoogleTranslate}`}
    >
      <div style={{ marginBottom: '1em' }}>
        <label>
          <input
            type="checkbox"
            checked={simulateGoogleTranslate}
            onChange={() =>
              setSimulateGoogleTranslate(!simulateGoogleTranslate)
            }
          />{' '}
          Simulate Google Translate
        </label>
      </div>

      <div id="GoogleTranslateTextNotUpdatingRepro-translateme">
        <button
          type="button"
          onClick={() => setLights(lights + 1)}
          style={{ marginRight: '0.5em' }}
        >
          Add light
        </button>
        There are {lights} lights!
      </div>
      <div
        style={{
          color: '#494',
        }}
        translate="no"
      >
        There are {lights} lights!
      </div>

      <div style={{ marginTop: '1em' }}>
        <a
          href="/gists/demo/google-translate-text-not-updating-repro"
          target="_blank"
        >
          Open in new window
        </a>
        {' | '}
        <a href="https://github.com/MartijnHols/martijnhols.nl/tree/main/pages/gists/demo/google-translate-text-not-updating-repro.tsx">
          Source
        </a>
        {' | '}
        <Link href="/gists/everything-about-google-translate-crashing-react#issue-translated-text-not-updating-reproduction">
          More info
        </Link>
      </div>
    </div>
  )
}

export default GoogleTranslateTextNotUpdatingRepro
