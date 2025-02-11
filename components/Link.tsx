import NextLink from 'next/link'
import {
  AnchorHTMLAttributes,
  ComponentProps,
  MouseEvent,
  ReactNode,
} from 'react'

/**
 * This component simplifies next/link by adding an anchor element always. We
 * *always* want to use an anchor tag for links as that produces semantically
 * correct HTML and is optimal for accessibility.
 *
 * Using a separate component has an added benefit that we could easily add
 * on-click tracking at a later time.
 */

type NextLinkProps = Omit<ComponentProps<typeof NextLink>, 'passHref'>
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
}
type Props = NextLinkProps & AnchorProps

const Link = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  onClick,
  ...others
}: Props) => {
  if (!onClick && href.startsWith('#')) {
    onClick = (e: MouseEvent) => {
      const elem = document.querySelector(href)
      if (!elem) {
        return
      }
      e.preventDefault()
      window.history.pushState({}, '', href)
      // While I generally hate scroll hijacking, for anchor links this provides
      // users with context so they can keep their orientation. This is
      // especially important for #footer links, as it may otherwise not be
      // obvious they need to look at the bottom part of the page after
      // navigating.
      // ps technically it isn't even scroll hijacking
      elem.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  return (
    <NextLink
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      locale={locale}
      passHref
      onClick={onClick}
      {...others}
    >
      {children}
    </NextLink>
  )
}

export default Link
