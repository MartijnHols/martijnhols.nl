/* global process, console, Buffer */
import brotli from 'brotli'
import fs from 'fs'
import path from 'path'

const dir = path.resolve(process.cwd(), 'out')

const compress = (buffer) =>
  brotli.compress(buffer, {
    extension: 'br',
    quality: 11,
  })
const size = (buffer) => `${(Buffer.byteLength(buffer) / 1000).toFixed(2)} kB`

fs.readdirSync(dir, {
  recursive: true,
}).forEach((file) => {
  if (
    file.endsWith('.html') ||
    file.endsWith('.js') ||
    file.endsWith('.css') ||
    file.endsWith('.xml')
  ) {
    const inPath = path.resolve(dir, file)
    const outPath = `${inPath}.br`
    const buffer = fs.readFileSync(inPath)
    const result = compress(buffer)
    fs.writeFileSync(outPath, result)
    console.log(`Compressed ${file}: ${size(buffer)} -> ${size(result)}`)
  }
})
