import { PrismicRichText as OriginalPrismicRichText } from "@prismicio/react";
import { ComponentProps } from "react";

import { fragmentSerializer } from "./PrismicRichText";

/**
 * Renders a PrismicTitleField. Removes the wrapper heading tag so we can
 * fully control rendering ourselves.
 */
const PrismicTitle = ({
  ...others
}: ComponentProps<typeof OriginalPrismicRichText>) => (
  <OriginalPrismicRichText
    components={{
      heading1: fragmentSerializer,
      heading2: fragmentSerializer,
      heading3: fragmentSerializer,
      heading4: fragmentSerializer,
      heading5: fragmentSerializer,
      heading6: fragmentSerializer,
    }}
    {...others}
  />
);

export default PrismicTitle;
