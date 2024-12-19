import { useRouter } from 'next/router'
import Link from './Link'

const LanguageSwitcher = () => {
  const { locale } = useRouter()

  const alternativeLocale = locale === 'nl' ? 'en' : 'nl'
  const handleSwitchLanguage = () => {
    document.cookie = `NEXT_LOCALE=${alternativeLocale}; max-age=31536000; path=/`
  }

  return (
    <Link href="/" locale={alternativeLocale} onClick={handleSwitchLanguage}>
      {alternativeLocale === 'en' ? 'English' : 'Nederlands'}
    </Link>
  )
}

export default LanguageSwitcher
