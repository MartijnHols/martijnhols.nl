import styled from '@emotion/styled'
import { useId, useState } from 'react'
import Link from '../../../components/Link'

const Input = styled.input`
  width: 100%;
`

const AccessibilityFormInAForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  const id = useId()

  if (isSubmitted) {
    return (
      <div>
        Submitted!
        <hr />
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false)
          }}
        >
          Reset
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={`${id}-firstName`}>
        <div>Firstname</div>
        <Input type="text" name="firstName" id={`${id}-firstName`} />
      </label>
      <label htmlFor={`${id}-lastName`}>
        <div>Lastname</div>
        <Input type="text" name="lastName" id={`${id}-lastName`} />
      </label>
      <label htmlFor={`${id}-email`}>
        <div>Email</div>
        <Input type="email" name="email" id={`${id}-email`} />
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
