import YouTube, { YouTubeProps } from 'react-youtube';
import { Options } from 'youtube-player/dist/types';

import { useVideo } from '../../hooks/useVideo'
import { useSpeech } from '../../hooks/useSpeech'

interface IVideoPlayProps {
  videoId: string
  opts: Options
  handleOnStateChange(time: number): void
}

export function VideoPlay({ videoId, opts, handleOnStateChange }: IVideoPlayProps) {
  const { 
    setPlayer,
    currentTimeRef,
  } = useVideo()

  const { stopListening } = useSpeech();

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    setPlayer(event.target)
    event.target.pauseVideo()
  }

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      stopListening()

      currentTimeRef.current = setInterval(function() {
        handleOnStateChange(Number(event.target.getCurrentTime()))
      }, 500);
    } else {
      clearInterval(currentTimeRef.current);
    }
  }

  if(!videoId) return null

  return (
  <>
    <YouTube 
      className={"youtubeContainer"} 
      videoId={videoId} 
      opts={opts} 
      onReady={onPlayerReady} 
      onStateChange={onStateChange}
    />
  </>
  )
}
