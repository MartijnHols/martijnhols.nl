import BlogArticle from '../../components/BlogArticle'
import { BlogArticleTag } from '../../components/BlogArticleMeta'
import Code from '../../components/Code'
import CodeSnippet from '../../components/CodeSnippet'
import CopyPasteOnly from '../../components/CopyPasteOnly'
import Link from '../../components/Link'
import articleMeta, { ArticleStaticProps } from '../../utils/articleMeta'

const { meta, getStaticProps } = articleMeta({
  slug: 'how-to-add-copy-paste-only-text-in-html-react',
  title: 'How to add copy-paste only text in HTML (plus a React component)',
  description:
    'In this gist I share a code snippet to (statically) insert text that appears when pasting content copied from your site.',
  publishedAt: '2024-12-12',
  tags: [
    BlogArticleTag.HowTo,
    BlogArticleTag.HTML,
    BlogArticleTag.CSS,
    BlogArticleTag.React,
  ],
})
export { meta, getStaticProps }

const GistHowToAddCopyPasteOnlyText = (props: ArticleStaticProps) => (
  <BlogArticle {...props}>
    <p>
      When finalizing an article for this blog, I often copy-paste text into
      tools like Grammarly and ChatGPT for feedback. But these tools often
      struggle with the structure because the copy-pasted text is missing
      context-- like that a certain line is actually a caption for an image, or
      a sentence is separated from the main content in a visually distinct
      block.
    </p>
    <p>
      To work around this, I found myself tweaking the copied text repeatedly.
      This got tedious fast, so I came up with a solution using copy-paste only
      text. Not only does this save me time, but it also improves quoting from
      this site.
    </p>
    <p>
      The gist of copy-paste only text is applying the following piece of CSS to
      an element:
    </p>
    <CodeSnippet language="css">{`
font-size: 0;
line-height: 0;
opacity: 0;
overflow: hidden;
width: 1px;
height: 1px;
padding: 0;
pointer-events: none;
clip: rect(0, 0, 0, 0);
border-width: 0;
`}</CodeSnippet>
    <p>
      This makes the text invisible on the page but ensures it's included when a
      user selects and copies a section.
    </p>
    <p>
      This works great for inline content, but for layout-affecting content like
      a <Code>{`<br />`}</Code>, you need to combine it with the following CSS.
      This will pull the element out of the layout so that it doesn't cause
      issues like unintentional whitespace.
    </p>
    <CodeSnippet language="css">{`
position: absolute;
top: 0;
left: 0;
margin: -1px;
`}</CodeSnippet>
    <p>
      However, these four lines can interfere with text selection. For example,
      triple-clicking a paragraph usually selects the entire paragraph, but with
      copy-paste only text, it now stops at the invisible text, rather than
      selecting the entire paragraph.{' '}
      <CopyPasteOnly>[Copy-paste only text]</CopyPasteOnly> Try it out by
      triple-clicking the text in this paragraph (if you have a mouse).
    </p>
    <p>
      For finishing touches, you can add a <Code>@media print</Code> query to
      hide the element with <Code>display: none</Code>. This ensures copy-paste
      only text doesn't show up in printed versions of the page.
    </p>
    <p>
      Finally, add an <Code>aria-hidden</Code> attribute to be kind to screen
      readers. This keeps the invisible text from being unnecessarily announced,
      improving the experience for those users.
    </p>
    <h2>React</h2>
    <p>
      For this website, I wrote a <Code>CopyPasteOnly</Code> component that
      wraps the text you want to be copy-paste only. This is a React component
      that uses the CSS snippet above. The version at the time of writing this
      article is below, but you can find the latest version{' '}
      <Link href="https://github.com/MartijnHols/martijnhols.nl/blob/main/components/CopyPasteOnly.tsx">
        on GitHub
      </Link>
      .
    </p>
    <CodeSnippet>{`
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'

const Container = styled('span', {
  shouldForwardProp: (prop) => prop !== 'inline',
})<{ inline?: boolean }>(({ inline = false }) => [
  css\`
    font-size: 0;
    line-height: 0;
    opacity: 0;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    pointer-events: none;
    clip: rect(0, 0, 0, 0);
    border-width: 0;

    @media print {
      display: none;
    }
  \`,
  !inline &&
    css\`
      position: absolute;
      top: 0;
      left: 0;
      margin: -1px;
    \`,
])

interface Props {
  children: ReactNode
  inline?: boolean
}

/**
 * Adds invisible text that only appears when copy-pasting.
 * Useful for providing context like captions or asides.
 */
const CopyPasteOnly = ({ children, inline }: Props) => (
  <Container aria-hidden inline={inline}>
    {children}
  </Container>
)

export default CopyPasteOnly
`}</CodeSnippet>
    <p>Here's how you might use this component in practice:</p>
    <CodeSnippet>{`
<figure>
  <CopyPasteOnly>Picture:&nbsp;</CopyPasteOnly>
  <img src="example.jpg" alt="An image that serves as an example and is not actually an image" />
  <figcaption>
    <CopyPasteOnly>Caption:&nbsp;</CopyPasteOnly>
    A description of the example image.
  </figcaption>
</figure>
`}</CodeSnippet>
    <p>
      I use <Code>CopyPasteOnly</Code> extensively across this site—for asides,
      code snippets, and image captions. See it in action by copying the text of
      this article and pasting it somewhere else.
    </p>
    <p>Hope that helps.</p>
  </BlogArticle>
)

export default GistHowToAddCopyPasteOnlyText
