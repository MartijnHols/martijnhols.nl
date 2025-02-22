import { useEffect } from 'react'

/**
 * Client-side, this fixes the `lang` attribute on the <html /> element when
 * navigating around the site. This is necessary because the lang in
 * _document.tsx is only used for the initial load (and SSG).
 *
 * Source: https://github.com/vercel/next.js/issues/30828#issuecomment-997750399
 */
const useForceHtmlLangAttribute = (desiredLang: string | undefined) => {
  useEffect(() => {
    if (!desiredLang) {
      return
    }

    document.documentElement.lang = desiredLang

    const langObserver = new MutationObserver(() => {
      if (document.documentElement.lang !== desiredLang) {
        document.documentElement.lang = desiredLang
      }
    })
    langObserver.observe(document.documentElement, {
      attributeFilter: ['lang'],
    })

    return () => {
      langObserver.disconnect()
    }
  }, [desiredLang])
}

export default useForceHtmlLangAttribute
