/* eslint-env node */
/**
 * @param {puppeteer.Browser} browser
 * @param {{url: string, options: LHCI.CollectCommand.Options}} context
 */
module.exports = async (browser, context) => {
  const isDesktop = context.options.settings?.preset === 'desktop'

  console.log(`Warming cache (${isDesktop ? 'desktop' : 'mobile'})...`)

  const page = await browser.newPage()
  await page.setViewport(
    isDesktop
      ? {
          width: 1440,
          height: 900,
          deviceScaleFactor: 1,
        }
      : {
          width: 360,
          height: 640,
          deviceScaleFactor: 1,
        },
  )
  await page.goto(context.url, {
    timeout: 90000,
  })
  await page.close()

  console.log(`Cache is warm! 🌞`)
}
