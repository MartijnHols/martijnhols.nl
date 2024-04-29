import fs from 'fs/promises'
import { NextApiRequest, NextApiResponse } from 'next'
import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants'
import path from 'path'
import satori from 'satori'
import sharp from 'sharp'
import { colors } from '../../theme'
import sFProFont from './SF-Pro-Text-Black.otf'

async function SVG(component: JSX.Element) {
  return await satori(component, {
    width: 1200,
    height: 520,
    fonts: [
      {
        name: 'SF-Pro',
        // A quick hack that works ¯\_(ツ)_/¯
        data: await fs.readFile(path.resolve('./.next/server', sFProFont)),
      },
    ],
  })
}

async function PNG(component: JSX.Element) {
  return await sharp(Buffer.from(await SVG(component)))
    .png({
      quality: 100,
    })
    .toBuffer()
}

export default async function Image(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = req.query.apiKey as string
  if (
    (!process.env.INTERNAL_API_KEY ||
      apiKey !== process.env.INTERNAL_API_KEY) &&
    process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD &&
    process.env.NODE_ENV !== 'development'
  ) {
    return res.status(401).send('Unauthorized')
  }

  const title = req.query.title as string

  const png = await PNG(
    <div
      style={{
        background: colors.white,
        color: colors.black,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 10,
          background: colors.black,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 0,
          width: '100%',
          height: 30,
          background: `linear-gradient(
            to bottom right,
            ${colors.black} 49.5%,
            transparent 50.5%
          )`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 70,
          left: 40,
          right: 40,
          margin: 0,
          padding: 0,
          fontSize: 100,
          lineHeight: 1,
          letterSpacing: '-3px',
          transform: 'rotate(-2deg)',
          textTransform: 'uppercase',
          color: colors.black,
          display: 'flex',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {title.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          width: '100%',
          height: 35,
          background: `linear-gradient(
            to bottom right,
            transparent 49.5%,
            ${colors.black} 50.5%
          )`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 10,
          background: colors.black,
        }}
      />
    </div>,
  )

  res.setHeader('Content-Type', 'image/png').send(png)
}
