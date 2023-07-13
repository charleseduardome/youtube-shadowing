import YouTube, { YouTubeProps } from 'react-youtube';
import { Options } from 'youtube-player/dist/types';

interface IVideoPlayProps {
  videoId: string
  opts: Options
}

export function VideoPlay({ videoId, opts }: IVideoPlayProps) {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  }

  if(!videoId) return null

  return <YouTube className={"youtubeContainer"} videoId={videoId} opts={opts} onReady={onPlayerReady} />;
}