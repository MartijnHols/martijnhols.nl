/* eslint-disable react/no-unknown-property */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import Abbreviation from '../../components/Abbreviation'
import Annotation from '../../components/Annotation'
import Aside from '../../components/Aside'
import Code from '../../components/Code'
import CodeSnippet from '../../components/CodeSnippet'
import Figure from '../../components/Figure'
import Gist from '../../components/Gist'
import GistMeta, { GistTag } from '../../components/GistMeta'
import Link from '../../components/Link'
import Node from '../../components/Node'
import NodeChildren from '../../components/NodeChildren'
import NodeTree from '../../components/NodeTree'
import Reproduction from '../../components/Reproduction'
import Tooltip from '../../components/Tooltip'
import activateGoogleTranslateImage from './assets/google-translate-activate.gif'
import autoCardAnywhereImage from './assets/google-translate-autocardanywhere.png'
import chromeLanguageSetupImage from './assets/google-translate-language-setup.gif'
import lightsMemeImage from './assets/google-translate-lights-meme.gif'
import openGraphImage from './assets/ogimage-everything-about-google-translate-crashing-react.png'
import GoogleTranslateCrashesMonkeyPatchRepro from './demo/google-translate-crashes-monkey-patch-repro'
import GoogleTranslateCrashesRepro from './demo/google-translate-crashes-repro'
import GoogleTranslateCrashesTernaryRepro from './demo/google-translate-crashes-ternary-repro'
import GoogleTranslateEventTargetRepro from './demo/google-translate-event-target-repro'
import GoogleTranslateTextNotUpdatingRepro from './demo/google-translate-text-not-updating-repro'

const CodeError = styled(Code)`
  color: red;
`

export const meta: GistMeta = {
  slug: 'everything-about-google-translate-crashing-react',
  title:
    // "Everything" might be a bit presumptuous, but I also think it's more
    // neutral than "A deep dive into...". I do think I cover every important
    // part in this article, so I think it's a fair enough
    'Everything about Google Translate crashing React (and other web apps)',
  description:
    'The (in-depth) gist of Google Translate (and other browser extensions) interference breaking React and other web apps.',
  image: openGraphImage,
  publishedAt: '2024-05-29',
  tags: [GistTag.React, GistTag.MachineTranslation, GistTag.I18n],
}

