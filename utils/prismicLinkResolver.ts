import { FilledLinkToDocumentField, PrismicDocument } from "@prismicio/types";
import getConfig from "next/config";
import { toPrismicLocale, toUserLocale } from "./locales";

export const HOMEPAGE_SLUG = "homepage";

const slugResolver = (
  doc:
    | Pick<FilledLinkToDocumentField, "type" | "uid" | "lang">
    | Pick<PrismicDocument, "type" | "uid" | "lang">
) => {
  if (doc.type === "page" && doc.uid !== HOMEPAGE_SLUG) {
    return `/${doc.uid}`;
  }

  return "/";
};

const { publicRuntimeConfig } = getConfig();

// -- Link resolution rules
// Manages the url links to internal Prismic documents
const prismicLinkResolver = (
  doc:
    | Pick<FilledLinkToDocumentField, "type" | "uid" | "lang">
    | Pick<PrismicDocument, "type" | "uid" | "lang">
) => {
  const slug = slugResolver(doc);

  const userLocale = toUserLocale(doc.lang);

  if (publicRuntimeConfig.defaultUserLocale === userLocale) {
    return slug;
  }

  return `/${userLocale}${slug}`;
};

export default prismicLinkResolver;
