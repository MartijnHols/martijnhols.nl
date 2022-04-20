import {
  Client,
  createClient as prismicCreateClient,
  ClientConfig,
  getRepositoryEndpoint,
} from "@prismicio/client";
import {
  ImageField,
  KeyTextField,
  PrismicDocument,
  RichTextField,
  Slice,
  SliceZone,
  TitleField,
} from "@prismicio/types";
import { GetStaticProps } from "next";
import getConfig from "next/config";
import Head from "next/head";

import PageWrapper from "../components/PageWrapper";
import PrismicSliceZone from "../components/PrismicSliceZone";
import prismicComponents from "../slices/prismic";
import { repoName, accessToken } from "../utils/prismicServerConfiguration";

type TodoSlice = Slice<
  "todo",
  {
    title: TitleField;
    content: RichTextField;
    image: ImageField;
    // TODO
  }
>;

export type PrismicPageSlice = TodoSlice /* | OtherSlice */;
export type PrismicPage = PrismicDocument<
  {
    head_title: KeyTextField;
    opengraph_title: KeyTextField;
    opengraph_image: ImageField;
    meta_description: KeyTextField;
    opengraph_description: KeyTextField;
    opengraph_type: KeyTextField;
    body: SliceZone<PrismicPageSlice, "filled">;
  },
  "page"
>;

interface StaticProps {
  page: PrismicPage;
}

const { serverRuntimeConfig } = getConfig();

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
export const getCmsPage = (client: Client, slug: string, locale: string) =>
  getByUid<PrismicPage>(client, "page", slug, locale);
export const createClient = (config?: ClientConfig) => {
  const endpoint = getRepositoryEndpoint(repoName);
  const client = prismicCreateClient(endpoint, {
    accessToken,
    ...config,
  });

  // TODO: Previews

  return client;
};
export const getStaticProps: GetStaticProps<
  StaticProps,
  { slug: string }
> = async (ctx) => {
  const client = createClient();
  const page = await getCmsPage(
    client,
    /*ctx.params!.slug*/ "homepage",
    ctx.locale!
  );

  if (!page) {
    return {
      notFound: true,
      revalidate: serverRuntimeConfig.pageRevalidateInterval,
    };
  }

  return {
    props: {
      page,
    },
    revalidate: serverRuntimeConfig.pageRevalidateInterval,
  };
};

const Home = ({ page }: StaticProps) => (
  <PageWrapper>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <PrismicSliceZone components={prismicComponents} slices={page.data?.body} />
  </PageWrapper>
);

export default Home;
