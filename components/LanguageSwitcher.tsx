import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import { colors } from '../theme'
import { usePrismicConfig } from '../utils/prismicConfig'
import Link from './Link'

const LanguageToggle = styled.div`
  position: relative;
  z-index: 1;
  color: ${colors.yellow};
  // Fallbacks
  padding: 6px 7px 0 8px;
  font-size: 14px;
  // Resize at the same rate as Angle so it fits perfectly
  padding: calc(5px + 100vw / 2000 * 6) 7px 0 calc(7px + 100vw / 2000 * 7);
  font-size: calc(10px + 100vw / 2000 * 12);
  font-weight: 500;
  transform: rotate(-1.15deg);
  transform-origin: left;
`

const LanguageSwitcher = () => {
  const { locale } = useRouter()
  const config = usePrismicConfig()

  const alternativeLocale = locale === 'nl' ? 'en' : 'nl'
  const handleSwitchLanguage = () => {
    document.cookie = `NEXT_LOCALE=${alternativeLocale}; max-age=31536000; path=/`
  }

  return (
    <LanguageToggle>
      <Link href="/" locale={alternativeLocale} onClick={handleSwitchLanguage}>
        {config?.languageToggle}
      </Link>
    </LanguageToggle>
  )
}

export default LanguageSwitcher
