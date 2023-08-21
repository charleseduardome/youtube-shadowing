import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const appId = "58e525f4-c0aa-49e6-aad8-184e0edae9ed";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

export default function Speech() {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    resetTranscript,
  } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser `&lsquo;` support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    return <span>You not acessed the microphone.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button
        onTouchStart={startListening}
        onMouseDown={startListening}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
      >
        Hold to talk
      </button>
      <button
        onTouchStart={resetTranscript}
        onMouseDown={resetTranscript}
        onTouchEnd={resetTranscript}
        onMouseUp={resetTranscript}
      >
        Reset
      </button>

      <p>{transcript}</p>
    </div>
  );
}
