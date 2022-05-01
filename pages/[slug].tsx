import { Client } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import {
  ImageField,
  KeyTextField,
  PrismicDocument,
  SliceZone as SliceZoneType,
} from "@prismicio/types";
import { GetStaticProps } from "next";
import getConfig from "next/config";
import Head from "next/head";

import PageWrapper from "../components/PageWrapper";
import { createClient, getByUid } from "../utils/prismic";
import { components } from "../slices";
import { PrismicHeroSlice } from "../slices/HeroSlice";
import { PrismicContentSlice } from "../slices/ContentSlice";
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

export const getPages = async (
  client: Client,
  /**
   * If lang is omitted it only returns the master locale.
   */
  locale: string = "*"
) => {
  return await client.getAllByType<PrismicPage>("page", {
    lang: locale,
  });
};
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

export type PrismicPageSlice = PrismicHeroSlice | PrismicContentSlice;
export type PrismicPage = PrismicDocument<
  {
    headTitle: KeyTextField;
    description: KeyTextField;
    ogImage: ImageField;
    slices: SliceZoneType<PrismicPageSlice, "filled">;
  },
  "page"
>;

export const getCmsPage = (client: Client, slug: string, locale: string) =>
  getByUid<PrismicPage>(client, "page", slug, locale);

const { serverRuntimeConfig } = getConfig();

interface StaticProps {
  config: PrismicConfig["data"];
  page: PrismicPage;
  isPreview?: boolean;
}

export const getStaticProps: GetStaticProps<
  StaticProps,
  { slug: string }
> = async ({ previewData, params, locale, preview }) => {
  const client = createClient({ previewData });
  const prismicLocale = toPrismicLocale(locale!);

  const [config, page] = await Promise.all([
    getPrismicConfig(client, prismicLocale),
    getCmsPage(client, params!.slug, prismicLocale),
  ]);
  if (!config || !page) {
    return {
      notFound: true,
      revalidate: serverRuntimeConfig.pageRevalidateInterval,
    };
  }

  return {
    props: {
      config: config.data,
      page,
      isPreview: preview || false,
    },
    revalidate: serverRuntimeConfig.pageRevalidateInterval,
  };
};

const Home = ({ config, page }: StaticProps) => {
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
      <HrefLangHead page={page} />

      <PrismicConfigProvider value={config}>
        <SliceZone slices={page.data.slices} components={components} />
      </PrismicConfigProvider>
    </PageWrapper>
  );
};

export default Home;
