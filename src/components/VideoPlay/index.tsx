import { useRef } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube';
import { Options } from 'youtube-player/dist/types';

interface IVideoPlayProps {
  videoId: string
  opts: Options
  handleOnStateChange(time: number): void
}

export function VideoPlay({ videoId, opts, handleOnStateChange }: IVideoPlayProps) {
  const currentTimeRef = useRef<ReturnType<typeof setInterval>>();

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo()
  }

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      currentTimeRef.current = setInterval(function() {
        handleOnStateChange(Number(event.target.getCurrentTime()))
      }, 500);
    } else {
      clearInterval(currentTimeRef.current);
    }
  }

  if(!videoId) return null

  return <YouTube className={"youtubeContainer"} videoId={videoId} opts={opts} onReady={onPlayerReady} onStateChange={onStateChange}/>;
}