const EverythingAboutGoogleTranslateCrashingReact = () => (
  <Gist gist={meta} addendum={<Addendum />}>
    <p>
      Google Translate, the built-in extension of Google Chrome, is a{' '}
      <i>machine translator</i> that provides users with an easy way of
      translating webpages from within their browser tab. This allows webpages
      to be used by users from all over the world, regardless of their native
      language.
    </p>
    <p>
      But this convenience comes at a cost, as it interferes with the workings
      of many modern sites. This is because{' '}
      <strong>
        Google Translate manipulates the DOM in such a way that it breaks the
        base apps.
      </strong>{' '}
      This interference often manifest as crashes caused by the DOM element's
      native <Code>removeChild</Code> method, resulting in errors like{' '}
      <CodeError>
        NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be
        removed is not a child of this node.
      </CodeError>
      , but it affects a lot more.{' '}
      <strong>Not all issues are as obvious as a crash.</strong>
    </p>
    <p>
      The focus of this article will be on Google Translate's interference of
      React, but it's important to note that these issues are not unique to
      React; they affect most machine translators and can disrupt any large and
      complex web app.
    </p>
    <p>In this article, we will explore:</p>
    <ul>
      <li>How Google Translate works</li>
      <li>Google Translate's interference</li>
      <li>The interference of browser extensions in general</li>
      <li>The impact on regular JavaScript code</li>
      <li>Possible workarounds and alternatives</li>
    </ul>
    <p>
      Additionally, at the end of the article you will find an{' '}
      <Link href="#addendum">addendum</Link> in which I share my views on
      whether web apps should even claim full and exclusive control of the DOM.
    </p>
    <p>But first, let's take a look at how Google Translate works.</p>

    <h2 id="how-google-translate-works">How Google Translate works</h2>
    <p>
      To understand what Google Translate does, we need to take a close look at
      the DOM structure before and after translation.
    </p>
    <p>
      All HTML that is rendered in the browser is represented by the{' '}
      <Abbreviation annotation="Document Object Model">DOM</Abbreviation> in
      JavaScript. This is a tree-like structure where each element is a node.
      HTML elements are represented by <Code>Element</Code>-nodes and text is
      represented by a <Code>TextNode</Code>.
    </p>
    <p>Let's take a simple piece of HTML:</p>
    <CodeSnippet
      language="markup"
      variant="sm"
    >{`<p>There are 4 lights!</p>`}</CodeSnippet>
    <p>
      In JavaScript, this is represented in the DOM by a structure like this:
    </p>
    <div>
      <div>Mounted DOM (English)</div>
      <NodeTree>
        <Node variant="root">html[lang=en]</Node>
        <NodeChildren>
          <Node>ParagraphElement</Node>
        </NodeChildren>
        <NodeChildren>
          <Tooltip content="There are 4 lights!">
            <Node variant="highlight">TextNode</Node>
          </Tooltip>
        </NodeChildren>
      </NodeTree>
      <small>Hover or tap the TextNode to see its contents.</small>
    </div>
    <p>
      When Google Translate activates, it looks for <Code>TextNode</Code>s to
      translate. These nodes are then replaced with <Code>FontElement</Code>{' '}
      elements with the new, translated, strings inside. This results in the
      following HTML (assuming we're translating to Dutch):
    </p>
    <CodeSnippet
      language="markup"
      variant="sm"
    >{`<p><font>Er zijn 4 lampen!</font></p>`}</CodeSnippet>
    <p>More importantly, the DOM structure becomes this:</p>
    <div>
      <div
        css={css`
          display: flex;
          gap: 1em;
        `}
      >
        <div
          css={css`
            flex: 1;
          `}
        >
          <div>Mounted DOM (now translated)</div>
          <NodeTree>
            <Node variant="root">html[lang=nl]</Node>
            <NodeChildren>
              <Node>ParagraphElement</Node>
            </NodeChildren>
            <NodeChildren>
              <Node variant="new">FontElement</Node>
            </NodeChildren>
            <NodeChildren>
              <Tooltip content="Er zijn 4 lampen!">
                <Node variant="new">TextNode</Node>
              </Tooltip>
            </NodeChildren>
          </NodeTree>
        </div>
        <div
          css={css`
            flex: 1;
          `}
        >
          <div>Unmounted (the original English node)</div>
          <NodeTree>
            <Tooltip content="There are 4 lights!">
              <Node variant="highlight">TextNode</Node>
            </Tooltip>
          </NodeTree>
        </div>
      </div>
      <small>Hover or tap the TextNode to see its contents.</small>
    </div>
    <p>
      What this shows is that{' '}
      <strong>
        the original <Code>TextNode</Code> is{' '}
        <Annotation annotation="That means it is no longer a part of the HTML-document, so it is no longer being rendered in the browser.">
          unmounted
        </Annotation>{' '}
        and replaced with a new <Code>FontElement</Code>
      </strong>{' '}
      with the translated text inside.
    </p>
    <p>
      This is the gist of how Google Translate impacts the DOM and an important
      piece of why Google Translate causes problems (i.e. interferes) with
      JavaScript apps doing DOM manipulation.
    </p>

    <h3 id="simulating-google-translate">Simulating Google Translate</h3>
    <p>
      Now that we know how Google Translate works, we can simulate it being
      applied to a part of a page. This will allow us to reproduce the issues
      caused by Google Translate more easily.
    </p>
    <p>
      The snippet below will search for an element with the id "translateme" and
      replace all direct <Code>TextNode</Code> children with{' '}
      <Code>FontElement</Code>s similar to how Google Translate operates. To
      make it more obvious which text has the Google Translate simulation
      applied, any text affected is surrounded with square brackets (“There are
      4 lights!” becomes “[There are 4 lights!]”).
    </p>
    <CodeSnippet>{`
useEffect(() => {
  document.getElementById('translateme').childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      const fontElem = document.createElement('font')
      fontElem.textContent = \`[\${child.textContent}]\`

      child.parentElement.insertBefore(fontElem, child)
      child.parentElement.removeChild(child)
    }
  })
})
`}</CodeSnippet>
    <p>
      The reproduction examples below all use this method to simulate Google
      Translate.
    </p>

    <h3 id="manually-testing-google-translate">
      Manually testing Google Translate
    </h3>
    <p>
      If you want to validate the issues caused by Google Translate yourself,
      you can do so by manually testing it. This will help you understand the
      impact of Google Translate on your app.
    </p>
    <p>
      The easiest way I found to test Google Translate, is to translate English
      to some other language. To get Google Chrome to do this, you will need to
      change your <i>Preferred languages</i> in the settings like so:
    </p>

    <Figure
      caption="Replace all preferred languages in the settings"
      href={chromeLanguageSetupImage.src}
    >
      <Image
        src={chromeLanguageSetupImage}
        alt={`An animated GIF showing Chrome "Preferred language" settings. The Dutch language is added, and all other languages are removed afterwards.`}
        width={500}
        sizes="(min-width: 768px) 500px, 100vw"
      />
    </Figure>

    <p>
      Next, go to the webpage you want to test. If the webpage is set up
      correctly (and it's in English), it should have <Code>lang="en"</Code> in
      its <Code>html</Code> tag. This allows Google Translate to reliably detect
      its language and translate it. If it doesn't suggest it by itself, click
      the translation icon in the address bar.
    </p>

    <Figure
      caption="Google Translate will immediately translate the page"
      href={activateGoogleTranslateImage.src}
    >
      <Image
        src={activateGoogleTranslateImage}
        alt="An animated GIF showing how Google Translate activation in Chrome."
        width={500}
        sizes="(min-width: 768px) 500px, 100vw"
      />
    </Figure>

    <h2 id="the-interference-issues">The interference issues</h2>
    <p>
      Now that we know how Google Translate manipulates the DOM, we can explore
      the interference issues it causes. The most common issues are:
    </p>

    <h3 id="issue-translated-text-not-updating">
      Issue: Translated text not updating
    </h3>
    <p>
      When Google Translate unmounts DOM nodes and places its own new ones in
      their place, the original DOM nodes will continue to exist in-memory. Any
      changes then made to the original DOM nodes will not show up in the user's
      browser in any way. The changes will remain in-memory.
    </p>
    <p>
      This is an issue for systems like React that work with a Virtual DOM. One
      of the main reasons behind using the Virtual DOM is performance, and a key
      part of that is, whenever possible, updating the values of DOM nodes
      instead of replacing them. Replacing DOM nodes is more computationally
      expensive.
    </p>
    <p>
      The consequence of this is that, in React, any text or number that might
      change alongside another string is affected.{' '}
      <strong>
        When Google Translate is applied, values shown on your page may never
        update again.
      </strong>
    </p>
    <p>
      This is a big problem for any app that shows users important data, which
      probably means every big React app. Showing the wrong data could be
      misleading and even dangerous. A dashboard showing the wrong number could
      lead to users making the wrong decisions, your app showing invalid prices
      could be a legal issue, while showing a user the wrong dosage of medicine
      could have much more dire consequences. How big of a risk this is, depends
      on your app and your business.
    </p>
    <p>
      This issue is hard to discover since it doesn't lead to a crash or any
      error.
    </p>
    <h4 id="issue-translated-text-not-updating-reproduction">Reproduction</h4>
    <p>
      In the below reproduction, we have a simple counter tracking the number of
      lights (a number in a <Code>useState</Code>). The button increments the
      number of lights by one every time it's pressed. The marked label directly
      next to it is no more than <Code>{`There are {lights} lights!`}</Code> -
      no conditions or anything.
    </p>
    <p>
      We simulate Google Translate using the method{' '}
      <Link href="#simulating-google-translate">described above</Link>. The
      Google Translate simulation adds square brackets around the text to
      indicate it's active. The value shown in green underneath the button is
      the actual value, which is unaffected by Google Translate.
    </p>
    <Reproduction>
      <GoogleTranslateTextNotUpdatingRepro />
    </Reproduction>
    <p>
      When you click the button a few times, you will see the state is updating
      and the component is rerendering, but the translated text is never updated
      to reflect the new value.
    </p>
    <Figure caption="There are 4 lights!" href={lightsMemeImage.src}>
      <Image
        src={lightsMemeImage}
        alt={`An animated GIF of Jean-Luc Picard (Star Trek) yelling "There are four lights!".`}
        width={400}
        sizes="(min-width: 768px) 400px, 100vw"
      />
    </Figure>
    <Aside>
      The reproduction shows three sets of brackets around the text. This is
      because React makes a separate <Code>TextNode</Code> for each variable in
      a string. The real Google Translate would{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize">
        normalize
      </a>{' '}
      the text nodes, merging them together, but our simulation doesn't do this
      to keep it simpler. This makes the reproduction slightly different from
      Google Translate, but the result is the same.
    </Aside>
    <h3 id="issue-crashes">Issue: Crashes</h3>
    <p>
      If you're running an error monitoring tool like Sentry or tried manually
      testing Google Translate, you've probably seen these before. In React, the
      following errors are common due to interference from Google Translate:
    </p>
    <ul>
      <li>
        <CodeError>
          NotFoundError: Failed to execute 'removeChild' on 'Node': The node to
          be removed is not a child of this node.
        </CodeError>
      </li>
      <li>
        <CodeError>
          Failed to execute 'insertBefore' on 'Node': The node before which the
          new node is to be inserted is not a child of this node.
        </CodeError>
      </li>
    </ul>
    <p>
      When one of those errors occurs, React will unmount your tree to the
      closest error boundary. But if you have no error boundary (which is common
      on websites), <strong>your entire app will crash</strong>.
    </p>
    <p>
      The <Code>removeChild</Code> error usually happens because your app was
      trying to remove a conditionally rendered <Code>TextNode</Code> from the
      DOM that Google Translate unmounted. The <Code>insertBefore</Code> error
      is less common; this usually occurs because something conditionally
      rendered is trying to appear <em>before</em> a <Code>TextNode</Code> that
      was unmounted by Google Translate.
    </p>
    <p>
      I think in many cases these crashes might be less important than the{' '}
      <Link href="#issue-translated-text-not-updating">
        translated text not updating
      </Link>
      . Text not updating is less predictable than not showing anything at all.
      It may mislead users, which would be a worse outcome than not showing
      anything at all.
    </p>
    <h4 id="issue-crashes-reproduction">Reproduction</h4>
    <p>
      The button below toggles whether the lights are on by simply flipping a
      boolean in a <Code>useState</Code>. When the lights are turned off, the
      “There are 4 lights!” text will no longer be rendered through the
      conditional expression{' '}
      <Code>{`{lightsOn && 'There are 4 lights!'}`}</Code>. React tries to
      reconsolidate this render by removing the <Code>TextNode</Code> from the
      parent that it added it to. When it does this with Google Translate
      active, the <Code>TextNode</Code> is no longer a child of the parent,
      which results in a crash.
    </p>

    <Reproduction>
      <GoogleTranslateCrashesRepro />
    </Reproduction>

    <p>
      To reproduce it, the conditional <Code>TextNode</Code> needs to have a
      sibling of any kind. In React nearly every node that's conditionally
      rendered will have a sibling, so this is a common situation.
    </p>

    <p>
      Another way of reproducing this crash is by rendering a different amount
      of <Code>TextNode</Code>s within a ternary. The reproduction below also
      toggles the lights, but instead of rendering nothing when the lights are
      off, it tries to render the text "The lights are off" through a ternary:{' '}
      <Code>
        {`{lightsOn ? <>There are {lights} lights!</> : <>The lights are off</>}`}
      </Code>
      .
    </p>

    <Reproduction>
      <GoogleTranslateCrashesTernaryRepro />
    </Reproduction>

    <p>
      The important part of this reproduction is that the sides of the ternary
      have a different amount of <Code>TextNode</Code>s. While it might not be
      obvious, this is the case here, as React produces three{' '}
      <Code>TextNode</Code>s for the{' '}
      <Code>{`<>There are {lights} lights!</>`}</Code> expression.
    </p>

    <p>
      This reproduction is a simplified version of what you might have in your
      app. In the example code, we could have used a single template string for
      both sides of the ternary. In the real world, these expressions tend to be
      more complex, making it hard to turn it into a template string.
    </p>

    <p>
      As there are more ways to vary the amount of <Code>TextNode</Code>s
      rendered, I'm sure there are more ways of reproducing this crash. This
      makes it hard to find a workaround that solves all cases.
    </p>

    <h4 id="workarounds">Workarounds</h4>
    <p>
      React's crashes have been reported in{' '}
      <a href="https://github.com/facebook/react/issues/11538">this issue</a> on
      GitHub. Several workarounds have been posted, but unfortunately, none of
      the workarounds provide a quick fix. Some just make things worse.
    </p>
    <p>
      The below workarounds only focus on the crashes and have absolutely no
      impact on translated text not updating.
    </p>

    <h5 id="monkey-patching-removechild-and-insertbefore">
      1. Monkey patching removeChild and insertBefore
    </h5>
    <p>
      <i>Gaearon</i>, a member of the React Core team, posted{' '}
      <a href="https://github.com/facebook/react/issues/11538#issuecomment-417504600">
        a workaround
      </a>{' '}
      that monkey patches <Code>removeChild</Code> and <Code>insertBefore</Code>{' '}
      to fail silently when they're called with invalid arguments.
    </p>

    <p>
      While this monkey patch succeeds at preventing the crashes, it doesn't
      solve the underlying issue at all. Instead of React crashing when it tries
      to remove a <Code>TextNode</Code> through <Code>removeChild</Code>, it
      does nothing and{' '}
      <strong>the translated text will remain in the DOM</strong> until its
      parent is removed. And when the <Code>insertBefore</Code> error is
      triggered, the <strong>newly rendered text won't appear</strong> for your
      user.
    </p>

    <p>
      Unless the user is aware of the behavior, both issues make an app almost
      as unusable as when it would crash.
    </p>

    <p>Watch this monkey patch in action:</p>

    <Reproduction>
      <GoogleTranslateCrashesMonkeyPatchRepro />
    </Reproduction>

    <p>
      You can toggle the Google Translate simulation to see how the component
      behaves with and without its interference. It also serves as a great way
      of resetting the component to its initial state.
    </p>

    <h5 id="surrounding-textnodes-with-spans">
      2. Surrounding TextNodes with spans
    </h5>
    <p>
      GitHub user <i>Shuhei</i> proposed{' '}
      <a href="https://github.com/facebook/react/issues/11538#issuecomment-390386520">
        a workaround
      </a>{' '}
      of surrounding all conditionally rendered and adjacent text in{' '}
      <Code>span</Code> elements. This avoids the crashes by ensuring React
      doesn't try to remove or insert a <Code>TextNode</Code> directly.
    </p>

    <p>
      <strong>
        This fixes some of the most common crashes, but not all of them.
      </strong>{' '}
      The crashes caused by conditionally rendered <Code>TextNode</Code>s like
      the <Code>{`{lightsOn && 'There are 4 lights!'}`}</Code> expression in the
      first reproduction above, can be fixed by this workaround. But crashes
      caused by other conditionally rendered <Code>TextNode</Code>s, like those
      in the ternary expression reproduction, are not.
    </p>

    <p>
      Implementing this workaround does require mangling a lot of existing,
      regular, code. Without an ESLint rule to enforce this, it is going take a
      lot of pleading in PRs to get your entire team to consistently apply this
      workaround. And for many the honest truth is that it's not worth the
      effort and code quality sacrifice for them.
    </p>

    <Aside>
      The ESLint plugin{' '}
      <a href="https://github.com/sayari-analytics/eslint-plugin-sayari">
        eslint-plugin-sayari
      </a>{' '}
      has a rule that{' '}
      <i>
        requires <Code>TextNode</Code>s that share a common parent with other
        elements to be wrapped in a <Code>{`<span>`}</Code> tag
      </i>
      . While this probably catches the problematic expressions, this rule has
      an extremely high false-positive rate and will require you to wrap nearly
      all <Code>TextNode</Code>s in your app. The ternary crashes are also not
      solved by this rule.
    </Aside>

    <h5 id="self-re-rendering-error-boundaries">
      3. Self re-rendering error boundaries
    </h5>
    <p>
      An error boundary that just renders the same children again when it runs
      into an error is{' '}
      <a href="https://github.com/facebook/react/issues/11538#issuecomment-2052692225">
        a good idea by GitHub user Sorahn
      </a>
      , but unfortunately, any components in the subtree will lose their state
      in the process. While this could work for some of the instances, it's not
      a general solution and if you're going to be adapting your code anyway,
      you're probably better off surrounding your <Code>TextNode</Code>s with
      spans.
    </p>

    <h3 id="issue-inconsistent-event-target">
      Issue: Inconsistent <Code>event.target</Code>
    </h3>
    <p>
      When Google Translate is active, the value of <Code>event.target</Code>{' '}
      becomes unpredictable, as users are likely to click on one of Google
      Translate's <Code>font</Code> elements instead of the underlying element
      that you, as the developer, created and could reasonably expect. In some
      instances, such as inside overlays, this could lead to click events not
      working correctly.
    </p>
    <p>
      While this issue is very specific and can be worked around with relative
      ease, very few developers will even be aware of the issue or think to test
      it.
    </p>

    <h4 id="issue-inconsistent-event-target-reproduction">Reproduction</h4>
    <p>
      In the reproduction below, the text of the button gets translated by the
      Google Translate simulator. When you click anywhere within the
      reproduction, the element type of the <Code>event.target</Code> (the
      element you clicked on) will appear in the text underneath the button.
      Normally when you click the button, <Code>event.target</Code> would refer
      to the <Code>button</Code>, but with Google Translate, it will be a{' '}
      <Code>font</Code> element instead.
    </p>
    <p>
      Click the button. Toggle Google Translate simulation. Click again. Compare
      results.
    </p>

    <Reproduction>
      <GoogleTranslateEventTargetRepro />
    </Reproduction>

    <h2 id="not-just-react">Not just React</h2>
    <p>
      <strong>
        Google Translate's interference affects not just React apps.
      </strong>
    </p>
    <p>
      Any JavaScript code that manipulates the DOM in a similar fasion is
      affected. This includes operations such as updating a value of a{' '}
      <Code>TextNode</Code>, adding or removing children, or using{' '}
      <Code>event.target</Code>. These operations are not specific to React.
    </p>
    <p>
      However, these issues are more commonly observed in React applications
      since React is a prominent user of the “
      <a href="https://reactjs.org/docs/faq-internals.html">Virtual DOM</a>”.
      The Virtual DOM keeps references to all DOM nodes so it only has to update
      parts of the DOM that are actually changed (through a process called{' '}
      <a href="https://reactjs.org/docs/reconciliation.html">reconciliation</a>
      ). This allows for high-performance apps, as it's more efficient than
      replacing DOM nodes. Because of this, React's use of a Virtual DOM to
      reuse and update nodes rather than constantly replacing them is a natural
      evolution for frameworks.
    </p>

    <h2 id="not-just-google-translate">Not just Google Translate</h2>
    <p>
      Most machine translators work pretty much the same way as Google
      Translate, so the issue is not just limited to it. But the issue is even
      bigger than that:{' '}
      <strong>
        any browser extensions that manipulate the DOM can interfere
      </strong>
      . Some other examples are:
    </p>
    <ul>
      <li>Password managers manipulating forms to show prefill dropdowns</li>
      <li>
        Extensions that inject alternative prices on competing webshops{' '}
        <Annotation
          annotation={
            <>
              In my experience this type of extensions may wrongly detect{' '}
              <em>any</em> monetary amounts shown, so they affect more than just
              webshops.
            </>
          }
        >
          (*)
        </Annotation>
      </li>
      <li>An adblocker removing an element</li>
      <li>
        <a href="https://chromewebstore.google.com/detail/eobkhgkgoejnjaiofdmphhkemmomfabg">
          AutocardAnywhere
        </a>
        : Displays card image popups for collectible card games{' '}
        <Annotation annotation="I ran into this one back in 2017 when a user reported a crash with the “insertBefore” error on my WoWAnalyzer project. With some help from the user debugging the issue, it turned out to be caused by this extension. You can still find the report on the WoWAnalyzer Discord.">
          (*)
        </Annotation>
      </li>
    </ul>
    <Figure
      caption={
        <>
          AutocardAnywhere showing a Magic: the Gathering card for a random
          piece of text on{' '}
          <Annotation annotation="WoWAnalyzer is a large and complex (Open Source) React app that I founded in 2017.">
            WoWAnalyzer
          </Annotation>
        </>
      }
      href={autoCardAnywhereImage.src}
    >
      <Image
        src={autoCardAnywhereImage}
        alt="A screenshot of WoWAnalyzer, showing a Magic: the Gathering card popup added by AutocardAnywhere for a random, but matching piece of text."
        width={800}
        sizes="(min-width: 768px) 800px, 100vw"
      />
    </Figure>
    <p>
      I want to stress that I do not think the team behind Google Translate
      deserves any blame for the issues. It's a great tool that helps people
      worldwide and makes the web usable for many more people. Google Translate
      was originally architected at a time when the web was very different from
      what it is today. The issues are a result of the web evolving; websites
      aren't almost exclusively static websites anymore as many of the popular
      websites today are actually large and complex web apps.
    </p>
    <p>
      Fixing the issues is also not trivial. For many translations, Google
      Translate needs to be able to restructure sentences to make them work in
      the target language. That's nearly impossible to do without interfering
      with the DOM.
    </p>

    <h2 id="there-is-no-real-solution-yet">There is no real solution (yet)</h2>
    <p>
      At the time of writing, there is, unfortunately, no solution yet that can
      make Google Translate work well enough with React for a large React app.
      As mentioned above, the workarounds for the crashes introduce a new set of
      issues, and they still leave any complex app barely usable after
      translation by Google Translate.
    </p>

    <p>
      There are a couple of things you <em>can</em> do, but I don't think you're
      gonna like them.
    </p>

    <h3 id="the-regrettable-fix">The regrettable “fix”</h3>
    <p>
      When I first ran into this issue back in 2017, I posted in the React issue
      tracker that I had{' '}
      <a href="https://github.com/facebook/react/issues/11538#issuecomment-350110297">
        ”fixed” my app by blocking translation entirely
      </a>
      . Now, 7 years later, I am sad to have to report that this still appears
      to be the only quick way of avoiding all of the issues caused by Google
      Translate.
    </p>

    <p>
      I don't like solving it this way. It makes apps less accessible to people
      worldwide. But for some complex apps, it beats serving Google Translate
      users a broken app that barely works.
    </p>

    <p>
      If you're willing to put in the time and effort,{' '}
      <Link href="#surrounding-textnodes-with-spans">wrapping</Link> conditional{' '}
      <Code>TextNode</Code>s in <Code>span</Code>s will solve a large chunk of
      the crashes (but not the other issues). This will usually be good enough
      for a simple website like this as a typical website isn't very reactive,
      has a small codebase, has few developers working on it, and doesn't show
      any computed numbers that are critical.
    </p>

    <p>
      You will have to carefully consider which of these solutions is the right
      fit for your app. Leaving Google Translate available will be a big help
      for some of your users, but it will take some debugging to get it to work
      well enough and ensure you're not showing users incorrect data.
    </p>

    <Aside>
      Regardless of what you do, it might help to inform users of the issues
      they might encounter when using Google Translate. See the gist of{' '}
      <Link href="/gists/how-to-detect-google-translate-and-other-machine-translation">
        How to detect Google Translate and other machine translation
      </Link>{' '}
      for a way to detect when Google Translate is active.
    </Aside>

    <h3 id="alternatives">Alternatives</h3>
    <p>
      The only alternative solution that I can think of, is to{' '}
      <strong>implement your own localization within your app</strong> (i.e.
      internationalization). This makes machine translation unnecessary and
      provides international users with the best possible experience. But this
      has a couple of downsides:
    </p>

    <ul>
      <li>It takes a lot of effort to do at all</li>
      <li>It's hard to get right</li>
      <li>It slows down development</li>
      <li>Good translators are expensive</li>
      <li>
        It's infeasible to cover as many languages as Google Translate covers
      </li>
    </ul>

    <p>
      All things considered, this isn't the most practical solution for most
      apps. Do you know of any other alternatives?
    </p>

    <Aside>
      There might be a possible (external) workaround in React that uses a
      similar mechanic to React Dev Tools's “render highlighting” to trigger
      remounting (by React) of the entire parent of <Code>TextNode</Code>s that
      are changed. However, I looked into the feature's code and that is part of
      a &gt;4500 LOC file so it seemed more involved than I bargained for. Maybe
      someone else can take a look at it.
    </Aside>

    <h2 id="conclusion">Conclusion</h2>
    <p>
      That's the gist of Google Translate crashing React apps (and other web
      apps). Or, as we've discovered, the gist of third-party browser extension
      DOM manipulation interfering with complex JavaScript app reactivity, often
      leading to crashes and other issues.
    </p>
    <p>
      I hope this article will help you understand the issues and help you
      choose the right way to deal with them in your app.
    </p>
    <p>
      Please help bring attention to this issue by upvoting its bug report on
      the Chromium project:{' '}
      <a href="https://issues.chromium.org/issues/41407169">
        https://issues.chromium.org/issues/41407169
      </a>
      . The increased attention can help the chances of the issues being
      addressed.
    </p>
    <p>
      So what do you think? Can you think of any other workarounds? Or do you
      know a machine translator that doesn't have these issues? Please share
      your insights through the links below.
    </p>
    <p>
      ps. In the <Link href="#addendum">addendum</Link> below, I discuss whether
      it is reasonable for an app to claim full and exclusive control of the
      DOM, as React does with its Virtual DOM.
    </p>
  </Gist>
)

export default EverythingAboutGoogleTranslateCrashingReact

const Addendum = () => (
  <>
    <h2 id="should-an-app-claim-full-control-of-its-dom">
      Addendum: Should an app claim full-control of its DOM?
    </h2>
    <p>
      <Annotation annotation="br...@localizejs.com - The issue tracker doesn't do names.">
        A developer
      </Annotation>{' '}
      of the translation project <a href="https://localizejs.com/">Localize</a>{' '}
      posted{' '}
      <a href="https://issues.chromium.org/issues/41407169#comment10">
        their thoughts
      </a>{' '}
      on the issue in the Chromium report for this issue. In it, they wrote:
    </p>
    <blockquote>
      The problem is introduced when a javascript library assumes that it has
      full and exclusive control over the DOM (such as a{' '}
      <Abbreviation annotation="Virtual DOM">VDOM</Abbreviation> library)
      without accounting for the fact that the DOM is inherently mutable by
      design.
    </blockquote>
    <blockquote>
      Even if a website owner wanted to give full and exclusive control of the
      DOM to a VDOM library, it's not practical if you also have end-users with
      DOM-modifying Chrome extensions (ie. Grammarly, password managers, etc) or
      if you have users with browsers that modify the DOM (ie. Chrome's built-in
      translation functionality). There's a large ecosystem dependent on DOM
      manipulation - that ecosystem is an unintended victim of the adoption of
      VDOM frameworks. I have nothing against React or VDOM (I personally use
      and like them), but entertaining the idea of changing chromium in response
      to compatibility issues that arise with React is setting a curious
      precedent.
    </blockquote>
    <p>
      This raises an important question:{' '}
      <strong>should an app claim full-control over the DOM?</strong>
    </p>
    <p>
      As I mentioned <Link href="#not-just-react">earlier</Link>, third-party
      extensions interfere with more than just apps that claim full and
      exclusive control over the DOM. Extensions like Google Translate touch so
      much of the DOM, that it can break <em>any</em> DOM manipulation, even
      small pieces of code not built on top of a library. The core of the issue
      is in third-party DOM manipulation. It's not just limited to frameworks
      using the Virtual DOM.
    </p>
    <p>
      The nature of browser extensions (and modding in general) involves
      patching other people's work, and a big part of that is ensuring you don't
      break things in the process. I don't think it would be reasonable to
      expect web developers to consider and solve third-party (browser)
      extension interference. These extensions are beyond the web developer's
      control and should be designed with caution to minimize potential
      disruptions. The responsibility lies with the creators of these extensions
      to ensure compatibility and avoid negatively impacting web applications.
    </p>
    <p>
      React's use of a Virtual DOM to reuse and update nodes instead of
      constantly replacing them is a natural evolution for frameworks. After
      all, there are notable performance benefits to doing it this way.
      Therefore, I don't think it's unreasonable for React to apply this to{' '}
      <em>all</em>
      DOM nodes, claiming full and exclusive control over the DOM in the
      process.
    </p>
    <p>
      All things considered, third-party extensions are best equipped to assess
      their potential impact and address any interference they might cause. They
      should be the first to resolve any interference with the proper
      functioning of web apps.
    </p>
    <p>
      But it might also be unreasonable to expect extensions to consider{' '}
      <em>all</em> possible interference.
    </p>
    <p>
      In the end, the only reasonable solution might be to solve this within the
      platform; inside the browsers that inject those third-party extensions.
      The issues probably aren't a big enough problem for that to happen any
      time soon, so for now extension developers will have to take care of it
      themselves.
    </p>
  </>
)
