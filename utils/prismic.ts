import { Client, createClient as createPrismicClient } from '@prismicio/client'
import { CreateClientConfig, enableAutoPreviews } from '@prismicio/next'
import {
  BooleanField,
  ImageField,
  KeyTextField,
  LinkField,
  PrismicDocument,
  RichTextField,
  SliceZone as SliceZoneType,
} from '@prismicio/types'
import getConfig from 'next/config'

import { PrismicArticleCodeSnippetSlice } from '../slices/ArticleCodeSnippetSlice'
import { PrismicArticleContentSlice } from '../slices/ArticleContentSlice'
import { PrismicContentSlice } from '../slices/ContentSlice'
import { PrismicFileDownloadSlice } from '../slices/FileDownload'
import { PrismicFooterSlice } from '../slices/FooterSlice'
import { PrismicHeroSlice } from '../slices/HeroSlice'
import { PrismicProjectsSlice } from '../slices/ProjectsSlice'
import sm from '../sm.json'

const { publicRuntimeConfig } = getConfig()

/**
 * The project's Prismic repository name.
 */
export const repositoryName = publicRuntimeConfig.prismicRepositoryName

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 */
export const createClient = (config: CreateClientConfig = {}) => {
  const client = createPrismicClient(sm.apiEndpoint)

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client
}

export const getByUid = async <T extends PrismicDocument>(
  client: Client,
  documentType: string,
  uid: string,
  locale: string,
) => {
  try {
    return await client.getByUID<T>(documentType, uid, {
      lang: locale,
    })
  } catch (err) {
    if ((err as Error).message === 'No documents were returned') {
      return undefined
    }
    throw err
  }
}

export type PrismicPageSlice =
  | PrismicHeroSlice
  | PrismicContentSlice
  | PrismicProjectsSlice
  | PrismicFooterSlice
  | PrismicArticleSlice
  | PrismicFileDownloadSlice
export type PrismicPage = PrismicDocument<
  {
    headTitle: KeyTextField
    description: KeyTextField
    ogImage: ImageField
    slices: SliceZoneType<PrismicPageSlice, 'filled'>
  },
  'page'
>

export const getPages = async (
  client: Client,
  /**
   * If lang is omitted it only returns the master locale.
   */
  locale: string = '*',
) =>
  await client.getAllByType<PrismicPage>('page', {
    lang: locale,
  })
export const getArticles = async (
  client: Client,
  /**
   * If lang is omitted it only returns the master locale.
   */
  locale: string = '*',
) =>
  await client.getAllByType<PrismicArticle>('article', {
    lang: locale,
  })

export type PrismicProject = PrismicDocument<
  {
    thumbnail: ImageField
    name: KeyTextField
    brief: RichTextField
    startedYear: KeyTextField
    endedYear: KeyTextField
    url: LinkField
    sourceCode: LinkField
    tech: KeyTextField
    highlighted: BooleanField
  },
  'project'
>

export const getProjects = (client: Client, locale: string) =>
  client.getAllByType<PrismicProject>('project', {
    lang: locale,
  })

export type PrismicArticleSlice =
  | PrismicArticleContentSlice
  | PrismicArticleCodeSnippetSlice
export type PrismicArticle = PrismicDocument<
  {
    name: KeyTextField
    slices: SliceZoneType<PrismicArticleSlice, 'filled'>
  },
  'article'
>

export const getArticle = (client: Client, id: string) =>
  client.getByID<PrismicArticle>(id)
