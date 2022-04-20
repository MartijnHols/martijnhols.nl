import NextLink from "next/link";
import { AnchorHTMLAttributes, ComponentProps, ReactNode } from "react";

/**
 * This component simplifies next/link by adding an anchor element always. We
 * *always* want to use an anchor tag for links as that produces semantically
 * correct HTML and is optimal for accessibility.
 *
 * Using a separate component has an added benefit that we could easily add
 * on-click tracking at a later time.
 */

type NextLinkProps = Omit<ComponentProps<typeof NextLink>, "passHref">;
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};
type Props = NextLinkProps & AnchorProps;

const Link = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  ...others
}: Props) => (
  <NextLink
    href={href}
    as={as}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
    prefetch={prefetch}
    locale={locale}
    passHref
  >
    <a {...others}>{children}</a>
  </NextLink>
);

export default Link;
