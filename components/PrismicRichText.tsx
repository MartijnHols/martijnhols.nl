import { RichTextMapSerializerFunction } from "@prismicio/richtext";
import { PrismicRichText as OriginalPrismicRichText } from "@prismicio/react";
import { ComponentProps, Fragment, ReactElement } from "react";

interface Props extends ComponentProps<typeof OriginalPrismicRichText> {
  multiline?: boolean;
}

export const fragmentSerializer: RichTextMapSerializerFunction<
  ReactElement
> = ({ children, key }) => <Fragment key={key}>{children}</Fragment>;

/**
 * Renders PrismicRichText. Removes the wrapper from a non-multiline
 * PrismicRichText so we can control rendering ourselves.
 */
const PrismicRichText = ({
  multiline = false,
  components,
  ...others
}: Props) => (
  <OriginalPrismicRichText
    components={
      !multiline
        ? {
            paragraph: fragmentSerializer,
            ...components,
          }
        : components
    }
    {...others}
  />
);

export default PrismicRichText;
