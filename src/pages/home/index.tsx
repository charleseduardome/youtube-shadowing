import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { Options } from 'youtube-player/dist/types';

import { api } from '../../lib/axios'
import { Button as TranscriptionBtn } from '../../components/Button'
import { Input as TranscriptionInput } from '../../components/Input'
import { VideoPlay } from '../../components/VideoPlay'
import { getDataVideo } from '../../utils/getDataVideo'
import { TranscriptResponse } from '../../typings/globals'

export default function Home() {
  const [transcriptData, setTranscriptData] = useState<TranscriptResponse[]>([])
  const [currentText, setCurrentText] = useState<string>('')
  const [currentTime, setCurrentTime] = useState(0) 
  const [error, setError] = useState<string | undefined>()
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
    const { id } = getDataVideo()

    setVideoId(id)
    setOpts({
      playerVars: {
        autoplay: 0,
        start: 0,
        rel: 0
      },
    });

    await getTranscriptData(id)
  }

  useEffect(() => {
    transcriptData.forEach((transcript) => {
      const timeStart = transcript?.offset;
      const timeEnd = transcript?.offset + transcript?.duration
      const currentTimeMs = currentTime * 1000

      
      if(currentTimeMs >= timeStart && currentTime <= timeEnd ) {
        const textCurrent = document.querySelector(`.box-transcriptions--${timeStart}`) as HTMLHtmlElement
        textCurrent.scrollIntoView({behavior: "smooth", inline: "center"})

        setCurrentText(transcript.text)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime])

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
      {videoId && <VideoPlay videoId={videoId} opts={opts} handleOnStateChange={setCurrentTime}/>}
      {transcriptData.length > 0 && (
        <div className='box-transcriptions'>
          {transcriptData.map((t) => (
            <div
              key={t.offset}
              className={`box-transcriptions--${t.offset}`}
            >
              <div className={`${currentText === t.text ? 'transcription__item--bold' : 'transcription__item'}`}>
                {t.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}