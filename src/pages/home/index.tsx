import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Options } from "youtube-player/dist/types";

import { api } from "../../lib/axios";
import { Button as TranscriptionBtn } from "../../components/Button";
import { Input as TranscriptionInput } from "../../components/Input";
import { Footer } from "../../components/Footer";
import { VideoPlay } from "../../components/VideoPlay";
import { getDataVideo } from "../../utils/getDataVideo";
import { TranscriptResponse } from "../../typings/globals";

const Speech = dynamic(() => import("../../components/Speech"), { ssr: false });

export default function Home() {
  const [transcriptData, setTranscriptData] = useState<TranscriptResponse[]>(
    []
  );
  const [currentText, setCurrentText] = useState<string>("");
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState<string | undefined>();
  const [videoId, setVideoId] = useState<string | undefined>();
  const [opts, setOpts] = useState<Options>({} as Options);
  const [loading, setLoading] = useState<boolean>(false);

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

  useEffect(() => {
    transcriptData.forEach((transcript) => {
      const timeStart = transcript?.offset;
      const timeEnd = transcript?.offset + transcript?.duration;
      const currentTimeMs = currentTime * 1000;

      if (currentTimeMs >= timeStart && currentTime <= timeEnd) {
        const textCurrent = document.querySelector(
          `.box-transcriptions--${timeStart}`
        ) as HTMLHtmlElement;
        textCurrent.scrollIntoView();

        setCurrentText(transcript.text);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  return (
    <div className="page-container">
      <h1 className="title">Youtube Shadowing</h1>
      {!videoId && (
        <section className="section-search">
          <TranscriptionInput
            id="input-url-video-to-transcription"
            className="field-transcription"
            message={error}
          />
          <TranscriptionBtn
            id="btn-video-to-transcription"
            className={
              loading ? "btn-transcription--disabled" : "btn-transcription"
            }
            title={loading ? "..." : "OK"}
            onClick={() => handleSetCurrentVideo()}
          />
        </section>
      )}
      {videoId && (
        <VideoPlay
          videoId={videoId}
          opts={opts}
          handleOnStateChange={setCurrentTime}
        />
      )}
      {transcriptData.length > 0 && (
        <>
          <Speech appId={process.env.SPEECHLY_APP_ID || ""}/>
          <div className="box-transcriptions">
            <button className="btn-transcriptions-close" onClick={() => handleResetVideo()}>x</button>
            <div className="transcriptions">
              {transcriptData.map((t) => (
                <div key={t.offset} className={`box-transcriptions--${t.offset}`}>
                  <div
                    className={`${
                      currentText === t.text
                        ? "transcription__item--bold"
                        : "transcription__item"
                    }`}
                  >
                    {t.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <Footer className="footer"/>
    </div>
  );
}
