import { StaticImageData } from 'next/image'
import { ReactNode } from 'react'

export const enum GistTag {
  // Types:
  Meta = 'meta',
  HowTo = 'how-to',
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
  HTML = 'html',
  CSS = 'css',
  Git = 'git',
  Stability = 'stability',
  Maintainability = 'maintainability',
  // Standardisation = 'standardisation', use maintainability instead
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
  GistTag.ReactHookForm,
  GistTag.Dependencies,
  GistTag.MachineTranslation,
]

type PublishedAtYear = `20${number}${number}`
type PublishedAtMonth = `${0 | 1}${number}`
type PublishedAtDay = `${0 | 1 | 2 | 3}${number}`
// Overcomplicated type to avoid publishing with an invalid date
export type PublicationDate =
  `${PublishedAtYear}-${PublishedAtMonth}-${PublishedAtDay}`

export default interface GistMeta {
  slug: string
  title: string
  /** An optional alternative rendering of the title-string. */
  titleReact?: ReactNode
  description: string
  image?: StaticImageData
  publishedAt?: PublicationDate
  updatedAt?: PublicationDate
  tags: GistTag[]
  relatedGist?: Promise<{ meta: GistMeta }>
}

export type SerializableGistMeta = Omit<GistMeta, 'titleReact'> & {
  publishedAt: PublicationDate
}
