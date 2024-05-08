import { StaticImageData } from 'next/image'
import { ReactNode } from 'react'

export const enum GistTag {
  // Types:
  Meta = 'meta',
  HowTo = 'how-to',
  Basics = 'basics',
  // Tags:
  React = 'react',
  ReactHookForm = 'react-hook-form',
  Security = 'security',
  Dependencies = 'dependencies',
  MachineTranslation = 'machine-translation',
  Ios = 'ios',
  Safari = 'safari',
  Javascript = 'javascript',
}

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
