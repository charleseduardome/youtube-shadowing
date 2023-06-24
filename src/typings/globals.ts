export interface TranscriptConfig {
    lang?: string;
    country?: string;
}

export interface TranscriptResponse {
text: string;
duration: number;
offset: number;
}