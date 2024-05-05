import { useEffect, useState } from 'react'
import Code from '../../../components/Code'
import CodeSnippet from '../../../components/CodeSnippet'
import Container from '../../../components/Container'
import PageWrapper from '../../../components/PageWrapper'

const applyRemoveChildMonkeyPatch = () => {
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
        fontEl.textContent = child.textContent

        child.parentElement?.insertBefore(fontEl, child)
        child.parentElement?.removeChild(child)
      }
    })
  })

  return (
    <PageWrapper>
      <Container>
        <p>
          <a href="https://github.com/MartijnHols/martijnhols.nl/blob/main/pages/gists/demo/react-translation-reproduction.tsx">
            Source code
          </a>
        </p>
        <p>See browser console for errors.</p>
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
          (
          <a href="https://github.com/facebook/react/issues/11538#issuecomment-417504600">
            source
          </a>
          )
        </p>
        <p>
          <button type="button" onClick={() => setClicks(clicks + 1)}>
            Trigger crash
          </button>
        </p>
        <p>
          You have clicked the button{' '}
          <span id="crashhere">
            {clicks === 1 && 'once'}
            {clicks !== 1 && `${clicks} times`}
          </span>
          .
        </p>

        <hr />
        <p>The line above is rendered using the following code:</p>
        <CodeSnippet variant="sm">{`
<p>
  You have clicked the button{' '}
  <span id="crashhere">
    {clicks === 1 && 'once'}
    {clicks !== 1 && \`\${clicks} times\`}
  </span>
  .
</p>
`}</CodeSnippet>
        <p>
          I also set up a <Code>useEffect</Code> to replace the{' '}
          <Code>crashhere</Code>
          element's text content with a <Code>font</Code> element. This is very
          similar to what Google Translate and other machine translation tools
          do. If you want to see the element, you can inspect the DOM.
        </p>
        <p>
          When you click the "Trigger crash" button, <Code>clicks</Code> is
          simply incremented by one. This is all just normal React code.
        </p>
        <p>
          You can't reproduce this as easily with a ternary since React will
          cleverly replace the TextNode's content for those if possible.
        </p>
      </Container>
    </PageWrapper>
  )
}

export default ReactTranslationReproduction
