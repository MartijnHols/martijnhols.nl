// Source: https://gist.github.com/LewisJEllis/9ad1f35d102de8eee78f6bd081d486ad
function getRelativeTimeStringDays(date: Date, lang = 'en') {
  const timeMs = date.getTime()
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000)
  const cutoffs = [86400 * 7, 86400 * 30, 86400 * 365, Infinity]
  const units: Intl.RelativeTimeFormatUnit[] = ['day', 'week', 'month', 'year']
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds),
  )
  const divisor = cutoffs[unitIndex - 1] ?? 86400

  const rtf = new Intl.RelativeTimeFormat(lang, {
    numeric: 'auto',
  })

  return rtf.format(Math.ceil(deltaSeconds / divisor), units[unitIndex])
}

export default getRelativeTimeStringDays
