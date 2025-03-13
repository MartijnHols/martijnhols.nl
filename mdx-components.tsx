import type { MDXComponents } from 'mdx/types'
import { isValidElement, ReactNode } from 'react'
import Annotation from './components/Annotation'
import Code from './components/Code'
import CodeSnippet, { PrismLanguages } from './components/CodeSnippet'
import Link from './components/Link'
import Tooltip from './components/Tooltip'

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
const slugifyHeading = (children: ReactNode) => {
  if (typeof children !== 'string') {
    throw new Error('I thought heading children would always be a string')
  }

  return slugify(children)
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // For now, we remove the h1 and leave its rendering to the BlogArticle
    // component
    h1: () => null,
    // TODO: Add hover-anchor links for users to copy
    h2: ({ children }) => <h2 id={slugifyHeading(children)}>{children}</h2>,
    h3: ({ children }) => <h3 id={slugifyHeading(children)}>{children}</h3>,
    h4: ({ children }) => <h4 id={slugifyHeading(children)}>{children}</h4>,
    a: ({ children, href, title, ...props }) => {
      if (href === '/tooltip') {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return <Annotation annotation={title!}>{children}</Annotation>
      }
      if (title) {
        return (
          <Tooltip content={title}>
            {({
              props: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                role,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                tabIndex,
                ...tooltipProps
              },
            }) => (
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              <Link href={href!} {...tooltipProps} {...props}>
                {children}
              </Link>
            )}
          </Tooltip>
        )
      }

      return (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <Link href={href!} {...props}>
          {children}
        </Link>
      )
    },
    pre: ({ children }) => {
      if (
        isValidElement<{ className?: string; children: string }>(children) &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        (children.type as Function).name === 'code' &&
        children.props.children
      ) {
        const language = children.props.className?.replace(
          /language-/,
          '',
        ) as PrismLanguages
        return (
          <CodeSnippet language={language}>
            {children.props.children}
          </CodeSnippet>
        )
      }

      return <pre>{children}</pre>
    },
    code: ({ children }) => <Code>{children}</Code>,
    ...components,
  }
}
