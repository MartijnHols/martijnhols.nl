import { useRouter } from 'next/router'
import { usePrismicConfig } from '../utils/prismicConfig'
import Link from './Link'

const LanguageSwitcher = () => {
  const { locale } = useRouter()
  const config = usePrismicConfig()

  const alternativeLocale = locale === 'nl' ? 'en' : 'nl'
  const handleSwitchLanguage = () => {
    document.cookie = `NEXT_LOCALE=${alternativeLocale}; max-age=31536000; path=/`
  }

  return (
    <Link href="/" locale={alternativeLocale} onClick={handleSwitchLanguage}>
      {config?.languageToggle}
    </Link>
  )
}

export default LanguageSwitcher
