import { Client as PrismicClient } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { GetStaticProps, PreviewData } from "next";
import getConfig from "next/config";
import { dehydrate, QueryClient, DehydratedState } from "react-query";

import PageWrapper from "../components/PageWrapper";
import {
  createClient,
  getByUid,
  getPages,
  PrismicPage,
} from "../utils/prismic";
import { components } from "../slices";
import prismicLinkResolver from "../utils/prismicLinkResolver";
import absoluteUrl from "../utils/absoluteUrl";
import {
  getPrismicConfig,
  PrismicConfig,
  PrismicConfigProvider,
} from "../utils/prismicConfig";
import { toPrismicLocale, toUserLocale } from "../utils/locales";
import HrefLangHead from "../components/HrefLangHead";
import stripUndefined from "../utils/stripUndefined";
import prefetchSliceSubQueries from "../utils/prefetchSliceSubQueries";
import convertPrismicImage, { ImageInfo } from "../utils/convertPrismicImage";
import BaseHead from "../components/BaseHead";
import PrismicProvider from "../components/PrismicProvider";

export const getStaticPaths = async () => {
  const client = createClient();
  const pages = await getPages(client);

  return {
    paths: pages.map((page) => ({
      params: { slug: page.uid! },
      locale: toUserLocale(page.lang),
    })),
    fallback: "blocking",
  };
};

const getCmsPage = async (
  prismicClient: PrismicClient,
  slug: string,
  locale: string,
  queryClient: QueryClient
) => {
  const page = await getByUid<PrismicPage>(prismicClient, "page", slug, locale);
  if (!page) {
    return;
  }

  await prefetchSliceSubQueries({
    prismicClient,
    prismicLocale: locale,
    queryClient,
    slices: page.data.slices,
    components,
  });

  return page;
};

const { serverRuntimeConfig } = getConfig();

interface StaticProps {
  config: PrismicConfig["data"];
  page: PrismicPage;
  previewData?: PreviewData;
  dehydratedState: DehydratedState;
}

export const getStaticProps: GetStaticProps<
  StaticProps,
  { slug: string }
> = async ({ previewData, params, locale }) => {
  const prismicClient = createClient({ previewData });
  const prismicLocale = toPrismicLocale(locale!);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  const [config, page] = await Promise.all([
    getPrismicConfig(prismicClient, prismicLocale),
    getCmsPage(prismicClient, params!.slug, prismicLocale, queryClient),
  ]);

  if (!config || !page) {
    return {
      notFound: true,
      revalidate: serverRuntimeConfig.pageRevalidateInterval,
    };
  }

  return {
    props: stripUndefined({
      config: config.data,
      page,
      previewData,
      dehydratedState: dehydrate(queryClient),
    }),
    revalidate: serverRuntimeConfig.pageRevalidateInterval,
  };
};

const Page = ({ config, page, previewData }: StaticProps) => (
  <PageWrapper>
    <BaseHead
      title={page.data.headTitle || "Martijn Hols"}
      description={page.data.description || undefined}
      absoluteUrl={absoluteUrl(prismicLinkResolver(page))}
      image={convertPrismicImage(page.data.ogImage)}
    />
    {/** TODO: Move to sitemap */}
    <HrefLangHead page={page} />

    <PrismicProvider previewData={previewData}>
      <PrismicConfigProvider value={config}>
        <SliceZone slices={page.data.slices} components={components} />
      </PrismicConfigProvider>
    </PrismicProvider>
  </PageWrapper>
);

export default Page;
