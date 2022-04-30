import { FilledLinkToDocumentField, PrismicDocument } from "@prismicio/types";

export const HOMEPAGE_SLUG = "homepage";
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE;

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

// -- Link resolution rules
// Manages the url links to internal Prismic documents
const prismicLinkResolver = (
  doc:
    | Pick<FilledLinkToDocumentField, "type" | "uid" | "lang">
    | Pick<PrismicDocument, "type" | "uid" | "lang">
) => {
  const slug = slugResolver(doc);

  if (doc.lang === defaultLocale) {
    return slug;
  }

  return `/${doc.lang}${slug}`;
};

export default prismicLinkResolver;
