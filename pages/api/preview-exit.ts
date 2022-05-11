import { exitPreview } from '@prismicio/next'
import { NextApiRequest, NextApiResponse } from 'next'

const previewExit = async (req: NextApiRequest, res: NextApiResponse) => {
  await exitPreview({ res, req })
}

export default previewExit
