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
import Tooltip from '../../components/Tooltip'
import activateGoogleTranslateImage from './assets/google-translate-activate.gif'
import chromeLanguageSetupImage from './assets/google-translate-language-setup.gif'

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
  // Everything about Google Translate interference
  // Everything about Google Translate interference with React and other webapps
  // Google Translate breaks React apps (and other webapps)
  // TODO: add description
  description: 'TODO',
  tags: [GistTag.React, GistTag.MachineTranslation],
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
      But this functionality comes at a cost, as it interferes with the workings
      of many modern sites. This is because{' '}
      <strong>
        Google Translate manipulates the DOM in such a way that it breaks the
        base apps.
      </strong>{' '}
      This interference often reveals itself via crashes caused by the DOM
      element's native <Code>removeChild</Code> method;{' '}
      <CodeError>
        NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be
        removed is not a child of this node.
      </CodeError>
      , but it affects a lot more.{' '}
      <strong>Not all issues are as obvious as a crash.</strong>
    </p>
    <p>
      The focus of this article will be on Google Translate's interference of
      React, but it's important to note that these issues affect most machine
      translators and will affect most large and complex webapps.
    </p>
    <h2 id="how-google-translate-works">How Google Translate works</h2>
    <p>
      In order to understand what Google Translate does, we need to take a close
      look at the DOM structure before and after translation.
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
      piece of why Google Translate causes problems (i.e. interferes) with
      JavaScript apps doing DOM manipulation.
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

    <p>TODO: Add example here?</p>

    <h3>Manually testing Google Translate</h3>
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

    <Figure caption="TODO: image" href="">
      <Image
        src={chromeLanguageSetupImage}
        alt="" // TODO
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

    <Figure caption="TODO: image" href="">
      <Image
        src={activateGoogleTranslateImage}
        alt="" // TODO
        width={500}
        sizes="(min-width: 768px) 500px, 100vw"
      />
    </Figure>

    <h2>The interference issues</h2>
    <p>
      With the knowledge of how Google Translate works, we can now better
      understand the interference issues it causes for React apps. The most
      common issues are:
    </p>

    <h3>Translated text won't update</h3>
    <p>
      This issue caused by Google Translate, is one that is hard to discover
      since it fails silently; it doesn't lead to a crash or any error.
    </p>
    <p>
      In the previous section, we established that Google Translate unmounts DOM
      nodes and places its own new ones in their place. The consequence of this
      is that while the original DOM nodes continue to exist in-memory, any
      changes to the original DOM nodes will not show up on the page . They will
      not show up in the user's browser in any way. The changes only happen
      in-memory.
    </p>
    <p>
      This is an issue for systems like React that work with a Virtual DOM. One
      of the main reasons behind using the Virtual DOM is performance, and a key
      part of that, is updating the values of DOM nodes instead of replacing
      them whenever possible. Replacing nodes is quite expensive.
    </p>
    <p>
      The consequence of this is that, in React, any text or number that might
      change alongside another string is affected.{' '}
      <strong>
        When Google Translate is applied, any values shown on your page may
        never update again.
      </strong>
    </p>
    <p>
      This is a big problem for any app that shows users important data, which
      probably means every big React app. Showing the wrong data could be
      misleading and even dangerous. To your company, and especially to your
      users. A dashboard showing the wrong number could lead to users make the
      wrong decisions, your app showing invalid prices could be a legal issue,
      while showing a user the wrong dosage of a medicine could have much more
      dire consequences. How big of a risk this is, depends on your app and
      business.
    </p>
    <h4>Reproduction</h4>
    <p>
      The button below increments the number of lights in state by one every
      time it's pressed. The marked label directly next to it is no more than{' '}
      <Code>{`There are {lights} lights!`}</Code>. The square brackets around
      this label are added by our Google Translate simulation to indicate it's
      active. The value shown underneath the button is the actual value,
      unaffected by Google Translate.
    </p>
    <p>[TODO: repro]</p>
    <p>
      When you click the button a few times, you will see the state is updating
      and the component is rerendering, but the text is never updated to reflect
      the new value.
    </p>
    <p>If you would prefer testing this with a real translator, click here.</p>
    <h3>Crashes</h3>
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
      closest error boundary. If you have no error boundary,{' '}
      <strong>your entire app will crash</strong> instead.
    </p>
    <p>
      The <Code>removeChild</Code> error usually happens because your app was
      trying to remove a conditionally rendered <Code>TextNode</Code> from the
      DOM that Google Translate unmounted. The <Code>insertBefore</Code> error
      is less common; this usually occurs because something conditionally
      rendered is trying to appear <em>before</em> a <Code>TextNode</Code> that
      was unmounted by Google Translate.
    </p>
    <Aside variant="sm">
      I would argue the crashes are actually a less significant issue than text
      not updating. I reckon misleading users is worse and less predictable than
      not showing anything at all.
    </Aside>
    <h4>Reproduction</h4>
    <p>
      The button below toggles the lights, leading to the “There are 3 lights”
      text to no longer being rendered in the React component. React tries to
      reconsolidate this render by removing the <Code>TextNode</Code> from the
      parent that it added it to.
    </p>
    <p>[TODO: repro]</p>
    <p>If you would prefer testing this with a real translator, click here.</p>

    <h4>Workarounds</h4>
    <p>
      React's crashes have been reported in{' '}
      <a href="https://github.com/facebook/react/issues/11538">this issue</a> on
      Github. Several workarounds have been posted, but unfortunately none of
      the workarounds provide a quick fix. Some just make things worse.
    </p>
    <p>
      The below workarounds only focus on the crashes and have absolutely no
      impact on translated text not updating.
    </p>

    <h5>1. Monkey patching removeChild and insertBefore</h5>
    <p>
      Gaearon, a member of the React Core team, posted{' '}
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
      triggered, the <strong>newly rendered text won't actually appear</strong>{' '}
      for your user.
    </p>

    <p>
      Unless the user is aware of the behavior, both issues make an app almost
      as unusable as when it would crash.
    </p>

    <p>Watch this monkey patch in action:</p>

    <p>[TODO: Reproduce on Codepen]</p>

    <h5>2. Surrounding TextNodes with spans</h5>
    <p>
      Github user "shuhei" shared{' '}
      <a href="https://github.com/facebook/react/issues/11538#issuecomment-390386520">
        a workaround
      </a>{' '}
      of surrounding all conditionally rendered and adjacent text in{' '}
      <Code>span</Code> elements. This avoids the crashes by ensuring React
      never tries to do any direct DOM manipulation of a <Code>TextNode</Code>.
    </p>

    <p>
      <strong>This works as a proper fix for the crashes.</strong> It does,
      however, require a pretty big change to a big and complex codebase.
      Without an ESLint rule to enforce this, it will take a lot of pleading in
      PRs to get your entire team to consistently apply this workaround.
    </p>

    <h5>3. Self re-rendering error boundaries</h5>
    <p>
      An error boundary that just renders the same children again when it runs
      into an error is{' '}
      <a href="https://github.com/facebook/react/issues/11538#issuecomment-2052692225">
        a good idea by Github user sorahn
      </a>
      , but unfortunately any components in the subtree will lose their state in
      the process. While this could work for some of the instances, it's not a
      general solution and if you're going to be adapting your code anyway,
      you're probably better off surrounding your <Code>TextNode</Code>s with
      spans.
    </p>

    <h3>
      Inconsistent <Code>event.target</Code>
    </h3>
    <p>
      When Google Translate is active, the value of <Code>event.target</Code>{' '}
      becomes unpredictable, as users are likely to click on one of Google
      Translate's <Code>font</Code> elements instead of the underlying element
      that you, as a developer, created and could reasonably expect. In specific
      code, this could lead to events not working correctly.
    </p>
    <p>
      While this issue is very specific and can be worked around with relative
      ease, very few developers will even be aware of the issue or think to test
      it.
    </p>

    <h4>Reproduction</h4>
    <p>TODO</p>

    <h2>Not just React</h2>

    <p>
      <strong>
        Not only React is affected by Google Translate's interference.
      </strong>
    </p>

    <p>
      Any JavaScript code that keeps a reference to elements and uses that
      reference to either update the value of a TextNode, or add or remove
      children to a parent, or uses <Code>e.target</Code>, is affected by these
      issues. It is not a React specific issue. However, React is the most
      prominent user of the “
      <a href="https://reactjs.org/docs/faq-internals.html">Virtual DOM</a>”, so
      the issue <em>is</em> most common in React.
    </p>

    <h2 id="not-just-google-translate">Not just Google Translate</h2>
    <p>
      Most machine translators work pretty much the same way as Google
      Translate, so the issue is not just limited to it. But the issue is even
      bigger than that:{' '}
      <strong>
        any browser extensions that manipulate the DOM can interfere
      </strong>
      . Some examples are:
    </p>
    <ul>
      <li>Password managers manipulating forms to show prefill dropdowns</li>
      <li>
        Extensions that inject alternative prices on competing webshops{' '}
        <Annotation annotation="These extensions may wrongly detect any monetary amounts shown, so they affect more than just webshops.">
          (*)
        </Annotation>
      </li>
      <li>An adblocker removing an element</li>
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
    <p>
      [TODO: Image](An extension adding a Magic the Gathering card image popup)
    </p>
    <p>
      I want to stress that{' '}
      <strong>
        I do not think the team behind Google Translate deserve any blame for
        the issues
      </strong>
      . It's a great tool that helps people worldwide and made the web usable to
      many more people. I reckon Google Translate was originally architected in
      a time where the web was very different from what it is today. The issues
      are a result of the web evolving; the web isn't almost exclusively static
      websites anymore. Many of the popular websites today are actually very
      large and complex web apps.
    </p>
    <p>
      I am not even sure if these issues should be fixed within Google
      Translate. These issues reveal a bigger problem at the core of how browser
      extensions interact with the web. It might be a problem that needs to be
      fixed in the platform (i.e. inside the browsers).
    </p>

    <h2>There is no real solution (yet)</h2>
    <p>
      Unfortunately, at the time of writing, there's no solution that can make
      Google Translate work well enough with React for a large React app. As
      mentioned above, the workarounds for the crashes introduce a new set of
      issues, and they still leave any complex app barely usable after
      translation by Google Translate.
    </p>

    <p>
      There are two things you <em>can</em> do, but you're not going to like
      them.
    </p>

    <h3 id="the-regrettable-fix">The regrettable “fix”</h3>
    <p>
      When I first ran into this issue back in 2017, I posted in the React issue
      tracker that I had{' '}
      <a href="https://github.com/facebook/react/issues/11538#issuecomment-350110297">
        ”fixed” my app by blocking translation entirely
      </a>
      . Now, 7 years later, I am sad to have to report that this still appears
      to the best way to avoid all of the issues caused by Google Translate.
    </p>

    <p>
      I don't like solving it this way. It makes apps less accessible to people
      worldwide. But it beats serving Google Translate users a broken app that
      barely works and will likely mislead them.
    </p>

    <p>
      An exception could be made for a simple website like this; it could be
      valid to consider wrapping conditional <Code>TextNode</Code>s in{' '}
      <Code>span</Code>s and leaving Google Translate enabled. A typical website
      isn't very reactive, has a small codebase, has few developers working on
      it, and doesn't show any critical computed numbers. You will have to
      carefully consider for yourself whether this applies to your site and you
      can safely leave Google Translate available.
    </p>

    <Aside>
      It might help to inform users of the issues of using Google Translate. See
      the gist of{' '}
      <Link href="/gists/how-to-detect-google-translate-and-other-machine-translation">
        How to detect Google Translate and other machine translation
      </Link>{' '}
      for a way of detecting when Google Translate is active.
    </Aside>

    <h3>Alternatives</h3>
    <p>
      The only alternative solution that I reckon is available, is to{' '}
      <strong>implement your own localization within your app</strong> (i.e.
      internationalization a.k.a. i18n). This makes machine translation
      unnecessary and provides international users with the best possible
      experience. But this has a couple of downsides:
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
      apps. It's unfortunate that there's a lack of good alternatives.
    </p>

    <Aside>
      I think there might be a possible workaround in React that uses a similar
      mechanic to React Dev Tools's “render highlighting” to trigger remounting
      (by React) of the entire parent of <Code>TextNode</Code>s that are
      changed, but I looked into the feature's code and that is part of a
      &gt;4500 LOC file so it seemed more involved than I bargained for.
    </Aside>

    <h2>What's next</h2>
    <p>
      That's the (rather in-depth) gist of Google Translate crashing React (and
      other webapps). Or, as we've learned, the gist of third-party extension
      DOM manipulation interfering with complex JavaScript app reactivity (often
      leading to crashes and other issues).
    </p>
    <p>
      Upvote this report on the Chromium project:
      <a href="https://issues.chromium.org/issues/41407169">
        https://issues.chromium.org/issues/41407169
      </a>{' '}
      and similar issues for other machine translators.
    </p>
    <p>Is there a translator that doesn't have these issues?</p>
  </Gist>
)

