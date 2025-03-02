import type { MDXComponents } from 'mdx/types'
import { ReactNode } from 'react'
import Code from './components/Code'

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
    code: ({ children }) => <Code>{children}</Code>,
    // TODO: code snippet
    ...components,
  }
}
