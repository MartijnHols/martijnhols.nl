import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import Aside from '../../../components/Aside'
import Code from '../../../components/Code'
import CodeSnippet from '../../../components/CodeSnippet'
import Container from '../../../components/Container'
import Link from '../../../components/Link'
import PageWrapper from '../../../components/PageWrapper'
import TopBar from '../../../components/TopBar'

const applyRemoveChildMonkeyPatch = () => {
  // Source: https://github.com/facebook/react/issues/11538#issuecomment-417504600
  /* eslint-disable prefer-rest-params */
  if (typeof Node === 'function' && Node.prototype) {
    const originalRemoveChild = Node.prototype.removeChild
    // @ts-expect-error Omitting types to make it exactly the same as the original MonkeyPatch
    Node.prototype.removeChild = function (child) {
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

    const originalInsertBefore = Node.prototype.insertBefore
    // @ts-expect-error Omitting types to make it exactly the same as the original MonkeyPatch
    Node.prototype.insertBefore = function (newNode, referenceNode) {
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
  }
}

const Hr = styled.hr`
  margin: 2em 0;
`

const ReactTranslationReproduction = () => {
  const [isMonkeyPatchEnabled, setIsMonkeyPatchEnabled] = useState(false)

  const handleMonkeyPatchButtonClick = () => {
    if (isMonkeyPatchEnabled) {
      return
    }

    setIsMonkeyPatchEnabled(true)
    applyRemoveChildMonkeyPatch()
  }

  const [clicks, setClicks] = useState(0)

  useEffect(() => {
    const elem = document.getElementById('crashhere')

    elem?.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const fontEl = document.createElement('font')
        fontEl.textContent = `[${child.textContent}]`

        child.parentElement?.insertBefore(fontEl, child)
        child.parentElement?.removeChild(child)
      }
    })
  })

  return (
    <PageWrapper>
      <TopBar>
        <a href="https://github.com/MartijnHols/martijnhols.nl/blob/main/pages/gists/demo/react-translation-reproduction.tsx">
          Source code
        </a>
      </TopBar>

      <Container>
        <p>
          <mark>See browser console for errors.</mark>
        </p>
        <p>
          Click this button to apply the removeChild MonkeyPatch suggested in{' '}
          <a href="https://github.com/facebook/react/issues/11538#issuecomment-417504600">
            this comment
          </a>
          :
        </p>
        <p>
          <button
            type="button"
            onClick={handleMonkeyPatchButtonClick}
            disabled={isMonkeyPatchEnabled}
          >
            {isMonkeyPatchEnabled
              ? 'removeChild MonkeyPatch is applied!'
              : 'Enable removeChild MonkeyPatch'}
          </button>{' '}
        </p>
        <p>
          Click this button to simulate a React rerender after Google Translate
          has translated a page:
        </p>
        <p>
          <button type="button" onClick={() => setClicks(clicks + 1)}>
            Increment clicks
          </button>{' '}
          (this will trigger the crash)
        </p>
        <p>
          You have clicked the button{' '}
          <mark id="crashhere">
            {clicks === 1 && 'once'}
            {clicks !== 1 && `${clicks} times`}
          </mark>
          .
        </p>

        <Hr />
        <p>The line above is rendered using the following code:</p>
        <CodeSnippet variant="sm">{`
<p>
  You have clicked the button{' '}
  <mark id="crashhere">
    {clicks === 1 && 'once'}
    {clicks !== 1 && \`\${clicks} times\`}
  </mark>
  .
</p>
`}</CodeSnippet>
        <p>
          I also set up a <Code>useEffect</Code> to replace the{' '}
          <Code>crashhere</Code> element's text content with a <Code>font</Code>{' '}
          element that adds square brackets around the text. This is pretty
          similar to what Google Translate and other machine translation tools
          do.
        </p>
        <p>
          When you click the "Increment clicks" button, the only thing that
          happens is the <Code>clicks</Code> state is simply incremented by one
          to trigger a rerender of React. This is all just normal React code.
        </p>
        <p>
          The crash is caused by the DOM code being changed by the{' '}
          <Code>useEffect</Code>. This <Code>useEffect</Code> is just a way to
          simulate how most machine translation tools work, including Google
          Translate inside Google Chrome.
        </p>
        <Aside variant="xs">
          You can't reproduce this as easily with a ternary since React will
          cleverly replace the TextNode's content for those if possible.
        </Aside>

        <p>
          <Link href="/gists">More gists</Link>
        </p>
      </Container>
    </PageWrapper>
  )
}

export default ReactTranslationReproduction
