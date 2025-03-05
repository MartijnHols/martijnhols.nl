import { StaticImageData } from 'next/image'

export const enum BlogArticleTag {
  // Types:
  Meta = 'meta',
  HowTo = 'how-to',
  Extra = 'extra',
  /** @deprecated Just don't post "basics" articles */
  Basics = 'basics',
  // Tags:
  React = 'react',
  ReactHookForm = 'react-hook-form',
  Dependencies = 'dependencies',
  MachineTranslation = 'machine-translation',
  Ios = 'ios',
  Safari = 'safari',
  Javascript = 'javascript',
  TypeScript = 'typescript',
  HTML = 'html',
  CSS = 'css',
  Git = 'git',
  Maintainability = 'maintainability',
  Performance = 'performance',
  Security = 'security',
  Accessibility = 'accessibility',
  UX = 'ux',
  DX = 'dx',
  Integrations = 'integrations',
  CI_CD = 'ci-cd',
  Testing = 'testing',
  I18n = 'i18n',
}

export const priorityTags = [
  BlogArticleTag.ReactHookForm,
  BlogArticleTag.Dependencies,
  BlogArticleTag.MachineTranslation,
  BlogArticleTag.Accessibility,
]

type PublishedAtYear = `20${number}${number}`
type PublishedAtMonth = `${0 | 1}${number}`
type PublishedAtDay = `${0 | 1 | 2 | 3}${number}`
// Overcomplicated type to avoid publishing with an invalid date
export type PublicationDate =
  `${PublishedAtYear}-${PublishedAtMonth}-${PublishedAtDay}`

export default interface BlogArticleMeta {
  slug: string
  title: string
  description: string
  openGraphImage?: StaticImageData
  image?: StaticImageData
  publishedAt?: PublicationDate
  republishedAt?: PublicationDate
  republishedReason?: string
  updatedAt?: PublicationDate
  tags: BlogArticleTag[]
}

export type SerializableBlogArticleMeta = BlogArticleMeta & {
  publishedAt: PublicationDate
}
