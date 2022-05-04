import { GetStaticProps } from "next";

import { HOMEPAGE_SLUG } from "../utils/prismicLinkResolver";
import Page, { getStaticProps as slugGetStaticProps } from "./[slug]";

export const getStaticProps: GetStaticProps = async (props) =>
  slugGetStaticProps({
    ...props,
    params: {
      slug: HOMEPAGE_SLUG,
    },
  });

export default Page;
