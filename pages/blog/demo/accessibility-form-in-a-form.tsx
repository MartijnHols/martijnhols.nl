import styled from '@emotion/styled'
import { useState } from 'react'
import Link from '../../../components/Link'

const Input = styled.input`
  width: 100%;
`

const AccessibilityFormInAForm = () => {
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
        <Input type="text" name="firstName" />
      </label>
      <label>
        <div>Lastname</div>
        <Input type="text" name="lastName" />
      </label>
      <label>
        <div>Email</div>
        <Input type="email" name="email" />
      </label>
      <div style={{ marginTop: '1em' }}>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

const AccessibilityFormInAFormPage = () => (
  <div style={{ padding: '1em' }}>
    <h1>Accessibility Form In A Form</h1>
    <AccessibilityFormInAForm />

    <div style={{ marginTop: '1em' }}>
      <a href="/blog/demo/accessibility-form-in-a-form" target="_blank">
        Open in new window
      </a>
      {' | '}
      <a href="https://github.com/MartijnHols/martijnhols.nl/tree/main/pages/blog/demo/accessibility-form-in-a-form.tsx">
        Source
      </a>
      {' | '}
      <Link href="/blog/accessibility-essentials-every-react-developer-should-know">
        More info
      </Link>
    </div>
  </div>
)

export default AccessibilityFormInAFormPage
