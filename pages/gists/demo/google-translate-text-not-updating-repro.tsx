import { useEffect, useState } from 'react'
import Link from '../../../components/Link'

const GoogleTranslateTextNotUpdatingRepro = () => {
  const [lights, setLights] = useState(3)

  const [simulateGoogleTranslate, setSimulateGoogleTranslate] = useState(true)
  useEffect(() => {
    if (!simulateGoogleTranslate) {
      return
    }

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

      <div>
        <button type="button" onClick={() => setLights(lights + 1)}>
          Add light
        </button>{' '}
        <span id="GoogleTranslateTextNotUpdatingRepro-translateme">
          There are {lights} lights
        </span>
      </div>
      <div
        style={{
          color: '#494',
        }}
        translate="no"
      >
        There are {lights} lights
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
        <Link href="/gists/everything-about-google-translate-crashing-react#issue-translated-text-wont-update-reproduction">
          More info
        </Link>
      </div>
    </div>
  )
}

export default GoogleTranslateTextNotUpdatingRepro
