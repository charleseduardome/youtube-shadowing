import YouTube, { YouTubeProps } from 'react-youtube';
import { Options } from 'youtube-player/dist/types';

interface IVideoPlayProps {
  videoId: string
  opts: Options
  handleOnStateChange(time: number): void
}

export function VideoPlay({ videoId, opts, handleOnStateChange }: IVideoPlayProps) {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo()
  }

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    let Update;

    if (event.data === YouTube.PlayerState.PLAYING) {
      Update = setInterval(function() {
        handleOnStateChange(Number(event.target.getCurrentTime()))
      }, 500);
    } else {
      clearInterval(Update);
    }
  }

  if(!videoId) return null

  return <YouTube className={"youtubeContainer"} videoId={videoId} opts={opts} onReady={onPlayerReady} onStateChange={onStateChange}/>;
}
