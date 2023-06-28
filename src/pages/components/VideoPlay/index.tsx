import YouTube, { YouTubeProps } from 'react-youtube';

interface IVideoPlayProps {
  videoId: string | undefined
}

export function VideoPlay({ videoId }: IVideoPlayProps) {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    playerVars: {
      autoplay: 0,
      rel: 0
    },
  };

  if(!videoId) return null

  return <YouTube className={"youtubeContainer"} videoId={videoId} opts={opts} onReady={onPlayerReady} />;
}