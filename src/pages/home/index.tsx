import { useState } from 'react'
import { AxiosError } from 'axios'
import { api } from '../../lib/axios'
import { Button as TranscriptionBtn } from '../components/Button'
import { Input as TranscriptionInput } from '../components/Input'
import { TranscriptResponse } from '../../typings/globals'

export default function Home() {
  const [transcript, setTranscript] = useState<TranscriptResponse[]>([])
  const [error, setError] = useState<string | undefined>()

  const getIdVideoUrl = (): string => {
    const url = document.getElementById("input-url-video-to-transcription") as HTMLInputElement;
    const id = url.value.split('watch?v=')[1];

    return id
  }

  async function handleTranscript() {
    try {
      const id = getIdVideoUrl()
      const res = await api.get(`/video/${id}`)
      setTranscript(res.data)
      setError(undefined)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        setError('Invalid url')
        return
      }
      setTranscript([])
      setError('Invalid url')
    }
  }

  return (
    <>
      <h1>Youtube Shadowing</h1>
      <TranscriptionInput
        id='input-url-video-to-transcription'
        className='input-transcription'
        message={error}/>
      <TranscriptionBtn title='Transcription' onClick={() => handleTranscript()} />
      {transcript.map((t) => <p key={t.offset}>{t.text}</p>)}
    </>
  )
}
