import {
  BuildQueryURLArgs,
  Client,
  createClient as createPrismicClient,
  Content,
} from '@prismicio/client'
import { CreateClientConfig, enableAutoPreviews } from '@prismicio/next'
import {
  FilledContentRelationshipField,
  PrismicDocument,
  SliceZone as SliceZoneType,
} from '@prismicio/types'
import getConfig from 'next/config'

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
  params?: Partial<BuildQueryURLArgs>,
) => {
  try {
    return await client.getByUID<T>(documentType, uid, {
      lang: locale,
      ...params,
    })
  } catch (err) {
    if ((err as Error).message === 'No documents were returned') {
      return undefined
    }
    throw err
  }
}

export type PrismicPage<WithLayout extends boolean = false> = PrismicDocument<
  Content.PageDocument['data'] & {
    layout: FilledContentRelationshipField<
      'layout',
      string,
      WithLayout extends true
        ? {
            slices: SliceZoneType<
              Content.LayoutDocumentDataSlicesSlice,
              'filled'
            >
          }
        : never
    >
    // This is necessary because the generated types do not include "filled" which is very troublesome to work around
    slices: SliceZoneType<Content.PageDocumentDataSlicesSlice, 'filled'>
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

export type PrismicProject = Content.ProjectDocument

export const getProjects = (client: Client, locale: string) =>
  client.getAllByType<PrismicProject>('project', {
    lang: locale,
  })

export type PrismicArticle = PrismicDocument<
  Content.ArticleDocument['data'] & {
    // This is necessary because the generated types do not include "filled" which is very troublesome to work around
    slices: SliceZoneType<Content.ArticleDocumentDataSlicesSlice, 'filled'>
  },
  'article'
>

export const getArticle = (client: Client, id: string) =>
  client.getByID<PrismicArticle>(id)
