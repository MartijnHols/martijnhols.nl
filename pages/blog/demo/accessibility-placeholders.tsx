import styled from '@emotion/styled'
import { useState } from 'react'
import Link from '../../../components/Link'

const Input = styled.input`
  width: 100%;

  ::placeholder {
    // Make the issue of being unable to see which fields are filled more
    // pronounced.
    // Remember, not everyone's eye sight is perfect.
    opacity: 0.8;
  }
`

const AccessibilityPlaceholders = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div>
        Submitted!
        <hr />
        <button type="button" onClick={() => setIsSubmitted(false)}>
          Reset
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <div>Firstname</div>
        <Input type="text" name="firstName" placeholder="Peter" />
      </label>
      <label>
        <div>Lastname</div>
        <Input type="text" name="lastName" placeholder="Griffin" />
      </label>
      <label>
        <div>Email</div>
        <Input type="email" name="email" placeholder="peter@griffin.com" />
      </label>
      <div style={{ marginTop: '1em' }}>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

const AccessibilityPlaceholdersPage = () => (
  <div style={{ padding: '1em' }}>
    <h1>Accessibility Placeholders</h1>
    <AccessibilityPlaceholders />

    <div style={{ marginTop: '1em' }}>
      <a href="/blog/demo/accessibility-placeholders" target="_blank">
        Open in new window
      </a>
      {' | '}
      <a href="https://github.com/MartijnHols/martijnhols.nl/tree/main/pages/blog/demo/accessibility-placeholders.tsx">
        Source
      </a>
      {' | '}
      <Link href="/blog/accessibility-essentials-every-react-developer-should-know">
        More info
      </Link>
    </div>
  </div>
)

export default AccessibilityPlaceholdersPage
