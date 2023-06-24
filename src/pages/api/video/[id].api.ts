import type { NextApiRequest, NextApiResponse } from 'next'
import { YoutubeTranscript } from '../../../lib/transcript'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

    if (req.method !== 'GET') {
        return res.status(405).end()
    }

  const videoId = req.query.id as string

  const data = await YoutubeTranscript.fetchTranscript(videoId)

  return res.status(200).json(data)
}
