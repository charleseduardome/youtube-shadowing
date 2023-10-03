import React from 'react';
import { Options } from "youtube-player/dist/types";

export interface TranscriptConfig {
  lang?: string;
  country?: string;
}

export interface TranscriptResponse {
  text: string;
  duration: number;
  offset: number;
}

export interface IVideoContextData {
  transcriptData: TranscriptResponse[],
  setTranscriptData: React.Dispatch<React.SetStateAction<TranscriptResponse[]>>
  currentText: string,
  setCurrentText: React.Dispatch<React.SetStateAction<string>>
  videoId: string | undefined
  setVideoId: React.Dispatch<React.SetStateAction<string | undefined>>
  currentTime: number
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>
  error: string | undefined
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
  opts: Options
  setOpts: React.Dispatch<React.SetStateAction<Options>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  handleSetCurrentVideo(): void,
  handleResetVideo(): void,
  player: any,
  setPlayer: React.Dispatch<React.SetStateAction<any>>
  currentTimeRef: React.MutableRefObject<ReturnType<typeof setInterval>>
  onPlayHandler(): void
  onPauseHandler(): void
}