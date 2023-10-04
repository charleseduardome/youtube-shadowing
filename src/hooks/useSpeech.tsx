import { useContext} from 'react'

import SpeechContext from '../contexts/SpeechContext'
import { ISpeechContextData } from "../typings/globals";

export function useSpeech():ISpeechContextData {
  const context = useContext(SpeechContext)

  if (!context) {
    throw new Error('useSpeech must be used within an SpeechProvider');
  }

  return context;
}