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
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAppleDevice = navigator.userAgent.includes('Macintosh');
    const speechStart = SpeechRecognition.startListening({ continuous: true, language: "en-US" })
    
    if(listening) return
    console.log('@@@ stated')

    if(isIOS || isAppleDevice) {
      try { speechStart }
      catch(err) { }
    }

    speechStart;
  }

  const stopListening = () => {
    if(!listening) return
    console.log('@@@ paused')
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