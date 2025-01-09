import { css } from '@emotion/react'
import Image from 'next/image'
import Aside from '../../components/Aside'
import BlogArticle from '../../components/BlogArticle'
import { BlogArticleTag } from '../../components/BlogArticleMeta'
import Code from '../../components/Code'
import CodeSnippet from '../../components/CodeSnippet'
import Figure from '../../components/Figure'
import Iphone15Overlay from '../../components/Iphone15Overlay'
import Link from '../../components/Link'
import articleMeta, { ArticleStaticProps } from '../../utils/articleMeta'
import closeButtonClickableAreaImage from './assets/accessibility-closebuttonclickablearea.jpg'
import focusIndicatorImage from './assets/accessibility-focus-indicator.gif'
import formFieldJumpingImage from './assets/accessibility-form-field-jumping.gif'
import placeholdersImage from './assets/accessibility-placeholders.png'
import openGraphImage from './assets/ogimage-accessibility-essentials-every-front-end-developer-should-know.png'

const { meta, getStaticProps } = articleMeta({
  slug: 'accessibility-essentials-every-front-end-developer-should-know',
  title: 'Accessibility essentials every front-end developer should know',
  description:
    'Essential accessibility practices for front-end developers, including semantic HTML, alt texts, ARIA, and keyboard navigation tips to build inclusive components.',
  image: openGraphImage,
  publishedAt: '2025-01-07',
  updatedAt: '2025-01-09',
  tags: [BlogArticleTag.Accessibility, BlogArticleTag.React, BlogArticleTag.UX],
})
export { meta, getStaticProps }

