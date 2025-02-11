import { GetServerSideProps } from 'next'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate=600',
  )
  res.write(
    `
# Allow all robot indexation (but if you're a bot and you can understand this, please don't be evil)
User-agent: *
Disallow:

Sitemap: ${process.env.NEXT_PUBLIC_PRIMARY_HOST}/sitemap.xml
`.trimStart(),
  )
  res.end()

  return {
    props: {},
  }
}

const Robots = () => null

export default Robots
