import { css } from '@emotion/react'
import { useState } from 'react'
import Annotation from '../../components/Annotation'
import BlogArticle from '../../components/BlogArticle'
import { BlogArticleTag } from '../../components/BlogArticleMeta'
import Code from '../../components/Code'
import Link from '../../components/Link'
import SegmentedControl from '../../components/SegmentedControl'
import articleMeta, { ArticleStaticProps } from '../../utils/articleMeta'
import openGraphImage from './assets/ogimage-the-european-accessibility-act-for-websites-and-apps.png'

const { meta, getStaticProps } = articleMeta({
  slug: 'the-european-accessibility-act-for-websites-and-apps',
  title: 'The European Accessibility Act for websites and apps',
  description:
    'Learn how the European Accessibility Act (EAA) impacts websites and apps, key accessibility requirements, deadlines, and tips to prepare for compliance.',
  image: openGraphImage,
  publishedAt: '2025-01-28',
  tags: [BlogArticleTag.Accessibility, BlogArticleTag.React, BlogArticleTag.UX],
})
export { meta, getStaticProps }

const BlogArticleEuropeanAccessibilityAct = (props: ArticleStaticProps) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <BlogArticle {...props}>
      <p>
        The European Accessibility Act (EAA) goes into effect on{' '}
        <strong>June 28, 2025</strong> - just 5 months from now. From that
        point,{' '}
        <strong>
          websites and apps of companies operating in the EU must meet
          accessibility standards
        </strong>
        . Only{' '}
        <Annotation
          annotation="A company with less than 10 employees and less than 2
        million revenue annually."
        >
          microenterprises
        </Annotation>{' '}
        are exempt.
      </p>
      <p>
        In this article, I'll dive into the requirements of the EAA for websites
        and apps, the timeline, and a plan to help you get started.
      </p>
      <p>
        If you're new to accessibility, you might want to start with{' '}
        <Link href="#what-is-accessibility-and-who-is-it-for">
          What is accessibility and who is it for
        </Link>
        . Otherwise, skip ahead to the{' '}
        <Link href="#european-accessibility-act-requirements">
          EAA requirements
        </Link>
        .
      </p>
      <h2 id="what-is-accessibility-and-who-is-it-for">
        What is accessibility and who is it for
      </h2>
      <p>
        <strong>
          Accessibility is about building websites and apps that are usable by
          as many people as possible
        </strong>
        , regardless of their abilities, devices or input methods. This is
        primarily done by making content easier to read, interactive elements
        easy to use, and ensuring support for keyboard, screen reader, and voice
        navigation.
      </p>
      <p>
        A common misconception is that accessibility only affects a small group
        of users, specifically people who are blind and only navigate using a
        screen reader. In reality, accessibility helps a wide range of users,
        including:
      </p>
      <ul>
        <li>
          <b>Users with reduced vision</b>. Some use screen readers, but many
          just increase the font size or zoom in.
        </li>
        <li>
          <b>Users with dyslexia</b>. They benefit from readable fonts,
          increased line spacing, and consistent layouts.
        </li>
        <li>
          <b>Users with color blindness</b>. They might miss status indicators
          unless they're accompanied by labels.
        </li>
        <li>
          <b>Users with motor impairments</b>. Small hit areas make navigation
          difficult for users with tremors or other motor challenges and they
          may rely on keyboard or voice commands.
        </li>
        <li>
          <b>Users with photo- or motion sensitivity</b>. Subtle animation or
          flashing elements can trigger discomfort or more severe reactions.
        </li>
      </ul>
      <p>
        Even users without disabilities benefit from accessibility improvements,
        as{' '}
        <strong>
          accessibility improves the user experience (UX) for everyone
        </strong>
        . A large part of accessibility is making your sites and apps easier to
        use, which allows anyone to speed up through familiar usability perks
        and reduces frustrations.
      </p>
      <p>
        Businesses also gain from accessibility. Accessible websites and apps
        can reach more people and have SEO benefits, as search engines can
        understand your content better.
      </p>
      <h2 id="european-accessibility-act-requirements">
        European Accessibility Act requirements
      </h2>
      <p>The main requirements under the EAA for sites and apps are:</p>
      <ol>
        <li>Accessible UI and content</li>
        <li>Accessibility statement</li>
      </ol>
      <p>Here's a closer look at each.</p>
      <h3>Accessible UI and content</h3>
      <p>
        Your{' '}
        <strong>
          interface and content must conform with{' '}
          <Link href="https://www.w3.org/TR/WCAG21/">WCAG 2.1 level AA</Link>
        </strong>
        . WCAG (Web Content Accessibility Guidelines) is a set of
        recommendations for making digital content accessible to as many users
        as possible.
      </p>
      <p>
        While WCAG is typically a guideline, the EAA makes conformance with{' '}
        <b>all</b> level A and level AA criteria a legal requirement. So while
        WCAG provides recommendations, under the EAA you can't pick and choose
        which criteria to follow.
      </p>
      <p>
        WCAG 2.1 is built on four key principles, abbreviated as <i>POUR</i>:
      </p>
      <div>
        <h4>1. Perceivable</h4>
        <p>
          Ensure all information is accessible through multiple means, such as
          text, visuals, or audio. The key requirements include:
        </p>
        <SegmentedControl
          name="show-details-perceivable"
          options={[
            { label: 'Summary', value: false },
            { label: 'Detailed overview', value: true },
          ]}
          value={showDetails}
          onChange={setShowDetails}
          css={css`
            position: sticky;
            top: 0;
            z-index: 1;
          `}
        />
        {showDetails ? (
          <ul>
            <li>
              <b>1.1.1 Text Alternatives</b>: Provide text alternatives (e.g.{' '}
              <Code>alt</Code> attributes) for all{' '}
              <Annotation
                annotation="Anything that is not a string
          of characters, including images, videos, ASCII Art, and emojis."
              >
                non-text content
              </Annotation>
              .
            </li>
            <li>
              <b>1.2 Captions</b>: Provide captions for all audio content in
              synchronized media.
            </li>
            <li>
              <b>1.3.1 Info and Relationships</b>: Use semantic HTML to convey
              relationships (e.g., headings, lists, tables).
            </li>
            <li>
              <b>1.3.2 Meaningful Sequence</b>: Ensure content is presented in a
              logical reading order.
            </li>
            <li>
              <b>1.3.3 Sensory Characteristics</b>: Ensure instructions do not
              rely solely on sensory characteristics like shape, color, or
              location.
            </li>
            <li>
              <b>1.3.4 Orientation</b>: Content must work in both portrait and
              landscape orientations unless a specific orientation is essential.
            </li>
            <li>
              <b>1.3.5 Identify Input Purpose</b>: Ensure form fields are
              programmatically identifiable (i.e. have a label).
            </li>
            <li>
              <b>1.4.1 Use of Color</b>: Ensure that color is not the sole
              method for conveying information.
            </li>
            <li>
              <b>1.4.3 Contrast (Minimum)</b>: Text and images of text must have
              a contrast ratio of at least 4.5:1 (or 3:1 for{' '}
              <Annotation
                annotation={
                  <>
                    About <Code>1.5em</Code>+ for regular text, and{' '}
                    <Code>1.2em</Code>+ for bold text, assuming the user
                    configured default font size is used. With the default font
                    size of <Code>16px</Code>, <Code>1.5em</Code> would be{' '}
                    <Code>24px</Code>.
                  </>
                }
              >
                large text
              </Annotation>
              ).
            </li>
            <li>
              <b>1.4.4 Resize Text</b>: Content must remain usable and readable
              when text is resized up to <Code>200%</Code> - without requiring
              horizontal scrolling.
            </li>
            <li>
              <b>1.4.5 Images of Text</b>: Avoid using images of text unless
              essential.
            </li>
            <li>
              <b>1.4.10 Reflow</b>: Content must reflow within a viewport
              without horizontal scrolling at widths as small as{' '}
              <Code>320px</Code>.
            </li>
            <li>
              <b>1.4.11 Non-Text Contrast</b>: UI components and graphics must
              have a contrast ratio of at least 3:1.
            </li>
            <li>
              <b>1.4.12 Text Spacing</b>: Ensure text spacing settings do not
              break content or functionality.
            </li>
            <li>
              <b>1.4.13 Content on Hover or Focus</b>: Content that appears on
              hover or focus must be{' '}
              <Annotation
                annotation="A mechanism is available to dismiss the
          additional content without moving pointer hover or keyboard focus,
          unless the additional content communicates an input error or does not
          obscure or replace other content."
              >
                dismissible
              </Annotation>
              ,{' '}
              <Annotation
                annotation="If pointer hover can trigger the additional content,
          then the pointer can be moved over the additional content without the
          additional content disappearing."
              >
                hoverable
              </Annotation>
              , and{' '}
              <Annotation
                annotation="The additional
          content remains visible until the hover or focus trigger is removed,
          the user dismisses it, or its information is no longer valid."
              >
                persistent
              </Annotation>
              .
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <b>Text alternatives</b>: Use <Code>alt</Code> attributes for
              images and provide captions for audio and video.
            </li>
            <li>
              <b>Semantic HTML</b>: Use proper HTML elements for structure, such
              as headings, lists, and tables.
            </li>
            <li>
              <b>Color contrast</b>: Ensure text and images of text have a
              contrast ratio of at least 4.5:1 (or 3:1 for{' '}
              <Annotation
                annotation={
                  <>
                    About <Code>1.5em</Code>+ for regular text, and{' '}
                    <Code>1.2em</Code>+ for bold text, assuming the user
                    configured default font size is used. With the default font
                    size of <Code>16px</Code>, <Code>1.5em</Code> would be{' '}
                    <Code>24px</Code>.
                  </>
                }
              >
                large text
              </Annotation>
              ).
            </li>
            <li>
              <b>Scalable text</b>: Ensure your site or app works well with text
              sizes up to 200%.
            </li>
          </ul>
        )}
        <h4>2. Operable</h4>
        <p>
          Your site or app must be usable, regardless of input method. The key
          requirements include:
        </p>
        {showDetails ? (
          <ul>
            <li>
              <b>2.1.1 Keyboard</b>: All functionality must be operable via a
              keyboard.
            </li>
            <li>
              <b>2.1.2 No Keyboard Trap</b>: Users must be able to navigate away
              from any component using only a keyboard.
            </li>
            <li>
              <b>2.2 Timing Adjustable</b>: Users must be given options to
              adjust time limits for time-sensitive content or interactions, and
              be able to stop, or hide moving, blinking, or scrolling content.
            </li>
            <li>
              <b>2.3.1 Three Flashes or Below Threshold</b>: Content must not
              flash more than three times per second unless it's below the
              general flash and red flash thresholds.
            </li>
            <li>
              <b>2.4.1 Bypass Blocks</b>: Provide a way to skip repeated content
              (e.g., navigation menus).
            </li>
            <li>
              <b>2.4.2 Page Titled</b>: Pages must have clear and descriptive
              titles.
            </li>
            <li>
              <b>2.4.3 Focus Order</b>: Ensure focusable elements have a logical
              navigation order.
            </li>
            <li>
              <b>2.4.4 Link Purpose</b>: Links must clearly describe their
              purpose, even without surrounding context.
            </li>
            <li>
              <b>2.4.5 Multiple Ways</b>: Provide more than one way to locate
              content (e.g., search, navigation menus).
            </li>
            <li>
              <b>2.4.6 Headings and Labels</b>: Use descriptive headings and
              labels to clarify content or functionality.
            </li>
            <li>
              <b>2.4.7 Focus Visible</b>: Ensure a visible focus indicator for
              keyboard navigation.
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <b>Keyboard accessibility</b>: Make sure all functionality works
              well with a keyboard.
            </li>
            <li>
              <b>Visible focus</b>: Include a clear focus indicator for keyboard
              navigation.
            </li>
            <li>
              <b>Avoid flashing content</b>: Limit flashing elements to no more
              than three flashes per second.
            </li>
            <li>
              <b>Logical navigation</b>: Ensure focus order is intuitive and
              links are descriptive.
            </li>
          </ul>
        )}

        <h4>3. Understandable</h4>
        <p>
          Create interfaces and content that are clear and predictable. The key
          requirements include:
        </p>
        {showDetails ? (
          <ul>
            <li>
              <b>3.1 Language of content</b>: Specify the language of the page
              (HTML <Code>lang</Code> attribute) and content that deviates from
              that (e.g., <Code>{`<span lang="fr">`}</Code>).
            </li>
            <li>
              <b>3.2 Change of Context</b>:{' '}
              <Link href="https://www.w3.org/TR/WCAG21/#dfn-change-of-context">
                Changes of context
              </Link>{' '}
              must not occur automatically when the focus or an input is
              changed.
            </li>
            <li>
              <b>3.2.3 Consistent Navigation</b>: Use consistent navigation
              across pages or sections.
            </li>
            <li>
              <b>3.2.4 Consistent Identification</b>: Ensure components that
              share functionality have consistent labels.
            </li>
            <li>
              <b>3.3 Errors</b>: Clearly indicate input errors and provide
              suggestions for correction.
            </li>
            <li>
              <b>3.3.2 Labels or Instructions</b>: Provide clear labels and
              instructions for form fields.
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <b>Language declaration</b>: Specify the page's language using the
              HTML
              <Code>lang</Code> attribute.
            </li>
            <li>
              <b>Consistent navigation</b>: Maintain consistent menus and naming
              (labels) across pages.
            </li>
            <li>
              <b>Error messages</b>: Provide clear error messages and
              suggestions for correction.
            </li>
          </ul>
        )}
        <h4>4. Robust</h4>
        <p>
          Ensure compatibility with a wide range of devices, browsers, and
          assistive technologies. The key requirements include:
        </p>
        {showDetails ? (
          <ul>
            <li>
              <b>4.1.1 Parsing</b>: Ensure HTML is valid and error-free.
            </li>
            <li>
              <b>4.1.2 Name, Role, Value</b>: Use proper ARIA roles and
              attributes to convey the purpose, state, and value of custom
              interface elements.
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <b>Valid HTML</b>: Ensure code is well-structured and error-free.
            </li>
            <li>
              <b>ARIA roles</b>: Use ARIA roles appropriately to convey the
              purpose and state of custom components.
            </li>
          </ul>
        )}
      </div>
      <hr />
      <p>
        For the full list of requirements, see the full{' '}
        <Link href="https://www.w3.org/TR/WCAG21/">WCAG 2.1 Guidelines</Link>.
      </p>
      <h3>Accessibility statement</h3>
      <p>
        The EAA also requires you to publish an <i>accessibility statement</i>.
        This should include:
      </p>
      <ul>
        <li>
          <b>Compliance level</b>: State whether your site or app complies with
          WCAG 2.1 Level AA.
        </li>
        <li>
          <b>Known issues</b>: List any known accessibility issues and how you
          plan to address them.
        </li>
        <li>
          <b>Feedback mechanism</b>: Provide a way for users to report
          accessibility issues or request information in alternative formats.
        </li>
      </ul>
      <p>
        The statement must be easy to find, clear and regularly updated. It
        demonstrates your commitment to accessibility and fosters transparency
        with your users.
      </p>
      <p>
        For an example accessibility statement, see{' '}
        <Link href="https://european-union.europa.eu/accessibility-statement_en">
          the EU accessibility statement
        </Link>
        .
      </p>
      <h3>Disproportionate burden</h3>
      <p>
        The EAA allows organizations to claim a{' '}
        <strong>disproportionate burden exemption</strong> if meeting certain
        requirements is unreasonably difficult or expensive. For instance, a
        small business might delay fixing a component if doing so requires a
        costly overhaul.
      </p>
      <p>
        However, this isn't a free pass. You must justify the exemption in your
        accessibility statement and still take alternative steps to improve
        accessibility. The exemption is based on <strong>good faith</strong>;
        it's not an excuse to ignore accessibility altogether.
      </p>
      <h2>Timeline</h2>
      <p>The EAA outlines the following deadlines:</p>
      <ul>
        <li>
          {' '}
          <strong>June 28, 2025</strong>: All new developments must comply.
        </li>
        <li>
          {' '}
          <strong>June 28, 2027</strong>: Existing services must comply.
        </li>
      </ul>
      <p>
        The first deadline applies to "all new developments". This includes any
        updated component and its immediate context. For example:
      </p>
      <ul>
        <li>
          <b>A small update</b> (e.g. adding a favorites button) requires only
          that the component and related functionality comply.
        </li>
        <li>
          <b>A major update</b> (e.g. redesigning a checkout flow) requires the
          entire section to comply.
        </li>
      </ul>
      <p>
        By 2027, all applicable sites and apps must fully meet accessibility
        standards. These deadlines might seem far off, but they come with
        significant challenges, especially for large existing apps. Starting
        early will give you the time to assess, plan, and tackle accessibility
        issues incrementally.
      </p>
      <p>With this in mind, let's look into what you can do now to prepare.</p>
      <h2>Conclusion</h2>
      <p>
        The EAA introduces many new requirements, and its deadlines are fast
        approaching. Complying with these requirements may take significant time
        and effort, especially for large websites and apps with poor
        accessibility.
      </p>
      <p>Here are a few things to start preparing:</p>
      <ul>
        <li>
          <strong>Educate your dev team</strong>: Share resources like{' '}
          <Link href="/blog/accessibility-essentials-every-front-end-developer-should-know">
            Accessibility essentials every front-end developer should know
          </Link>
          , and the{' '}
          <Link href="https://www.w3.org/TR/WCAG21/">WCAG 2.1 Guidelines</Link>{' '}
          to build awareness.
        </li>
        <li>
          <strong>Perform an accessibility assessment</strong>: Test keyboard
          navigation, check Semantic HTML, evaluate color contrast, ensure
          elements scale with font size, and identify areas for improvement.
        </li>
        <li>
          <strong>Test your app</strong>: Try navigating your app with a screen
          reader to uncover potential barriers and usability challenges.
        </li>
      </ul>
      <p>
        Start early, involve your team, and don't wait until the last minute to
        comply with the EAA. Accessibility isn't just about compliance,{' '}
        <strong>
          accessibility is about making a better and more inclusive experience
          for everyone
        </strong>
        .
      </p>
    </BlogArticle>
  )
}

export default BlogArticleEuropeanAccessibilityAct
