import { FilledLinkToDocumentField, PrismicDocument } from "@prismicio/types";

export const HOMEPAGE_SLUG = "homepage";

// -- Link resolution rules
// Manages the url links to internal Prismic documents
const prismicLinkResolver = (
  doc:
    | Pick<FilledLinkToDocumentField, "type" | "uid" | "lang">
    | Pick<PrismicDocument, "type" | "uid" | "lang">
) => {
  // TODO: Incorporate `lang`

  if (doc.type === "page" && doc.uid !== HOMEPAGE_SLUG) {
    return `/${doc.uid}`;
  }

  return "/";
};

export default prismicLinkResolver;
