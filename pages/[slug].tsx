import { Client as PrismicClient } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { GetStaticProps, PreviewData } from "next";
import getConfig from "next/config";
import Head from "next/head";
import { dehydrate, QueryClient, DehydratedState } from "react-query";

import PageWrapper from "../components/PageWrapper";
import {
  createClient,
  getByUid,
  getPages,
  PrismicPage,
} from "../utils/prismic";
import { components } from "../slices";
import { colors } from "../theme";
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
import { PreviewDataContextProvider } from "../utils/previewData";

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

const Page = ({ config, page, previewData }: StaticProps) => {
  const title = page.data.headTitle || "Martijn Hols";

  return (
    <PageWrapper>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        {page.data.description && (
          <meta name="description" content={page.data.description} />
        )}
        <meta name="theme-color" content={colors.complementary} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        {page.data.description && (
          <meta property="og:description" content={page.data.description} />
        )}
        <meta
          property="og:url"
          content={absoluteUrl(prismicLinkResolver(page))}
        />
        {page.data.ogImage.url && (
          <meta
            property="og:image"
            // itemProp is required for WhatsApp: https://stackoverflow.com/a/45890205/684353
            itemProp="image"
            content={page.data.ogImage.url}
          />
        )}
        {page.data.ogImage.alt && (
          <meta property="og:image:alt" content={page.data.ogImage.alt} />
        )}
      </Head>
      {/** TODO: Move to sitemap */}
      <HrefLangHead page={page} />

      <PrismicConfigProvider value={config}>
        <PreviewDataContextProvider value={previewData}>
          <SliceZone slices={page.data.slices} components={components} />
        </PreviewDataContextProvider>
      </PrismicConfigProvider>
    </PageWrapper>
  );
};

export default Page;
