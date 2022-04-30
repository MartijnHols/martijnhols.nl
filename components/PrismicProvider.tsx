import { PrismicPreview } from "@prismicio/next";
import {
  LinkProps,
  PrismicProvider as OriginalPrismicProvider,
} from "@prismicio/react";
import getConfig from "next/config";
import { ReactNode } from "react";

import prismicLinkResolver from "../utils/prismicLinkResolver";
import Link from "./Link";

const { publicRuntimeConfig } = getConfig();

const PrismicLink = ({ children, ...others }: LinkProps) => (
  <Link {...others}>{children}</Link>
);

interface Props {
  children: ReactNode;
  isPreview?: boolean;
}

const PrismicProvider = ({ children, isPreview }: Props) => (
  <OriginalPrismicProvider
    linkResolver={prismicLinkResolver}
    internalLinkComponent={PrismicLink}
    externalLinkComponent={PrismicLink}
  >
    {isPreview ? (
      // Only load when previewing to avoid loading the Prismic toolbar JS in
      // for all users. This saves us quite a lot of KBs, but breaks Prismic's
      // shareable links feature.
      <PrismicPreview
        repositoryName={publicRuntimeConfig.prismicRepositoryName}
        updatePreviewURL="/api/preview"
        exitPreviewURL="/api/preview-exit"
      >
        {children}
      </PrismicPreview>
    ) : (
      children
    )}
  </OriginalPrismicProvider>
);

export default PrismicProvider;
