import React, { useState } from "react";

import VideoContext from '../contexts/VideoContext'

interface VideoProviderProps {
  children?: React.ReactNode
}

const VideoProvider = ({ children }: VideoProviderProps) => {
  const [videoId, setVideoId] = useState<string | undefined>();

  return(
    <VideoContext.Provider value={{
      videoId,
      setVideoId
    }}
    >
      { children }
    </VideoContext.Provider>
  )
}

export default VideoProvider