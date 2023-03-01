import { FilledLinkToDocumentField, PrismicDocument } from '@prismicio/types'

import { toUserLocale } from './locales'

export const HOMEPAGE_SLUG = 'homepage'

const slugResolver = (
  doc:
    | Pick<FilledLinkToDocumentField, 'type' | 'uid' | 'lang'>
    | Pick<PrismicDocument, 'type' | 'uid' | 'lang'>,
) => {
  if (doc.type === 'page' && doc.uid !== HOMEPAGE_SLUG) {
    return `/${doc.uid}`
  }

  return '/'
}

// -- Link resolution rules
// Manages the url links to internal Prismic documents
const prismicLinkResolver = (
  doc:
    | Pick<FilledLinkToDocumentField, 'type' | 'uid' | 'lang'>
    | Pick<PrismicDocument, 'type' | 'uid' | 'lang'>,
) => {
  const slug = slugResolver(doc)

  const userLocale = toUserLocale(doc.lang)

  if (process.env.DEFAULT_LOCALE === userLocale) {
    return slug
  }

  return `/${userLocale}${slug}`
}

export default prismicLinkResolver
