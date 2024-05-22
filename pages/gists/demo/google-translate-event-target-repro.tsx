import { MouseEvent, useEffect, useState } from 'react'
import Link from '../../../components/Link'

const GoogleTranslateEventTargetRepro = () => {
  const [clickedElement, setClickedElement] = useState<HTMLElement | null>(null)

  const [simulateGoogleTranslate, setSimulateGoogleTranslate] = useState(true)
  useEffect(() => {
    if (!simulateGoogleTranslate) {
      return
    }

    // Not using ref because I want to eliminate all magic and any suggestion
    // that React might be doing something funny
    document
      .getElementById('GoogleTranslateEventTargetRepro-translateme')
      ?.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const fontElem = document.createElement('font')
          fontElem.textContent = `[${child.textContent}]`

          child.parentElement?.insertBefore(fontElem, child)
          child.parentElement?.removeChild(child)
        }
      })
  })

  const handleClick = (e: MouseEvent) => {
    setClickedElement(e.target as HTMLElement | null)
  }

  return (
    <div
      // Trigger a full remount of the DOM when the checkbox is toggled
      key={`${simulateGoogleTranslate}`}
      onClick={handleClick}
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
        <button type="button" id="GoogleTranslateEventTargetRepro-translateme">
          There are 3 lights
        </button>
      </div>

      <div>You clicked: {clickedElement ? clickedElement.tagName : 'N/A'}</div>

      <div style={{ marginTop: '1em' }}>
        <a
          href="/gists/demo/google-translate-event-target-repro"
          target="_blank"
        >
          Open in new window
        </a>
        {' | '}
        <a href="https://github.com/MartijnHols/martijnhols.nl/tree/main/pages/gists/demo/google-translate-event-target-repro.tsx">
          Source
        </a>
        {' | '}
        <Link href="/gists/everything-about-google-translate-crashing-react#issue-inconsistent-event-target-reproduction">
          More info
        </Link>
      </div>
    </div>
  )
}

export default GoogleTranslateEventTargetRepro
