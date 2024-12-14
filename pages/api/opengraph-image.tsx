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
    height: 627,
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

  const textStyle = {
    position: 'absolute',
    top: 115,
    left: 40,
    right: 40,
    margin: 0,
    padding: 0,
    fontSize: 88,
    lineHeight: 1.1,
    letterSpacing: '-3px',
    color: colors.black,
    display: 'flex',
  } as const
  const text = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {title.split('\n').map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  )
  const textStroke = (x: number, y: number) => (
    <div
      // This div is only to act like text-decoration-skip-ink
      style={{
        ...textStyle,
        left: textStyle.left + x,
        top: textStyle.top + y,
        // This can't be transparent or the text-shadow won't appear
        color: 'white',
      }}
    >
      {text}
    </div>
  )

  const jsx = (
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
        // This div is only to create the underline at the required position
        style={{
          ...textStyle,
          top: textStyle.top + 3, // 3 to act as the textUnderlineOffset
          // Transparent so this text is invisible
          color: 'transparent',
          textDecoration: `underline ${colors.yellow}`,
          textUnderlineOffset: 4, // TODO: This is not supported in Satori
        }}
      >
        {text}
      </div>
      {/* 
        This is only to act like text-decoration-skip-ink. text-shadow on text
        doesn't work in sharp, as it only uses the last value.
      */}
      {textStroke(-8, 0)}
      {textStroke(-8, 1)}
      {textStroke(-8, 2)}
      {textStroke(-8, 3)}
      {textStroke(-8, 4)}
      {textStroke(8, 0)}
      {textStroke(8, 1)}
      {textStroke(8, 2)}
      {textStroke(8, 3)}
      {textStroke(8, 4)}
      <div
        style={{
          ...textStyle,
          color: colors.black,
        }}
      >
        {text}

        <div
          style={{
            position: 'absolute',
            top: '100%',
            transform: 'translateY(20px)',
            left: 0,
            right: 0,
            fontSize: 36,
            letterSpacing: '-2px',
          }}
        >
          By Martijn Hols
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
    </div>
  )

  // res.setHeader('Content-Type', 'image/svg+xml').send(await SVG(jsx))
  // return

  const png = await PNG(jsx)

  res.setHeader('Content-Type', 'image/png').send(png)
}
