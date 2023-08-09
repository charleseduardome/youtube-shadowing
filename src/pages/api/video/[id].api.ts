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

  await YoutubeTranscript.fetchTranscript(videoId)
  .then(resp => {
    return res.status(200).json(resp)
  })
  .catch(err => { 
    return res.status(400).send(`${err.message}`);
  })

}
