import React, { useState, useRef } from "react";
import { Options } from "youtube-player/dist/types";

import VideoContext from '../contexts/VideoContext'
import { api } from "../lib/axios";
import { getDataVideo } from "../utils/getDataVideo";
import { TranscriptResponse } from "../typings/globals";

interface VideoProviderProps {
  children?: React.ReactNode
}

const VideoProvider = ({ children }: VideoProviderProps) => {
  const [transcriptData, setTranscriptData] = useState<TranscriptResponse[]>(
    []
  );
  const [currentText, setCurrentText] = useState<string>("");
  const [videoId, setVideoId] = useState<string | undefined>();
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState<string | undefined>();
  const [opts, setOpts] = useState<Options>({} as Options);
  const [loading, setLoading] = useState<boolean>(false);
  const [player, setPlayer] = useState<any>();
  const currentTimeRef = useRef<ReturnType<typeof setInterval>>( {} as ReturnType<typeof setInterval>);

  async function getTranscriptData(videoId: string) {
    try {
      setLoading(true);
      const { data } = await api.get(`/video/${videoId}`);
      setTranscriptData(data);
      setError(undefined);
    } catch (err: any) {
      setError(`${err?.response?.data}`);
      setTranscriptData([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSetCurrentVideo() {
    const { id } = getDataVideo();

    setVideoId(id);
    setOpts({
      playerVars: {
        autoplay: 0,
        start: 0,
        rel: 0,
      },
    });

    await getTranscriptData(id);
  }

  function handleResetVideo() {
    setTranscriptData([])
    setCurrentText("")
    setCurrentTime(0)
    setError(undefined)
    setVideoId(undefined)
    setLoading(false)
  }

  const onPlayHandler = () => {
    player.playVideo();
  };

  const onPauseHandler = () => {
    player.pauseVideo();
  };

  return(
    <VideoContext.Provider value={{
      transcriptData,
      setTranscriptData,
      currentText,
      setCurrentText,
      videoId,
      setVideoId,
      currentTime,
      setCurrentTime,
      error,
      setError,
      opts,
      setOpts,
      loading,
      setLoading,
      handleSetCurrentVideo,
      handleResetVideo,
      player,
      setPlayer,
      currentTimeRef,
      onPlayHandler,
      onPauseHandler
    }}
    >
      { children }
    </VideoContext.Provider>
  )
}

export default VideoProvider