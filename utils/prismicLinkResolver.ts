import {
  FilledContentRelationshipField,
  PrismicDocument,
} from '@prismicio/client'
import { toUserLocale } from './locales'

export const HOMEPAGE_SLUG = 'homepage'

export const slugResolver = (
  doc:
    | Pick<FilledContentRelationshipField, 'type' | 'uid' | 'lang'>
    | Pick<PrismicDocument, 'type' | 'uid' | 'lang'>,
) => {
  if (doc.type === 'page' && doc.uid !== HOMEPAGE_SLUG) {
    return `/${doc.uid}`
  }
  if (doc.type === 'article' && doc.uid !== HOMEPAGE_SLUG) {
    return `/articles/${doc.uid}`
  }

  return '/'
}

// -- Link resolution rules
// Manages the url links to internal Prismic documents
const prismicLinkResolver = (
  doc:
    | Pick<FilledContentRelationshipField, 'type' | 'uid' | 'lang'>
    | Pick<PrismicDocument, 'type' | 'uid' | 'lang'>,
) => {
  const slug = slugResolver(doc)

  const userLocale = toUserLocale(doc.lang)

  if (process.env.NEXT_PUBLIC_DEFAULT_LOCALE === userLocale) {
    return slug
  }

  return `/${userLocale}${slug}`
}

export default prismicLinkResolver
