import getConfig from 'next/config'
import NextLink from 'next/link'
import {
  AnchorHTMLAttributes,
  ComponentProps,
  MouseEvent,
  ReactNode,
} from 'react'

const { publicRuntimeConfig } = getConfig()

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
  const isAbsolute = href.startsWith(process.env.NEXT_PUBLIC_PRIMARY_HOST)
  // Make absolute URLs relative to benefit from preloading, and make the URLs
  // work on any domain.
  // This is necessary because in Prismic we can only enter absolute URLs.
  if (isAbsolute) {
    href = href.substring(process.env.NEXT_PUBLIC_PRIMARY_HOST.length)

    // Automatically detect the locale from absolute URLs as Next otherwise will
    // treat them as a regular page.
    // This is necessary because in Prismic when generating a link we can't
    // select documents from other locales (this only works for the Content
    // Relationship field), so we must use an absolute URL.
    const hrefLocale =
      !locale &&
      Object.values(
        publicRuntimeConfig.prismicLocaleMap as {
          [prismicLocale: string]: string
        },
      ).find(
        (userLocale) =>
          href.startsWith(`/${userLocale}/`) || href === `/${userLocale}`,
      )
    if (hrefLocale) {
      href = href.substring(`/${hrefLocale}`.length)
      locale = hrefLocale
    }

    if (href === '') {
      // If the href only included the primary host (and optionally just a
      // locale), we might have ended up with an empty href that is supposed to
      // link to the homepage.
      href = '/'
    }
  }

  // Prismic does not allow for real hash links and prefixes them with https://
  const hashLink = 'https://#'
  if (href.startsWith(hashLink)) {
    href = href.substring(hashLink.length - 1)
  }
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
