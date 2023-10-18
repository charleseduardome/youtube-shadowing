import { useSpeech } from '../../hooks/useSpeech'
import { useVideo } from '../../hooks/useVideo'

export default function Speech() {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    resetTranscript,
    startListening,
    stopListening,
  } = useSpeech();

  const { onPauseHandler } = useVideo()

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&lsquo;t support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    return <span>You not acessed the microphone.</span>;
  }

  function handleStartListening() {
    onPauseHandler()
    startListening()
  }

  function handleStopListening() {
    stopListening()
  }

  return (
    <>
      <div className="box-controls">
        <p className="mic-control">MIC: {listening ? "ON" : "OFF"}</p>
        <button
          className={listening ? "btn-stop" : "btn-record"}
          onTouchStart={handleStartListening}
          onMouseDown={handleStartListening}
          onTouchEnd={handleStopListening}
          onMouseUp={handleStopListening}
        >
          {listening ? "STOP" : "RECORD"}
        </button>
        <button
        className="btn-reset"
          onTouchStart={resetTranscript}
          onMouseDown={resetTranscript}
          onTouchEnd={resetTranscript}
          onMouseUp={resetTranscript}
        >
          RESET
        </button>

      </div>
      <div className="box-current-transcript">
        <strong>{transcript}</strong>
      </div>
    </>
  );
}