export default EverythingAboutGoogleTranslateCrashingReact

const Addendum = () => (
  <>
    <h2 id="should-an-app-claim-full-control-of-its-dom">
      Should an app claim full-control of its DOM?
    </h2>
    <p>
      <Annotation annotation="br...@localizejs.com - The issue tracker doesn't do names.">
        A developer
      </Annotation>{' '}
      of the translation project <a href="https://localizejs.com/">Localize</a>{' '}
      posted{' '}
      <a href="https://issues.chromium.org/issues/41407169#comment10">
        a well thought out and in-depth comment
      </a>{' '}
      on the Chromium issue tracker for this issue. In it they wrote:
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
      DOM-modifying chrome extensions (ie. Grammarly, password managers, etc) or
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
      <strong>should an app claim full-control over the DOM?</strong> They do
      well to point out the potential problems of doing so.
    </p>
    <p>
      But as I mentioned earlier, the interference is broader than just full and
      exclusive control. Extensions like Google Translate touch so much, that it
      can break <em>any</em> DOM manipulation, even small pieces of code from
      random web developers that doesn't even use a library. The core of the
      issue is in third-party DOM manipulation, not just Virtual DOM libraries.
    </p>
    <p>
      I think it's unreasonable to expect every web developer to consider
      possible interference from third-party (browser) extensions. There are
      many different kinds of developers with various experience levels and
      knowledge. I don't think it would be helpful to include this in the
      curriculum of developers.
    </p>
    <p>
      As for React using the Virtual DOM this way, and more specifically, for it
      to reuse and update DOM nodes instead of replacing them whenever possible,
      I think it's only natural for libraries to evolve in this direction. There
      is a notable performance benefit to doing it this way.
    </p>
    <p>
      In the end, I think the third-party extensions are best equipped to
      consider what they might affect and could possibly break, and they should
      be first to solve their interference.
    </p>
    <p>
      But I also think it might not be reasonable to expect extensions to
      consider <em>all</em> possible interference either.
    </p>
    <p>
      The only reasonable solution might be to solve this within the platform;
      inside the browsers that inject third-party extensions.
    </p>

    <h2 id="an-idea-for-a-fix">An idea for a fix</h2>
    <p>
      These problems are caused by third-party browser extensions manipulating
      the DOM of web apps. With the wide variety of web apps available, it's
      pretty much impossible for non-simple extensions to consider all possible
      interference they might cause.
    </p>
    <p>
      The solution to these issues, and any other issues caused by extensions,
      is to prevent them from manipulating the DOM in any way so that web apps
      can have full and exclusive control of the DOM. This is the only way to be
      sure that there is no interference.
    </p>
    <p>
      Of course, this is infeasible. Extensions are a big part of the web
      ecosystem and they provide a lot of value to users. It's also not that
      simple. For example for translation. Sometimes the DOM needs to be
      restructured to ensure the translated sentence has a correct structure. A
      link or a number might need to be moved from the end of a sentence to the
      start. This is not something that can be done without manipulating the DOM
      in some way.
    </p>
    <p>TODO: bit about how it could be solved in the browser</p>
    <p>TODO: add a "more realistically" paragraph</p>
    {/* <p>
    But it should be solved at the browser level, limiting DOM manipulation by
    extensions. An adblocker could use `hidden` rather than removing elements
    from the DOM
  </p>
  <p>
    Maybe Google Translate should keep two versions of the page active in
    memory when translation is active and leave the original as-is for
    JavaScript to interact with it and automatically reconcile changes to the
    DOM to its translated version. Since this requires two-way binding, this
    would probably be not trivial to build, but to me it seems like it's the
    only solution that will forever stop Google Translate from breaking apps.
    There is just no other way to manipulate the DOM that doesn't risk
    breakage
  </p>
  <p>
    Maybe browsers should do that. Give the original webapp full and exclusive
    control and only execute extensions on a copy of it that do not affect the
    original. Rerun extensions any time the original changes. Make extensions
    deal with the issues, rather than every single webdeveloper.
  </p> */}
    <pre>
      {`How could Google Translate do this? They could:
- unmount the entire tree from the body
- this solves React crashing because of removeChild on an unparented TextNode
- insert a copy of the tree at the body with event handlers proxied to the original tree
- add mutationobservers to the unmounted tree
- when something changes, copy the change to the copy
- figure out how to deal with document.getElement issues
- probably also add mutationobservers to the mounted tree and reconcile them
- or ignore them with a “when google translate is active, it's exclusive” philosophy
- glhf`}
    </pre>
  </>
)
