'use client'

import { usePathname } from 'next/navigation'
import useForceHtmlLangAttribute from '../utils/useForceHtmlLangAttribute'

const ForceHtmlLangAttribute = () => {
  const pathname = usePathname()
  useForceHtmlLangAttribute(
    pathname ? (pathname.startsWith('/blog') ? 'en' : 'nl') : undefined,
  )

  return null
}

export default ForceHtmlLangAttribute
