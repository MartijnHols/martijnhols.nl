/* eslint-disable react/no-unknown-property */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Abbreviation from '../../components/Abbreviation'
import Annotation from '../../components/Annotation'
import Aside from '../../components/Aside'
import Code from '../../components/Code'
import CodeSnippet from '../../components/CodeSnippet'
import Gist from '../../components/Gist'
import GistMeta, { GistTag } from '../../components/GistMeta'
import Node from '../../components/Node'
import NodeChildren from '../../components/NodeChildren'
import NodeTree from '../../components/NodeTree'
import Tooltip from '../../components/Tooltip'

const CodeError = styled(Code)`
  color: red;
`

// TODO: Add ids to headings
// TODO: add reproductions
// TODO: add reproduction codepen links
// TODO: add images
// TODO: grammarly
// TODO: ChatGPT

export const meta: GistMeta = {
  slug: 'everything-about-google-translate-crashing-react',
  // TODO: Pick final title and remove alts
  title: 'Everything about Google Translate crashing React (and other webapps)',
  // Everything about Google Translate interference crashing React and other webapps
  // Google Translate breaks React apps (and other webapps)
  // TODO: add description
  description: 'TODO',
  tags: [GistTag.React, GistTag.MachineTranslation],
}

const LicenseGist = () => (
  <Gist gist={meta}>
    <p>
      Google Translate, the built-in extension of Google Chrome, is a{' '}
      <i>machine translator</i> that provides users with an easy way of
      translating webpages from within their browser tab. This allows webpages
      to be used by users from all over the world, regardless of their native
      language.
    </p>
    <p>
      But this functionality comes at a cost, as it interferes with the
      reactivity of many modern sites. This is because{' '}
      <strong>
        Google Translate manipulates the DOM in such a way that it breaks
        complex apps.
      </strong>{' '}
      This interference often reveals itself with crashes caused by the DOM
      element's native <Code>removeChild</Code> method;{' '}
      <CodeError>
        NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be
        removed is not a child of this node.
      </CodeError>
      , but it affects a lot more.{' '}
      <strong>Not all issues are as obvious as a crash.</strong>
    </p>
    <p>
      The focus of this article will be on Google Translate's effect on React,
      but the issues from machine translators affect most large JavaScript
      webapps.
    </p>
    <h2 id="how-google-translate-works">How Google Translate works</h2>
    <p>
      In order to understand what Google Translate does, we need to take a close
      look at the DOM structure before and after translation.
    </p>
    {/* <p>
      The Document Object Model (DOM) connects web pages to scripts or
      programming languages by representing the structure of a document—such as
      the HTML representing a web page—in memory. Usually it refers to
      JavaScript, even though modeling HTML, SVG, or XML documents as objects
      are not part of the core JavaScript language.
    </p> */}
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
    >{`<p>There are 3 lights</p>`}</CodeSnippet>
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
          <Tooltip content="There are 3 lights">
            <Node variant="highlight">TextNode</Node>
          </Tooltip>
        </NodeChildren>
      </NodeTree>
      <small>Hover or tap the TextNode to see its contents.</small>
    </div>
    <p>
      When Google Translate activates, it looks for <Code>TextNode</Code>s to
      translate. These nodes are then replaced with <Code>FontElement</Code>{' '}
      elements with the new, translated, strings inside. This results into the
      following HTML (assuming we're translating to Dutch):
    </p>
    <CodeSnippet
      language="markup"
      variant="sm"
    >{`<p><font>Er zijn 3 lampen</font></p>`}</CodeSnippet>
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
              <Tooltip content="Er zijn 3 lampen">
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
            <Tooltip content="There are 3 lights">
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
        the original <Code>TextNode</Code> with the English text is{' '}
        <Annotation annotation="That means it is no longer a part of the HTML-document, so it is no longer being rendered in the browser.">
          unmounted
        </Annotation>{' '}
        and replaced with a new <Code>FontElement</Code>
      </strong>{' '}
      with the translated text inside.
    </p>
    <p>
      This is the gist of how Google Translate impacts the DOM and an important
      piece of why Google Translate causes problems with JavaScript that does
      DOM manipulation.
    </p>
    {/** Make this a <details> thing? It feels like a TMI */}
    <h3>Simulating Google Translate</h3>
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
      3 lights” becomes “[There are 3 lights]”).
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

    <h2>Issue 1: Translated text won't update</h2>
    <p>
      The first issue caused by Google Translate, is one that is hard to
      discover since it fails silently; it doesn't lead to a crash or any error.
    </p>
    <p>
      In the previous section we established that Google Translate unmounts DOM
      nodes and places its own new ones in their place. The consequence of this
      is that{' '}
      <strong>
        the user won't be able to see any changes made to the original DOM nodes
      </strong>
      . They will not show up in the user's browser in any way, and the changes
      only update the unmounted <Code>TextNode</Code>s in memory.
    </p>
    <p>
      This is a big problem for systems like React that work with a Virtual DOM.
      One of the main reasons for using the Virtual DOM is performance, and so,
      one of the key features of the Virtual DOM, is updating the values of DOM
      nodes wherever possible instead of replacing them.
    </p>
    <p>
      As a result, in React, every text or number that might change alongside a
      string is affected. When Google Translate is applied, the values shown on
      your page may never update again.
    </p>
    <p>
      This is a big problem for any app that shows users important data, which
      probably means every big React app.{' '}
      <strong>
        Showing the wrong data could be misleading and even dangerous.
      </strong>{' '}
      To your company, and especially to your users. A dashboard showing the
      wrong number could lead to users make the wrong decisions, your app
      showing invalid prices could open you up to litigation, while showing a
      user the wrong dosage of a medicine could have much more dire
      consequences. How big of a risk this is, depends on your app.
    </p>
    <h3>Reproduction</h3>
    <p>
      The button below increments the number of lights in state by one every
      time it’s pressed. The marked label directly next to it is no more than{' '}
      <Code>{`There are {lights} lights!`}</Code>. The square brackets around
      this label are added by our Google Translate simulation to indicate it’s
      active. The value shown underneath the button is the actual value,
      unaffected by Google Translate.
    </p>
    <p>[repro]</p>
    <p>
      When you click the button a few times, you will see the state is updating
      and the component is rerendering, but the text is never updated to reflect
      the new value.
    </p>
    <p>If you would prefer testing this with a real translator, click here.</p>
    <h2>Issue 2: Crashes</h2>
    <p>
      If you’re running an error monitoring tool like Sentry or tried manually
      testing Google Translate, this is the obvious issue. In React, one of the
      following errors may occur due to interference from Google Translate:
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
      closest error boundary. If you have no error boundary, your entire React
      app will crash instead.
    </p>
    <p>
      The <Code>removeChild</Code> error usually happens because your app was
      trying to remove a conditionally rendered <Code>TextNode</Code> from the
      DOM that Google Translate unmounted. The <Code>insertBefore</Code> error
      is less common; this usually occurs because something conditionally
      rendered is trying to appear <i>before</i> a <Code>TextNode</Code> that
      was unmounted by Google Translate.
    </p>
    <Aside>
      I would argue the crashes are actually a less significant issue than text
      not updating. I reckon misleading users is worse and less predictable than
      not showing anything at all.
    </Aside>
    <h3>Reproduction</h3>
    <p>
      The button below toggles the lights, leading to the “There are 3 lights”
      text to no longer being rendered in the React component. React tries to
      reconsolidate this render by removing the <Code>TextNode</Code> from the
      parent that it added it to.
    </p>
    <p>[repro]</p>
    <p>If you would prefer testing this with a real translator, click here.</p>
    <h2>Not just Google Translate</h2>
    <p>
      Most machine translators work pretty much the same way as Google
      Translate, so the issue isn't just limited to Google Translate. But the
      issue is even bigger than that: any browser extensions that manipulate the
      DOM can be troublesome. Some examples are:
    </p>
    <ul>
      <li>Password managers manipulating forms to show prefill dropdowns</li>
      <li>
        Extensions that inject alternative prices on competing webshops{' '}
        <Annotation annotation="These extensions may wrongly detect any monetary amounts shown, so they affect more than just webshops.">
          (*)
        </Annotation>
      </li>
      <li>
        <a href="https://chromewebstore.google.com/detail/eobkhgkgoejnjaiofdmphhkemmomfabg">
          AutocardAnywhere
        </a>
        : Displays card image popups for collectable card games{' '}
        <Annotation annotation="I ran into this one back in 2017 when a user reported a crash with the “insertBefore” error on my WoWAnalyzer project. With some help from the user debugging the issue, it turned out to be caused by this extension. You can still find the report on the WoWAnalyzer Discord.">
          (*)
        </Annotation>
      </li>
    </ul>
    <p>[Image](An extension adding a Magic the Gathering card image popup)</p>
    <h2>Fixing the crashes</h2>
    <h3>Monkeypatching removeChild and insertBefore</h3>
    <h3>An improved Monkeypatch</h3>
    <h3>Surrounding TextNodes with spans</h3>
    <h2>Not just React</h2>
    <h2>The one true solution</h2>
    <h2>Alternative solutions</h2>
    <h2>The regrettable “fix” (for now)</h2>
    <h2>What's next</h2>
  </Gist>
)

export default LicenseGist
