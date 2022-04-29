import {
  LinkProps,
  PrismicProvider as OriginalPrismicProvider,
} from "@prismicio/react";
import { ReactNode } from "react";

import prismicLinkResolver from "../utils/prismicLinkResolver";
import Link from "./Link";

const PrismicLink = ({ children, ...others }: LinkProps) => (
  <Link {...others}>{children}</Link>
);

interface Props {
  children: ReactNode;
}

const PrismicProvider = ({ children }: Props) => (
  <OriginalPrismicProvider
    linkResolver={prismicLinkResolver}
    internalLinkComponent={PrismicLink}
    externalLinkComponent={PrismicLink}
  >
    {children}
  </OriginalPrismicProvider>
);

export default PrismicProvider;
