import Head from "next/head";
import { PrismicPage } from "../pages/[slug]";
import prismicLinkResolver from "../utils/prismicLinkResolver";

const defaultHrefLang = "en";
const prismicLocaleToHrefLang = (prismicLocale: string) => {
  switch (prismicLocale) {
    case "en-us":
      return "en";
    case "nl-nl":
      return "nl";
  }
};

const HrefLangHead = ({ page }: { page: PrismicPage }) => (
  <Head>
    {[page, ...page.alternate_languages].map((alternate) => {
      let hrefLang = prismicLocaleToHrefLang(alternate.lang);
      if (hrefLang === defaultHrefLang) {
        hrefLang = "x-default";
      }

      return (
        <link
          // Key is also used by Head to remove duplicates, so this needs to be globally unique
          key={`alternate-${alternate.lang}`}
          rel="alternate"
          hrefLang={hrefLang}
          href={prismicLinkResolver(alternate)}
        />
      );
    })}
  </Head>
);

export default HrefLangHead;
