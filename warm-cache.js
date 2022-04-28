/**
 * @param {puppeteer.Browser} browser
 * @param {{url: string, options: LHCI.CollectCommand.Options}} context
 */
module.exports = async (browser, context) => {
  const page = await browser.newPage()
  const isDesktop = context.options.settings?.preset === 'desktop'
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
  await page.goto(context.url)
  await page.close()
  console.log(`Warmed cache (${isDesktop ? 'desktop' : 'mobile'})`)
}
