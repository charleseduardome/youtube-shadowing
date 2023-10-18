import React from "react";

import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

import SpeechContext from '../contexts/SpeechContext'

interface SpeechProviderProps {
  children?: React.ReactNode
}

const appId = process.env.SPEECHLY_APP_ID || "";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const SpeechProvider = ({ children }: SpeechProviderProps) => {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    resetTranscript,
  } = useSpeechRecognition()

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  }

  const stopListening = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAppleDevice = navigator.userAgent.includes('Macintosh');

    if(isIOS || isAppleDevice) {
      try{ startListening() }
      catch(err) { }
    }
    
    SpeechRecognition.stopListening();
  }

  return(
    <SpeechContext.Provider value={{
      transcript,
      listening,
      browserSupportsSpeechRecognition,
      isMicrophoneAvailable,
      resetTranscript,
      startListening,
      stopListening,
    }}
    >
      { children }
    </SpeechContext.Provider>
  )
}

export default SpeechProvider