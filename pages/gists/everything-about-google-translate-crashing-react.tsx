/* eslint-disable react/no-unknown-property */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Abbreviation from '../../components/Abbreviation'
import Annotation from '../../components/Annotation'
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

export const meta: GistMeta = {
  slug: 'everything-about-google-translate-crashing-react',
  title:
    'Everything about Google Translate crashing React apps (and other DOM manipulators)',
  // Everything about Google Translate crashing React (and every other DOM manipulator)
  // Everything about Google Translate crashing React (and other DOM manipulation)
  // Google Translate breaks React apps (and other DOM manipulation)
  description: 'TODO',
  tags: [GistTag.React, GistTag.MachineTranslation],
}

const LicenseGist = () => (
  <Gist gist={meta}>
    <p>
      <Annotation
        annotation="Google Chrome's in-browser web page translator, not the
      website."
      >
        Google Translate
      </Annotation>{' '}
      is an in-browser machine translators. It provides users with dynamic
      in-place translation of websites from within their browser tabs. There are
      several other in-browser machine translators, such as Bergamot in Firefox,
      Microsoft Translator in Edge and Web Page Translation in Safari, but
      Chrome's Google Translate is the most popular.
    </p>
    <p>
      These translators have a very big problem when translating modern web:{' '}
      <strong>
        machine translators manipulate the DOM in such a way that{' '}
        <em>any code</em> manipulating DOM nodes may break
      </strong>
      . This often reveals itself with crashes such as an{' '}
      <CodeError>
        NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be
        removed is not a child of this node.
      </CodeError>{' '}
      error, but translators break a lot more (and it's not always as obvious as
      a crash).
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
    <CodeSnippet language="markup">{`<p>There are 3 lights</p>`}</CodeSnippet>
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
    <CodeSnippet language="markup">{`<p><font>Er zijn 3 lampen</font></p>`}</CodeSnippet>
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
        and in its place is a newly created <Code>FontElement</Code> with the
        translated text inside
      </strong>
      . This is significant to understand why Google Translate causes problems
      with JavaScript that does DOM manipulation (more on this later).
    </p>
    <p>
      That is the gist of what Google Translate does and all you need to know to
      follow the rest of this article.
    </p>
    <h2 id="not-just-google-translate">Not just Google Translate</h2>
    <p>
      Most machine translators work pretty much the same way as Google
      Translate, so the issue isn't just limited to Google Translate. But it
      doesn't stop with machine translation. Any browser extension that
      manipulates the DOM is affected. Some examples are:
    </p>
    <ul>
      <li>Password managers changing forms to show prefill dropdowns</li>
      <li>
        Extensions that amend prices to show the cheapest price of a product on
        competing webshops{' '}
        <Annotation annotation="These extensions often misdetect any monetary amounts, so they affect more than just webshops.">
          (*)
        </Annotation>
      </li>
      <li>
        <a href="https://chromewebstore.google.com/detail/eobkhgkgoejnjaiofdmphhkemmomfabg">
          AutocardAnywhere
        </a>
        : Displays card image popups for collectable card games{' '}
        <Annotation
          annotation={`I ran into this specific extension back in 2017 on my WoWAnalyzer project. A user reported a crash with an "insertBefore" error, and we found this specific extension to be the cause. You can still find the report on the WoWAnalyzer Discord.`}
        >
          (*)
        </Annotation>
      </li>
    </ul>
    [Image](An extension adding a Magic the Gathering card image popup)
  </Gist>
)

export default LicenseGist
