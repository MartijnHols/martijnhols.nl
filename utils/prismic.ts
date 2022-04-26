import {
  getRepositoryName,
  createClient as createPrismicClient,
} from "@prismicio/client";
import { CreateClientConfig, enableAutoPreviews } from "@prismicio/next";

import sm from "../sm.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = getRepositoryName(sm.apiEndpoint);

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
