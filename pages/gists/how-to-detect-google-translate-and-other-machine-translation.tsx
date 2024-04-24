import Aside from '../../components/Aside'
import Code from '../../components/Code'
import CodeSnippet from '../../components/CodeSnippet'
import Gist, { GistMeta, GistTag } from '../../components/Gist'

export const meta: GistMeta = {
  slug: 'how-to-detect-google-translate-and-other-machine-translation',
  title: 'How to detect Google Translate and other machine translation',
  description:
    'In this gist I share a simple but reliable way to detect Google Translate and other machine translation tools.',
  publishedAt: '2024-04-21',
  tags: [GistTag.HowTo, GistTag.MachineTranslation],
}

const GistHowToDetectGoogleTranslateAndOtherMachineTranslation = () => (
  <Gist {...meta}>
    <p>
      Machine translation, such as done by Google Translate inside the Google
      Chrome browser, provides users with dynamic translation of webpages from
      within their browser tab.
    </p>
    <p>
      There may be many reasons to want to detect when this happens, such as to
      deal with{' '}
      <a href="https://github.com/facebook/react/issues/11538">issues</a> caused
      by the behavior of these tools, to offer to change the language within
      your app, or to track which languages users are translating to as a means
      to offer more locales in your app.
    </p>
    <p>
      Most machine translators can be detected simply by monitoring the{' '}
      <Code>html</Code> element's{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/lang">
        lang
      </a>{' '}
      attribute for changes. Proper machine translators will update its value to
      reflect the new language inside your page after translation is applied.
    </p>
    <Aside label="Note">
      Make sure your <Code>html</Code> element has the correct <Code>lang</Code>{' '}
      attribute set initially. If it is omitted, the machine translator may not
      update it.
    </Aside>
    <p>The code to detect all proper machine translators is below.</p>
    <CodeSnippet>{`
const originalLanguge = document.documentElement.lang;

// Works at least for Chrome, Firefox, Safari and probably more. Not Microsoft
// Edge though. They're special.
// Yell at clouds if a translator doesn't change it
const observer = new MutationObserver(() => {
  const lang = document.documentElement.lang;
  if (lang !== originalLanguge) {
    console.log(
      'Page translation detected (Generic)',
      \`lang="\${document.documentElement.lang}" (original="\${originalLanguge}")\`
    );
  }
});
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['lang'],
  childList: false,
  characterData: false,
});
`}</CodeSnippet>
    <p>
      Unfortunately Microsoft Edge (the new Internet Explorer), doesn’t actually
      update the <Code>lang</Code> attribute, so it needs its own detector;
    </p>
    <CodeSnippet>{`
const title = document.getElementsByTagName('title')[0];
if (!title) {
  return;
}

const observer = new MutationObserver(() => {
  if (title.hasAttribute('_msttexthash')) {
    // This is triggered twice
    console.log(
      'Page translation detected (Microsoft Edge)',
      \`lang="\${document.documentElement.lang}" (original="\${originalLanguge}")\`
    );
  }
});
observer.observe(title, {
  attributes: true,
  attributeFilter: ['_msttexthash'],
  childList: false,
  characterData: false,
});
`}</CodeSnippet>
    <p>
      With these code snippets, in place of the <Code>console.log</Code>, you
      can do anything you might want. You could apply{' '}
      <a href="https://github.com/facebook/react/issues/11538#issuecomment-417504600">
        a monkey patch
      </a>
      , update some global state to make your rendering library show a (more
      prominent) language switcher, or send an event to GTM.
    </p>
    <p>Hope that helps.</p>
    <Aside>
      Machine translators' DOM changes often interfere with tools like React,
      which may lead to crashes. For React I plan to post a more extensive gist
      about ways to mitigate this at some point. I wouldn't fix this the same
      way today{' '}
      <a href="https://github.com/facebook/react/issues/11538#issuecomment-350110297">
        as I fixed it in 2017
      </a>
      , but unfortunately,{' '}
      <a href="https://github.com/facebook/react/issues/11538#issuecomment-417504600">
        the monkey patch
      </a>{' '}
      posted by gaearon just makes things worse.
    </Aside>
  </Gist>
)

export default GistHowToDetectGoogleTranslateAndOtherMachineTranslation
