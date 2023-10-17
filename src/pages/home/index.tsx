import { useEffect } from "react";
import dynamic from "next/dynamic";

import { Button as TranscriptionBtn } from "../../components/Button";
import { Input as TranscriptionInput } from "../../components/Input";
import { Footer } from "../../components/Footer";
import { VideoPlay } from "../../components/VideoPlay";
import { useVideo } from '../../hooks/useVideo';
import { useSpeech } from '../../hooks/useSpeech';

const Speech = dynamic(() => import("../../components/Speech"), { ssr: false });

export default function Home() {
  const {
    transcriptData,
    currentText,
    setCurrentText,
    videoId,
    currentTime,
    setCurrentTime,
    error,
    opts,
    loading,
    handleSetCurrentVideo,
    handleResetVideo,
  } = useVideo()

  const { SpeechRecognition, resetTranscript } = useSpeech();

  function focusURLVideoInput(id: string) {
    const URLVideoInput = document.getElementById(id) as HTMLInputElement;

    if(URLVideoInput) {
      URLVideoInput.focus();
    }
  }

  function resetVideo() {
    SpeechRecognition.stopListening()
    resetTranscript()
    handleResetVideo()
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

  useEffect(() => {
    focusURLVideoInput('input-url-video-to-transcription')
  }, [handleResetVideo])

  return (
    <div className="page-container">
      <h1 className="title">Youtube Shadowing</h1>
      {!videoId && (
        <section className="section-search">
          <TranscriptionInput
            id="input-url-video-to-transcription"
            className="field-transcription"
            message={error}
            dispatch={() => handleSetCurrentVideo()}
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
          <Speech />
          <div className="box-transcriptions">
            <button className="btn-transcriptions-close" onClick={() => resetVideo()}>x</button>
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
