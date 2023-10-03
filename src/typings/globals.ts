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
  videoId: string | undefined
  setVideoId: React.Dispatch<React.SetStateAction<string | undefined>>
}