const BlogArticleAccessibilityEssentials = (props: ArticleStaticProps) => (
  <BlogArticle {...props}>
    <p>
      Many developers view accessibility as an overwhelming task, requiring a
      lot of extra effort or specialized knowledge. But{' '}
      <strong>a few basic practices can make a significant impact</strong>.
    </p>

    <p>
      In this article, I'll cover the key accessibility principles I believe
      every Front-end developer should apply when building components. We'll
      cover:
    </p>

    <ul>
      <li>
        <Link href="#semantic-html">Semantic HTML</Link>: Use the right elements
        for interactive and native functionality.
      </li>
      <li>
        <Link href="#forms">Forms</Link>: Simplify labels and structure to
        improve usability for everyone.
      </li>
      <li>
        <Link href="#image-alt-texts">Image Alt Texts</Link>: Write better
        descriptions to make images more accessible.
      </li>
      <li>
        <Link href="#keyboard-navigation">Keyboard Navigation</Link>: Ensure
        seamless navigation with focus management and modals.
      </li>
      <li>
        <Link href="#styling">Styling</Link>: Enhance accessibility through
        focus indicators, responsive design, and reduced motion.
      </li>
      <li>
        <Link href="#aria-attributes">ARIA Attributes</Link>: When and how to
        use ARIA to fill accessibility gaps.
      </li>
    </ul>

    <p>
      These practices not only benefit users relying on assistive technologies,
      they <strong>improve the overall user experience (UX)</strong>.
    </p>

    <p>
      The focus of the article will be on the basic things you, as a Front-end
      developer, can do to improve the accessibility of your components without
      spending a lot of extra time and effort.
    </p>

    <Aside variant="sm">
      While most examples in this article use React, the principles apply to any
      front-end app. Even if you're not using React, you can still benefit from
      the practices outlined here.
    </Aside>

    <h2 id="semantic-html">Semantic HTML</h2>

    <p>
      <strong>Accessibility begins with semantic HTML</strong>; using the
      correct HTML5 elements for their intended purposes. This helps browsers
      and tools understand the structure of your page allowing them to provide
      built-in accessibility benefits. And a nice bonus is that semantic HTML
      also improves SEO.
    </p>

    <h3 id="interactive-elements">Interactive elements</h3>

    <p>
      The most important elements to get right are <Code>{`<button>`}</Code> and{' '}
      <Code>{`<a>`}</Code>. These have accessibility features built-in by
      default, which includes keyboard support (the behavior of which can differ
      per operating system) and providing semantic meaning to screen readers.
    </p>

    <p>
      A common anti-pattern in (web) applications are divs with{' '}
      <Code>onClick</Code> handlers.{' '}
      <strong>
        Never use a <Code>{`<div>`}</Code> with an <Code>onClick</Code> handler
      </strong>{' '}
      as the only way to make an element interactive. These elements lack
      accessibility features, which limits the way users can interact with them
      while making it impossible for screen readers. Moreover, properly using{' '}
      <Code>{`<button>`}</Code> and <Code>{`<a>`}</Code> for interactive
      elements benefits all users:
    </p>

    <ul>
      <li>
        <b>Links</b> allow users to right-click for a context menu with various
        actions, or to open it in a new tab by control-clicking it on Windows,
        command-clicking it on Mac, or by clicking it with the middle-mouse
        button.
      </li>
      <li>
        <b>Buttons</b> enable users to navigate through your site with their
        keyboard. This allows power users to speed up their workflows, and is
        essential for assistive technologies.
      </li>
    </ul>

    <p>
      If you need custom styling, you can fully restyle a{' '}
      <Code>{`<button>`}</Code> or <Code>{`<a>`}</Code> without sacrificing
      accessibility. More on styling buttons and links{' '}
      <Link href="#styling">later</Link>.
    </p>

    <h3 id="native-elements">Native elements</h3>

    <p>
      Beyond buttons and links, <strong>native elements</strong> like{' '}
      <Code>{`<select>`}</Code>, <Code>{`<input>`}</Code>, and{' '}
      <Code>{`<textarea>`}</Code> <strong>are accessible out of the box</strong>
      . A <Code>{`<select>`}</Code> dropdown, for example, works seamlessly with
      screen readers and keyboard navigation, providing a consistent user
      experience without extra work.
    </p>

    <p>
      While it's tempting to build your own custom components for aesthetic or
      functional reasons, building accessible replacements for native elements
      is very difficult and time-consuming. Even though I'm typically not a fan
      of installing libraries for small problems (as I've written about in my
      articles on <Link href="/blog?tag=dependencies">dependencies</Link>), in
      this case it's better to rely on widely-used and mature libraries that
      already have accessibility covered, like <Code>react-select</Code>.
    </p>

    <h2 id="forms">Forms</h2>

    <p>
      One thing I repeatedly find in projects that I join, is form fields not
      contained in a <Code>{`<form>`}</Code>.
    </p>

    <p>
      <strong>
        Every form field should be contained in a <Code>{`<form>`}</Code> with
        an <Code>onSubmit</Code> handler and a submit button.
      </strong>{' '}
      This enables browsers and screen readers to identify related fields and
      provides accessibility and usability benefits, such as allowing users to
      submit with the <Code>Enter</Code> key and, on mobile, jumping from field
      to field within the form without having to close the on-screen keyboard.
    </p>

    <figure
      css={css`
        text-align: center;
      `}
    >
      <Iphone15Overlay width={360}>
        <Image
          src={formFieldJumpingImage}
          alt='An animated GIF showing a React form with three fields; firstname, lastname and email, and a submit button. Each field is entered using the on-screen keyboard, and arrows atop the on-screen keyboard are used to jump to each next field. Finally the form is submitted using "return" on the keyboard.'
          width={360}
        />
      </Iphone15Overlay>

      <figcaption
        css={css`
          font-size: 90%;
        `}
      >
        <Link href="/blog/demo/accessibility-form-in-a-form">
          Form fields in a form allow jumping between fields and submitting from
          the on-screen keyboard.
        </Link>
      </figcaption>
    </figure>

    <h3 id="labels">Labels</h3>

    <p>
      <strong>
        Input fields must have a clear label describing their purpose.
      </strong>{' '}
      These labels must be correctly linked with the input field, with{' '}
      <Code>htmlFor</Code>, or my preferred approach, by wrapping the label text
      and input directly inside a <Code>{`<label>`}</Code> element:
    </p>

    <CodeSnippet>{`
<label>
  <div>Email:</div>
  <input type="email" {...register('email')} /> 
</label>
`}</CodeSnippet>

    <p>
      This eliminates the need for <Code>id</Code> attributes, simplifying the
      code while maintaining accessibility. It works great with libraries like{' '}
      <Code>react-hook-form</Code>, and ensures accessibility without extra
      effort.
    </p>

    <h3 id="placeholders">Placeholders</h3>

    <p>
      <strong>Placeholders are not substitutes for labels.</strong> They
      disappear when users start typing, which can leave users confused about
      what the field is for. They're also often harder to read due to their low
      contrast. Additionally, placeholders make it harder to identify which
      fields have not yet been filled.
    </p>

    <Figure
      caption="Neither form has been filled, but placeholders in one make that harder to tell."
      href="/blog/demo/accessibility-placeholders"
    >
      <Image
        src={placeholdersImage}
        alt="Two forms side-by-side, both with firstname, lastname and email fields and a submit button. Fields on the left form have placeholders, making it appear like fields are filled with example values."
        width={700}
        sizes="(min-width: 768px) 700px, 100vw"
      />
    </Figure>

    <p>
      Always use a proper <Code>{`<label>`}</Code> and try to use placeholders
      sparingly.
    </p>

    <h2 id="image-alt-texts">Image alt texts</h2>

    <p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="A purposefully broken image to show an example alt text" />
    </p>

    <p>
      Alt texts are essential for making images accessible, and as a nice bonus,
      they improve SEO by helping search engines understand your content better.
    </p>

    <p>
      You should{' '}
      <strong>
        add the <Code>alt</Code> attribute to images without exception
      </strong>
      . Use an empty alt text (<Code>alt=""</Code>) only for images that are
      purely decorative or redundant to the text; this makes screen readers skip
      over images.
    </p>

    <p>
      Writing good alt text is hard, and many guidelines on the internet are
      confusing. Over the years, I've developed a rule of thumb that works for
      me: imagine explaining the image to someone with poor vision. They can see
      some parts of the image, but can't make out everything. The alt text has
      to fill in the gaps of what they're seeing and not seeing. A key takeaway
      from this approach is that if the image contains text, that text should
      always be included in the alt text. I find this approach leads me to add
      alt text to images more often than other guidelines typically suggest.
    </p>

    <h2 id="keyboard-navigation">Keyboard navigation</h2>

    <p>
      An essential alternative to navigation with a mouse, is the keyboard. Make
      sure users can navigate your app logically with the <Code>Tab</Code> key
      and trigger actions with <Code>Enter</Code>. Using native HTML elements
      like <Code>{`<button>`}</Code> and <Code>{`<a>`}</Code> plays a
      significant role in making this seamless. Focus indicators are also
      crucial for keyboard navigation, but we'll touch on that{' '}
      <Link href="#focus-indicators">later</Link>.
    </p>

    <h3 id="modals">Modals</h3>

    <p>
      Keyboard navigation becomes more challenging when modals are introduced.
    </p>

    <p>
      By default,{' '}
      <strong>
        the user's focus remains on the button that opened the modal
      </strong>
      , making it difficult for users to interact with the newly opened modal.
      It also risks users accidentally opening multiple instances of the same
      modal.
    </p>

    <p>To address this:</p>
    <ol>
      <li>
        <strong>Set the focus to the modal</strong> as soon as it opens.
      </li>
      <li>
        <strong>Implement a focus trap</strong> to keep the focus contained
        within the modal. Without this users might tab out of the modal and back
        into the rest of the app.
      </li>
    </ol>

    <p>
      A library like{' '}
      <Link href="https://github.com/theKashey/react-focus-lock">
        react-focus-trap
      </Link>{' '}
      provides good solutions for this. It handles the initial focus, traps the
      focus so it cycles only through active elements within the modal, and can
      even restore focus to the triggering element when the modal closes using
      its <Code>returnFocus</Code> option.
    </p>

    <p>
      Finally, give users an easy alternative to close modals by allowing them
      to dismiss them with the <Code>Escape</Code> key.
    </p>

    <Aside>
      For confirmation dialogs, consider settings the initial focus to the
      confirm button. This allows users to immediately confirm an action by
      pressing <Code>Enter</Code> just like in most native dialogs.
    </Aside>

    <h2 id="styling">Styling</h2>

    <p>
      Many aspects of styling (i.e. design) play a role in accessibility, such
      as:
    </p>

    <ul>
      <li>
        <b>Focus indicators</b>: Highlight the focused element with an outline.
      </li>
      <li>
        <b>Interactive elements</b>: Ensure links look like links and buttons
        look like buttons, and they are easy to interact with.
      </li>
      <li>
        <b>Interactivity feedback</b>: provide clear hover, active and disabled
        states.
      </li>
      <li>
        <b>Color contrast</b>: Use sufficient contrast to distinguish elements.
      </li>
      <li>
        <b>Colors</b>: Pair colors with text or icons for users with color
        blindness.
      </li>
      <li>
        <b>Responsive design</b>: Support custom font sizes and zooming.
      </li>
      <li>
        <b>Animations and motion</b>: Reduce or disable motion for users
        sensitive to it.
      </li>
      <li>
        <b>Font and spacing</b>: Use clear fonts with adequate spacing,
        particularly for users with dyslexia.
      </li>
    </ul>

    <p>
      Most of these are design-driven and fall outside of our direct influence.
      I'll focus on the areas where we can have the most direct impact.
    </p>

    <h3 id="focus-indicators">Focus indicators</h3>

    <p>
      <strong>Never disable focus indicators.</strong> They are essential for
      keyboard navigation. The{' '}
      <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible">
        <Code>:focus-visible</Code>
      </Link>{' '}
      selector, rather than <Code>:focus</Code>, allows you to show focus
      indicators only when browsers deem it relevant to the user. This provides
      a solution to the old complaints that focus rings are visually ugly
      without sacrificing accessibility.
    </p>

    <Figure
      caption="Jumping through form fields with focus indicator"
      href={focusIndicatorImage.src}
    >
      <Image
        src={focusIndicatorImage}
        alt="An animated GIF showing a modal with a form for creating a project in MoneyMonk (text in Dutch). The focus indicator moves through the fields, showing the user's current position. At the end, it loops back to the close button."
        width={420}
      />
    </Figure>

    <Aside>
      The GIF above has a custom field for the "Soort" (type) field. It's fully
      accessible, as it's built with radio buttons and CSS. The radio buttons
      are visually hidden but fully accessible; they can still be selected and
      are announced by screen readers. This highlights the power of using
      semantic HTML as much as possible.
    </Aside>

    <h3 id="clickable-areas">Clickable areas</h3>

    <p>
      Ensure buttons and links have{' '}
      <strong>large, easily clickable areas for mouse and touch users</strong>.
      You can easily achieve this by adding padding to the element and, if
      necessary, using negative margins to make it appear visually equal.
    </p>

    <Figure
      caption="A side-by-side of a modal close button, showing its clickable area."
      href={closeButtonClickableAreaImage.src}
    >
      <Image
        src={closeButtonClickableAreaImage}
        alt="A side-by-side of a modal close button. Left side shows the button
      visually, while right side shows it focused with the clickable area around
      it being much bigger. A cursor is on the focused button to better illustrate the clickable area."
        width={360}
      />
    </Figure>

    <h3 id="reduced-motion">Reduced motion</h3>

    <p>
      Animations can enhance usability by helping users maintain orientation on
      a page, such as when transitioning between states. However, some users
      have motion sensitivity and have opted for reduced motion in their OS
      settings. Respect this preference by disabling animations and transitions
      where applicable. This can be done with a simple media-query, such as:
    </p>

    <CodeSnippet language="css">{`
@media (prefers-reduced-motion: reduce) {
  .modal {
    animation: none;
  }
}
`}</CodeSnippet>

    <h3 id="accessible-responsive-design">Accessible responsive design</h3>

    <p>
      One little-known fact is that{' '}
      <strong>browsers allow users to customize the default font size</strong>{' '}
      for web pages.
    </p>

    <p>
      Accessible responsive design involves ensuring layouts adapt to the user's
      font size preference and the zoom levels they might use. Webpages should
      respect these preferences by using relative units like <Code>em</Code> and{' '}
      <Code>rem</Code> for font sizes, margins, text block widths and other
      layout values. Hardcoding these values in pixels should generally be
      avoided.
    </p>

    <h4 id="applied-to-this-blog">Applied to this blog</h4>

    <p>
      This blog uses relative sizing in most places (although it's far from
      perfect as it was a late addition). It doesn't set a base font size, using
      whatever is configured in the browser. From there, most other sizes are
      relative to that by using <Code>em</Code> values, and <Code>rem</Code>{' '}
      where necessary.
    </p>

    <p>
      One example that really drove home the value of using <Code>em</Code> for
      non-text elements, is the width of this article text. I set it to{' '}
      <Code>57em</Code> so that code blocks perfectly match the 80-character
      column width that I use in my IDE (plus it comes close to the ideal word
      count per line). Because the container scales with font size, the amount
      of words per line remains consistent regardless of the user-configured
      font size.
    </p>

    <p>
      Using <Code>em</Code> for margins also makes a lot of sense, especially
      around text elements, as whitespace tends to grow with font size.
    </p>

    <h2 id="aria-attributes">ARIA attributes</h2>

    <p>
      An article on accessibility wouldn't be complete without mentioning{' '}
      <Link href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA">
        ARIA
      </Link>{' '}
      attributes, even if it's focused on things benefitting all users, not just
      those relying on screen readers.
    </p>

    <p>
      While semantic HTML is a good starting point,{' '}
      <strong>
        ARIA attributes can help fill gaps in screen reader support where
        semantic HTML falls short
      </strong>
      . But if misused, they can also do more harm than good, so it's best to
      use them sparingly and thoughtfully.
    </p>

    <p>The two most important ARIA attributes are:</p>

    <h3 id="aria-label">aria-label</h3>

    <p>
      Adds an accessible label to elements that do not have visible text. For
      example, a search button with only an icon should include an{' '}
      <Code>aria-label</Code> clarifying it:
    </p>

    <CodeSnippet>{`
<button aria-label="Search">
  <SearchIcon />
</button>
`}</CodeSnippet>

    <p>
      While it can be used on any element,{' '}
      <strong>
        <Code>aria-label</Code> should only be used on{' '}
        <Link href="#interactive-elements">interactive elements</Link>.
      </strong>{' '}
      It is not supported on non-interactive elements, and using it there can
      result in the label{' '}
      <Link href="https://ericwbailey.website/published/aria-label-is-a-code-smell/#1.-aria-label%E2%80%99s-varied-support-when-declared-on-a-non-interactive-element">
        being ignored or causing confusing, unexpected, or annoying
        announcements
      </Link>
      .
    </p>

    <h3 id="aria-hidden">aria-hidden</h3>

    <p>
      Hides elements from screen readers without removing them visually. This is
      ideal for decorative or redundant elements:
    </p>

    <CodeSnippet>{`
<div>
  React <ReactLogo aria-hidden />
</div>
`}</CodeSnippet>

    <hr
      css={css`
        margin: 3em 0 1.5em;
      `}
    />

    <p>
      While these two attributes are a great starting point, there are many more
      ARIA attributes that you will need if you decide to go for full screen
      reader support. Some noteworthy ones are <Code>aria-live</Code>,{' '}
      <Code>aria-expanded</Code>, and <Code>aria-describedby</Code>, but it
      quickly becomes quite involved if you want to do it right.
    </p>

    <h2 id="conclusion">Conclusion</h2>

    <p>
      These are the tools and principles that I believe every Front-end
      developer should incorporate when building components.{' '}
      <strong>
        Accessibility isn't a separate task to tackle later, it's something that
        should be a part of your development process from the start.
      </strong>
    </p>

    <p>
      As we've seen, most accessibility improvements don't just benefit users
      with specific needs, they enhance the usability and overall user
      experience (UX) for everyone. There are even SEO benefits, as search
      engines may rank sites higher that demonstrate good accessibility
      practices.
    </p>

    <p>
      While the changes outlined in this article cover the basics and can take
      you a long way, full accessibility requires more effort. At some point,
      you'll actually need to test your app with a screen reader to ensure it
      truly works for all users.
    </p>

    <p>
      With these foundational practices in place, you'll be well on your way to
      creating inclusive and user-friendly applications for everyone.
    </p>
  </BlogArticle>
)

export default BlogArticleAccessibilityEssentials
