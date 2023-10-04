import { useSpeech } from '../../hooks/useSpeech'

export default function Speech() {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    resetTranscript,
    startListening,
    SpeechRecognition,
  } = useSpeech();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser `&lsquo;` support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    return <span>You not acessed the microphone.</span>;
  }

  return (
    <>
      <div className="box-controls">
        <p className="mic-control">MIC: {listening ? "ON" : "OFF"}</p>
        <button
          className={listening ? "btn-stop" : "btn-record"}
          onTouchStart={startListening}
          onMouseDown={startListening}
          onTouchEnd={SpeechRecognition.stopListening}
          onMouseUp={SpeechRecognition.stopListening}
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
