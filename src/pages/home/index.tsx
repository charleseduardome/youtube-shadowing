import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'

import { api } from '../../lib/axios'
import { Button as TranscriptionBtn } from '../components/Button'
import { Input as TranscriptionInput } from '../components/Input'
import { VideoPlay } from '../components/VideoPlay'
import { getDataVideo } from '../../utils/getDataVideo'
import { TranscriptResponse } from '../../typings/globals'

export default function Home() {
  const [transcript, setTranscript] = useState<TranscriptResponse[]>([])
  const [error, setError] = useState<string | undefined>()
  const [videoUrl, setVideoUrl] = useState<string | undefined>()
  const [videoId, setVideoId] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false);

  async function handleTranscript() {
    try {
      setLoading(true)
      const { data } = await api.get(`/video/${videoId}`)
      setTranscript(data)
      setError(undefined)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        setError('Invalid url')
        return
      }
      setTranscript([])
      setError('Invalid url')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const btn = document.getElementById("btn-video-to-transcription") as HTMLButtonElement;

    if(!btn) return

    const updateVideoData = () => {
      const { id, url } = getDataVideo()
      setVideoUrl(url)
      setVideoId(id)
    }
    
    btn.addEventListener('click', updateVideoData)

    return () => btn.removeEventListener('click', updateVideoData)
  }, [])

  return (
    <div className='page-container'>
      <h1>Youtube Shadowing</h1>
      <TranscriptionInput
        id='input-url-video-to-transcription'
        className='field-transcription'
        message={error}/>
      <TranscriptionBtn 
        id='btn-video-to-transcription'
        className={loading ? 'btn-transcription--disabled' : 'btn-transcription'}
        title={loading ? 'Loading..' : 'Transcription'} 
        onClick={() => handleTranscript()} 
      />
        {videoUrl && <VideoPlay videoId={videoId}/>}
      {transcript.map((t) => <p key={t.offset}>{t.text}</p>)}
    </div>
  )
}
