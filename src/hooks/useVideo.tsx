import { useContext} from 'react'

import VideoContext from '../contexts/VideoContext'
import { IVideoContextData } from "../typings/globals";

export function useVideo():IVideoContextData {
  const context = useContext(VideoContext)

  if (!context) {
    throw new Error('useVideo must be used within an VideoProvider');
  }

  return context;
}