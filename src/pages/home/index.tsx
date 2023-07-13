import { useState } from 'react'
import { AxiosError } from 'axios'
import { Options } from 'youtube-player/dist/types';

import { api } from '../../lib/axios'
import { Button as TranscriptionBtn } from '../components/Button'
import { Input as TranscriptionInput } from '../components/Input'
import { VideoPlay } from '../components/VideoPlay'
import { getDataVideo } from '../../utils/getDataVideo'
import { TranscriptResponse } from '../../typings/globals'

export default function Home() {
  const [transcriptData, setTranscriptData] = useState<TranscriptResponse[]>([])
  const [error, setError] = useState<string | undefined>()
  const [videoUrl, setVideoUrl] = useState<string | undefined>()
  const [videoId, setVideoId] = useState<string | undefined>()
  const [opts, setOpts] = useState<Options>({} as Options);
  const [loading, setLoading] = useState<boolean>(false);

  async function getTranscriptData(videoId: string) {
    try {
      setLoading(true)
      const { data } = await api.get(`/video/${videoId}`)
      setTranscriptData(data)
      setError(undefined)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        setError('Invalid url')
        return
      }
      setTranscriptData([])
      setError('Invalid url')
    } finally {
      setLoading(false);
    }
  }

  async function handleSetCurrentVideo() {
    const { id, url } = getDataVideo()

    setVideoUrl(url)
    setVideoId(id)
    setOpts({
      playerVars: {
        autoplay: 0,
        start: 0
      },
    });

    await getTranscriptData(id)
  }

  return (
    <div className='page-container'>
      <h1>Youtube Shadowing</h1>
      <TranscriptionInput
        id='input-url-video-to-transcription'
        className='field-transcription'
        message={error}
      />
      <TranscriptionBtn 
        id='btn-video-to-transcription'
        className={loading ? 'btn-transcription--disabled' : 'btn-transcription'}
        title={loading ? 'Loading...' : 'Transcription'} 
        onClick={() => handleSetCurrentVideo()} 
      />
      {videoId && <VideoPlay videoId={videoId} opts={opts}/>}
      {/* TODO Scroll automatic */}
      <div className='box-transcriptions'>
        {transcriptData.map((t) => (
          <div
            className='transcription-item'
            key={t.offset}
            onClick={() => {
              setOpts({
                playerVars: {
                  autoplay: 1,
                  start: t.offset / 1000,
                },
              });
            }}
        >
            <div>{t.text}</div>
        </div>
        ))}
      </div>
    
    </div>
  )
}
