/* eslint-disable react/jsx-curly-brace-presence */
import Code from '../../components/Code'
import CodeSnippet from '../../components/CodeSnippet'
import Gist from '../../components/Gist'
import GistMeta, { GistTag } from '../../components/GistMeta'

export const meta: GistMeta = {
  slug: 'react-switch-statement-rendering',
  title:
    'React basics: Can I use a switch statement to render components in React?',
  description:
    'Exploring the various ways to conditionally render components in React.',
  publishedAt: '2024-03-31',
  tags: [GistTag.React, GistTag.Basics],
}

// I forgot the <div>{{ [true]: <LightSwitchOn/>, [false]: <LightSwitchOff/>}[enabled]}</div> pattern

const ReactSwitchStatementRendering = () => (
  <Gist gist={meta}>
    <p>
      You can safely use any plain old JavaScript to dynamically render
      components in React, so long as you do not make and use a component
      dynamically. The following all behave exactly the same in React:
    </p>
    <p id="ternary">✅ Ternary:</p>
    <CodeSnippet>
      {`const LightSwitch = () => {
  const [enabled, setEnabled] = useState(false)

  return (
    <div>
      {enabled ? <LightSwitchOn /> : <LightSwitchOff />}
    </div>
  )
}`}
    </CodeSnippet>
    <p id="render-function">✅ Render function:</p>
    <CodeSnippet>
      {`const LightSwitch = () => {
  const [enabled, setEnabled] = useState(false)

  const renderComponent = () => {
    if (enabled) {
      return <LightSwitchOn />
    }

    return <LightSwitchOff />
  }
  
  return (
    <div>
      {renderComponent()}
    </div>
  )
}`}
    </CodeSnippet>
    <p id="switch-in-render-function">✅ Switch in a render function:</p>
    <CodeSnippet>
      {`const LightSwitch = () => {
  const [enabled, setEnabled] = useState(false)

  const renderCompoent = () => {
    switch (enabled) {
      case true:
        return <LightSwitchOn />
      case false:
        return <LightSwitchOff />
    }
  }

  return (
    <div>
      {renderComponent()}
    </div>
  )
}`}
    </CodeSnippet>
    <p>
      When using a switch statement like this,{' '}
      <strong>
        make sure that the cases in your switch-statement handle all possible
        values
      </strong>
      . If you forget to handle a value (e.g. <Code>null</Code> or{' '}
      <Code>undefined</Code> during loading), your component will unmount and
      remount, making the switch behave differently from the other examples.
    </p>
    <p>
      ✅ You can also inline it with a{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Glossary/IIFE">
        self-invoking anonymous function
      </a>
      :
    </p>
    <CodeSnippet>
      {`const LightSwitch = () => {
  const [enabled, setEnabled] = useState(false)

  return (
    <div>
      {(() => {
        switch (enabled) {
          case true:
            return <LightSwitchOn />
          case false:
            return <LightSwitchOff />
        }
      })()}
    </div>
  )
}`}
    </CodeSnippet>
    <p>But this can get messy quickly when your component gets larger.</p>
    <p>
      I almost exclusively use the <a href="#ternary">ternary</a> pattern, as it
      is by far the simplest. Keeping my code as simple as possible is very
      important to me.
    </p>
    <p id="dynamically-creating-components">
      ❌ The main thing to avoid is dynamically creating components as shown in
      the next code snippet.
    </p>
    <CodeSnippet>
      {`const LightSwitch = () => {
  const [enabled, setEnabled] = useState(false)

  const Component = () => {
    if (enabled) {
      return <LightSwitchOn />
    }

    return <LightSwitchOff />
  }

  return (
    <div>
      <Component />
    </div>
  )
}`}
    </CodeSnippet>
    <p>
      What happens here is that we're making a component-like function and
      calling it like you would any other component. React won't be able to
      recognize that the component is the same across renders, leading to the
      entire child-tree being remounted.
    </p>
    <p>
      If you replaced <Code>{`<Component />`}</Code> with{' '}
      <Code>{`{Component()}`}</Code>, this would behave exactly the same as the{' '}
      <a href="#render-function">render function</a> example above. The only
      problem is that it's much harder to see what is going on, so I recommend
      using the <Code>{`renderX`}</Code> naming scheme instead.
    </p>
    <p>
      ✅ The following snippet may appear like it also runs into this issue of
      dynamically making a component. But since it doesn't actually create a new
      function, the correct component references are used and it works as you
      would expect.
    </p>
    <CodeSnippet>
      {`const LightSwitch = () => {
  const [enabled, setEnabled] = useState(false)

  const Component = enabled ? LightSwitchOn : LightSwitchOff

  return (
    <div>
      <Component />
    </div>
  )
}`}
    </CodeSnippet>
    <p>
      There are some niche use-cases for this last pattern, but in general I
      recommend avoiding it as it can be hard to follow. While this may seem
      like a smart way of conditionally rendering a component, often the
      simplest solution (the <a href="#ternary">ternary</a>) is the best.
    </p>
    <p>
      This gist was inspired by the following question on Stack Overflow:{' '}
      <a href="https://stackoverflow.com/q/78248678/684353">
        The components are getting unmounted and mounted again if we use switch
        case, Why?
      </a>
      .
    </p>
  </Gist>
)

export default ReactSwitchStatementRendering
