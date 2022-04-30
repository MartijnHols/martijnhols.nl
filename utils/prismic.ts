import { Client, createClient as createPrismicClient } from "@prismicio/client";
import { CreateClientConfig, enableAutoPreviews } from "@prismicio/next";
import { PrismicDocument } from "@prismicio/types";
import getConfig from "next/config";

import sm from "../sm.json";

const { publicRuntimeConfig } = getConfig();

/**
 * The project's Prismic repository name.
 */
export const repositoryName = publicRuntimeConfig.prismicRepositoryName;

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 */
export const createClient = (config: CreateClientConfig = {}) => {
  const client = createPrismicClient(sm.apiEndpoint);

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};

export const getByUid = async <T extends PrismicDocument>(
  client: Client,
  documentType: string,
  uid: string,
  locale: string
) => {
  try {
    return await client.getByUID<T>(documentType, uid, {
      lang: locale,
    });
  } catch (err) {
    if ((err as Error).message === "No documents were returned") {
      return undefined;
    }
    throw err;
  }
};
